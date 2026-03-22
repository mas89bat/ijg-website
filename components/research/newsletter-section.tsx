"use client";

import { useState } from "react";
import { Gift, Mail, MessageCircle, Sparkles, CheckCircle } from "lucide-react";
import { Language, TRANSLATIONS, NEWSLETTER_CONTENT } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface Props {
  language: Language;
  onStartTrial: () => void;
}

export default function NewsletterSection({ language, onStartTrial }: Props) {
  const t = TRANSLATIONS[language];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const n = NEWSLETTER_CONTENT;

  const referralPct = Math.round((n.referralCount / n.referralGoal) * 100);
  const isMobile = useIsMobile();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "0 16px 48px" : "0 40px 80px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#C49A2A", marginBottom: 16, textAlign: "center" }}>{t.section_newsletter}</p>
      <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", textAlign: "center", marginBottom: 8 }}>{t.section_newsletter_title}</h2>
      <p style={{ fontSize: 14, color: "#7A7680", textAlign: "center", marginBottom: isMobile ? 24 : 48 }}>
        AI-curated daily market briefing delivered every morning. Free forever. Upgrade for full platform access.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : 32, alignItems: "start" }}>
        {/* Left: Newsletter preview */}
        <div>
          <div style={{
            background: "#0D0E16", borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
          }}>
            {/* Email client chrome */}
            <div style={{ background: "#111219", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
              </div>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#7A7680", textAlign: "center" }}>
                {n.subject}
              </div>
            </div>

            {/* Newsletter body */}
            <div style={{ padding: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: 11, color: "#7A7680", marginBottom: 4 }}>{n.date}</p>
                <p style={{ fontSize: 18, fontWeight: 600, color: "#E8E4DD", fontFamily: "'Georgia',serif", fontStyle: "italic" }}>{n.headline}</p>
              </div>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 20 }}>
                {n.stats.map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 12px" }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: i < 2 ? "#2ECC71" : "#E8E4DD", marginBottom: 2 }}>{s.value}</p>
                    <p style={{ fontSize: 11, color: "#7A7680" }}>{s.label}</p>
                    <p style={{ fontSize: 10, color: "#7A7680" }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 13, color: "rgba(232,228,221,0.7)", lineHeight: 1.6, marginBottom: 20 }}>{n.teaser}</p>

              {/* Deep Dive CTA */}
              <button onClick={onStartTrial} style={{
                width: "100%", padding: "12px", borderRadius: 8,
                background: "linear-gradient(135deg,#C49A2A,#D4A843)",
                border: "none", color: "#06070D", fontWeight: 700, fontSize: 13,
                cursor: "pointer", fontFamily: "inherit",
              }}>
                Deep Dive: {n.deepDive} →
              </button>
            </div>
          </div>

          {/* Referral progress */}
          <div style={{ marginTop: 16, background: "#0D0E16", borderRadius: 12, padding: 16, border: "1px solid rgba(196,154,42,0.12)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#C49A2A", display: "flex", alignItems: "center", gap: 6 }}><Gift size={14} color="#C49A2A" /> Referral Programme</p>
              <p style={{ fontSize: 11, color: "#7A7680" }}>{n.referralCount}/{n.referralGoal} subscribers</p>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${referralPct}%`, background: "linear-gradient(90deg,#C49A2A,#D4A843)", borderRadius: 3, transition: "width 1s ease" }} />
            </div>
            <p style={{ fontSize: 11, color: "#7A7680", marginTop: 6 }}>Refer 3 friends → unlock Premium newsletter content free</p>
          </div>
        </div>

        {/* Right: Subscribe form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: "#0D0E16", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 17, fontWeight: 600, marginBottom: 4, color: "#E8E4DD" }}>Get the daily brief — free</p>
            <p style={{ fontSize: 13, color: "#7A7680", lineHeight: 1.6, marginBottom: 20 }}>Join 2,300+ Namibian market professionals. Delivered every morning at 7:00 AM.</p>

            {!subscribed ? (
              <>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)", color: "#E8E4DD", fontSize: 14, fontFamily: "inherit", outline: "none", marginBottom: 10, boxSizing: "border-box" }}
                />
                <button onClick={() => email.trim() && setSubscribed(true)} style={{
                  width: "100%", padding: "12px", borderRadius: 8, border: "none",
                  background: "linear-gradient(135deg,#1B4F72,#2E86C1)",
                  color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", marginBottom: 8,
                }}>
                  Subscribe to Daily Brief →
                </button>
                <p style={{ fontSize: 11, color: "#7A7680", textAlign: "center" }}>Free forever · No spam · Unsubscribe anytime</p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{ marginBottom: 8 }}><CheckCircle size={32} color="#2ECC71" /></div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#2ECC71", marginBottom: 4 }}>You're subscribed!</p>
                <p style={{ fontSize: 13, color: "#7A7680" }}>First brief arrives tomorrow at 7:00 AM.</p>
                <button onClick={onStartTrial} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#C49A2A,#D4A843)", color: "#06070D", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                  Unlock Full Platform →
                </button>
              </div>
            )}
          </div>

          {/* Delivery options */}
          <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#E8E4DD", marginBottom: 16 }}>Choose your delivery</p>
            {[
              { icon: <Mail size={18} color="#C49A2A" />, label: "Email only", desc: "Full newsletter in your inbox" },
              { icon: <MessageCircle size={18} color="#C49A2A" />, label: "WhatsApp only", desc: "Condensed mobile-optimised format" },
              { icon: <Sparkles size={18} color="#C49A2A" />, label: "Both channels", desc: "Email + WhatsApp (recommended)", highlight: true },
            ].map((opt, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, alignItems: "center",
                padding: "10px 12px", borderRadius: 8, marginBottom: 6,
                background: opt.highlight ? "rgba(196,154,42,0.06)" : "transparent",
                border: `1px solid ${opt.highlight ? "rgba(196,154,42,0.15)" : "transparent"}`,
                cursor: "pointer",
              }}>
                <span style={{ display: "flex", alignItems: "center" }}>{opt.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: opt.highlight ? "#C49A2A" : "#E8E4DD" }}>{opt.label}</p>
                  <p style={{ fontSize: 11, color: "#7A7680" }}>{opt.desc}</p>
                </div>
                {opt.highlight && <span style={{ marginLeft: "auto", fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(196,154,42,0.15)", color: "#C49A2A", fontWeight: 700 }}>DEFAULT</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
