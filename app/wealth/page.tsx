"use client";

import Link from "next/link";
import { Home, Car, Clock, GraduationCap, TrendingUp, Landmark, ShieldCheck, Users, BarChart3, type LucideIcon } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PRODUCTS, WA_BASE, PRIME_RATE, INFLATION_RATE, PROPERTY_GROWTH_PA } from "@/lib/wealth-data";
import type { ProductKey } from "@/lib/wealth-data";

const ICON_MAP: Record<string, LucideIcon> = { Home, Car, Clock, GraduationCap, TrendingUp };

const PRODUCT_ORDER: ProductKey[] = ["home-loan", "vehicle-finance", "retirement", "education", "invest"];

const TRUST_ITEMS = [
  { Icon: Landmark,    label: "30 Years",       sub: "of Namibian market expertise" },
  { Icon: ShieldCheck, label: "NAMFISA",         sub: "regulated & compliant" },
  { Icon: Users,       label: "Expert Advisors", sub: "dedicated wealth team" },
  { Icon: BarChart3,   label: "N$180bn+",        sub: "Namibian retirement assets managed" },
];

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function WealthHome() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0E1A", color: "#EDE8DF", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <SiteHeader />

      {/* ── Hero ── */}
      <section style={{
        paddingTop: 64,
        background: "linear-gradient(160deg, #0A0E1A 0%, #0D1830 55%, #0A0E1A 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px", pointerEvents: "none",
        }} />
        {/* Gold glow */}
        <div style={{
          position: "absolute", top: "15%", right: "8%",
          width: 360, height: 360,
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 20px 56px", position: "relative" }}>
          {/* Badge */}
          <div className="fade-in-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 20, padding: "5px 14px",
            fontSize: 11, fontWeight: 700, color: "#C9A84C",
            letterSpacing: "1.5px", textTransform: "uppercase",
            marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", display: "inline-block" }} />
            IJG Wealth Management
          </div>

          <h1 className="fade-in-up delay-1" style={{
            fontSize: "clamp(30px, 5.5vw, 60px)",
            fontWeight: 800, lineHeight: 1.1,
            maxWidth: 720, marginBottom: 20,
            letterSpacing: "-0.03em",
          }}>
            Build wealth.<br />
            <span className="gold-text">Protect what matters.</span><br />
            Plan for tomorrow.
          </h1>

          <p className="fade-in-up delay-2" style={{
            fontSize: "clamp(15px, 2vw, 17px)",
            color: "rgba(237,232,223,0.6)",
            maxWidth: 520, lineHeight: 1.8, marginBottom: 32,
          }}>
            IJG Wealth Management has guided Namibians through every market cycle for 30 years. Use our tools to understand your options — then speak to an advisor who knows the Namibian market.
          </p>

          <div className="fade-in-up delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
            <a
              href={`${WA_BASE}?text=Hi%2C+I%27d+like+to+speak+to+an+IJG+Wealth+advisor.`}
              target="_blank" rel="noopener noreferrer"
              className="btn-wa"
              style={{ width: "auto", padding: "14px 24px", fontSize: 15 }}
            >
              {WA_ICON}
              Speak to an Advisor
            </a>
            <a href="#products" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#EDE8DF",
              fontSize: 15, fontWeight: 500,
              padding: "13px 22px", borderRadius: 10,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.14)",
              transition: "all 0.2s",
            }}>
              Explore Tools {"\u2193"}
            </a>
          </div>

          {/* Stats bar */}
          <div className="fade-in-up delay-4 stats-bar" style={{ maxWidth: 640 }}>
            {[
              { label: "Prime Rate",       value: `${PRIME_RATE}%`,          note: "Bank of Namibia" },
              { label: "CPI Inflation",    value: `${INFLATION_RATE}%`,      note: "Latest reading" },
              { label: "Property Growth",  value: `${PROPERTY_GROWTH_PA}% p.a.`, note: "10-year average" },
              { label: "NSX Returns",      value: "12.4% p.a.",              note: "10-year average" },
            ].map(s => (
              <div key={s.label} style={{
                padding: "16px 0",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 700, color: "#C9A84C", lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#EDE8DF", marginTop: 3 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "rgba(237,232,223,0.38)" }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Cards ── */}
      <section id="products" style={{ padding: "72px 20px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: 20, padding: "4px 12px",
              fontSize: 11, fontWeight: 700, color: "#C9A84C",
              letterSpacing: "1.5px", textTransform: "uppercase",
              marginBottom: 14,
            }}>
              Financial Tools
            </div>
            <h2 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, marginBottom: 10, letterSpacing: "-0.02em" }}>
              What are you planning for?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(237,232,223,0.5)", maxWidth: 480, lineHeight: 1.7 }}>
              Each tool combines a live calculator with Namibian market context and an IJG analyst view — so you can make an informed decision, not just a mathematical one.
            </p>
          </div>

          <div className="products-grid">
            {PRODUCT_ORDER.map((key, i) => {
              const p = PRODUCTS[key];
              return (
                <Link key={key} href={`/wealth/${key}`} style={{ textDecoration: "none" }}>
                  <div
                    className="fade-in-up"
                    style={{
                      animationDelay: `${i * 0.07}s`,
                      background: "rgba(26,35,64,0.55)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 16,
                      padding: "24px 22px",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      height: "100%",
                      display: "flex", flexDirection: "column",
                      position: "relative", overflow: "hidden",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = "rgba(201,168,76,0.3)";
                      el.style.transform = "translateY(-3px)";
                      el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = "rgba(255,255,255,0.07)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* Top accent line */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3,
                      background: `linear-gradient(90deg, ${p.color}, transparent)`,
                    }} />
                    <div style={{ marginBottom: 14, color: "#C9A84C" }}>
                      {ICON_MAP[p.icon] ? (() => { const Icon = ICON_MAP[p.icon]; return <Icon size={32} />; })() : <span style={{ fontSize: 32 }}>{p.icon}</span>}
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.01em" }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(237,232,223,0.48)", marginBottom: 18, flex: 1, lineHeight: 1.65 }}>
                      {p.tagline}
                    </p>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      fontSize: 13, fontWeight: 600, color: "#C9A84C",
                    }}>
                      Explore & Calculate
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section style={{
        padding: "64px 20px",
        background: "linear-gradient(180deg, rgba(13,43,94,0.12) 0%, transparent 100%)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="trust-grid">
            <div>
              <h2 style={{ fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 700, marginBottom: 14, letterSpacing: "-0.02em" }}>
                Namibia&apos;s most trusted wealth management firm
              </h2>
              <p style={{ fontSize: 15, color: "rgba(237,232,223,0.52)", lineHeight: 1.8, marginBottom: 28 }}>
                Since 1994, IJG has helped Namibians build, protect, and transfer wealth across generations. Our advisors understand the Namibian market — the NSX, the property cycle, the pension landscape — in a way that no international platform can replicate.
              </p>
              <a
                href={`${WA_BASE}?text=Hi%2C+I%27d+like+to+speak+to+an+IJG+Wealth+advisor.`}
                target="_blank" rel="noopener noreferrer"
                className="btn-wa"
                style={{ maxWidth: 280 }}
              >
                {WA_ICON}
                Speak to an Advisor
              </a>
            </div>
            <div className="trust-stats">
              {TRUST_ITEMS.map(t => (
                <div key={t.label} style={{
                  background: "rgba(26,35,64,0.5)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14, padding: "20px 16px",
                  textAlign: "center",
                }}>
                  <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}><t.Icon size={28} color="#C9A84C" /></div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#C9A84C", marginBottom: 4 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: "rgba(237,232,223,0.42)", lineHeight: 1.5 }}>{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
