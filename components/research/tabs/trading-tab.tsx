"use client";

import { useState } from "react";
import { Language } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

/* ─── Types & mock data ─── */

interface MarketStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  points?: string;
}

interface StockRow {
  symbol: string;
  name: string;
  price: string;
  change: string;
  positive: boolean;
}

interface WatchlistRow {
  symbol: string;
  company: string;
  price: string;
  change: string;
  changePct: string;
  volume: string;
  marketCap: string;
  positive: boolean;
}

const MARKET_STATS: MarketStat[] = [
  { label: "NSX Overall Index", value: "1,847", points: "pts", change: "+1.2%", positive: true },
  { label: "NSX Local", value: "692", points: "pts", change: "+0.8%", positive: true },
  { label: "JSE All Share", value: "82,450", points: "pts", change: "-0.3%", positive: false },
  { label: "USD/NAD", value: "18.24", change: "+0.5%", positive: true },
];

const TOP_GAINERS: StockRow[] = [
  { symbol: "PDN", name: "Paladin Energy", price: "N$142.50", change: "+4.3%", positive: true },
  { symbol: "CGP", name: "Capricorn Group", price: "N$19.80", change: "+2.1%", positive: true },
  { symbol: "FNB", name: "FNB Namibia", price: "N$42.15", change: "+1.8%", positive: true },
  { symbol: "NBS", name: "Namibia Breweries", price: "N$35.60", change: "+1.2%", positive: true },
  { symbol: "ORY", name: "Oryx Properties", price: "N$18.90", change: "+0.9%", positive: true },
];

const TOP_LOSERS: StockRow[] = [
  { symbol: "TTO", name: "Trustco Group", price: "N$2.85", change: "-3.2%", positive: false },
  { symbol: "STI", name: "Stimulus Investments", price: "N$0.45", change: "-2.1%", positive: false },
  { symbol: "NCS", name: "Nictus Holdings", price: "N$3.10", change: "-1.5%", positive: false },
  { symbol: "SBN", name: "SBN Holdings", price: "N$9.20", change: "-0.8%", positive: false },
  { symbol: "BVN", name: "Bidvest Namibia", price: "N$28.50", change: "-0.4%", positive: false },
];

const WATCHLIST: WatchlistRow[] = [
  { symbol: "CGP", company: "Capricorn Group", price: "N$19.80", change: "+0.41", changePct: "+2.1%", volume: "124,500", marketCap: "N$10.2B", positive: true },
  { symbol: "FNB", company: "FNB Namibia", price: "N$42.15", change: "+0.74", changePct: "+1.8%", volume: "89,200", marketCap: "N$11.3B", positive: true },
  { symbol: "NBS", company: "Namibia Breweries", price: "N$35.60", change: "+0.42", changePct: "+1.2%", volume: "56,800", marketCap: "N$7.3B", positive: true },
  { symbol: "ORY", company: "Oryx Properties", price: "N$18.90", change: "+0.17", changePct: "+0.9%", volume: "32,100", marketCap: "N$3.8B", positive: true },
  { symbol: "PDN", company: "Paladin Energy", price: "N$142.50", change: "+5.87", changePct: "+4.3%", volume: "201,400", marketCap: "N$42.6B", positive: true },
  { symbol: "TTO", company: "Trustco Group", price: "N$2.85", change: "-0.09", changePct: "-3.2%", volume: "312,000", marketCap: "N$2.1B", positive: false },
  { symbol: "BVN", company: "Bidvest Namibia", price: "N$28.50", change: "-0.11", changePct: "-0.4%", volume: "18,700", marketCap: "N$5.6B", positive: false },
  { symbol: "SBN", company: "SBN Holdings", price: "N$9.20", change: "-0.07", changePct: "-0.8%", volume: "45,300", marketCap: "N$1.8B", positive: false },
  { symbol: "NCS", company: "Nictus Holdings", price: "N$3.10", change: "-0.05", changePct: "-1.5%", volume: "28,900", marketCap: "N$0.9B", positive: false },
];

