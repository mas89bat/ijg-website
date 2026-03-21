"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatContextValue {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (content: string) => void;
  resetChat: () => void;
}

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm the IJG Assistant. Ask me anything about our services, research, or how to start investing in Namibia. 🇳🇦",
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((o) => !o), []);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([WELCOME]);
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
      };

      const assistantId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setIsLoading(true);

      const abortController = new AbortController();
      abortRef.current = abortController;

      try {
        const apiMessages = [...messages, userMsg]
          .filter((m) => m.id !== "welcome")
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
          signal: abortController.signal,
        });

        if (!res.ok) throw new Error("Chat request failed");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + delta }
                      : m
                  )
                );
              }
            } catch {
              // partial JSON, skip
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content:
                      "Sorry, I'm having trouble connecting. Please try again.",
                  }
                : m
            )
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        messages,
        isLoading,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
