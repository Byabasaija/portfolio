"use client";

import { useEffect, useRef, useState } from "react";
import { ChatAPI } from "@hastenr/chatapi-sdk";

const CHATAPI_URL = process.env.NEXT_PUBLIC_CHATAPI_URL!;

interface Room {
  room_id: string;
  name: string;
  metadata?: string;
  created_at?: string;
  firstMessage?: string;
}

interface Message {
  id: string;
  role: "me" | "visitor" | "bot";
  content: string;
  streaming?: boolean;
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: (token: string, userId: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Wrong password.");
        return;
      }
      const { token, user_id } = await res.json();
      onLogin(token, user_id);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-smoky-black">
      <form onSubmit={submit} className="w-full max-w-sm bg-eerie-black-1 rounded-2xl p-8 shadow-shadow-5 border border-white/5 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-orange-yellow-crayola" />
          <h1 className="text-white-2 text-base font-semibold">Pascal's Dashboard</h1>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-jet text-white-2 placeholder:text-light-gray-70 text-sm px-3 py-2 rounded-xl outline-none border border-white/5 focus:border-orange-yellow-crayola/50 transition-colors"
          autoFocus
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="bg-orange-yellow-crayola text-smoky-black text-sm font-medium py-2 rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

// ─── Room list ────────────────────────────────────────────────────────────────

function RoomList({ token, onSelect }: { token: string; onSelect: (room: Room) => void }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${CHATAPI_URL}/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const data = await res.json();
      const list: Room[] = Array.isArray(data) ? data : data.rooms ?? [];

      // Fetch first message of each room for the preview title
      const enriched = await Promise.all(
        list.map(async (room) => {
          try {
            const msgRes = await fetch(`${CHATAPI_URL}/rooms/${room.room_id}/messages?limit=1`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!msgRes.ok) return room;
            const msgData = await msgRes.json();
            const messages = Array.isArray(msgData) ? msgData : msgData.messages ?? [];
            const first = messages.find((m: any) => m.sender_id?.startsWith("visitor"));
            return { ...room, firstMessage: first?.content ?? null };
          } catch {
            return room;
          }
        })
      );

      setRooms(enriched);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [token]);

