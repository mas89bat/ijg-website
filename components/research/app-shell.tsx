"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Article, Language, TRANSLATIONS, RESEARCH, IJG_LOGO, AI_ANSWERS, INFOGRAPHIC_IMG } from "@/lib/research-data";
import LanguageToggle from "./language-toggle";
import { MessageCircle, Bell, FileText, BarChart3, MonitorPlay, Mail, Gift, X, Download, Sparkles, ArrowRight, Check, Home, Hexagon, LayoutGrid } from "lucide-react";

type AppTab = "home" | "query" | "library" | "newsletter" | "whatsapp";

// Document generation modal
function DocGenModal({ onClose, query }: { onClose: () => void; query: string }) {
  const [generating, setGenerating] = useState(true);
  const [done, setDone] = useState(false);
  const [activeDoc, setActiveDoc] = useState<"pdf" | "infographic" | "pptx" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setGenerating(false); setDone(true); }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="modal-backdrop" style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0D0E16", borderRadius: 20, padding: 32, width: 520, border: "1px solid rgba(255,255,255,0.06)", position: "relative", animation: "fade-in-up 0.3s ease-out" }}>
        <div style={{ height: 3, background: "linear-gradient(90deg,#C49A2A,#D4A843)", position: "absolute", top: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#C49A2A", letterSpacing: "1px", textTransform: "uppercase" }}>Document Generation</p>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#7A7680", cursor: "pointer", fontSize: 18 }}><X size={18} /></button>
        </div>

        {generating ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
              {[0, 1, 2].map(i => <div key={i} className={`pulse-dot pulse-dot-${i + 1}`} style={{ width: 10, height: 10, borderRadius: "50%", background: "#C49A2A" }} />)}
            </div>
            <p style={{ fontSize: 14, color: "#7A7680" }}>Generating branded documents from your query...</p>
            <p style={{ fontSize: 12, color: "#7A7680", marginTop: 6, opacity: 0.6 }}>Applying IJG templates · Embedding citations · Formatting data</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 14, color: "rgba(232,228,221,0.7)", marginBottom: 20, lineHeight: 1.5 }}>
              Your documents are ready. Select a format to preview:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
              {([
                { key: "pdf" as const, icon: <FileText size={24} color="#C9A84C" />, label: "PDF Report", sub: "Branded A4 report" },
                { key: "infographic" as const, icon: <BarChart3 size={24} color="#C9A84C" />, label: "Infographic", sub: "Shareable visual" },
                { key: "pptx" as const, icon: <MonitorPlay size={24} color="#C9A84C" />, label: "Presentation", sub: "5-slide deck" },
              ]).map(doc => (
                <button key={doc.key} onClick={() => setActiveDoc(activeDoc === doc.key ? null : doc.key)} style={{
                  padding: "14px 10px", borderRadius: 10,
                  background: activeDoc === doc.key ? "rgba(196,154,42,0.1)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${activeDoc === doc.key ? "rgba(196,154,42,0.3)" : "rgba(255,255,255,0.06)"}`,
                  cursor: "pointer", fontFamily: "inherit", textAlign: "center", transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{doc.icon}</div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#E8E4DD", marginBottom: 2 }}>{doc.label}</p>
                  <p style={{ fontSize: 10, color: "#7A7680" }}>{doc.sub}</p>
                </button>
              ))}
            </div>

            {activeDoc === "infographic" && (
              <div style={{ marginBottom: 20, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                <img src={INFOGRAPHIC_IMG} alt="Sample Infographic" style={{ width: "100%", display: "block" }} />
                <div style={{ padding: "10px 14px", background: "rgba(0,0,0,0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: 11, color: "#7A7680" }}>IJG Research · Namibia CPI Analysis</p>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(46,204,113,0.1)", color: "#2ECC71", fontWeight: 700 }}>READY</span>
                </div>
              </div>
            )}

            {(activeDoc === "pdf" || activeDoc === "pptx") && (
              <div style={{ marginBottom: 20, padding: 20, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>{activeDoc === "pdf" ? <FileText size={40} color="#C9A84C" /> : <MonitorPlay size={40} color="#C9A84C" />}</div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#E8E4DD", marginBottom: 4 }}>
                  {activeDoc === "pdf" ? "IJG_CPI_Analysis_Mar2026.pdf" : "IJG_CPI_Presentation_Mar2026.pptx"}
                </p>
                <p style={{ fontSize: 11, color: "#7A7680" }}>
                  {activeDoc === "pdf" ? "8-page branded PDF · IJG letterhead · All citations included" : "5 slides · IJG template · Charts auto-generated"}
                </p>
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button style={{
                flex: 1, padding: "12px", borderRadius: 10, border: "none",
                background: "linear-gradient(135deg,#C49A2A,#D4A843)",
                color: "#06070D", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              }}>
                <Download size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> Download {activeDoc ? activeDoc.toUpperCase() : "All"}
              </button>
              <button style={{
                padding: "12px 16px", borderRadius: 10,
                border: "1px solid rgba(37,211,102,0.2)",
                background: "rgba(37,211,102,0.05)",
                color: "#25D366", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              }}>
                <MessageCircle size={16} color="#25D366" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> WhatsApp
              </button>
              <button style={{
                padding: "12px 16px", borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                color: "#E8E4DD", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              }}>
                <Mail size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> Email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Onboarding overlay
function OnboardingStep({ step, onNext, onSkip }: { step: number; onNext: () => void; onSkip: () => void }) {
  const steps = [
    { title: "Welcome to IJG Research", desc: "You now have 14 days of Professional access. Let's show you around.", cta: "Start Tour →" },
    { title: "Ask the AI anything", desc: "Type any question about Namibian markets. The AI searches 30 years of IJG research and returns cited answers in seconds.", cta: "Got it →" },
    { title: "Generate documents instantly", desc: "After any AI answer, click 'PDF Report', 'Infographic', or 'Presentation' to create branded documents with one click.", cta: "Got it →" },
    { title: "You're all set!", desc: "Explore the Research Library, set up WhatsApp alerts, and try the AI query. Enjoy your trial.", cta: "Start Exploring →" },
  ];
  const s = steps[step - 1];
  if (!s) return null;

  return (
    <div className="modal-backdrop" style={{ position: "fixed", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 250, paddingBottom: 40 }}>
      <div style={{ background: "#0D0E16", borderRadius: 20, padding: 28, width: 480, border: "1px solid rgba(196,154,42,0.2)", animation: "fade-in-up 0.3s ease-out" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i < step ? "#C49A2A" : "rgba(255,255,255,0.08)" }} />
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#C49A2A", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Step {step} of {steps.length}</p>
        <h3 style={{ fontSize: 20, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", color: "#E8E4DD", marginBottom: 8 }}>{s.title}</h3>
        <p style={{ fontSize: 14, color: "#7A7680", lineHeight: 1.6, marginBottom: 20 }}>{s.desc}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onNext} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#C49A2A,#D4A843)", color: "#06070D", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>{s.cta}</button>
          <button onClick={onSkip} style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#7A7680", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Skip</button>
        </div>
      </div>
    </div>
  );
}

export function AppShell() {
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [query, setQuery] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [queryDone, setQueryDone] = useState(false);
  const [showDocGen, setShowDocGen] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [alertSet, setAlertSet] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [onboardingStep, setOnboardingStep] = useState(1);
  const t = TRANSLATIONS[language];
  const router = useRouter();

  const handleGoLanding = () => {
    router.push("/research");
  };

  const handleReadArticle = (article: Article) => {
    router.push(`/research/${article.id}`);
  };

  const handleQuery = () => {
    if (!query.trim()) return;
    setLastQuery(query);
    setIsQuerying(true);
    setTypedAnswer("");
    setQueryDone(false);

    setTimeout(() => {
      setIsQuerying(false);
      const lower = query.toLowerCase();
      let result = AI_ANSWERS.default;
      if (lower.includes("inflation") || lower.includes("cpi")) result = AI_ANSWERS.inflation;
      else if (lower.includes("uranium") || lower.includes("mining") || lower.includes("paladin")) result = AI_ANSWERS.uranium;
      else if (lower.includes("bank") || lower.includes("windhoek") || lower.includes("capricorn")) result = AI_ANSWERS.bank;

      const answer = result.answer + ` [Sources: ${result.citations.map(c => `[${c}]`).join(", ")}]`;
      let i = 0;
      const iv = setInterval(() => {
        setTypedAnswer(answer.slice(0, ++i));
        if (i >= answer.length) { clearInterval(iv); setQueryDone(true); }
      }, 12);
    }, 2200);
  };

  const tabs: { id: AppTab; label: string; icon: ReactNode }[] = [
    { id: "home", label: "Home", icon: <Home size={14} /> },
    { id: "query", label: t.nav_research, icon: <Hexagon size={14} /> },
    { id: "library", label: "Library", icon: <LayoutGrid size={14} /> },
    { id: "newsletter", label: "Newsletter", icon: <Mail size={14} /> },
    { id: "whatsapp", label: "WhatsApp", icon: <MessageCircle size={14} color="#25D366" /> },
  ];

  return (
    <div style={{ background: "#06070D", minHeight: "100vh", color: "#E8E4DD", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      {/* Secondary tab nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 24px", height: 44, gap: 4,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(6,7,13,0.6)", backdropFilter: "blur(12px)",
      }}>
        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(46,204,113,0.12)", color: "#2ECC71", fontWeight: 700, marginRight: 12 }}>TRIAL · 14 DAYS</span>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 500, fontFamily: "inherit",
            background: activeTab === tab.id ? "rgba(196,154,42,0.12)" : "transparent",
            color: activeTab === tab.id ? "#C49A2A" : "rgba(232,228,221,0.45)",
            transition: "all 0.15s",
          }}>
            <span style={{ marginRight: 5 }}>{tab.icon}</span>{tab.label}
          </button>
        ))}
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {/* -- HOME TAB -- */}
        {activeTab === "home" && (
          <>
            <p style={{ fontSize: 12, color: "#7A7680", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6 }}>Welcome to your trial, Andri</p>
            <h1 style={{ fontSize: 30, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 28, color: "#E8E4DD" }}>Your Namibian market intelligence</h1>

            {/* Quick query */}
            <div style={{ background: "linear-gradient(135deg,rgba(27,79,114,0.15),rgba(196,154,42,0.08))", borderRadius: 16, padding: 24, marginBottom: 32, border: "1px solid rgba(196,154,42,0.12)" }}>
              <p style={{ fontSize: 12, color: "#C49A2A", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Sparkles size={12} color="#C49A2A" /> Ask IJG Intelligence</p>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { setActiveTab("query"); handleQuery(); } }}
                  placeholder={t.query_placeholder}
                  style={{ flex: 1, padding: "13px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)", color: "#E8E4DD", fontSize: 14, fontFamily: "inherit", outline: "none" }}
                />
                <button onClick={() => { setActiveTab("query"); handleQuery(); }} style={{
                  padding: "0 24px", borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg,#C49A2A,#D4A843)",
                  color: "#06070D", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
                }}>{t.query_btn}</button>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {["Namibia inflation trend", "Uranium market outlook", "Bank Windhoek results", "BoN MPC preview"].map(q => (
                  <button key={q} onClick={() => { setQuery(q); setActiveTab("query"); setTimeout(handleQuery, 50); }} style={{
                    padding: "5px 12px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent", color: "#7A7680", fontSize: 11, cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#C49A2A"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(196,154,42,0.3)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#7A7680"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                  >{q}</button>
                ))}
              </div>
            </div>

            <p style={{ fontSize: 12, color: "#7A7680", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14 }}>Today's Research</p>
            {RESEARCH.slice(0, 4).map(r => (
              <div key={r.id} onClick={() => handleReadArticle(r)} style={{
                display: "flex", gap: 16, padding: "14px 18px",
                background: "#0D0E16", borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.04)", marginBottom: 8, cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,154,42,0.15)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.04)"; }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, color: "#E8E4DD" }}>{r.title}</p>
                  <p style={{ fontSize: 12, color: "#7A7680" }}>{r.author} · {r.date}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 99, background: "rgba(255,255,255,0.04)", color: "#7A7680" }}>{r.sector}</span>
                  {r.premium && <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 99, background: "rgba(196,154,42,0.12)", color: "#C49A2A", fontWeight: 700, display: "flex", alignItems: "center" }}><Sparkles size={10} /></span>}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 28, padding: 20, background: "#0D0E16", borderRadius: 16, border: "1px solid rgba(196,154,42,0.12)", textAlign: "center" }}>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "#E8E4DD" }}>Enjoying your trial?</p>
              <p style={{ fontSize: 13, color: "#7A7680", marginBottom: 14 }}>Subscribe to keep unlimited access after your 14-day trial ends.</p>
              <button onClick={handleGoLanding} style={{ padding: "10px 24px", borderRadius: 99, border: "none", background: "linear-gradient(135deg,#C49A2A,#D4A843)", color: "#06070D", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                View Plans & Subscribe <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} />
              </button>
            </div>
          </>
        )}

        {/* -- QUERY TAB -- */}
        {activeTab === "query" && (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 20, color: "#E8E4DD" }}>AI Research Assistant</h1>

            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleQuery()}
                placeholder={t.query_placeholder}
                style={{ flex: 1, padding: "15px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "#0D0E16", color: "#E8E4DD", fontSize: 15, fontFamily: "inherit", outline: "none" }}
              />
              <button onClick={handleQuery} style={{
                padding: "0 28px", borderRadius: 12, border: "none",
                background: isQuerying ? "#1A1A2E" : "linear-gradient(135deg,#C49A2A,#D4A843)",
                color: isQuerying ? "#7A7680" : "#06070D",
                fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s",
              }}>
                {isQuerying ? "Analysing..." : t.query_btn}
              </button>
            </div>

            {/* Language note */}
            <p style={{ fontSize: 12, color: "#7A7680", marginBottom: 20 }}>
              Querying in: <span style={{ color: "#C49A2A", fontWeight: 600 }}>{language === "en" ? "English" : language === "af" ? "Afrikaans" : "Oshiwambo"}</span>
              {language !== "en" && <span style={{ color: "#7A7680" }}> · AI responses will be translated</span>}
            </p>

            {isQuerying && (
              <div style={{ background: "#0D0E16", borderRadius: 16, padding: 40, border: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
                  {[0, 1, 2].map(i => <div key={i} className={`pulse-dot pulse-dot-${i + 1}`} style={{ width: 10, height: 10, borderRadius: "50%", background: "#C49A2A" }} />)}
                </div>
                <p style={{ fontSize: 13, color: "#7A7680" }}>{t.query_thinking}</p>
                <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  {["Data Agent", "Concept Agent", "Thesis Agent"].map((a, i) => (
                    <span key={i} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(196,154,42,0.08)", color: "#C49A2A", fontWeight: 600 }}>
                      {a} <Check size={11} style={{ display: "inline", verticalAlign: "middle", marginLeft: 2 }} />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {typedAnswer && !isQuerying && (
              <div style={{ background: "#0D0E16", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg,#C49A2A,#D4A843)", display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={11} color="#06070D" /></div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#C49A2A", letterSpacing: "1px", textTransform: "uppercase" }}>IJG Intelligence</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, padding: "3px 10px", borderRadius: 99, background: "rgba(46,204,113,0.12)", color: "#2ECC71", fontWeight: 700 }}>94% confidence</span>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(232,228,221,0.85)" }}>
                  {typedAnswer}
                  {!queryDone && <span className="typewriter-cursor" />}
                </p>

                {queryDone && (
                  <>
                    <div style={{ display: "flex", gap: 8, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)", flexWrap: "wrap" }}>
                      <button onClick={() => setShowDocGen(true)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(196,154,42,0.2)", background: "rgba(196,154,42,0.06)", color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}><FileText size={14} color="#C9A84C" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> PDF Report</button>
                      <button onClick={() => setShowDocGen(true)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(196,154,42,0.2)", background: "rgba(196,154,42,0.06)", color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}><BarChart3 size={14} color="#C9A84C" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> Infographic</button>
                      <button onClick={() => setShowDocGen(true)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(196,154,42,0.2)", background: "rgba(196,154,42,0.06)", color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}><MonitorPlay size={14} color="#C9A84C" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> Presentation</button>
                      <button style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(37,211,102,0.2)", background: "rgba(37,211,102,0.06)", color: "#25D366", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}><MessageCircle size={14} color="#25D366" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> WhatsApp</button>
                    </div>

                    {/* Alert setup */}
                    <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 16 }}><Bell size={16} color="#C9A84C" /></span>
                      <p style={{ fontSize: 13, color: "#7A7680", flex: 1 }}>Set an alert for this topic — get notified when IJG publishes new research</p>
                      {!alertSet
                        ? <button onClick={() => setAlertSet(true)} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(196,154,42,0.2)", background: "transparent", color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Set Alert</button>
                        : <span style={{ fontSize: 12, color: "#2ECC71", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Check size={12} color="#2ECC71" /> Alert set</span>
                      }
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Suggested queries */}
            {!typedAnswer && !isQuerying && (
              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: 12, color: "#7A7680", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>Suggested queries</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    "What was Namibia's inflation trend over the last 5 years?",
                    "Uranium market outlook and impact on Namibia",
                    "Bank Windhoek FY2025 results summary",
                    "BoN MPC March 2026 preview",
                    "NSX top performers this week",
                    "Capricorn Group fair value estimate",
                  ].map((q, i) => (
                    <button key={i} onClick={() => { setQuery(q); setTimeout(handleQuery, 50); }} style={{
                      padding: "12px 16px", borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.04)",
                      background: "#0D0E16", color: "rgba(232,228,221,0.7)",
                      fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                      transition: "all 0.15s",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(196,154,42,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "#E8E4DD"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(232,228,221,0.7)"; }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* -- LIBRARY TAB -- */}
        {activeTab === "library" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", color: "#E8E4DD" }}>Research Library</h1>
              <span style={{ fontSize: 13, color: "#7A7680" }}>Full access during trial · {RESEARCH.length} publications</span>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {["All", "Equities", "Macro", "Banking", "Mining"].map((f, i) => (
                <button key={i} style={{
                  padding: "6px 14px", borderRadius: 99,
                  border: `1px solid ${i === 0 ? "rgba(196,154,42,0.3)" : "rgba(255,255,255,0.08)"}`,
                  background: i === 0 ? "rgba(196,154,42,0.1)" : "transparent",
                  color: i === 0 ? "#C49A2A" : "#7A7680",
                  fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: i === 0 ? 600 : 400,
                }}>{f}</button>
              ))}
            </div>

            {RESEARCH.map(r => (
              <div key={r.id} onClick={() => handleReadArticle(r)} style={{
                padding: "16px 20px", background: "#0D0E16", borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.04)", marginBottom: 8, cursor: "pointer",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,154,42,0.15)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.04)"; }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  {r.premium
                    ? <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(196,154,42,0.15)", color: "#C49A2A", fontWeight: 700 }}><Sparkles size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 2 }} /> PREMIUM</span>
                    : <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(46,204,113,0.1)", color: "#2ECC71", fontWeight: 700 }}>FREE</span>
                  }
                  <span style={{ fontSize: 11, color: "#7A7680" }}>{r.sector} · {r.cat}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, padding: "3px 8px", borderRadius: 99, background: "rgba(46,204,113,0.08)", color: "#2ECC71", fontWeight: 600 }}>{r.confidence}% conf.</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: "#E8E4DD" }}>{r.title}</p>
                <p style={{ fontSize: 13, color: "#7A7680", lineHeight: 1.5, marginBottom: 6 }}>{r.intro.slice(0, 140)}...</p>
                <p style={{ fontSize: 11, color: "#7A7680" }}>{r.author} · {r.date} · {r.readTime} · {r.citations.length} sources</p>
              </div>
            ))}
          </>
        )}

        {/* -- NEWSLETTER TAB -- */}
        {activeTab === "newsletter" && (
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
                  The NSX Overall Index advanced 1.2% to 1,847 points, led by a 4.3% surge in Paladin Energy as uranium spot prices hit a 19-year high. We preview Wednesday's MPC meeting and explain why IJG expects rates on hold.
                </p>
                <button onClick={() => handleReadArticle(RESEARCH[0])} style={{
                  padding: "12px 20px", borderRadius: 8, border: "none",
                  background: "linear-gradient(135deg,#C49A2A,#D4A843)",
                  color: "#06070D", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                }}>
                  Deep Dive: Uranium{"'"}s 19-year high <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} />
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
        )}

        {/* -- WHATSAPP TAB -- */}
        {activeTab === "whatsapp" && (
          <>
            <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 8, color: "#E8E4DD" }}>WhatsApp Intelligence</h1>
            <p style={{ fontSize: 14, color: "#7A7680", marginBottom: 28 }}>Manage your WhatsApp research delivery and alerts.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(37,211,102,0.12)" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(37,211,102,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}><MessageCircle size={20} color="#25D366" /></div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD" }}>WhatsApp Connected</p>
                    <p style={{ fontSize: 12, color: "#25D366" }}>+264 81 *** *** · Active</p>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#7A7680", lineHeight: 1.6 }}>Your WhatsApp number is connected. You receive daily briefings and can query the AI directly from WhatsApp.</p>
              </div>

              <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 16 }}>Active Alerts</p>
                {[
                  { topic: "Uranium price", trigger: "> $85/lb", status: "active" },
                  { topic: "BoN MPC decisions", trigger: "Any change", status: "active" },
                  { topic: "Capricorn Group", trigger: "New research", status: "active" },
                ].map((alert, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <span style={{ fontSize: 14 }}><Bell size={14} color="#C9A84C" /></span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#E8E4DD" }}>{alert.topic}</p>
                      <p style={{ fontSize: 11, color: "#7A7680" }}>Trigger: {alert.trigger}</p>
                    </div>
                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(46,204,113,0.1)", color: "#2ECC71", fontWeight: 700 }}>ON</span>
                  </div>
                ))}
                <button style={{ marginTop: 14, width: "100%", padding: "10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#7A7680", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                  + Add New Alert
                </button>
              </div>
            </div>

            {/* Content depth */}
            <div style={{ marginTop: 20, background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 4 }}>Content Depth</p>
              <p style={{ fontSize: 13, color: "#7A7680", marginBottom: 16 }}>Your subscription tier determines the depth of content you receive via WhatsApp.</p>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { tier: "Free", desc: "Headlines only", active: false },
                  { tier: "Essentials", desc: "Summary + key stats", active: false },
                  { tier: "Professional", desc: "Full analysis + citations", active: true },
                  { tier: "Institutional", desc: "Raw data + methodology", active: false },
                ].map((t, i) => (
                  <div key={i} style={{
                    flex: 1, padding: "10px 12px", borderRadius: 8, textAlign: "center",
                    background: t.active ? "rgba(196,154,42,0.1)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${t.active ? "rgba(196,154,42,0.3)" : "rgba(255,255,255,0.04)"}`,
                  }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: t.active ? "#C49A2A" : "#7A7680", marginBottom: 2 }}>{t.tier}</p>
                    <p style={{ fontSize: 10, color: "#7A7680" }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {showDocGen && <DocGenModal onClose={() => setShowDocGen(false)} query={lastQuery} />}
      {onboardingStep > 0 && onboardingStep <= 4 && (
        <OnboardingStep
          step={onboardingStep}
          onNext={() => setOnboardingStep(onboardingStep + 1)}
          onSkip={() => setOnboardingStep(0)}
        />
      )}
    </div>
  );
}
