import index from "@/data/search-index.json";

interface Chunk {
  id: string;
  text: string;
  source: "post" | "portfolio" | "resume";
  title: string;
}

const chunks = index as Chunk[];

// ─── BM25 ─────────────────────────────────────────────────────────────────

const K1 = 1.5;
const B = 0.75;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

// Pre-compute term frequencies and doc lengths at module load (once)
const tokenizedChunks = chunks.map((c) => tokenize(c.text));
const avgDocLen = tokenizedChunks.reduce((sum, t) => sum + t.length, 0) / tokenizedChunks.length;

const df = new Map<string, number>();
tokenizedChunks.forEach((tokens) => {
  new Set(tokens).forEach((term) => {
    df.set(term, (df.get(term) ?? 0) + 1);
  });
});

const N = chunks.length;

function idf(term: string): number {
  const n = df.get(term) ?? 0;
  return Math.log((N - n + 0.5) / (n + 0.5) + 1);
}

function bm25Score(queryTerms: string[], docTokens: string[], docLen: number): number {
  const tf = new Map<string, number>();
  docTokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));

  return queryTerms.reduce((score, term) => {
    const termTf = tf.get(term) ?? 0;
    const numerator = termTf * (K1 + 1);
    const denominator = termTf + K1 * (1 - B + B * (docLen / avgDocLen));
    return score + idf(term) * (numerator / denominator);
  }, 0);
}

// ─── Public API ─────────────────────────────────────────────────────────────

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
