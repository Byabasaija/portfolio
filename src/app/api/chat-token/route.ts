import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const CHATAPI_URL = process.env.CHATAPI_URL!;
const CHATAPI_JWT_SECRET = process.env.CHATAPI_JWT_SECRET!;
const CHATAPI_BOT_ID = process.env.CHATAPI_BOT_ID!;
// Server-side admin user for creating rooms and adding the bot
const USER_ID = process.env.USER_ID!;

function mintToken(userId: string, expiresIn = "2h"): string {
  return jwt.sign({ sub: userId }, CHATAPI_JWT_SECRET, {
    algorithm: "HS256",
    expiresIn,
  } as jwt.SignOptions);
}

export async function POST(req: NextRequest) {
  // Generate a unique visitor ID for this session
  const visitorId = `visitor-${crypto.randomUUID()}`;
  const visitorToken = mintToken(visitorId);
  const adminToken = mintToken(USER_ID);

  // Create a room with the visitor and the admin as initial members
  const roomRes = await fetch(`${CHATAPI_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      type: "group",
      name: `Visitor: ${visitorId}`,
      members: [visitorId, USER_ID, CHATAPI_BOT_ID],
      metadata: JSON.stringify({ visitor_id: visitorId, started_at: new Date().toISOString() }),
    }),
  });

  if (!roomRes.ok) {
    const err = await roomRes.text();
    return NextResponse.json({ error: "Failed to create room", detail: err }, { status: 500 });
  }

  const room = await roomRes.json();
  console.log("room response", JSON.stringify(room));

  return NextResponse.json({
    token: visitorToken,
    room_id: room.room_id,
    visitor_id: visitorId,
  });
}
