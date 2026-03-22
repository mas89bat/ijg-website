"use client";

/**
 * ProductPage — reusable template for all 5 IJG Wealth product pages.
 * Single scrollable page: Hero → Market Context → Market Data → Calculator
 * Mobile-first. Uses CSS classes from globals.css for responsive layout.
 */
import { useState, ReactNode } from "react";
import Link from "next/link";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { Home, Car, Clock, GraduationCap, TrendingUp, Lightbulb, Calculator, CheckCircle, CircleDot, Timer, AlertTriangle, type LucideIcon } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WA_BASE, PRIME_RATE_HISTORY } from "@/lib/wealth-data";
import type { ProductDef } from "@/lib/wealth-data";

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  Home, Car, Clock, GraduationCap, TrendingUp,
};

export interface MarketChartDef {
  title: string;
  data: Record<string, unknown>[];
  dataKey: string;
  yLabel: string;
  color: string;
  type: "line" | "bar";
  refValue?: number;
  refLabel?: string;
}

export interface CalculatorResult {
  rows: { label: string; value: string; highlight?: boolean }[];
  recommendation: "strong-buy" | "buy" | "wait" | "caution";
  summary: string;
}

interface ProductPageProps {
  product: ProductDef;
  charts: MarketChartDef[];
  calculator: ReactNode;
  calcResult: CalculatorResult | null;
  extraContent?: ReactNode; // Optional section rendered between Market Data and Calculator
}

const RECO: Record<string, { label: string; color: string; bg: string; border: string; Icon: LucideIcon }> = {
  "strong-buy": { label: "Strong Buy Signal",  color: "#22C55E", bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.25)",   Icon: CheckCircle },
  "buy":        { label: "Buy Signal",          color: "#86EFAC", bg: "rgba(134,239,172,0.08)", border: "rgba(134,239,172,0.2)",  Icon: CircleDot },
  "wait":       { label: "Wait & Monitor",      color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)",  Icon: Timer },
  "caution":    { label: "Caution",             color: "#EF4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.25)",   Icon: AlertTriangle },
};

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(6,8,16,0.97)", border: "1px solid rgba(201,168,76,0.3)",
      borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#EDE8DF",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      <div style={{ fontWeight: 700, marginBottom: 4, color: "#C9A84C", fontSize: 12 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: p.color || "#C9A84C" }}>{"\u25CF"}</span>
          <span style={{ color: "rgba(237,232,223,0.7)", fontSize: 12 }}>{p.name ?? p.dataKey}:</span>
          <strong style={{ color: "#EDE8DF" }}>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

