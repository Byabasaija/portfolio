import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const CHATAPI_URL = process.env.CHATAPI_URL!;
const CHATAPI_JWT_SECRET = process.env.CHATAPI_JWT_SECRET!;
const USER_ID = process.env.USER_ID!;

function mintToken(userId: string): string {
  return jwt.sign({ sub: userId }, CHATAPI_JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  } as jwt.SignOptions);
}

export async function POST(req: NextRequest) {
  const { room_id } = await req.json();
  if (!room_id) {
    return NextResponse.json({ error: "room_id required" }, { status: 400 });
  }

  // Fetch current room to preserve existing metadata
  const adminToken = mintToken(USER_ID);
  const roomRes = await fetch(`${CHATAPI_URL}/rooms/${room_id}`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });

  if (!roomRes.ok) {
    return NextResponse.json({ error: "room not found" }, { status: 404 });
  }

  const room = await roomRes.json();
  let meta: Record<string, unknown> = {};
  try { meta = JSON.parse(room.metadata ?? "{}"); } catch {}

  meta.escalated = true;
  meta.escalated_at = new Date().toISOString();

  const patchRes = await fetch(`${CHATAPI_URL}/rooms/${room_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ metadata: JSON.stringify(meta) }),
  });

  if (!patchRes.ok) {
    return NextResponse.json({ error: "failed to update room" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
