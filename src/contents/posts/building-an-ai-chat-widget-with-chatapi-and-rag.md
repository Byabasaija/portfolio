---
title: "Building an AI Chat Widget with ChatAPI and BM25 RAG"
publishedAt: "2026-04-13"
category: Systems Design
tags:
  - Systems Design
  - Software Development
  - AI
  - ChatAPI

summary: "How I added an AI-powered chat widget to my portfolio — using ChatAPI for real-time messaging, BM25 for retrieval, and a webhook-based RAG pipeline that answers questions about my work."
banner: /images/banner/posts/chatapi-rag-widget.svg
alt: "Building an AI Chat Widget with ChatAPI and BM25 RAG"
mathjax: false
---

Portfolio websites are static by nature. They present work, but they don't answer questions. I wanted to change that — not by putting a generic chatbot on the page, but by building something that genuinely knows about my work and can hand off to me directly when it can't help.

This post covers the technical decisions behind that build: how the retrieval pipeline works, why BM25 was the right algorithm, and how ChatAPI's webhook model ties it all together.

---

## The Architecture

The system has three main parts:

1. **A chat widget** embedded in the portfolio — visitors ask questions, the bot answers in real time with streaming responses.
2. **A RAG pipeline** — before each LLM call, relevant context is retrieved from my content and injected into the system prompt.
3. **A dashboard** — a protected page where I can see open conversations and reply directly when a visitor requests a human.

```
Visitor sends message
  → ChatAPI calls webhook (POST /api/bot-context)
  → Webhook runs BM25 search over indexed content
  → Returns system_prompt with retrieved context
  → ChatAPI calls LLM, streams response back to visitor
```

The portfolio app owns the retrieval logic. ChatAPI handles everything else — WebSocket connections, message storage, LLM calls, and token streaming.

---

## Content Indexing

The first step is getting my content into a searchable format. I have three sources:

- **Blog posts** — MDX files covering systems design topics
- **Portfolio projects** — MDX files describing each project
- **Resume data** — structured text covering experience, skills, and education

A build-time script reads all of these, strips markdown formatting, and splits the text into overlapping chunks of 400 words with an 80-word overlap. The overlap prevents important context from being lost at chunk boundaries.

```ts
function chunkText(text: string, chunkSize = 400, overlap = 80): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim()) chunks.push(chunk.trim());
    if (i + chunkSize >= words.length) break;
  }

  return chunks;
}
```

The result is a JSON file — `search-index.json` — with 23 chunks at the time of writing. Each chunk carries an `id`, `text`, `source` type, and `title`.

---

## Why BM25 Over Embeddings

The obvious retrieval approach for RAG is semantic search using vector embeddings. You embed the query, embed all chunks, then find the nearest neighbours. It works well, but it has costs:

- Every query requires an API call to an embedding provider
- Embeddings add latency before the LLM call even starts
- Running your own embedding model requires infrastructure

For a portfolio, the query volume is low and the content is small — 23 chunks totalling a few thousand words. Semantic similarity over this corpus doesn't meaningfully outperform keyword matching.

BM25 (Best Matching 25) is a probabilistic ranking algorithm that scores documents based on term frequency and document frequency. It answers the question: *given a query, how relevant is each document?*

The score for a document `d` given query terms `q` is:

```
score(d, q) = Σ IDF(qi) × (tf(qi, d) × (k1 + 1)) / (tf(qi, d) + k1 × (1 - b + b × |d| / avgdl))
```

Where:
- `tf(qi, d)` — how many times term `qi` appears in document `d`
- `IDF(qi)` — inverse document frequency, which down-weights common terms
- `|d|` — document length, normalised against the average document length `avgdl`
- `k1` and `b` — tuning constants (typically 1.5 and 0.75)

The IDF term is what makes BM25 effective for technical content. Terms like "FastAPI" or "PostgreSQL" appear in only a few chunks, so they carry high weight. Terms like "the" or "with" appear everywhere and are down-weighted automatically.

