"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";
import type { ChatMessage } from "./chat-context";

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "85%",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          padding: "12px 16px",
          fontSize: 14,
          lineHeight: 1.6,
          fontFamily: "'DM Sans', sans-serif",
          ...(isUser
            ? {
                background: "linear-gradient(135deg, #C49A2A, #D4A843)",
                color: "#07090F",
              }
            : {
                background: "rgba(26,35,64,0.6)",
                color: "#E2E8F0",
              }),
        }}
      >
        {isUser ? (
          <p style={{ margin: 0 }}>{message.content}</p>
        ) : (
          <ReactMarkdown
            components={{
              a({ href, children }) {
                if (href === "INVEST_CTA") {
                  return (
                    <button
                      onClick={() => {
                        const el = document.getElementById("prospect-form");
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      style={{
                        marginTop: 8,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        borderRadius: 8,
                        background: "linear-gradient(135deg, #C49A2A, #D4A843)",
                        padding: "8px 16px",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#07090F",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {children}
                    </button>
                  );
                }
                if (href?.startsWith("/")) {
                  return (
                    <Link
                      href={href}
                      style={{
                        fontWeight: 500,
                        color: "#C9A84C",
                        textDecoration: "underline",
                        textUnderlineOffset: 2,
                      }}
                    >
                      {children}
                    </Link>
                  );
                }
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontWeight: 500,
                      color: "#C9A84C",
                      textDecoration: "underline",
                      textUnderlineOffset: 2,
                    }}
                  >
                    {children}
                  </a>
                );
              },
              p({ children }) {
                return <p style={{ marginBottom: 8 }}>{children}</p>;
              },
              ul({ children }) {
                return <ul style={{ marginBottom: 8, marginLeft: 16, listStyleType: "disc" }}>{children}</ul>;
              },
              ol({ children }) {
                return <ol style={{ marginBottom: 8, marginLeft: 16, listStyleType: "decimal" }}>{children}</ol>;
              },
              strong({ children }) {
                return <strong style={{ fontWeight: 600, color: "#F5F0E8" }}>{children}</strong>;
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
