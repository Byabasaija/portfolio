"use client";

import { useEffect, useRef, useState } from "react";
import { ChatAPI } from "@hastenr/chatapi-sdk";
import { LuMessageSquare, LuX, LuSend } from "react-icons/lu";

interface Message {
  id: string;
  role: "user" | "bot" | "human";
  content: string;
  streaming?: boolean;
}

const CHATAPI_URL = process.env.NEXT_PUBLIC_CHATAPI_URL!;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [escalated, setEscalated] = useState(false);

  const clientRef = useRef<ChatAPI | null>(null);
  const roomIdRef = useRef<string | null>(null);
  const visitorIdRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const streamBufferRef = useRef<string>("");

  // Initialise on first open
  useEffect(() => {
    if (!open || clientRef.current) return;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/chat-token", { method: "POST" });
        const data = await res.json();
        const { token, room_id, visitor_id } = data;
        roomIdRef.current = room_id;
        visitorIdRef.current = visitor_id;

        const client = new ChatAPI({ baseURL: CHATAPI_URL, token });
        clientRef.current = client;

        try {
          await client.connect();
        } catch {
          // SDK will retry automatically — suppress initial connection error
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // Incoming full messages (human replies from dashboard) — ignore own messages
        client.on("message", (msg: any) => {
          if (msg.sender_id === visitorIdRef.current) return;
          setMessages((prev) => [
            ...prev,
            { id: msg.message_id ?? crypto.randomUUID(), role: "human", content: msg.content },
          ]);
        });

        // Bot streaming
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

        setMessages([
          {
            id: "welcome",
            role: "bot",
            content: "Hi! I'm Pascal's assistant. Ask me anything about his work, projects, or experience.",
          },
        ]);
        setReady(true);
      } catch (e) {
        console.error("Chat init failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text || !clientRef.current || !roomIdRef.current) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: text },
    ]);

    try {
      clientRef.current.sendMessage(roomIdRef.current, text);
    } catch (e) {
      console.error("Failed to send message", e);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const talkToPascal = () => {
    if (!clientRef.current || !roomIdRef.current) return;
    setEscalated(true);
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "bot",
        content: "Pascal has been notified and will get back to you shortly.",
      },
    ]);
    try {
      clientRef.current.sendMessage(roomIdRef.current, "I'd like to speak with Pascal directly.");
    } catch (e) {
      console.error("Failed to escalate", e);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {open && (
        <div className="w-[340px] max-h-[520px] flex flex-col rounded-2xl shadow-shadow-5 bg-eerie-black-1 border border-white/5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-onyx border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-yellow-crayola" />
              <span className="text-white-2 text-sm font-medium">Pascal's Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-light-gray-70 hover:text-white-2 transition-colors">
              <LuX size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {loading && (
              <div className="flex justify-center py-4">
                <div className="w-4 h-4 border-2 border-orange-yellow-crayola border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-orange-yellow-crayola text-smoky-black rounded-br-sm"
                      : "bg-jet text-light-gray rounded-bl-sm"
                  }`}
                >
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
          <div className="px-3 py-3 border-t border-white/5 flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={!ready}
                placeholder={ready ? "Ask me anything..." : "Connecting..."}
                className="flex-1 bg-jet text-white-2 placeholder:text-light-gray-70 text-sm px-3 py-2 rounded-xl outline-none border border-white/5 focus:border-orange-yellow-crayola/50 transition-colors"
              />
              <button
                onClick={send}
                disabled={!ready || !input.trim()}
                className="p-2 rounded-xl bg-orange-yellow-crayola text-smoky-black hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                <LuSend size={16} />
              </button>
            </div>
            {!escalated && ready && (
              <button
                onClick={talkToPascal}
                className="text-xs text-light-gray-70 hover:text-orange-yellow-crayola transition-colors text-center py-1"
              >
                Talk to Pascal directly →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-orange-yellow-crayola text-smoky-black shadow-shadow-3 flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        {open ? <LuX size={20} /> : <LuMessageSquare size={20} />}
      </button>
    </div>
  );
}
