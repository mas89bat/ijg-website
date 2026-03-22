"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, Check, FileText, BarChart3, MonitorPlay, MessageCircle, Bell, History, ChevronDown, ChevronUp, Bookmark, Trash2, FolderOpen, Image, Headphones, Table2, ExternalLink } from "lucide-react";
import { Language, TRANSLATIONS } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

const RECENT_QUERIES = [
  { query: "Namibia inflation trend 5 years", date: "Today, 10:30 AM", saved: true },
  { query: "Uranium market outlook 2026", date: "Today, 9:15 AM", saved: false },
  { query: "Bank Windhoek FY2025 results", date: "Yesterday, 4:20 PM", saved: true },
  { query: "BoN repo rate forecast", date: "Yesterday, 11:00 AM", saved: false },
  { query: "Capricorn Group fair value", date: "20 Mar, 2:45 PM", saved: true },
  { query: "NSX vs JSE performance comparison", date: "19 Mar, 10:00 AM", saved: false },
  { query: "Property market rate cycle impact", date: "18 Mar, 3:30 PM", saved: false },
];

const DOC_TYPE_META: Record<string, { icon: typeof FileText; color: string; label: string }> = {
  report: { icon: FileText, color: "#C49A2A", label: "Report" },
  infographic: { icon: Image, color: "#8B5CF6", label: "Infographic" },
  data: { icon: Table2, color: "#3B82F6", label: "Data Sheet" },
  podcast: { icon: Headphones, color: "#EC4899", label: "Podcast" },
  presentation: { icon: MonitorPlay, color: "#10B981", label: "Presentation" },
};

const RECENT_DOCUMENTS = [
  { title: "Namibian Economic Outlook Q1 2026", type: "report" as const, date: "Today, 10:45 AM", source: "AI Query" },
  { title: "Uranium Price vs NSX Mining Index", type: "infographic" as const, date: "Today, 9:20 AM", source: "Library" },
  { title: "Bank Windhoek FY2025 — Key Ratios", type: "data" as const, date: "Yesterday, 4:30 PM", source: "AI Query" },
  { title: "Weekly Market Wrap — 21 Mar 2026", type: "report" as const, date: "Yesterday, 8:00 AM", source: "Newsletter" },
  { title: "BoN MPC Preview — Rate Decision", type: "podcast" as const, date: "20 Mar, 11:00 AM", source: "Library" },
  { title: "Capricorn Group Equity Research", type: "report" as const, date: "19 Mar, 2:15 PM", source: "AI Query" },
  { title: "NSX Top 10 Performers — Mar 2026", type: "data" as const, date: "18 Mar, 9:00 AM", source: "Library" },
  { title: "Namibia Property Market Trends", type: "presentation" as const, date: "17 Mar, 3:00 PM", source: "AI Query" },
];

export interface QueryTabProps {
  language: Language;
  query: string;
  onQueryChange: (value: string) => void;
  onQuerySubmit: (q?: string) => void;
  isQuerying: boolean;
  typedAnswer: string;
  queryDone: boolean;
  alertSet: boolean;
  onSetAlert: () => void;
  onShowDocGen: () => void;
  onShowPdfGen?: () => void;
}

