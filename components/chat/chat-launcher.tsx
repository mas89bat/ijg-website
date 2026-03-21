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
          className="fixed bottom-6 right-6 z-60 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_oklch(0.55_0.20_250/25%)] transition-shadow hover:shadow-[0_0_40px_oklch(0.55_0.20_250/40%)]"
          aria-label="Open chat assistant"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
