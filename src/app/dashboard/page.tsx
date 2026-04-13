"use client";

import { useEffect, useRef, useState } from "react";
import { ChatAPISocket } from "@/lib/chatapi";
import { LuArrowLeft, LuRefreshCw, LuSend, LuMessageSquare } from "react-icons/lu";

const CHATAPI_URL = process.env.NEXT_PUBLIC_CHATAPI_URL!;

interface Room {
  room_id: string;
  name: string;
  metadata?: string;
  created_at?: string;
  firstMessage?: string;
  escalated?: boolean;
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
      if (!res.ok) { setError("Wrong password."); return; }
      const { token, user_id } = await res.json();
      onLogin(token, user_id);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-smoky-black px-4">
      <div className="w-full max-w-[360px]">
        {/* Logo mark */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-orange-yellow-crayola flex items-center justify-center">
            <LuMessageSquare size={14} className="text-smoky-black" />
          </div>
          <span className="text-white-2 text-sm font-semibold">Pascal's Dashboard</span>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-3">
          <div>
            <label className="text-light-gray-70 text-xs mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-eerie-black-1 text-white-2 placeholder:text-light-gray-70 text-sm px-3.5 py-2.5 rounded-xl outline-none border border-white/5 focus:border-orange-yellow-crayola/50 transition-colors"
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-1 w-full bg-orange-yellow-crayola text-smoky-black text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Room list ────────────────────────────────────────────────────────────────

function RoomList({ token, onSelect }: { token: string; onSelect: (room: Room) => void }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch(`${CHATAPI_URL}/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const data = await res.json();
      const list: Room[] = Array.isArray(data) ? data : data.rooms ?? [];

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
            let meta: Record<string, any> = {};
            try { meta = JSON.parse(room.metadata ?? "{}"); } catch {}
            return { ...room, firstMessage: first?.content ?? null, escalated: meta.escalated === true };
          } catch {
            return room;
          }
        })
      );

      setRooms(enriched);
    } finally {
      setLoading(false);
      setRefreshing(false);
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
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between py-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-yellow-crayola flex items-center justify-center">
              <LuMessageSquare size={12} className="text-smoky-black" />
            </div>
            <div>
              <h1 className="text-white-2 text-sm font-semibold leading-none">Conversations</h1>
              {!loading && (
                <p className="text-light-gray-70 text-xs mt-0.5">
                  {rooms.length === 0 ? "No visitors yet" : `${rooms.length} conversation${rooms.length !== 1 ? "s" : ""}`}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => load(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-xs text-light-gray-70 hover:text-white-2 transition-colors border border-white/10 rounded-lg px-3 py-1.5 disabled:opacity-40"
          >
            <LuRefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-5 h-5 border-2 border-orange-yellow-crayola border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && rooms.length === 0 && (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-2xl bg-eerie-black-1 border border-white/5 flex items-center justify-center mx-auto mb-4">
              <LuMessageSquare size={20} className="text-light-gray-70" />
            </div>
            <p className="text-white-2 text-sm font-medium">No conversations yet</p>
            <p className="text-light-gray-70 text-xs mt-1">Visitors will appear here when they open the chat widget.</p>
          </div>
        )}

        {/* List */}
        <div className="divide-y divide-white/5">
          {rooms.map((room) => {
            let meta: Record<string, string> = {};
            try { meta = JSON.parse(room.metadata ?? "{}"); } catch {}
            const startedAt = meta.started_at || room.created_at;
            const title = room.firstMessage
              ? room.firstMessage.length > 55 ? room.firstMessage.slice(0, 55) + "…" : room.firstMessage
              : "New conversation";

            return (
              <button
                key={room.room_id}
                onClick={() => onSelect(room)}
                className="w-full text-left py-4 flex items-start gap-3 group"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-onyx border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-light-gray-70 text-xs font-medium">V</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-white-2 text-sm font-medium truncate group-hover:text-orange-yellow-crayola transition-colors">
                      {title}
                    </span>
                    <span className="text-light-gray-70 text-xs shrink-0">{timeAgo(startedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {room.escalated && (
                      <span className="inline-flex items-center gap-1 text-xs text-orange-yellow-crayola">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-yellow-crayola" />
                        Needs reply
                      </span>
                    )}
                    {!room.escalated && (
                      <span className="text-light-gray-70 text-xs truncate">Bot handling</span>
                    )}
                  </div>
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
  const clientRef = useRef<ChatAPISocket | null>(null);
  const streamBufferRef = useRef<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const client = new ChatAPISocket(CHATAPI_URL, token);
    clientRef.current = client;

    client.connect().catch(() => {}).then(() => {
      setConnected(true);

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
        setMessages((prev) => [...prev, { id: e.message_id ?? "stream", role: "bot", content: "", streaming: true }]);
      });

      client.on("message.stream.delta", (e: any) => {
        streamBufferRef.current += e.delta ?? "";
        const buf = streamBufferRef.current;
        setMessages((prev) => prev.map((m) => (m.streaming ? { ...m, content: buf } : m)));
      });

      client.on("message.stream.end", () => {
        setMessages((prev) => prev.map((m) => (m.streaming ? { ...m, streaming: false } : m)));
        streamBufferRef.current = "";
      });
    });

    return () => { client.disconnect(); };
  }, [room.room_id, token, userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text || !clientRef.current) return;
    setInput("");
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "me", content: text }]);
    try { clientRef.current.sendMessage(room.room_id, text); } catch {}
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const title = room.firstMessage
    ? room.firstMessage.length > 45 ? room.firstMessage.slice(0, 45) + "…" : room.firstMessage
    : "Conversation";

  return (
    <div className="h-screen bg-smoky-black flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-eerie-black-1 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-light-gray-70 hover:text-white-2 transition-colors"
        >
          <LuArrowLeft size={16} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-onyx border border-white/10 flex items-center justify-center shrink-0">
          <span className="text-light-gray-70 text-xs font-medium">V</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white-2 text-sm font-medium truncate">{title}</p>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-400" : "bg-light-gray-70"}`} />
            <span className="text-light-gray-70 text-xs">{connected ? "Live" : "Connecting..."}</span>
            {room.escalated && (
              <>
                <span className="text-light-gray-70 text-xs">·</span>
                <span className="text-orange-yellow-crayola text-xs">Escalated</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="max-w-2xl mx-auto px-4 space-y-5">
          {messages.length === 0 && connected && (
            <p className="text-center text-light-gray-70 text-xs py-8">No messages yet.</p>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 ${msg.role === "me" ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-medium mt-0.5 ${
                msg.role === "me"
                  ? "bg-orange-yellow-crayola text-smoky-black"
                  : msg.role === "bot"
                  ? "bg-eerie-black-1 border border-white/10 text-light-gray-70"
                  : "bg-gradient-onyx border border-white/10 text-light-gray-70"
              }`}>
                {msg.role === "me" ? "P" : msg.role === "bot" ? "B" : "V"}
              </div>

              <div className="flex flex-col gap-1 max-w-[70%]">
                <span className={`text-xs text-light-gray-70 ${msg.role === "me" ? "text-right" : "text-left"}`}>
                  {msg.role === "me" ? "You" : msg.role === "bot" ? "Bot" : "Visitor"}
                </span>
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "me"
                    ? "bg-orange-yellow-crayola text-smoky-black rounded-tr-sm"
                    : msg.role === "bot"
                    ? "bg-eerie-black-1 border border-white/5 text-light-gray rounded-tl-sm"
                    : "bg-jet text-light-gray rounded-tl-sm"
                }`}>
                  {msg.content}
                  {msg.streaming && (
                    <span className="inline-block w-1.5 h-3.5 bg-light-gray-70 ml-0.5 animate-pulse rounded-sm" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/5 bg-eerie-black-1 px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={!connected}
            placeholder={connected ? "Reply as Pascal..." : "Connecting..."}
            className="flex-1 bg-jet text-white-2 placeholder:text-light-gray-70 text-sm px-3.5 py-2.5 rounded-xl outline-none border border-white/5 focus:border-orange-yellow-crayola/50 transition-colors"
          />
          <button
            onClick={send}
            disabled={!connected || !input.trim()}
            className="w-10 h-10 rounded-xl bg-orange-yellow-crayola text-smoky-black flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity shrink-0"
          >
            <LuSend size={15} />
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
    <RoomChat room={activeRoom} token={token} userId={userId} onBack={() => setActiveRoom(null)} />
  );
  return <RoomList token={token} onSelect={setActiveRoom} />;
}