export function QueryTab({
  language,
  query,
  onQueryChange,
  onQuerySubmit,
  isQuerying,
  typedAnswer,
  queryDone,
  alertSet,
  onSetAlert,
  onShowDocGen,
  onShowPdfGen,
}: QueryTabProps) {
  const t = TRANSLATIONS[language];
  const isMobile = useIsMobile();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [savedStates, setSavedStates] = useState<boolean[]>(RECENT_QUERIES.map(q => q.saved));

  // Persist collapsed state
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ijg_query_history_open");
      if (stored === "true") setHistoryOpen(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ijg_query_history_open", String(historyOpen));
    } catch {}
  }, [historyOpen]);

  const toggleSaved = (index: number) => {
    setSavedStates(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 20, color: "#E8E4DD" }}>AI Research Assistant</h1>

      {/* Recent Queries collapsible panel */}
      <div style={{ marginBottom: 20, background: "#0D0E16", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#E8E4DD",
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <History size={15} color="#C49A2A" />
          <span>Recent Queries</span>
          <span style={{ fontSize: 11, color: "#7A7680", fontWeight: 400, marginLeft: 4 }}>({RECENT_QUERIES.length})</span>
          <span style={{ marginLeft: "auto" }}>
            {historyOpen ? <ChevronUp size={16} color="#7A7680" /> : <ChevronDown size={16} color="#7A7680" />}
          </span>
        </button>

        {historyOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ maxHeight: 280, overflowY: "auto" }}>
              {RECENT_QUERIES.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 16px",
                    borderBottom: i < RECENT_QUERIES.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  <button
                    onClick={() => toggleSaved(i)}
                    style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2, display: "flex", flexShrink: 0 }}
                    title={savedStates[i] ? "Remove bookmark" : "Bookmark this query"}
                  >
                    <Bookmark
                      size={14}
                      fill={savedStates[i] ? "#C49A2A" : "transparent"}
                      color={savedStates[i] ? "#C49A2A" : "#7A7680"}
                    />
                  </button>
                  <button
                    onClick={() => { onQueryChange(item.query); }}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(232,228,221,0.8)",
                      fontSize: 13,
                      fontFamily: "inherit",
                      textAlign: "left",
                      padding: 0,
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#C49A2A"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(232,228,221,0.8)"; }}
                  >
                    {item.query}
                  </button>
                  <span style={{ fontSize: 11, color: "#7A7680", whiteSpace: "nowrap", flexShrink: 0 }}>{item.date}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "8px 16px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "right" }}>
              <button
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#7A7680", fontSize: 11, fontFamily: "inherit" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#E8E4DD"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#7A7680"; }}
              >
                <Trash2 size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                Clear History
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Documents collapsible panel */}
      <div style={{ marginBottom: 20, background: "#0D0E16", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <button
          onClick={() => setDocsOpen(!docsOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#E8E4DD",
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <FolderOpen size={15} color="#C49A2A" />
          <span>Recent Documents</span>
          <span style={{ fontSize: 11, color: "#7A7680", fontWeight: 400, marginLeft: 4 }}>({RECENT_DOCUMENTS.length})</span>
          <span style={{ marginLeft: "auto" }}>
            {docsOpen ? <ChevronUp size={16} color="#7A7680" /> : <ChevronDown size={16} color="#7A7680" />}
          </span>
        </button>

        {docsOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ maxHeight: 320, overflowY: "auto" }}>
              {RECENT_DOCUMENTS.map((doc, i) => {
                const meta = DOC_TYPE_META[doc.type];
                const DocIcon = meta.icon;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 16px",
                      borderBottom: i < RECENT_DOCUMENTS.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: `${meta.color}12`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <DocIcon size={16} color={meta.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: "rgba(232,228,221,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.title}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 600, padding: "1px 6px", borderRadius: 4,
                          background: `${meta.color}15`, color: meta.color,
                        }}>{meta.label}</span>
                        <span style={{ fontSize: 11, color: "#7A7680" }}>{doc.source}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, color: "#7A7680", whiteSpace: "nowrap", flexShrink: 0 }}>{doc.date}</span>
                    <ExternalLink size={13} color="#7A7680" style={{ flexShrink: 0 }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexDirection: isMobile ? "column" : "row" }}>
        <input
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onQuerySubmit()}
          placeholder={t.query_placeholder}
          style={{ flex: 1, padding: "15px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "#0D0E16", color: "#E8E4DD", fontSize: 15, fontFamily: "inherit", outline: "none" }}
        />
        <button onClick={() => onQuerySubmit()} style={{
          padding: isMobile ? "14px 28px" : "0 28px", borderRadius: 12, border: "none",
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
          <div style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(232,228,221,0.85)" }} className="ai-response-markdown">
            <ReactMarkdown>{typedAnswer}</ReactMarkdown>
            {!queryDone && <span className="typewriter-cursor" />}
          </div>

          {queryDone && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                {[
                  { label: "PDF Report", Icon: FileText, color: "#C9A84C", borderColor: "rgba(196,154,42,0.2)", bg: "rgba(196,154,42,0.06)", onClick: onShowPdfGen },
                  { label: "Infographic", Icon: BarChart3, color: "#C9A84C", borderColor: "rgba(196,154,42,0.2)", bg: "rgba(196,154,42,0.06)", onClick: onShowDocGen },
                  { label: "Presentation", Icon: MonitorPlay, color: "#C9A84C", borderColor: "rgba(196,154,42,0.2)", bg: "rgba(196,154,42,0.06)", onClick: onShowDocGen },
                  { label: "WhatsApp", Icon: MessageCircle, color: "#25D366", borderColor: "rgba(37,211,102,0.2)", bg: "rgba(37,211,102,0.06)", onClick: undefined },
                ].map((btn, i) => (
                  <button key={i} onClick={btn.onClick} style={{
                    padding: "10px 14px", borderRadius: 8,
                    border: `1px solid ${btn.borderColor}`, background: btn.bg,
                    color: btn.color, fontSize: 13, cursor: "pointer",
                    fontFamily: "inherit", fontWeight: 600,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    width: "100%",
                  }}>
                    <btn.Icon size={15} color={btn.color} /> {btn.label}
                  </button>
                ))}
              </div>

              {/* Alert setup */}
              <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 16 }}><Bell size={16} color="#C9A84C" /></span>
                <p style={{ fontSize: 13, color: "#7A7680", flex: 1 }}>Set an alert for this topic — get notified when IJG publishes new research</p>
                {!alertSet
                  ? <button onClick={onSetAlert} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(196,154,42,0.2)", background: "transparent", color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Set Alert</button>
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
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
            {[
              "Summarise SNO's FY25 results — what drove profit growth?",
              "How does SNO compare to FirstRand Namibia and Capricorn Group?",
              "What is SNO's dividend for FY25 and when is the payment date?",
              "What drove the 18% growth in SNO's loan book?",
              "What is SNO's outlook and strategic investment phase?",
              "What are the key risks facing Namibian banks in 2026?",
            ].map((q, i) => (
              <button key={i} onClick={() => { onQueryChange(q); onQuerySubmit(q); }} style={{
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
  );
}
