import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const CHATAPI_JWT_SECRET = process.env.CHATAPI_JWT_SECRET!;
const USER_ID = process.env.USER_ID!;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD!;

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = jwt.sign({ sub: USER_ID }, CHATAPI_JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "8h",
  } as jwt.SignOptions);

  return NextResponse.json({ token, user_id: USER_ID });
}
