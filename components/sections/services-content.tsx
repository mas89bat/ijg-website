"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { T } from "@/lib/translations";
import { SERVICE_PILLARS } from "@/lib/constants";
import {
  Lightbulb,
  TrendingUp,
  BarChart3,
  Building2,
  Shield,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  TrendingUp,
  BarChart3,
  Building2,
  Shield,
};

export function ServicesContent() {
  const { language } = useLanguage();
  const t = T[language];

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "5rem 0 3rem", background: "#0D1117" }}>
        <div className="ijg-container">
          <span
            className="section-label"
            style={{ marginBottom: "1rem", display: "inline-block" }}
          >
            {t.services_page_label}
          </span>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#F5F0E8",
              marginBottom: "1rem",
            }}
          >
            {t.services_page_title}
          </h1>
          <div className="gold-divider" />
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "#9CA3AF",
              fontSize: "1.1rem",
              maxWidth: "600px",
              marginTop: "1rem",
              lineHeight: 1.7,
            }}
          >
            {t.services_page_subtitle}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section style={{ padding: "4rem 0", background: "#07090F" }}>
        <div className="ijg-container">
          <div
            id="services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.25rem",
            }}
          >
            {SERVICE_PILLARS.map((pillar) => {
              const Icon = iconMap[pillar.icon];
              return (
                <Link
                  key={pillar.id}
                  href={pillar.href}
                  className="ijg-card"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "border-color 0.2s",
                  }}
                >
                  {Icon && (
                    <div style={{ color: "#C9A84C", marginBottom: "1.25rem" }}>
                      <Icon size={36} />
                    </div>
                  )}
                  <h2
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#F5F0E8",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {pillar.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.875rem",
                      color: "#9CA3AF",
                      lineHeight: 1.65,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {pillar.description}
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
                    {t.services_learn_more} <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (min-width: 640px) {
            #services-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (min-width: 1024px) {
            #services-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