  const timeAgo = (iso?: string) => {
    if (!iso) return "";
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-smoky-black">
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white-2 text-base font-semibold">Conversations</h1>
            <p className="text-light-gray-70 text-xs mt-0.5">{rooms.length} active</p>
          </div>
          <button
            onClick={load}
            className="text-xs text-light-gray-70 hover:text-white-2 transition-colors border border-white/10 rounded-lg px-3 py-1.5"
          >
            Refresh
          </button>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-5 h-5 border-2 border-orange-yellow-crayola border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && rooms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-light-gray-70 text-sm">No conversations yet.</p>
            <p className="text-light-gray-70 text-xs mt-1">Visitors will appear here when they open the chat widget.</p>
          </div>
        )}

        <div className="flex flex-col divide-y divide-white/5">
          {rooms.map((room) => {
            let meta: Record<string, string> = {};
            try { meta = JSON.parse(room.metadata ?? "{}"); } catch {}
            const startedAt = meta.started_at || room.created_at;
            const title = room.firstMessage
              ? room.firstMessage.length > 60
                ? room.firstMessage.slice(0, 60) + "…"
                : room.firstMessage
              : "New conversation";

            return (
              <button
                key={room.room_id}
                onClick={() => onSelect(room)}
                className="text-left py-4 flex items-start gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-jet flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-light-gray-70 text-xs">V</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white-2 text-sm font-medium truncate">{title}</span>
                    <span className="text-light-gray-70 text-xs shrink-0">{timeAgo(startedAt)}</span>
                  </div>
                  <p className="text-light-gray-70 text-xs mt-0.5 truncate">
                    {meta.visitor_id ?? room.room_id}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Room chat ────────────────────────────────────────────────────────────────

function RoomChat({ room, token, userId, onBack }: {
  room: Room;
  token: string;
  userId: string;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<ChatAPI | null>(null);
  const streamBufferRef = useRef<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const client = new ChatAPI({ baseURL: CHATAPI_URL, token });
    clientRef.current = client;

    client.connect().catch(() => {
      // SDK will retry automatically — suppress the initial connection error
    }).then(() => {
      setConnected(true);

      // Load history
      fetch(`${CHATAPI_URL}/rooms/${room.room_id}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          const history = Array.isArray(data) ? data : data.messages ?? [];
          setMessages(
            history.map((m: any) => ({
              id: m.message_id ?? m.id ?? crypto.randomUUID(),
              role: m.sender_id === userId ? "me" : m.sender_id?.startsWith("visitor") ? "visitor" : "bot",
              content: m.content,
            }))
          );
        })
        .catch(() => {});

      client.on("message", (msg: any) => {
        if (msg.sender_id === userId) return;
        const role = msg.sender_id?.startsWith("visitor") ? "visitor" : "bot";
        setMessages((prev) => [
          ...prev,
          { id: msg.message_id ?? crypto.randomUUID(), role, content: msg.content },
        ]);
      });

      client.on("message.stream.start", (e: any) => {
        streamBufferRef.current = "";
        setMessages((prev) => [
          ...prev,
          { id: e.message_id ?? "stream", role: "bot", content: "", streaming: true },
        ]);
      });

      client.on("message.stream.delta", (e: any) => {
        streamBufferRef.current += e.delta ?? "";
        const buf = streamBufferRef.current;
        setMessages((prev) =>
          prev.map((m) => (m.streaming ? { ...m, content: buf } : m))
        );
      });

      client.on("message.stream.end", () => {
        setMessages((prev) =>
          prev.map((m) => (m.streaming ? { ...m, streaming: false } : m))
        );
        streamBufferRef.current = "";
      });
    });

    return () => { client.disconnect?.(); };
  }, [room.room_id, token, userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text || !clientRef.current) return;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "me", content: text },
    ]);
    try {
      clientRef.current.sendMessage(room.room_id, text);
    } catch (e) {
      console.error("Failed to send", e);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const title = room.firstMessage
    ? room.firstMessage.length > 50 ? room.firstMessage.slice(0, 50) + "…" : room.firstMessage
    : "Conversation";

  return (
    <div className="min-h-screen bg-smoky-black flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-eerie-black-1">
        <button onClick={onBack} className="text-light-gray-70 hover:text-white-2 transition-colors p-1">
          ←
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white-2 text-sm font-medium truncate">{title}</p>
          <p className="text-light-gray-70 text-xs">
            {connected ? (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Live
              </span>
            ) : "Connecting..."}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-w-2xl w-full mx-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === "me" ? "items-end" : "items-start"}`}>
            <span className="text-light-gray-70 text-xs mb-1 px-1">
              {msg.role === "me" ? "You" : msg.role === "bot" ? "Bot" : "Visitor"}
            </span>
            <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
              msg.role === "me"
                ? "bg-orange-yellow-crayola text-smoky-black rounded-br-sm"
                : msg.role === "bot"
                ? "bg-eerie-black-1 text-light-gray border border-white/5 rounded-bl-sm"
                : "bg-jet text-light-gray rounded-bl-sm"
            }`}>
              {msg.content}
              {msg.streaming && (
                <span className="inline-block w-1.5 h-3.5 bg-light-gray-70 ml-0.5 animate-pulse rounded-sm" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/5 max-w-2xl w-full mx-auto">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={!connected}
            placeholder={connected ? "Reply as Pascal..." : "Connecting..."}
            className="flex-1 bg-jet text-white-2 placeholder:text-light-gray-70 text-sm px-3 py-2 rounded-xl outline-none border border-white/5 focus:border-orange-yellow-crayola/50 transition-colors"
          />
          <button
            onClick={send}
            disabled={!connected || !input.trim()}
            className="px-4 py-2 rounded-xl bg-orange-yellow-crayola text-smoky-black text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);

  const handleLogin = (t: string, uid: string) => {
    setToken(t);
    setUserId(uid);
  };

  if (!token) return <LoginForm onLogin={handleLogin} />;
  if (activeRoom) return (
    <RoomChat
      room={activeRoom}
      token={token}
      userId={userId}
      onBack={() => setActiveRoom(null)}
    />
  );
  return <RoomList token={token} onSelect={setActiveRoom} />;
}
