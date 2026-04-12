import { NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/search";

interface BotContextPayload {
  type: string;
  bot_id?: string;
  room_id: string;
  message: {
    message_id: string;
    content: string;
    sender_id: string;
    created_at: string;
  };
  history?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as BotContextPayload;

  // Ignore offline notifications
  if (payload.type === "message.offline") {
    return NextResponse.json({ ok: true });
  }

  if (payload.type !== "bot.context") {
    return NextResponse.json({ error: "unexpected type" }, { status: 400 });
  }

  console.log("[bot-context] incoming payload:", JSON.stringify(payload, null, 2));

  const query = payload.message.content;
  const results = search(query, 4);
  console.log(`[bot-context] matched chunks:`, results.map(r => r.title));

  const context = results.length > 0
    ? results.map((r) => `[${r.title}]\n${r.text}`).join("\n\n")
    : "";

  const system_prompt = `You are an assistant on the portfolio website of Pascal Byabasaija, a software engineer from Uganda. "Pascal" always refers to Pascal Byabasaija the person, never the programming language.

Answer questions about Pascal using the context below. Be concise, friendly, and professional. Do not make up information not present in the context.

${context ? `CONTEXT:\n${context}` : "No context found. Answer generally about Pascal Byabasaija, a backend software engineer."}`;

  console.log("[bot-context] responding with system_prompt:\n", system_prompt);
  return NextResponse.json({ system_prompt });
}
