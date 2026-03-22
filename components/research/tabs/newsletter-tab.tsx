"use client";

import { Mail, MessageCircle, Bell, Gift, ArrowRight } from "lucide-react";
import { Article, Language, RESEARCH } from "@/lib/research-data";

export interface NewsletterTabProps {
  language: Language;
  onReadArticle?: (article: Article) => void;
}

export function NewsletterTab({ language, onReadArticle }: NewsletterTabProps) {
  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 8, color: "#E8E4DD" }}>Daily Briefing</h1>
      <p style={{ fontSize: 14, color: "#7A7680", marginBottom: 28 }}>AI-curated market intelligence delivered every morning at 7:00 AM.</p>

      {/* Latest issue */}
      <div style={{ background: "#0D0E16", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
        <div style={{ background: "linear-gradient(135deg,rgba(27,79,114,0.3),rgba(196,154,42,0.1))", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontSize: 11, color: "#C49A2A", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4 }}>Latest Issue</p>
          <p style={{ fontSize: 18, fontWeight: 600, color: "#E8E4DD", fontFamily: "'Georgia',serif", fontStyle: "italic" }}>NSX rallies on uranium strength; BoN MPC preview</p>
          <p style={{ fontSize: 12, color: "#7A7680", marginTop: 4 }}>Saturday, 21 March 2026 · 7:00 AM</p>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { label: "NSX Overall", value: "+1.2%", sub: "1,847 pts", color: "#2ECC71" },
              { label: "Uranium Spot", value: "$83.50/lb", sub: "19-yr high", color: "#C49A2A" },
              { label: "Namibia CPI", value: "4.1%", sub: "Feb 2026", color: "#5DADE2" },
              { label: "Repo Rate", value: "7.00%", sub: "Expected hold", color: "#7A7680" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "10px 12px" }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: s.color, marginBottom: 2 }}>{s.value}</p>
                <p style={{ fontSize: 11, color: "#7A7680" }}>{s.label}</p>
                <p style={{ fontSize: 10, color: "#7A7680" }}>{s.sub}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "rgba(232,228,221,0.7)", lineHeight: 1.6, marginBottom: 16 }}>
            The NSX Overall Index advanced 1.2% to 1,847 points, led by a 4.3% surge in Paladin Energy as uranium spot prices hit a 19-year high. We preview Wednesday&apos;s MPC meeting and explain why IJG expects rates on hold.
          </p>
          <button onClick={() => onReadArticle?.(RESEARCH[0])} style={{
            padding: "12px 20px", borderRadius: 8, border: "none",
            background: "linear-gradient(135deg,#C49A2A,#D4A843)",
            color: "#06070D", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
          }}>
            Deep Dive: Uranium{"\u2019"}s 19-year high <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} />
          </button>
        </div>
      </div>

      {/* Delivery preferences */}
      <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 16 }}>Delivery Preferences</p>
        {[
          { icon: <Mail size={20} color="#C9A84C" />, label: "Email", desc: "Full newsletter in your inbox", active: true },
          { icon: <MessageCircle size={20} color="#25D366" />, label: "WhatsApp", desc: "Condensed mobile format", active: true },
          { icon: <Bell size={20} color="#C9A84C" />, label: "Push notifications", desc: "Breaking market alerts", active: false },
        ].map((opt, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <span style={{ fontSize: 20 }}>{opt.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#E8E4DD" }}>{opt.label}</p>
              <p style={{ fontSize: 11, color: "#7A7680" }}>{opt.desc}</p>
            </div>
            <div style={{
              width: 40, height: 22, borderRadius: 11,
              background: opt.active ? "#C49A2A" : "rgba(255,255,255,0.1)",
              position: "relative", cursor: "pointer",
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: "50%", background: "#fff",
                position: "absolute", top: 3, left: opt.active ? 21 : 3, transition: "left 0.2s",
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Content depth tiers */}
      <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 4 }}>Content Depth</p>
        <p style={{ fontSize: 13, color: "#7A7680", marginBottom: 16 }}>Choose the level of detail for your daily briefing.</p>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { tier: "Headlines", desc: "Key stories only", active: false },
            { tier: "Summary", desc: "Summary + key stats", active: false },
            { tier: "Full Analysis", desc: "Complete with citations", active: true },
          ].map((tier, i) => (
            <div key={i} style={{
              flex: 1, padding: "10px 12px", borderRadius: 8, textAlign: "center",
              background: tier.active ? "rgba(196,154,42,0.1)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${tier.active ? "rgba(196,154,42,0.3)" : "rgba(255,255,255,0.04)"}`,
              cursor: "pointer",
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: tier.active ? "#C49A2A" : "#7A7680", marginBottom: 2 }}>{tier.tier}</p>
              <p style={{ fontSize: 10, color: "#7A7680" }}>{tier.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Referral */}
      <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(196,154,42,0.12)" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 4 }}><Gift size={16} color="#C9A84C" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> Referral Programme</p>
        <p style={{ fontSize: 13, color: "#7A7680", marginBottom: 16 }}>Refer 3 friends to get 1 month of Professional free. Your referral link:</p>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 13, color: "#7A7680", fontFamily: "monospace" }}>
            ijg.research/ref/andri-2026
          </div>
          <button style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid rgba(196,154,42,0.2)", background: "rgba(196,154,42,0.08)", color: "#C49A2A", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
            Copy
          </button>
        </div>
        <div style={{ marginTop: 12, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "33%", background: "linear-gradient(90deg,#C49A2A,#D4A843)", borderRadius: 3 }} />
        </div>
        <p style={{ fontSize: 11, color: "#7A7680", marginTop: 6 }}>1 of 3 referrals completed</p>
      </div>
    </>
  );
}