The implementation pre-computes term frequencies and document frequencies at module load time — so each search is a pure in-memory calculation with no I/O:

```ts
export function search(query: string, topK = 4): Chunk[] {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) return [];

  const scores = tokenizedChunks.map((tokens, i) => ({
    chunk: chunks[i],
    score: bm25Score(queryTerms, tokens, tokens.length),
  }));

  return scores
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}
```

A typical search over 23 chunks completes in under 5ms.

---

## The Webhook Pipeline

ChatAPI operates in what it calls *internal pipeline mode*. Before making an LLM call, ChatAPI POSTs to a webhook URL you configure:

```json
{
  "type": "bot.context",
  "bot_id": "...",
  "room_id": "...",
  "message": {
    "content": "What technologies does Pascal use?",
    "sender_id": "visitor-xxx",
    "created_at": "..."
  },
  "history": [
    { "role": "user", "content": "What technologies does Pascal use?" }
  ]
}
```

The webhook returns a `system_prompt` string. ChatAPI prepends it to the conversation history and sends everything to the LLM. The response streams back token by token via WebSocket.

My webhook handler:

```ts
export async function POST(req: NextRequest) {
  const payload = await req.json();

  if (payload.type !== "bot.context") {
    return NextResponse.json({ error: "unexpected type" }, { status: 400 });
  }

  // Check if conversation has been escalated to human
  if (await isEscalated(payload.room_id)) {
    return NextResponse.json({ skip: true });
  }

  const results = search(payload.message.content, 4);
  const context = results.map(r => `[${r.title}]\n${r.text}`).join("\n\n");

  return NextResponse.json({
    system_prompt: `You are an assistant on Pascal Byabasaija's portfolio...
    
CONTEXT:
${context}`
  });
}
```

The `skip: true` response is a ChatAPI feature for human handoff — when returned, ChatAPI makes no LLM call and sends no response, allowing a human to take over the conversation.

---

## Escalation

When a visitor clicks "Talk to Pascal directly", the portfolio:

1. PATCHes the room's metadata to set `escalated: true`
2. Sends a message in the room so it appears in my dashboard
3. All subsequent webhook calls for that room return `{ "skip": true }`

The bot goes silent. I open the dashboard, see the conversation, and reply directly. The visitor receives my message through the same WebSocket connection — no context switch, same room.

This is the correct model for human-in-the-loop chat: the AI handles the first tier, and the human joins the existing conversation rather than starting a new one.

---

## Real-Time Layer

The client connects to ChatAPI over a native WebSocket — no SDK dependency. The connection URL carries the JWT as a query parameter, since browsers cannot set custom headers on WebSocket connections:

```ts
const wsURL = baseURL.replace(/^http/, "ws") + `/ws?token=${token}`;
const ws = new WebSocket(wsURL);
```

Streaming responses arrive as three event types:

- `message.stream.start` — a new bot message begins
- `message.stream.delta` — a token chunk arrives
- `message.stream.end` — the message is complete

The client accumulates deltas in a buffer and updates the message in place on each delta, giving the familiar typewriter effect.

---

## Latency

The end-to-end flow from visitor sending a message to the first streamed token:

| Step | Time |
|------|------|
| Message reaches ChatAPI | ~50ms |
| Webhook called, BM25 search runs | ~10ms |
| LLM first token (OpenRouter) | ~400–800ms |
| **Total to first token** | **~500–900ms** |

The retrieval step is negligible. The dominant cost is the LLM provider's time to first token — which is the same regardless of the retrieval approach.

---

## Conclusion

The architecture is deliberately simple. BM25 over a small, curated index is fast, deterministic, and requires no external dependencies at query time. The webhook model keeps retrieval logic in the portfolio app, where it belongs, and out of the messaging infrastructure. ChatAPI handles the real-time layer — WebSocket connections, streaming, message storage — so the portfolio code only deals with what it knows about: the content.

The result is a chat widget that can answer questions about my work accurately, hand off to me when it can't, and add zero infrastructure overhead to a static portfolio.
