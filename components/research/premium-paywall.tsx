"use client";

import { Lock, X, Sparkles } from "lucide-react";

export interface PremiumPaywallProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  contentType: string;
  sector: string;
  preview: string;
  author: string;
  date: string;
}

export function PremiumPaywall({
  isOpen,
  onClose,
  title,
  contentType,
  sector,
  preview,
  author,
  date,
}: PremiumPaywallProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#0D1117",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          maxWidth: 560,
          width: "90%",
          overflow: "hidden",
          position: "relative",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "rgba(255,255,255,0.06)",
            border: "none",
            borderRadius: 8,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#7A7680",
            zIndex: 2,
            transition: "color 0.15s",
          }}
        >
          <X size={16} />
        </button>

        {/* Content preview area */}
        <div style={{ position: "relative", padding: "28px 28px 0" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
              background: "rgba(201,168,76,0.15)", color: "#C9A84C",
              textTransform: "uppercase", letterSpacing: "0.04em",
            }}>
              {contentType}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
              background: "rgba(93,173,226,0.1)", color: "#5DADE2",
            }}>
              {sector}
            </span>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 600, color: "#E8E4DD", margin: "0 0 10px", lineHeight: 1.3, paddingRight: 28 }}>
            {title}
          </h2>

          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "#7A7680", marginBottom: 14 }}>
            <span>{author}</span>
            <span>&middot;</span>
            <span>{date}</span>
          </div>

          {/* Preview text with fade */}
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(232,228,221,0.6)", margin: 0 }}>
              {preview}
            </p>
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              background: "linear-gradient(transparent, #0D1117)",
            }} />
          </div>
        </div>

        {/* Lock section */}
        <div style={{ padding: "24px 28px", textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(201,168,76,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
          }}>
            <Lock size={22} color="#C9A84C" />
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 600, color: "#E8E4DD", margin: "0 0 8px" }}>Premium Content</h3>

          <p style={{ fontSize: 14, color: "#7A7680", margin: "0 0 14px", lineHeight: 1.6 }}>
            This {contentType.toLowerCase()} requires a Professional or Institutional plan.
          </p>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 14px", borderRadius: 99,
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)",
            fontSize: 12, color: "#C9A84C", fontWeight: 600,
            marginBottom: 14,
          }}>
            <Sparkles size={12} /> Your plan: Professional (Trial)
          </div>

          <p style={{ fontSize: 13, color: "#7A7680", margin: "0 0 20px", lineHeight: 1.5 }}>
            Upgrade to unlock full access to all premium research, data, and analysis.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #C49A2A, #D4A843)",
                color: "#06070D",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "opacity 0.15s",
              }}
            >
              Upgrade Plan
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "transparent",
                color: "#E8E4DD",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
              }}
            >
              Continue Browsing
            </button>
          </div>

          {/* Trial note */}
          <p style={{ fontSize: 12, color: "#7A7680", marginTop: 14 }}>
            Or start a <span style={{ color: "#C9A84C", fontWeight: 600 }}>14-day free trial</span>
          </p>
        </div>
      </div>
    </div>
  );
}
