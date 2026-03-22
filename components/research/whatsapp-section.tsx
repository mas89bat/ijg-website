"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, Mic, MessageCircle, BarChart3, Bell, Globe, CheckCheck } from "lucide-react";
import { Language, TRANSLATIONS, WA_CONVERSATION, WA_BG_IMG } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface Props {
  language: Language;
  onStartTrial: () => void;
}

export default function WhatsAppSection({ language, onStartTrial }: Props) {
  const t = TRANSLATIONS[language];
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleMessages >= WA_CONVERSATION.length) return;
    const msg = WA_CONVERSATION[visibleMessages];
    const delay = msg.from === "bot" ? 1200 : 600;
    const timer = setTimeout(() => {
      if (msg.from === "bot") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(v => v + 1);
        }, 1500);
      } else {
        setVisibleMessages(v => v + 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [visibleMessages]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line.split(/(\*[^*]+\*)/g).map((part, j) =>
          part.startsWith("*") && part.endsWith("*")
            ? <strong key={j} style={{ fontWeight: 700 }}>{part.slice(1, -1)}</strong>
            : part
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  const isMobile = useIsMobile();

  return (
    <div style={{ position: "relative", overflow: "hidden", padding: isMobile ? "48px 0" : "80px 0" }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${WA_BG_IMG})`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.3,
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #06070D 0%, rgba(6,7,13,0.7) 50%, #06070D 100%)" }} />

      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#25D366", marginBottom: 16, textAlign: "center" }}>{t.section_whatsapp}</p>
        <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", textAlign: "center", marginBottom: 8, color: "#E8E4DD" }}>{t.section_whatsapp_title}</h2>
        <p style={{ fontSize: 14, color: "#7A7680", textAlign: "center", marginBottom: isMobile ? 24 : 48 }}>
          No app download. No login. Just ask your question on WhatsApp and get cited AI analysis instantly.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 48, alignItems: "center" }}>
          {/* Phone mockup */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 300, borderRadius: 40,
              background: "#111219",
              border: "8px solid #1A1B24",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
              overflow: "hidden",
            }}>
              {/* Phone status bar */}
              <div style={{ background: "#075E54", padding: "10px 16px 8px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1B4F72,#2E86C1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>IJG</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: 0 }}>IJG Research</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0 }}>Business Account · Online</p>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
                  <span style={{ display: "flex", alignItems: "center" }}><Phone size={16} color="rgba(255,255,255,0.7)" /></span>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>⋮</span>
                </div>
              </div>

              {/* Chat area */}
              <div
                ref={chatRef}
                style={{
                  height: 420, overflowY: "auto", padding: "12px",
                  background: "#0B1418",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  display: "flex", flexDirection: "column", gap: 8,
                  scrollBehavior: "smooth",
                }}
              >
                {/* Date separator */}
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: "#7A7680", background: "rgba(0,0,0,0.3)", padding: "3px 10px", borderRadius: 99 }}>Today</span>
                </div>

                {WA_CONVERSATION.slice(0, visibleMessages).map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "85%", padding: "8px 12px",
                      borderRadius: msg.from === "user" ? "12px 12px 0 12px" : "0 12px 12px 12px",
                      background: msg.from === "user" ? "#005C4B" : "#1F2C34",
                      fontSize: 12, color: "#E8E4DD", lineHeight: 1.5,
                    }}>
                      {formatText(msg.text)}
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", display: "block", textAlign: "right", marginTop: 4 }}>
                        {msg.from === "user" && <CheckCheck size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 2 }} />} {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ padding: "10px 14px", borderRadius: "0 12px 12px 12px", background: "#1F2C34", display: "flex", gap: 4, alignItems: "center" }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} className={`pulse-dot pulse-dot-${i + 1}`} style={{ width: 6, height: 6, borderRadius: "50%", background: "#7A7680" }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div style={{ background: "#1F2C34", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, background: "#2A3942", borderRadius: 20, padding: "8px 14px", fontSize: 12, color: "#7A7680" }}>
                  Message IJG Research...
                </div>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#00A884", display: "flex", alignItems: "center", justifyContent: "center" }}><Mic size={14} color="#fff" /></div>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: <MessageCircle size={20} color="#25D366" />, title: "Interactive AI in WhatsApp", desc: "Ask follow-up questions, get cited answers, and receive branded infographics — all without leaving WhatsApp." },
              { icon: <BarChart3 size={20} color="#25D366" />, title: "Cohort-adapted content", desc: "Retail users get simplified summaries. Professionals get full analysis. Institutional clients get raw data + methodology." },
              { icon: <Bell size={20} color="#25D366" />, title: "Smart alerts", desc: "Set alerts for specific companies, sectors, or economic indicators. Get notified the moment IJG publishes new research." },
              { icon: <Globe size={20} color="#25D366" />, title: "English · Afrikaans · Oshiwambo", desc: "The first financial AI platform to deliver research in an indigenous Namibian language — a global first." },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(37,211,102,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#E8E4DD", marginBottom: 4 }}>{f.title}</p>
                  <p style={{ fontSize: 13, color: "#7A7680", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}

            <button onClick={onStartTrial} style={{
              padding: "14px 28px", borderRadius: 99, border: "none",
              background: "linear-gradient(135deg,#25D366,#128C7E)",
              color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              marginTop: 8,
            }}>
              Try WhatsApp Experience →
            </button>
            <p style={{ fontSize: 11, color: "#7A7680" }}>Bloomberg|Quint reached 350,000 WhatsApp subscribers in 8 months using this model in India.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
