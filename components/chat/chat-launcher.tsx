"use client";

import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "./chat-context";

export function ChatLauncher() {
  const { isOpen, openChat } = useChat();

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={openChat}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 60,
            display: "flex",
            height: 56,
            width: 56,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C49A2A, #D4A843)",
            color: "#07090F",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 30px rgba(201,168,76,0.25)",
          }}
          aria-label="Open chat assistant"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
