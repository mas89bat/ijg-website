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
    <div style={{
      display: "flex", alignItems: "flex-end", gap: 8,
      borderTop: "1px solid rgba(255,255,255,0.06)",
      background: "#0D1117",
      padding: 12,
    }}>
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
        style={{
          flex: 1, resize: "none",
          borderRadius: 12,
          background: "rgba(26,35,64,0.5)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "10px 16px",
          fontSize: 14,
          color: "#F5F0E8",
          fontFamily: "'DM Sans', sans-serif",
          outline: "none",
        }}
        onFocus={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; }}
        onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
      />
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: 40, width: 40, flexShrink: 0,
          borderRadius: "50%",
          background: (!value.trim() || isLoading) ? "rgba(201,168,76,0.3)" : "linear-gradient(135deg, #C49A2A, #D4A843)",
          border: "none",
          color: "#07090F",
          cursor: (!value.trim() || isLoading) ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          opacity: (!value.trim() || isLoading) ? 0.4 : 1,
        }}
      >
        <Send size={18} />
      </button>
    </div>
  );
}
