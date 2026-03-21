"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";
import type { ChatMessage } from "./chat-context";

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-md"
            : "bg-[var(--chat-bubble)] text-[#e2e8f0] rounded-bl-md"
        }`}
      >
        {isUser ? (
          <p>{message.content}</p>
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
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_oklch(0.55_0.20_250/30%)]"
                    >
                      {children}
                    </button>
                  );
                }
                if (href?.startsWith("/")) {
                  return (
                    <Link
                      href={href}
                      className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
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
                    className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    {children}
                  </a>
                );
              },
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
              },
              ul({ children }) {
                return <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>;
              },
              strong({ children }) {
                return <strong className="font-semibold text-foreground">{children}</strong>;
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
