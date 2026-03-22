"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp, BarChart3, Briefcase } from "lucide-react";
import { Article, Language, TRANSLATIONS, RESEARCH } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

export interface HomeTabProps {
  language: Language;
  query: string;
  onQueryChange: (value: string) => void;
  onQuerySubmit: () => void;
  onSwitchToQuery: () => void;
  onSwitchToTrading?: () => void;
  onSwitchToAdvisory?: () => void;
  onReadArticle: (article: Article) => void;
  onGoLanding: () => void;
}

export function HomeTab({
  language,
  query,
  onQueryChange,
  onQuerySubmit,
  onSwitchToQuery,
  onSwitchToTrading,
  onSwitchToAdvisory,
  onReadArticle,
  onGoLanding,
}: HomeTabProps) {
  const t = TRANSLATIONS[language];
  const isMobile = useIsMobile();

  return (
    <>
      {/* Product showcase cards */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { key: "wealth", href: "/wealth", Icon: TrendingUp, title: "Wealth Planning", desc: "Explore calculators and investment tools" },
          { key: "stockbroking", href: undefined, Icon: BarChart3, title: "Stockbroking", desc: "Trade on NSX and JSE" },
          { key: "advisory", href: undefined, Icon: Briefcase, title: "Advisory", desc: "Corporate and institutional services" },
        ].map((card) => {
          const cardStyle: React.CSSProperties = {
            display: "block",
            padding: "20px",
            background: "#0D1117",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.06)",
            textDecoration: "none",
            transition: "all 0.2s ease",
            cursor: "pointer",
            textAlign: "left" as const,
            width: "100%",
            fontFamily: "inherit",
          };
          const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
            e.currentTarget.style.borderColor = "rgba(196,154,42,0.25)";
            e.currentTarget.style.background = "rgba(13,17,23,0.8)";
          };
          const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.background = "#0D1117";
          };
          const inner = (
            <>
              <card.Icon size={24} style={{ color: "#C49A2A", marginBottom: 12 }} />
              <p style={{ fontSize: 15, fontWeight: 600, color: "#E8E4DD", marginBottom: 4 }}>{card.title}</p>
              <p style={{ fontSize: 12, color: "#7A7680", lineHeight: 1.4 }}>{card.desc}</p>
            </>
          );

          if (card.key === "stockbroking") {
            return (
              <button
                key={card.key}
                onClick={() => onSwitchToTrading?.()}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={cardStyle}
              >
                {inner}
              </button>
            );
          }

          if (card.key === "advisory") {
            return (
              <button
                key={card.key}
                onClick={() => onSwitchToAdvisory?.()}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={cardStyle}
              >
                {inner}
              </button>
            );
          }

          return (
            <Link
              key={card.key}
              href={card.href!}
              style={cardStyle}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {inner}
            </Link>
          );
        })}
      </div>

      <p style={{ fontSize: 12, color: "#7A7680", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6 }}>Welcome to your trial, Andri</p>
      <h1 style={{ fontSize: 30, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 28, color: "#E8E4DD" }}>Your Namibian market intelligence</h1>

      {/* Quick query */}
      <div style={{ background: "linear-gradient(135deg,rgba(27,79,114,0.15),rgba(196,154,42,0.08))", borderRadius: 16, padding: 24, marginBottom: 32, border: "1px solid rgba(196,154,42,0.12)" }}>
        <p style={{ fontSize: 12, color: "#C49A2A", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Sparkles size={12} color="#C49A2A" /> Ask IJG Intelligence</p>
        <div style={{ display: "flex", gap: 10, flexDirection: isMobile ? "column" : "row" }}>
          <input
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { onSwitchToQuery(); onQuerySubmit(); } }}
            placeholder={t.query_placeholder}
            style={{ flex: 1, padding: "13px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)", color: "#E8E4DD", fontSize: 14, fontFamily: "inherit", outline: "none" }}
          />
          <button onClick={() => { onSwitchToQuery(); onQuerySubmit(); }} style={{
            padding: isMobile ? "13px 24px" : "0 24px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg,#C49A2A,#D4A843)",
            color: "#06070D", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
          }}>{t.query_btn}</button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {["Namibia inflation trend", "Uranium market outlook", "Bank Windhoek results", "BoN MPC preview"].map(q => (
            <button key={q} onClick={() => { onQueryChange(q); onSwitchToQuery(); setTimeout(onQuerySubmit, 50); }} style={{
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

      <p style={{ fontSize: 12, color: "#7A7680", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14 }}>Today&apos;s Research</p>
      {RESEARCH.slice(0, 4).map(r => (
        <div key={r.id} onClick={() => onReadArticle(r)} style={{
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
        <button onClick={onGoLanding} style={{ padding: "10px 24px", borderRadius: 99, border: "none", background: "linear-gradient(135deg,#C49A2A,#D4A843)", color: "#06070D", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
          View Plans & Subscribe <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} />
        </button>
      </div>
    </>
  );
}
