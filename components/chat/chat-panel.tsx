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
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-[var(--chat-bubble)] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-primary/60"
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
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={closeChat}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-white/[0.06] bg-[var(--chat-bg)] shadow-2xl md:w-[420px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-[var(--chat-header)] px-4 py-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/ijg-logo.png"
                  alt="IJG Securities"
                  width={65}
                  height={30}
                  className="object-contain"
                />
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Assistant
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                  aria-label="Reset chat"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={closeChat}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Subtitle */}
            <div className="border-b border-white/[0.04] bg-[var(--chat-header)] px-4 py-2">
              <p className="text-xs text-muted-foreground">
                Your Namibian financial guide
              </p>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
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
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
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
