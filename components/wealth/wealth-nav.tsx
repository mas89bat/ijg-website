"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IJG_LOGO, WA_BASE } from "@/lib/wealth-data";

const NAV_LINKS = [
  { href: "/wealth/home-loan",       label: "Home Loan",       icon: "\u{1F3E0}" },
  { href: "/wealth/vehicle-finance", label: "Vehicle Finance",  icon: "\u{1F697}" },
  { href: "/wealth/retirement",      label: "Retirement",       icon: "\u{1F305}" },
  { href: "/wealth/education",       label: "Education",        icon: "\u{1F393}" },
  { href: "/wealth/invest",          label: "Invest",           icon: "\u{1F4C8}" },
];

const WA_SVG = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function WealthNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,14,26,0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        height: 64,
        display: "flex", alignItems: "center",
      }}>
        <div style={{
          width: "100%", maxWidth: 1280, margin: "0 auto",
          padding: "0 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16,
        }}>
          {/* Logo */}
          <Link href="/wealth" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <img src={IJG_LOGO} alt="IJG" style={{ height: 34, width: "auto", objectFit: "contain" }} />
            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "1.5px", textTransform: "uppercase", lineHeight: 1 }}>Wealth</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#EDE8DF", letterSpacing: "0.2px", lineHeight: 1.4 }}>Financial Planning</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: "6px 13px",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: pathname === l.href ? 600 : 500,
                color: pathname === l.href ? "#C9A84C" : "rgba(237,232,223,0.65)",
                background: pathname === l.href ? "rgba(201,168,76,0.1)" : "transparent",
                textDecoration: "none",
                transition: "all 0.15s",
                border: pathname === l.href ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
                whiteSpace: "nowrap",
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop WhatsApp CTA */}
          <a
            href={`${WA_BASE}?text=Hi%2C+I%27d+like+to+speak+to+an+IJG+Wealth+advisor.`}
            target="_blank" rel="noopener noreferrer"
            className="nav-desktop"
            style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "#25D366", color: "#fff",
              fontSize: 13, fontWeight: 600,
              padding: "9px 16px",
              borderRadius: 8,
              textDecoration: "none",
              whiteSpace: "nowrap", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(37,211,102,0.2)",
            }}
          >
            {WA_SVG}
            Speak to an Advisor
          </a>

          {/* Mobile: WhatsApp icon + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="nav-mobile">
            <a
              href={`${WA_BASE}?text=Hi%2C+I%27d+like+to+speak+to+an+IJG+Wealth+advisor.`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 40, height: 40, borderRadius: 10,
                background: "#25D366", color: "#fff",
                textDecoration: "none", flexShrink: 0,
              }}
              aria-label="WhatsApp"
            >
              {WA_SVG}
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 40, height: 40, borderRadius: 10,
                background: menuOpen ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#EDE8DF", cursor: "pointer",
                flexShrink: 0,
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, bottom: 0,
          zIndex: 99,
          background: "rgba(10,14,26,0.98)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          overflowY: "auto",
          padding: "16px 20px 40px",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ marginBottom: 8 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: "rgba(201,168,76,0.6)",
              letterSpacing: "1.5px", textTransform: "uppercase",
              padding: "0 4px", marginBottom: 8,
            }}>
              Financial Tools
            </div>
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 16px",
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: pathname === l.href ? 600 : 400,
                  color: pathname === l.href ? "#C9A84C" : "#EDE8DF",
                  background: pathname === l.href ? "rgba(201,168,76,0.08)" : "transparent",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <span style={{ fontSize: 20, width: 28, textAlign: "center" }}>{l.icon}</span>
                {l.label}
                {pathname === l.href && (
                  <span style={{ marginLeft: "auto", color: "#C9A84C", fontSize: 12 }}>{"\u25CF"}</span>
                )}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <a
              href={`${WA_BASE}?text=Hi%2C+I%27d+like+to+speak+to+an+IJG+Wealth+advisor.`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: "#25D366", color: "#fff",
                fontSize: 16, fontWeight: 700,
                padding: "16px 24px", borderRadius: 12,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
              }}
            >
              {WA_SVG}
              Speak to an Advisor on WhatsApp
            </a>
            <p style={{
              fontSize: 11, color: "rgba(237,232,223,0.3)",
              textAlign: "center", marginTop: 12, lineHeight: 1.5,
            }}>
              IJG Securities (Pty) Ltd — Regulated by NAMFISA
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
