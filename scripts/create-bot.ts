/**
 * One-time setup script — creates the ChatAPI bot and prints its ID.
 * Run once after deploying ChatAPI, then set CHATAPI_BOT_ID in your env.
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/create-bot.ts
 *
 * Requires in environment:
 *   CHATAPI_URL, CHATAPI_JWT_SECRET, USER_ID
 */

import { createHmac } from "crypto";

const CHATAPI_URL = process.env.CHATAPI_URL;
const JWT_SECRET = process.env.CHATAPI_JWT_SECRET;
const USER_ID = process.env.USER_ID;

if (!CHATAPI_URL || !JWT_SECRET || !USER_ID) {
  console.error("Missing required env vars: CHATAPI_URL, CHATAPI_JWT_SECRET, USER_ID");
  process.exit(1);
}

function mintToken(userId: string, secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({ sub: userId, exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64url");
  const sig = createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${sig}`;
}

async function main() {
  const token = mintToken(USER_ID!, JWT_SECRET!);

  const listRes = await fetch(`${CHATAPI_URL}/bots`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!listRes.ok) {
    console.error("Failed to list bots:", await listRes.text());
    process.exit(1);
  }

  const data = await listRes.json();
  const bots = Array.isArray(data) ? data : data.bots ?? [];
  const existing = bots.find((b: any) => b.name === "Pascal's Assistant");

  // Delete existing bot if found
  if (existing) {
    console.log(`Deleting existing bot (${existing.bot_id ?? existing.id})...`);
    const delRes = await fetch(`${CHATAPI_URL}/bots/${existing.bot_id ?? existing.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!delRes.ok) {
      console.error("Failed to delete bot:", await delRes.text());
      process.exit(1);
    }
    console.log("Deleted.");
  }

  const createRes = await fetch(`${CHATAPI_URL}/bots`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Pascal's Assistant",
      llm_base_url: "https://openrouter.ai/api/v1/",
      llm_api_key_env: "OPEN_ROUTER_API_KEY",
      model: "liquid/lfm-2.5-1.2b-thinking:free",
    }),
  });

  if (!createRes.ok) {
    console.error("Failed to create bot:", await createRes.text());
    process.exit(1);
  }

  const bot = await createRes.json();
  console.log("Bot created successfully.");
  console.log("Response:", JSON.stringify(bot, null, 2));
  console.log(`\nAdd this to your .env:\n\nCHATAPI_BOT_ID=${bot.bot_id ?? bot.id}`);
}

main().catch(console.error);
