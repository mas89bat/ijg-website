"use client";

import { useCallback, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useChat } from "./chat-context";

export function ChatInput() {
  const { sendMessage, isLoading } = useChat();
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    sendMessage(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [value, isLoading, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex items-end gap-2 border-t border-white/[0.06] bg-[var(--chat-header)] p-3">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleInput();
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask about investing in Namibia…"
        rows={1}
        className="flex-1 resize-none rounded-xl bg-[var(--chat-bubble)] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_20px_oklch(0.55_0.20_250/30%)] disabled:opacity-40 disabled:hover:scale-100"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
