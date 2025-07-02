"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Circle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  message_id: string;
  content: string;
  sender_id: string;
  recipient_id: string;
  sender_name: string;
  recipient_name: string;
  timestamp: string;
  isUser: boolean;
}

interface UserSession {
  id: string;
  name: string;
  email?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isWaitingForName, setIsWaitingForName] = useState(false);
  const [isWaitingForEmail, setIsWaitingForEmail] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [supportAgentOnline, setSupportAgentOnline] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Socket.IO connection
  const connectToChat = async (userId: string, apiKey: string) => {
    try {
      setIsConnecting(true);
      
      const socket = io("ws://localhost:8000", {
        path: "/sockets",
        auth: {
          user_id: userId,
          api_key: apiKey,
        },
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Connected to chat server");
        setIsConnected(true);
        setIsConnecting(false);
      });

      socket.on("connected", (data) => {
        console.log("Connection confirmed:", data);
        // Check if support agent is online
        socket.emit("check_user_status", { 
          user_id: process.env.NEXT_PUBLIC_SUPPORT_AGENT 
        });
      });

      socket.on("user_status", (data) => {
        if (data.user_id === process.env.NEXT_PUBLIC_SUPPORT_AGENT) {
          setSupportAgentOnline(data.online);
          
          if (data.online) {
            addSystemMessage("Pascal is online! Feel free to ask any questions.");
          } else {
            addSystemMessage("Pascal is currently offline. Please leave your email and we'll get back to you soon.");
            if (!userSession?.email) {
              setIsWaitingForEmail(true);
            }
          }
        }
      });

      socket.on("message", (data) => {
        const newMessage: ChatMessage = {
          message_id: data.message_id,
          content: data.content,
          sender_id: data.sender_id,
          recipient_id: data.recipient_id,
          sender_name: data.sender_name,
          recipient_name: data.recipient_name,
          timestamp: data.timestamp,
          isUser: data.sender_id === userId,
        };
        setMessages(prev => [...prev, newMessage]);
      });

      socket.on("message_sent", (data) => {
        console.log("Message sent confirmation:", data);
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error);
        addSystemMessage(`Error: ${error.message}`);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from chat server");
        setIsConnected(false);
      });

      // Keep connection alive with ping
      const pingInterval = setInterval(() => {
        if (socket.connected) {
          socket.emit("ping");
        }
      }, 30000);

      socket.on("pong", () => {
        console.log("Pong received - connection alive");
      });

      return () => {
        clearInterval(pingInterval);
        socket.disconnect();
      };

    } catch (error) {
      console.error("Failed to connect to chat server:", error);
      setIsConnecting(false);
      addSystemMessage("Failed to connect to chat server. Please try again later.");
    }
  };

  const addSystemMessage = (content: string) => {
    const systemMessage: ChatMessage = {
      message_id: uuidv4(),
      content,
      sender_id: "system",
      recipient_id: userSession?.id || "",
      sender_name: "System",
      recipient_name: userSession?.name || "",
      timestamp: new Date().toISOString(),
      isUser: false,
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  useEffect(() => {
    // Check if user session exists in localStorage
    const savedSession = localStorage.getItem("chatUserSession");
    if (savedSession) {
      const session = JSON.parse(savedSession) as UserSession;
      setUserSession(session);
      
      // Connect to chat server
      const apiKey = process.env.NEXT_PUBLIC_CHAT_API_KEY;
      if (apiKey) {
        connectToChat(session.id, apiKey);
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleToggleChat = () => {
    if (!isOpen && !userSession) {
      // First time opening, ask for name
      addSystemMessage("I am happy that you are here! Whom shall i call you?");
      setIsWaitingForName(true);
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (isWaitingForName && !userSession) {
      // Save user name and create session
      const newSession: UserSession = {
        id: uuidv4(),
        name: inputValue.trim(),
      };
      
      localStorage.setItem("chatUserSession", JSON.stringify(newSession));
      setUserSession(newSession);
      setIsWaitingForName(false);

      addSystemMessage(`Nice to meet you, ${newSession.name}!`);
      
      // Connect to chat server
      const apiKey = process.env.NEXT_PUBLIC_CHAT_API_KEY;
      if (apiKey) {
        connectToChat(newSession.id, apiKey);
      }
      
      setInputValue("");
      return;
    }

    if (isWaitingForEmail) {
      // Save email and create offline message
      const updatedSession = { ...userSession!, email: inputValue.trim() };
      localStorage.setItem("chatUserSession", JSON.stringify(updatedSession));
      setUserSession(updatedSession);
      setIsWaitingForEmail(false);
      
      addSystemMessage("Thank you! We've saved your email and will contact you soon.");
      setInputValue("");
      return;
    }

    if (!supportAgentOnline && !userSession?.email) {
      addSystemMessage("Please provide your email first so we can get back to you.");
      setIsWaitingForEmail(true);
      return;
    }

    // Send message via Socket.IO
    if (socketRef.current && socketRef.current.connected && userSession) {
      const messageData = {
        recipient_id: process.env.NEXT_PUBLIC_SUPPORT_AGENT,
        sender_name: userSession.name,
        recipient_name: "Pascal",
        content: inputValue.trim(),
        content_type: "text",
      };

      // Add message to UI immediately
      const userMessage: ChatMessage = {
        message_id: uuidv4(),
        content: inputValue.trim(),
        sender_id: userSession.id,
        recipient_id: process.env.NEXT_PUBLIC_SUPPORT_AGENT!,
        sender_name: userSession.name,
        recipient_name: "Pascal",
        timestamp: new Date().toISOString(),
        isUser: true,
      };
      
      setMessages(prev => [...prev, userMessage]);
      socketRef.current.emit("send_message", messageData);
    } else {
      addSystemMessage("Not connected to chat server. Please refresh and try again.");
    }

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getConnectionStatus = () => {
    if (isConnecting) return { text: "Connecting...", color: "text-yellow-500" };
    if (isConnected && supportAgentOnline) return { text: "", color: "text-green-500" };
    if (isConnected && !supportAgentOnline) return { text: "", color: "text-orange-500" };
    return { text: "", color: "text-red-500" };
  };

  const status = getConnectionStatus();

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={handleToggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full transition-all duration-300 ease-in-out backdrop-blur-[10px] border border-jet ${
          isOpen
            ? "bg-eerie-black-1 text-orange-yellow-crayola shadow-shadow-2"
            : "bg-gradient-jet text-light-gray hover:text-orange-yellow-crayola shadow-[0_0_20px_rgba(255,176,0,0.3)] hover:shadow-[0_0_25px_rgba(255,176,0,0.5)]"
        } ${!isOpen ? 'animate-heartbeat' : ''}`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-gradient-jet backdrop-blur-[10px] border border-jet rounded-2xl shadow-shadow-3 flex flex-col overflow-hidden sm:w-80 sm:h-96">
          {/* Header */}
          <div className="bg-gradient-onyx p-4 border-b border-jet rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white-1 font-medium text-lg">
                  Chat Support
                </h3>
                <p className="text-light-gray-70 text-sm">
                  {userSession ? `Hello, there!` : "We're here to help"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Circle className={`w-2 h-2 fill-current ${status.color}`} />
                <span className={`text-xs ${status.color}`}>
                  {status.text}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.message_id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    message.isUser
                      ? "bg-orange-yellow-crayola text-smoky-black font-medium"
                      : "bg-onyx text-white-1 border border-jet"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-jet bg-eerie-black-1 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type={isWaitingForEmail ? "email" : "text"}
                value={isWaitingForEmail ? emailValue : inputValue}
                onChange={(e) => {
                  if (isWaitingForEmail) {
                    setEmailValue(e.target.value);
                    setInputValue(e.target.value);
                  } else {
                    setInputValue(e.target.value);
                  }
                }}
                onKeyPress={handleKeyPress}
                placeholder={
                  isWaitingForName
                    ? "Enter your name..."
                    : isWaitingForEmail
                    ? "Enter your email..."
                    : "Type your message..."
                }
                className="flex-1 bg-jet border border-onyx rounded-xl px-3 py-2 text-white-1 text-sm placeholder-light-gray-70 focus:outline-none focus:border-orange-yellow-crayola transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2 bg-orange-yellow-crayola text-smoky-black rounded-xl hover:bg-vegas-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
