"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import { Article, Language, TRANSLATIONS, IJG_LOGO, Citation } from "@/lib/research-data";
import TrialModal from "./trial-modal";

interface Props {
  article: Article;
  trialStarted?: boolean;
  language?: Language;
}

export default function ArticleView({ article, trialStarted = false, language = "en" }: Props) {
  const t = TRANSLATIONS[language];
  const [scrollPct, setScrollPct] = useState(0);
  const [showTrial, setShowTrial] = useState(false);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setScrollPct(Math.min(100, pct));
  };

  const showPaywall = article.premium && !trialStarted;

  const handleStartTrial = () => {
    setShowTrial(false);
    router.push("/research/app");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={{ background: "#06070D", minHeight: "100vh", color: "#E8E4DD", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      {/* Reading progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 3, background: "linear-gradient(90deg,#1B4F72,#C49A2A)", width: `${scrollPct}%`, zIndex: 200, transition: "width 0.1s" }} />

      {/* Secondary article nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 44,
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(6,7,13,0.6)", backdropFilter: "blur(12px)",
      }}>
        <button onClick={handleBack} style={{ background: "none", border: "none", color: "#7A7680", cursor: "pointer", fontSize: 13, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          ← Back to Research
        </button>
        {!trialStarted && (
          <button onClick={() => setShowTrial(true)} style={{ padding: "6px 16px", borderRadius: 99, border: "none", background: "linear-gradient(135deg,#C49A2A,#D4A843)", color: "#06070D", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Start Free Trial
          </button>
        )}
      </nav>

      <div onScroll={handleScroll} style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px", maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(46,134,193,0.12)", color: "#5DADE2", fontWeight: 600 }}>{article.sector}</span>
          <span style={{ fontSize: 11, color: "#7A7680" }}>{article.cat}</span>
          {article.premium && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(196,154,42,0.15)", color: "#C49A2A", fontWeight: 700 }}><Sparkles size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 2 }} /> PREMIUM</span>}
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 34, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", lineHeight: 1.25, marginBottom: 20, color: "#E8E4DD" }}>{article.title}</h1>

        {/* Meta */}
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#1B4F72,#2E86C1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff" }}>IJG</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD" }}>{article.author}</p>
            <p style={{ fontSize: 12, color: "#7A7680" }}>{article.date} · {article.readTime} read · {article.citations.length} sources cited</p>
          </div>
          <span style={{ marginLeft: "auto", fontSize: 11, padding: "4px 10px", borderRadius: 99, background: "rgba(46,204,113,0.1)", color: "#2ECC71", fontWeight: 700 }}>
            {article.confidence}% confidence
          </span>
        </div>

        {/* Intro */}
        <p style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(232,228,221,0.9)", marginBottom: 28, fontWeight: 400 }}>{article.intro}</p>

        {/* Body with paywall */}
        <div style={{ position: "relative" }} ref={contentRef}>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(232,228,221,0.75)", whiteSpace: "pre-line" }}>
            {article.body}
          </div>

          {/* Citations inline */}
          {!showPaywall && (
            <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#C49A2A", marginBottom: 16 }}>
                Sources & Citations
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {article.citations.map((cite, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveCitation(activeCitation?.id === cite.id ? null : cite)}
                    style={{
                      padding: "12px 16px", borderRadius: 10,
                      background: activeCitation?.id === cite.id ? "rgba(196,154,42,0.08)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${activeCitation?.id === cite.id ? "rgba(196,154,42,0.2)" : "rgba(255,255,255,0.04)"}`,
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 99, background: "rgba(196,154,42,0.15)", color: "#C49A2A", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>[{i + 1}]</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#E8E4DD", marginBottom: 2 }}>{cite.label}</p>
                        <p style={{ fontSize: 11, color: "#7A7680" }}>{cite.source} · {cite.date}</p>
                        {activeCitation?.id === cite.id && (
                          <div style={{ marginTop: 10, padding: "10px 12px", background: "rgba(0,0,0,0.3)", borderRadius: 8, borderLeft: "3px solid #C49A2A" }}>
                            <p style={{ fontSize: 12, color: "rgba(232,228,221,0.8)", lineHeight: 1.6, fontStyle: "italic" }}>"{cite.excerpt}"</p>
                          </div>
                        )}
                      </div>
                      <ChevronRight size={14} color="#7A7680" style={{ transition: "transform 0.2s", transform: activeCitation?.id === cite.id ? "rotate(90deg)" : "none" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paywall overlay */}
          {showPaywall && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "80%",
              background: "linear-gradient(180deg, transparent 0%, #06070D 55%)",
              display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", paddingBottom: 40,
            }}>
              <div style={{
                background: "#0D0E16", borderRadius: 20, padding: 32,
                border: "1px solid rgba(196,154,42,0.2)", textAlign: "center", maxWidth: 420,
                boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
              }}>
                <div style={{ height: 3, background: "linear-gradient(90deg,#C49A2A,#D4A843)", position: "absolute", top: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0" }} />
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,rgba(196,154,42,0.2),rgba(196,154,42,0.05))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Sparkles size={22} color="#C49A2A" /></div>
                <p style={{ fontSize: 18, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 8, color: "#E8E4DD" }}>This is premium research</p>
                <p style={{ fontSize: 13, color: "#7A7680", lineHeight: 1.6, marginBottom: 20 }}>
                  Start your 14-day free trial to access this article, AI queries, document generation, and 30 years of IJG research.
                </p>
                <button onClick={() => setShowTrial(true)} style={{
                  padding: "12px 32px", borderRadius: 99, border: "none",
                  background: "linear-gradient(135deg,#C49A2A,#D4A843)",
                  color: "#06070D", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 8,
                }}>
                  Start Free Trial <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} />
                </button>
                <p style={{ fontSize: 11, color: "#7A7680" }}>No credit card required</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showTrial && <TrialModal onClose={() => setShowTrial(false)} onStart={handleStartTrial} />}
    </div>
  );
}
