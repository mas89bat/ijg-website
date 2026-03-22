"use client";

import Link from "next/link";
import { Home, Car, Clock, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { T } from "@/lib/translations";

const WEALTH_KEYS: { titleKey: keyof typeof T.en; descKey: keyof typeof T.en; href: string; icon: LucideIcon }[] = [
  {
    titleKey: "wealth_home_loan",
    descKey: "wealth_home_loan_desc",
    href: "/wealth/home-loan",
    icon: Home,
  },
  {
    titleKey: "wealth_vehicle",
    descKey: "wealth_vehicle_desc",
    href: "/wealth/vehicle-finance",
    icon: Car,
  },
  {
    titleKey: "wealth_retirement",
    descKey: "wealth_retirement_desc",
    href: "/wealth/retirement",
    icon: Clock,
  },
  {
    titleKey: "wealth_education",
    descKey: "wealth_education_desc",
    href: "/wealth/education",
    icon: GraduationCap,
  },
  {
    titleKey: "wealth_invest",
    descKey: "wealth_invest_desc",
    href: "/wealth/invest",
    icon: TrendingUp,
  },
];

export function WealthPreview() {
  const { language } = useLanguage();
  const t = T[language];

  return (
    <section id="wealth-tools" style={{ padding: "5rem 0", background: "#0D1117" }}>
      <div className="ijg-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            className="section-label"
            style={{ marginBottom: "1rem", display: "inline-block" }}
          >
            {t.wealth_label}
          </span>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "#F5F0E8",
              marginBottom: "1rem",
            }}
          >
            {t.wealth_title}
          </h2>
          <div className="gold-divider" style={{ margin: "0 auto" }} />
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "#9CA3AF",
              fontSize: "1rem",
              maxWidth: "520px",
              margin: "1rem auto 0",
              lineHeight: 1.7,
            }}
          >
            {t.wealth_subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
        >
          {WEALTH_KEYS.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="ijg-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                textDecoration: "none",
                color: "inherit",
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C9A84C",
                }}
              >
                <product.icon size={22} />
              </div>
              <h3
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                }}
              >
                {t[product.titleKey]}
              </h3>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.875rem",
                  color: "#9CA3AF",
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                {t[product.descKey]}
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#C9A84C",
                }}
              >
                {t.wealth_try} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
          <Link
            href="/wealth"
            className="btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {t.wealth_cta} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          #wealth-tools > div > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          #wealth-tools > div > div:nth-child(2) {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 1280px) {
          #wealth-tools > div > div:nth-child(2) {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
