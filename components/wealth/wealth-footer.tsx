"use client";

import Link from "next/link";
import { IJG_LOGO, TAKAT_LOGO, WA_BASE, PRODUCTS } from "@/lib/wealth-data";

const WA_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function WealthFooter() {
  return (
    <footer style={{
      background: "#060810",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "48px 20px 32px",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Top grid */}
        <div className="footer-grid" style={{ marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <img src={IJG_LOGO} alt="IJG" style={{ height: 40, width: "auto", objectFit: "contain", marginBottom: 14 }} />
            <p style={{ fontSize: 13, color: "rgba(237,232,223,0.4)", lineHeight: 1.75, maxWidth: 280, margin: 0 }}>
              IJG Securities (Pty) Ltd is a licensed stockbroker and wealth management firm regulated by NAMFISA.
            </p>
          </div>

          {/* Products */}
          <div>
            <div style={{
              fontSize: 10, fontWeight: 800, color: "rgba(201,168,76,0.65)",
              letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16,
            }}>
              Products
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.values(PRODUCTS).map(p => (
                <Link key={p.key} href={`/wealth/${p.key}`} style={{
                  fontSize: 14, color: "rgba(237,232,223,0.52)",
                  textDecoration: "none", transition: "color 0.2s",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  {p.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{
              fontSize: 10, fontWeight: 800, color: "rgba(201,168,76,0.65)",
              letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16,
            }}>
              Get in Touch
            </div>
            <a
              href={`${WA_BASE}?text=Hi%2C+I%27d+like+to+speak+to+an+IJG+Wealth+advisor.`}
              target="_blank" rel="noopener noreferrer"
              className="btn-wa"
              style={{ marginBottom: 16, fontSize: 14 }}
            >
              {WA_ICON}
              WhatsApp an Advisor
            </a>
            <p style={{ fontSize: 12, color: "rgba(237,232,223,0.32)", lineHeight: 1.65, margin: 0 }}>
              Windhoek, Namibia<br />
              Monday – Friday, 8:00 – 17:00
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 }} />

        {/* Bottom row */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: 16,
        }}>
          <p style={{ fontSize: 11, color: "rgba(237,232,223,0.28)", lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
            All calculations are for illustrative purposes only and do not constitute financial advice.
            IJG Securities (Pty) Ltd is regulated by NAMFISA. Past performance is not indicative of future results.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "rgba(237,232,223,0.28)" }}>Powered by</span>
            <img src={TAKAT_LOGO} alt="takat.ai" style={{ height: 18, width: "auto", objectFit: "contain", opacity: 0.55 }} />
            <span style={{ fontSize: 11, color: "rgba(237,232,223,0.38)", fontWeight: 600 }}>takat.ai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
