"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hexagon, Sparkles, CircleDot, ArrowRight, Check } from "lucide-react";
import { Language, TRANSLATIONS, RESEARCH, STATS, TIERS, IJG_LOGO, HERO_IMG } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";
import TrialModal from "./trial-modal";
import NewsletterSection from "./newsletter-section";
import WhatsAppSection from "./whatsapp-section";

export function ResearchLanding() {
  const [showTrial, setShowTrial] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const t = TRANSLATIONS[language];
  const router = useRouter();
  const isMobile = useIsMobile();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartTrial = () => {
    router.push("/research/app");
  };

  const handleReadArticle = (articleId: number) => {
    router.push(`/research/${articleId}`);
  };

  return (
    <div className="min-h-screen" style={{ background: "#06070D", color: "#E8E4DD", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", overflowX: "hidden" }}>

      {/* -- SECTION NAV -- */}
      <nav style={{
        background: "rgba(13,17,23,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 16px" : "0 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 44,
        }}>
          <div style={{ display: "flex", gap: 4, alignItems: "center", overflowX: isMobile ? "auto" : undefined, WebkitOverflowScrolling: "touch" as const }}>
            {[
              { label: "Research", target: "research" },
              { label: "Newsletter", target: "newsletter" },
              { label: "WhatsApp", target: "whatsapp" },
              { label: "Pricing", target: "pricing" },
            ].map((item) => (
              <button
                key={item.target}
                onClick={() => scrollTo(item.target)}
                style={{
                  padding: "6px 16px", borderRadius: 99, border: "none",
                  background: "transparent", color: "rgba(232,228,221,0.55)",
                  fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; e.currentTarget.style.background = "rgba(201,168,76,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(232,228,221,0.55)"; e.currentTarget.style.background = "transparent"; }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowTrial(true)}
            style={{
              padding: "7px 20px", borderRadius: 99, border: "none",
              background: "linear-gradient(135deg,#C9A84C,#D4A843)",
              color: "#06070D", fontSize: 12, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Start Free Trial
          </button>
        </div>
      </nav>

      {/* -- HERO -- */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: isMobile ? 400 : 600 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.25,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(6,7,13,0.2) 0%, rgba(6,7,13,0.7) 60%, #06070D 100%)",
        }} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: isMobile ? "60px 16px 48px" : "100px 40px 80px", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#C49A2A", marginBottom: isMobile ? 16 : 24 }}>
            {t.hero_label}
          </p>
          <h1 style={{ fontSize: isMobile ? 32 : 58, fontWeight: 300, fontFamily: "'Georgia', serif", fontStyle: "italic", lineHeight: 1.15, marginBottom: isMobile ? 16 : 24, color: "#E8E4DD" }}>
            {t.hero_title}<br /><span style={{ color: "#C49A2A" }}>{t.hero_highlight}</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: "#7A7680", lineHeight: 1.7, maxWidth: 620, margin: isMobile ? "0 auto 24px" : "0 auto 40px", fontWeight: 300 }}>
            {t.hero_sub}
          </p>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center", marginBottom: 16 }}>
            <button onClick={() => setShowTrial(true)} style={{
              padding: isMobile ? "12px 24px" : "14px 36px", borderRadius: 99, border: "none",
              background: "linear-gradient(135deg,#C49A2A,#D4A843)",
              color: "#06070D", fontSize: isMobile ? 15 : 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              width: isMobile ? "100%" : undefined,
            }}>{t.cta_trial}</button>
            <button onClick={() => scrollTo("research")} style={{
              padding: isMobile ? "12px 24px" : "14px 36px", borderRadius: 99,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent", color: "#E8E4DD",
              fontSize: isMobile ? 15 : 16, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              width: isMobile ? "100%" : undefined,
            }}>{t.cta_browse}</button>
          </div>
          <p style={{ fontSize: 13, color: "#7A7680" }}>No credit card required · 14-day free trial · Cancel anytime</p>
        </div>
      </section>

      {/* -- STATS -- */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "0 16px 48px" : "0 40px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: "#06070D", padding: "28px 24px", textAlign: "center" }}>
              <p style={{ fontSize: 32, fontWeight: 300, fontFamily: "'Georgia',serif", color: "#E8E4DD", marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#C49A2A", marginBottom: 2 }}>{s.label}</p>
              <p style={{ fontSize: 11, color: "#7A7680" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -- HOW IT WORKS -- */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "0 16px 48px" : "0 40px 80px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#C49A2A", marginBottom: 16, textAlign: "center" }}>{t.section_how}</p>
        <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", textAlign: "center", marginBottom: isMobile ? 28 : 48 }}>{t.section_how_title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 20 }}>
          {[
            { icon: <Hexagon size={22} color="#C49A2A" />, title: t.feature_ask, desc: t.feature_ask_desc },
            { icon: <Sparkles size={22} color="#C49A2A" />, title: t.feature_generate, desc: t.feature_generate_desc },
            { icon: <CircleDot size={22} color="#C49A2A" />, title: t.feature_inform, desc: t.feature_inform_desc },
          ].map((f, i) => (
            <div key={i} style={{ background: "#0D0E16", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,rgba(27,79,114,0.2),rgba(196,154,42,0.1))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{f.icon}</div>
              <p style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{f.title}</p>
              <p style={{ fontSize: 14, color: "#7A7680", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -- RESEARCH -- */}
      <section id="research" style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "0 16px 48px" : "0 40px 80px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#C49A2A", marginBottom: 16, textAlign: "center" }}>{t.section_research}</p>
        <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", textAlign: "center", marginBottom: 8 }}>{t.section_research_title}</h2>
        <p style={{ fontSize: 14, color: "#7A7680", textAlign: "center", marginBottom: 40 }}>Browse free articles to experience the quality. Premium content unlocked with a trial.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {RESEARCH.slice(0, 5).map(r => (
            <div key={r.id} onClick={() => handleReadArticle(r.id)} style={{
              display: "flex", alignItems: "center", gap: isMobile ? 10 : 16,
              padding: isMobile ? "14px 14px" : "18px 20px", background: "#0D0E16", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.04)", cursor: "pointer",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,154,42,0.2)"; (e.currentTarget as HTMLDivElement).style.background = "#111219"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLDivElement).style.background = "#0D0E16"; }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                  {r.premium
                    ? <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(196,154,42,0.15)", color: "#C49A2A", fontWeight: 700 }}><Sparkles size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 2 }} /> PREMIUM</span>
                    : <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(46,204,113,0.1)", color: "#2ECC71", fontWeight: 700 }}>FREE</span>
                  }
                  <span style={{ fontSize: 11, color: "#7A7680" }}>{r.sector} · {r.cat}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{r.title}</p>
                <p style={{ fontSize: 12, color: "#7A7680" }}>{r.author} · {r.date} · {r.readTime} read</p>
              </div>
              <ArrowRight size={18} color="rgba(255,255,255,0.1)" />
            </div>
          ))}
        </div>
      </section>

      {/* -- NEWSLETTER -- */}
      <section id="newsletter">
        <NewsletterSection language={language} onStartTrial={() => setShowTrial(true)} />
      </section>

      {/* -- WHATSAPP -- */}
      <section id="whatsapp">
        <WhatsAppSection language={language} onStartTrial={() => setShowTrial(true)} />
      </section>

      {/* -- PRICING -- */}
      <section id="pricing" style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "48px 16px 64px" : "80px 40px 100px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#C49A2A", marginBottom: 16, textAlign: "center" }}>{t.section_pricing}</p>
        <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", textAlign: "center", marginBottom: 8 }}>{t.section_pricing_title}</h2>
        <p style={{ fontSize: 14, color: "#7A7680", textAlign: "center", marginBottom: isMobile ? 28 : 48 }}>From free daily briefings to institutional-grade research. Start with a 14-day free trial.</p>
        <div style={isMobile ? { display: "flex", flexDirection: "column", gap: 16 } : { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, alignItems: "start" }}>
          {TIERS.map((tier, i) => (
            <div key={i} style={{
              background: tier.popular ? "linear-gradient(180deg,rgba(196,154,42,0.08),#0D0E16)" : "#0D0E16",
              borderRadius: 20, padding: isMobile ? 22 : 28, position: "relative", overflow: "hidden",
              border: `1px solid ${tier.popular ? "rgba(196,154,42,0.25)" : "rgba(255,255,255,0.04)"}`,
              transform: !isMobile && tier.popular ? "scale(1.04)" : "none",
            }}>
              {tier.popular && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#C49A2A,#D4A843)" }} />}
              {tier.popular && <span style={{ position: "absolute", top: 12, right: 12, fontSize: 10, padding: "3px 10px", borderRadius: 99, background: "rgba(196,154,42,0.2)", color: "#C49A2A", fontWeight: 700 }}>MOST POPULAR</span>}
              <p style={{ fontSize: 13, fontWeight: 700, color: tier.color, marginBottom: 4, letterSpacing: "0.5px" }}>{tier.name}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 300, fontFamily: "'Georgia',serif" }}>{tier.price}</span>
                <span style={{ fontSize: 13, color: "#7A7680" }}>{tier.period}</span>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "16px 0" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {tier.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <Check size={13} color={tier.color} style={{ marginTop: 1, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(232,228,221,0.7)", lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => tier.name !== "Institutional" && setShowTrial(true)} style={{
                width: "100%", padding: "12px", borderRadius: 10, border: "none",
                cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14,
                background: tier.popular ? "linear-gradient(135deg,#C49A2A,#D4A843)" : "rgba(255,255,255,0.06)",
                color: tier.popular ? "#06070D" : "#E8E4DD",
              }}>{tier.cta}</button>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#7A7680", textAlign: "center", marginTop: 24 }}>All prices in Namibian Dollars (NAD). VAT exclusive. Annual billing saves 20%.</p>
      </section>


      {showTrial && <TrialModal onClose={() => setShowTrial(false)} onStart={handleStartTrial} />}
    </div>
  );
}