const SECTORS = [
  { name: "Mining", pct: 18.5 },
  { name: "Banking", pct: 12.3 },
  { name: "Property", pct: 8.7 },
  { name: "Industrial", pct: 5.2 },
  { name: "Retail", pct: 3.1 },
];

const TRADEABLE_STOCKS = [
  { label: "CGP — Capricorn Group", price: 19.80 },
  { label: "FNB — FNB Namibia", price: 42.15 },
  { label: "NBS — Namibia Breweries", price: 35.60 },
  { label: "PDN — Paladin Energy", price: 142.50 },
  { label: "ORY — Oryx Properties", price: 18.90 },
  { label: "TTO — Trustco Group", price: 2.85 },
];

/* ─── Colours ─── */
const GOLD = "#C9A84C";
const GREEN = "#2ECC71";
const RED = "#EF4444";
const BG_DARK = "#07090F";
const BG_CARD = "#0D1117";
const TEXT_PRIMARY = "#E8E4DD";
const TEXT_MUTED = "#7A7680";

/* ─── Sparkline SVG (simple decorative mini-chart) ─── */
function Sparkline({ positive }: { positive: boolean }) {
  const color = positive ? GREEN : RED;
  const d = positive
    ? "M0 14 L4 12 L8 13 L12 9 L16 10 L20 7 L24 8 L28 4 L32 3 L36 5 L40 2"
    : "M0 3 L4 4 L8 2 L12 6 L16 5 L20 8 L24 7 L28 11 L32 12 L36 10 L40 14";
  return (
    <svg width={40} height={16} viewBox="0 0 40 16" style={{ display: "block" }}>
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Component ─── */
export interface TradingTabProps {
  language: Language;
}

export function TradingTab({ language }: TradingTabProps) {
  const isMobile = useIsMobile();
  const [buySell, setBuySell] = useState<"buy" | "sell">("buy");
  const [selectedStock, setSelectedStock] = useState(0);
  const [quantity, setQuantity] = useState("100");
  const [hoveredWatchlistRow, setHoveredWatchlistRow] = useState<number | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const currentStock = TRADEABLE_STOCKS[selectedStock];
  const qty = parseInt(quantity, 10) || 0;
  const estimatedTotal = (qty * currentStock.price).toFixed(2);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ─── Section 1: Market Overview ─── */}
      <p
        style={{
          fontSize: 12,
          color: TEXT_MUTED,
          fontWeight: 500,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        Market Overview
      </p>
      <h2
        style={{
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 24,
          color: TEXT_PRIMARY,
          marginBottom: 20,
        }}
      >
        Namibian Stock Market
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 36 }}>
        {MARKET_STATS.map((s) => (
          <div
            key={s.label}
            style={{
              background: BG_CARD,
              borderRadius: 12,
              padding: "18px 16px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p style={{ fontSize: 11, color: TEXT_MUTED, marginBottom: 8 }}>{s.label}</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1 }}>
                {s.value}
              </span>
              {s.points && (
                <span style={{ fontSize: 11, color: TEXT_MUTED, marginBottom: 2 }}>{s.points}</span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: s.positive ? GREEN : RED,
                }}
              >
                {s.change}
              </span>
              <Sparkline positive={s.positive} />
            </div>
          </div>
        ))}
      </div>

      {/* ─── Section 2: Top Movers ─── */}
      <h3
        style={{
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 18,
          color: TEXT_PRIMARY,
          marginBottom: 16,
        }}
      >
        Top Movers
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 36 }}>
        {/* Gainers */}
        <div
          style={{
            background: BG_CARD,
            borderRadius: 12,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: GREEN,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Top Gainers
          </p>
          {TOP_GAINERS.map((s) => (
            <div
              key={s.symbol}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY }}>{s.symbol}</span>
                <span style={{ fontSize: 12, color: TEXT_MUTED, marginLeft: 8 }}>{s.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY }}>{s.price}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: GREEN,
                    background: "rgba(46,204,113,0.12)",
                    padding: "2px 8px",
                    borderRadius: 99,
                  }}
                >
                  {s.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Losers */}
        <div
          style={{
            background: BG_CARD,
            borderRadius: 12,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: RED,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Top Losers
          </p>
          {TOP_LOSERS.map((s) => (
            <div
              key={s.symbol}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY }}>{s.symbol}</span>
                <span style={{ fontSize: 12, color: TEXT_MUTED, marginLeft: 8 }}>{s.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY }}>{s.price}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: RED,
                    background: "rgba(239,68,68,0.12)",
                    padding: "2px 8px",
                    borderRadius: 99,
                  }}
                >
                  {s.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Section 3: Watchlist ─── */}
      <h3
        style={{
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 18,
          color: TEXT_PRIMARY,
          marginBottom: 16,
        }}
      >
        Your Watchlist
      </h3>

      <div
        style={{
          background: BG_CARD,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: 36,
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <thead>
            <tr>
              {["Symbol", "Company", "Last Price", "Change", "Change %", "Volume", "Market Cap"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      fontSize: 11,
                      fontWeight: 600,
                      color: TEXT_MUTED,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      textAlign: "left",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {WATCHLIST.map((row, idx) => (
              <tr
                key={row.symbol}
                onMouseEnter={() => setHoveredWatchlistRow(idx)}
                onMouseLeave={() => setHoveredWatchlistRow(null)}
                style={{
                  background:
                    hoveredWatchlistRow === idx
                      ? "rgba(201,168,76,0.06)"
                      : "transparent",
                  transition: "background 0.15s ease",
                }}
              >
                <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 600, color: GOLD }}>
                  {row.symbol}
                </td>
                <td style={{ padding: "10px 16px", fontSize: 13, color: TEXT_PRIMARY }}>{row.company}</td>
                <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY }}>
                  {row.price}
                </td>
                <td
                  style={{
                    padding: "10px 16px",
                    fontSize: 13,
                    color: row.positive ? GREEN : RED,
                  }}
                >
                  {row.change}
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: row.positive ? GREEN : RED,
                      background: row.positive
                        ? "rgba(46,204,113,0.12)"
                        : "rgba(239,68,68,0.12)",
                      padding: "2px 8px",
                      borderRadius: 99,
                    }}
                  >
                    {row.changePct}
                  </span>
                </td>
                <td style={{ padding: "10px 16px", fontSize: 13, color: TEXT_MUTED }}>{row.volume}</td>
                <td style={{ padding: "10px 16px", fontSize: 13, color: TEXT_MUTED }}>{row.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            style={{
              padding: "6px 16px",
              borderRadius: 99,
              border: `1px solid ${GOLD}`,
              background: "transparent",
              color: GOLD,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            + Add to Watchlist
          </button>
        </div>
      </div>

      {/* ─── Section 4: Trading Panel ─── */}
      <h3
        style={{
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 18,
          color: TEXT_PRIMARY,
          marginBottom: 16,
        }}
      >
        Trade
      </h3>

      <div
        style={{
          background: BG_CARD,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.06)",
          padding: 24,
          marginBottom: 36,
          maxWidth: isMobile ? "100%" : 420,
        }}
      >
        {/* Stock selector */}
        <label style={{ fontSize: 11, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>
          Select Stock
        </label>
        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.3)",
            color: TEXT_PRIMARY,
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 16,
            outline: "none",
            cursor: "pointer",
          }}
        >
          {TRADEABLE_STOCKS.map((s, i) => (
            <option key={s.label} value={i} style={{ background: BG_CARD, color: TEXT_PRIMARY }}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Buy / Sell toggle */}
        <label style={{ fontSize: 11, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>
          Order Type
        </label>
        <div style={{ display: "flex", gap: 0, marginBottom: 16, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={() => setBuySell("buy")}
            style={{
              flex: 1,
              padding: "10px 0",
              border: "none",
              background: buySell === "buy" ? GREEN : "transparent",
              color: buySell === "buy" ? "#07090F" : TEXT_MUTED,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s ease",
            }}
          >
            BUY
          </button>
          <button
            onClick={() => setBuySell("sell")}
            style={{
              flex: 1,
              padding: "10px 0",
              border: "none",
              background: buySell === "sell" ? RED : "transparent",
              color: buySell === "sell" ? "#fff" : TEXT_MUTED,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s ease",
            }}
          >
            SELL
          </button>
        </div>

        {/* Quantity */}
        <label style={{ fontSize: 11, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.3)",
            color: TEXT_PRIMARY,
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 16,
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {/* Price / Total */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: TEXT_MUTED }}>Current Price</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>N${currentStock.price.toFixed(2)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontSize: 12, color: TEXT_MUTED }}>Estimated Total</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: GOLD }}>N${estimatedTotal}</span>
        </div>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          style={{
            width: "100%",
            padding: "13px 0",
            borderRadius: 10,
            border: "none",
            background: `linear-gradient(135deg, ${GOLD}, #D4A843)`,
            color: "#07090F",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 12,
          }}
        >
          Place {buySell === "buy" ? "Buy" : "Sell"} Order
        </button>

        {orderPlaced && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.25)",
              fontSize: 13,
              color: GOLD,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Demo mode — contact IJG to open a trading account
          </div>
        )}

        <p style={{ fontSize: 11, color: TEXT_MUTED, textAlign: "center", lineHeight: 1.5 }}>
          IJG Securities is a licensed stockbroker regulated by NAMFISA
        </p>
      </div>

      {/* ─── Section 5: Sector Performance ─── */}
      <h3
        style={{
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 18,
          color: TEXT_PRIMARY,
          marginBottom: 16,
        }}
      >
        Sector Performance (YTD)
      </h3>

      <div
        style={{
          background: BG_CARD,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.06)",
          padding: 24,
          marginBottom: 36,
        }}
      >
        {SECTORS.map((s) => (
          <div key={s.name} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY }}>{s.name}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: GREEN }}>+{s.pct}%</span>
            </div>
            <div
              style={{
                width: "100%",
                height: 8,
                borderRadius: 99,
                background: "rgba(255,255,255,0.04)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(s.pct / 20) * 100}%`,
                  height: "100%",
                  borderRadius: 99,
                  background: `linear-gradient(90deg, ${GOLD}, #D4A843)`,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ─── Section 6: CTA ─── */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(27,79,114,0.1))",
          borderRadius: 16,
          border: "1px solid rgba(201,168,76,0.15)",
          padding: 32,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <h3
          style={{
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 22,
            color: TEXT_PRIMARY,
            marginBottom: 8,
          }}
        >
          Ready to trade?
        </h3>
        <p style={{ fontSize: 14, color: TEXT_MUTED, marginBottom: 20 }}>
          Open a brokerage account with IJG Securities and access the Namibian Stock Exchange.
        </p>
        <a
          href="https://wa.me/264811224466?text=I%27d%20like%20to%20open%20a%20trading%20account%20with%20IJG"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: 99,
            background: `linear-gradient(135deg, ${GOLD}, #D4A843)`,
            color: "#07090F",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 14,
          }}
        >
          Open a Trading Account
        </a>
        <p style={{ fontSize: 13, color: TEXT_MUTED }}>
          Already have an account?{" "}
          <a
            href="#"
            style={{ color: GOLD, textDecoration: "underline" }}
            onClick={(e) => e.preventDefault()}
          >
            Sign in to your trading platform
          </a>
        </p>
      </div>
    </div>
  );
}

export default TradingTab;
