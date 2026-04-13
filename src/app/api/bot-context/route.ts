import { NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/search";

const CHATAPI_URL = process.env.CHATAPI_URL!;
const CHATAPI_JWT_SECRET = process.env.CHATAPI_JWT_SECRET!;
const USER_ID = process.env.USER_ID!;

async function isEscalated(roomId: string): Promise<boolean> {
  try {
    const { default: jwt } = await import("jsonwebtoken");
    const token = jwt.sign({ sub: USER_ID }, CHATAPI_JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
    const res = await fetch(`${CHATAPI_URL}/rooms/${roomId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;
    const room = await res.json();
    const meta = JSON.parse(room.metadata ?? "{}");
    return meta.escalated === true;
  } catch {
    return false;
  }
}

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

  // If a human has taken over, silence the bot
  if (await isEscalated(payload.room_id)) {
    return NextResponse.json({ skip: true });
  }

  const query = payload.message.content;
  const results = search(query, 4);

  const context = results.length > 0
    ? results.map((r) => `[${r.title}]\n${r.text}`).join("\n\n")
    : "";

  const system_prompt = `You are an assistant on the portfolio website of Pascal Byabasaija, a software engineer from Uganda. "Pascal" always refers to Pascal Byabasaija the person, never the programming language.

Answer questions about Pascal using the context below. Be concise, friendly, and professional. Do not make up information not present in the context.

${context ? `CONTEXT:\n${context}` : "No context found. Answer generally about Pascal Byabasaija, a backend software engineer."}`;

  return NextResponse.json({ system_prompt });
}
