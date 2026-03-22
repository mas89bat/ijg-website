"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "./chat-context";
import { ChatMessageBubble } from "./chat-message-bubble";
import { ChatInput } from "./chat-input";

const SUGGESTED_PROMPTS = [
  "What services does IJG offer?",
  "How do I start investing?",
  "Tell me about the NSX",
  "What is IJG's investment philosophy?",
  "How is IJG regulated?",
];

function TypingIndicator() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        borderRadius: "16px 16px 16px 4px",
        background: "rgba(26,35,64,0.6)",
        padding: "12px 16px",
      }}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            style={{
              height: 8, width: 8, borderRadius: "50%",
              background: "rgba(201,168,76,0.6)",
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatPanel() {
  const { isOpen, messages, isLoading, closeChat, resetChat, sendMessage } =
    useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const showSuggestions = messages.length <= 1;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              background: "rgba(0,0,0,0.5)",
            }}
            className="md:hidden"
            onClick={closeChat}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              zIndex: 50, display: "flex", flexDirection: "column",
              width: "100%", maxWidth: 420,
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              background: "#07090F",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "#0D1117",
              padding: "12px 16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Image
                  src="/ijg-logo.png"
                  alt="IJG Securities"
                  width={65}
                  height={30}
                  style={{ objectFit: "contain" }}
                />
                <span style={{
                  borderRadius: 99,
                  background: "rgba(201,168,76,0.15)",
                  padding: "2px 10px",
                  fontSize: 10, fontWeight: 700,
                  color: "#C9A84C",
                  letterSpacing: "0.5px",
                }}>
                  Assistant
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button
                  onClick={resetChat}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    height: 32, width: 32, borderRadius: "50%",
                    background: "none", border: "none",
                    color: "rgba(237,232,223,0.5)", cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#F5F0E8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "rgba(237,232,223,0.5)"; }}
                  aria-label="Reset chat"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={closeChat}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    height: 32, width: 32, borderRadius: "50%",
                    background: "none", border: "none",
                    color: "rgba(237,232,223,0.5)", cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#F5F0E8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "rgba(237,232,223,0.5)"; }}
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Subtitle */}
            <div style={{
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: "#0D1117",
              padding: "8px 16px",
            }}>
              <p style={{ fontSize: 12, color: "rgba(237,232,223,0.45)", margin: 0 }}>
                Your Namibian financial guide
              </p>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              style={{
                flex: 1, overflowY: "auto",
                padding: 16, display: "flex",
                flexDirection: "column", gap: 12,
              }}
            >
              {messages.map((msg) => (
                <ChatMessageBubble key={msg.id} message={msg} />
              ))}

              {isLoading &&
                messages[messages.length - 1]?.role === "user" && (
                  <TypingIndicator />
                )}

              {/* Suggested prompts */}
              {showSuggestions && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 8 }}>
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      style={{
                        borderRadius: 99,
                        border: "1px solid rgba(201,168,76,0.2)",
                        background: "rgba(201,168,76,0.05)",
                        padding: "6px 12px",
                        fontSize: 12,
                        color: "rgba(237,232,223,0.6)",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                        e.currentTarget.style.background = "rgba(201,168,76,0.1)";
                        e.currentTarget.style.color = "#F5F0E8";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                        e.currentTarget.style.background = "rgba(201,168,76,0.05)";
                        e.currentTarget.style.color = "rgba(237,232,223,0.6)";
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <ChatInput />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
