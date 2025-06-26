"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UserSession {
  id: string;
  name: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isWaitingForName, setIsWaitingForName] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if user session exists in localStorage
    const savedSession = localStorage.getItem("chatUserSession");
    if (savedSession) {
      const session = JSON.parse(savedSession) as UserSession;
      setUserSession(session);
      // Load welcome back message
      setMessages([
        {
          id: uuidv4(),
          text: `Welcome back, ${session.name}! How can I help you today?`,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const handleToggleChat = () => {
    if (!isOpen && !userSession) {
      // First time opening, ask for name
      setMessages([
        {
          id: uuidv4(),
          text: "Hello! What's your name?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setIsWaitingForName(true);
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (isWaitingForName && !userSession) {
      // Save user name and create session
      const newSession: UserSession = {
        id: uuidv4(),
        name: inputValue.trim(),
      };
      
      localStorage.setItem("chatUserSession", JSON.stringify(newSession));
      setUserSession(newSession);
      setIsWaitingForName(false);

      // Send welcome message
      setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: uuidv4(),
          text: `Nice to meet you, ${newSession.name}! How can I help you today?`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, welcomeMessage]);
      }, 500);
    } else {
      // Send automated response (you can customize this later)
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: uuidv4(),
          text: "Thanks for your message! I'm currently a demo chat widget. More features coming soon!",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            <h3 className="text-white-1 font-medium text-lg">
              Chat Support
            </h3>
            <p className="text-light-gray-70 text-sm">
              {userSession ? `Hello, ${userSession.name}!` : "We're here to help"}
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
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
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-jet bg-eerie-black-1 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isWaitingForName
                    ? "Enter your name..."
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