/* ── Section divider ── */
const SectionDivider = ({ label }: { label: string }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 14,
    margin: "0 0 32px",
  }}>
    <div style={{
      display: "inline-flex", alignItems: "center",
      background: "rgba(201,168,76,0.08)",
      border: "1px solid rgba(201,168,76,0.18)",
      borderRadius: 20, padding: "4px 14px",
      fontSize: 10, fontWeight: 800, color: "#C9A84C",
      letterSpacing: "1.5px", textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>
      {label}
    </div>
    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
  </div>
);

export default function ProductPage({ product, charts, calculator, calcResult, extraContent }: ProductPageProps) {
  const [localCalcResult, setLocalCalcResult] = useState<CalculatorResult | null>(calcResult);
  const waMsg = encodeURIComponent(product.waMessage);

  // Keep local state in sync with prop changes
  if (calcResult !== null && calcResult !== localCalcResult) {
    setLocalCalcResult(calcResult);
  }

  const activeResult = calcResult ?? localCalcResult;

  return (
    <div style={{ minHeight: "100vh", background: "#0A0E1A", color: "#EDE8DF", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <SiteHeader />

      {/* ── Hero ── */}
      <section style={{
        paddingTop: 64,
        background: `linear-gradient(160deg, #0A0E1A 0%, ${product.color}15 55%, #0A0E1A 100%)`,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 36px", position: "relative" }}>
          {/* Back link */}
          <Link href="/wealth" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, color: "rgba(237,232,223,0.4)",
            textDecoration: "none", padding: "18px 0",
            letterSpacing: "0.2px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            All Products
          </Link>

          {/* Product identity */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 13, flexShrink: 0,
              background: `${product.color}20`,
              border: `1px solid ${product.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: 2, color: "#C9A84C",
            }}>
              {PRODUCT_ICONS[product.icon] ? (() => { const Icon = PRODUCT_ICONS[product.icon]; return <Icon size={24} />; })() : product.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 10, fontWeight: 800, color: "#C9A84C",
                letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: 7,
              }}>
                IJG Wealth — {product.title}
              </div>
              <h1 style={{
                fontSize: "clamp(22px, 4.5vw, 40px)",
                fontWeight: 800, lineHeight: 1.15,
                margin: 0, letterSpacing: "-0.3px",
              }}>
                {product.heroHeadline}
              </h1>
            </div>
          </div>

          <p style={{
            fontSize: "clamp(14px, 2vw, 16px)",
            color: "rgba(237,232,223,0.58)",
            lineHeight: 1.8, marginBottom: 0,
            maxWidth: 620,
          }}>
            {product.heroSub}
          </p>
        </div>
      </section>

      {/* ── Main content: all sections on one scrollable page ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 20px 72px" }}>

        {/* ══════════════════════════════════════════
            SECTION 1 — MARKET CONTEXT
        ══════════════════════════════════════════ */}
        <section style={{ marginBottom: 64 }}>
          <SectionDivider label="Market Context" />
          <div className="context-grid">
            {/* Editorial body */}
            <div>
              <h2 style={{
                fontSize: "clamp(20px, 3vw, 26px)",
                fontWeight: 700, marginBottom: 28, marginTop: 0,
              }}>
                {product.contextHeadline}
              </h2>
              {product.contextBody.map((para, i) => (
                <p key={i} style={{
                  fontSize: 15, color: "rgba(237,232,223,0.72)",
                  lineHeight: 1.85, marginBottom: 0, marginTop: 0,
                  paddingBottom: 22,
                  borderBottom: i < product.contextBody.length - 1
                    ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  {para}
                </p>
              ))}
            </div>

            {/* IJG View card */}
            <div className="ijg-view-card">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(201,168,76,0.12)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 17, flexShrink: 0,
                }}><Lightbulb size={17} color="#C9A84C" /></div>
                <div style={{
                  fontSize: 10, fontWeight: 800, color: "#C9A84C",
                  letterSpacing: "1.8px", textTransform: "uppercase",
                }}>
                  IJG View
                </div>
              </div>
              <p style={{
                fontSize: 14, color: "rgba(237,232,223,0.8)",
                lineHeight: 1.85, marginBottom: 20, marginTop: 0,
              }}>
                {product.ijgView}
              </p>
              <div style={{
                fontSize: 11, color: "rgba(237,232,223,0.28)",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: 14, marginBottom: 18, lineHeight: 1.6,
              }}>
                For informational purposes only. Does not constitute personalised financial advice.
              </div>
              <a
                href={`${WA_BASE}?text=${waMsg}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-wa"
              >
                {WA_ICON}
                Discuss with an Advisor
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — MARKET DATA
        ══════════════════════════════════════════ */}
        <section style={{
          marginBottom: 64,
          paddingTop: 48,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <SectionDivider label="Market Data" />
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, marginBottom: 6, marginTop: 0 }}>
              10-Year Market Trends
            </h2>
            <p style={{ fontSize: 13, color: "rgba(237,232,223,0.38)", margin: 0, lineHeight: 1.5 }}>
              Illustrative data for demonstration purposes. Real-time data integration available in production.
            </p>
          </div>

          <div className="charts-grid">
            {charts.map((chart, i) => (
              <div key={i} className="chart-card">
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, color: "#EDE8DF" }}>{chart.title}</div>
                <div style={{ fontSize: 11, color: "rgba(237,232,223,0.38)", marginBottom: 20 }}>{chart.yLabel}</div>
                <ResponsiveContainer width="100%" height={200}>
                  {chart.type === "line" ? (
                    <LineChart data={chart.data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="year" tick={{ fill: "rgba(237,232,223,0.38)", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(237,232,223,0.38)", fontSize: 10 }} axisLine={false} tickLine={false} width={38} />
                      <Tooltip content={<ChartTooltip />} />
                      {chart.refValue && (
                        <ReferenceLine y={chart.refValue} stroke="rgba(201,168,76,0.35)" strokeDasharray="4 4"
                          label={{ value: chart.refLabel, fill: "#C9A84C", fontSize: 9, position: "insideTopRight" }} />
                      )}
                      <Line type="monotone" dataKey={chart.dataKey} stroke={chart.color}
                        strokeWidth={2.5} dot={{ fill: chart.color, r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  ) : (
                    <BarChart data={chart.data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="year" tick={{ fill: "rgba(237,232,223,0.38)", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "rgba(237,232,223,0.38)", fontSize: 10 }} axisLine={false} tickLine={false} width={38} />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey={chart.dataKey} fill={chart.color} radius={[4, 4, 0, 0]} opacity={0.8} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            ))}

            {/* Prime rate — always shown */}
            <div className="chart-card">
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, color: "#EDE8DF" }}>Prime Lending Rate</div>
              <div style={{ fontSize: 11, color: "rgba(237,232,223,0.38)", marginBottom: 20 }}>% per annum — Bank of Namibia</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={PRIME_RATE_HISTORY} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: "rgba(237,232,223,0.38)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(237,232,223,0.38)", fontSize: 10 }} axisLine={false} tickLine={false} width={38} domain={[6, 13]} />
                  <Tooltip content={<ChartTooltip />} />
                  <ReferenceLine y={9.8} stroke="rgba(201,168,76,0.35)" strokeDasharray="4 4"
                    label={{ value: "10yr avg", fill: "#C9A84C", fontSize: 9, position: "insideTopRight" }} />
                  <Line type="monotone" dataKey="rate" stroke="#C9A84C" strokeWidth={2.5}
                    dot={{ fill: "#C9A84C", r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            OPTIONAL EXTRA CONTENT (e.g. comparison table)
        ══════════════════════════════════════════ */}
        {extraContent && (
          <section style={{
            marginBottom: 64,
            paddingTop: 48,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            {extraContent}
          </section>
        )}

        {/* ══════════════════════════════════════════
            SECTION 3 — CALCULATOR
        ══════════════════════════════════════════ */}
        <section style={{
          paddingTop: 48,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <SectionDivider label="Calculator" />
          <div className="calc-grid">
            {/* Left: inputs */}
            <div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 700, marginBottom: 24, marginTop: 0 }}>
                Your Numbers
              </h2>
              {calculator}
            </div>

            {/* Right: results */}
            <div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 700, marginBottom: 24, marginTop: 0 }}>
                Your Results
              </h2>

              {activeResult ? (
                <div>
                  {/* Results table */}
                  <div style={{
                    background: "rgba(26,35,64,0.6)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 14, overflow: "hidden",
                    marginBottom: 16,
                  }}>
                    {activeResult.rows.map((row, i) => (
                      <div key={i} className={`result-row${row.highlight ? " highlighted" : ""}`}>
                        <span className="result-label">{row.label}</span>
                        <span className={`result-value${row.highlight ? " highlight" : ""}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommendation */}
                  {(() => {
                    const cfg = RECO[activeResult.recommendation];
                    return (
                      <div className="reco-card" style={{
                        background: cfg.bg,
                        border: `1px solid ${cfg.border}`,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                          <cfg.Icon size={22} color={cfg.color} style={{ flexShrink: 0 }} />
                          <div style={{ fontSize: 16, fontWeight: 700, color: cfg.color, lineHeight: 1.2 }}>
                            {cfg.label}
                          </div>
                        </div>
                        <p style={{ fontSize: 14, color: "rgba(237,232,223,0.78)", lineHeight: 1.8, margin: 0 }}>
                          {activeResult.summary}
                        </p>
                      </div>
                    );
                  })()}

                  {/* WhatsApp CTA */}
                  <a
                    href={`${WA_BASE}?text=${waMsg}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-wa"
                    style={{ marginBottom: 0 }}
                  >
                    {WA_ICON}
                    Discuss My Results with an Advisor
                  </a>

                  <p style={{
                    fontSize: 11, color: "rgba(237,232,223,0.28)",
                    marginTop: 14, lineHeight: 1.6, marginBottom: 0,
                  }}>
                    All calculations are illustrative only and do not constitute financial advice. IJG Securities (Pty) Ltd is regulated by NAMFISA.
                  </p>
                </div>
              ) : (
                <div style={{
                  background: "rgba(26,35,64,0.35)",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: 14, padding: "56px 24px",
                  textAlign: "center",
                }}>
                  <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}><Calculator size={48} color="rgba(237,232,223,0.35)" /></div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "rgba(237,232,223,0.55)" }}>
                    Your results will appear here
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(237,232,223,0.35)" }}>
                    Enter your details and click Calculate.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

      <SiteFooter />
    </div>
  );
}
