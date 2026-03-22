"use client";

import { Language, LANG_LABELS } from "@/lib/research-data";

interface Props {
  language: Language;
  setLanguage: (l: Language) => void;
  compact?: boolean;
}

export default function LanguageToggle({ language, setLanguage, compact }: Props) {
  const langs: Language[] = ["en", "af", "osh"];

  return (
    <div style={{
      display: "flex", gap: 2,
      background: "rgba(255,255,255,0.04)",
      borderRadius: 8, padding: 3,
      border: "1px solid rgba(255,255,255,0.06)",
    }}>
      {langs.map(l => (
        <button
          key={l}
          onClick={() => setLanguage(l)}
          title={LANG_LABELS[l]}
          style={{
            padding: compact ? "4px 8px" : "5px 10px",
            borderRadius: 6, border: "none",
            background: language === l ? "rgba(196,154,42,0.15)" : "transparent",
            color: language === l ? "#C49A2A" : "rgba(232,228,221,0.4)",
            fontSize: compact ? 10 : 11,
            fontWeight: language === l ? 700 : 500,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
            letterSpacing: "0.3px",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
