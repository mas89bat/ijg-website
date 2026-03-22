"use client";

import { useLanguage } from "@/contexts/language-context";
import { T } from "@/lib/translations";
import { COMPANY_INFO } from "@/lib/constants";
import { Users, Target, Lightbulb, Heart } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    titleKey: "Independence" as const,
    descKey: "We operate free from bank ownership and product bias, allowing our team to always put clients first." as const,
  },
  {
    icon: Lightbulb,
    titleKey: "Excellence" as const,
    descKey: "We hold ourselves to the highest standards in research, advisory, and client service." as const,
  },
  {
    icon: Users,
    titleKey: "Collaboration" as const,
    descKey: "Our team works together across disciplines to deliver holistic solutions for every client." as const,
  },
  {
    icon: Heart,
    titleKey: "Commitment to Namibia" as const,
    descKey: "We are deeply rooted in the Namibian market and dedicated to building the nation's financial future." as const,
  },
];

export function CareersContent() {
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
            {t.careers_label}
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
            {t.careers_title}
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
            {t.careers_subtitle}
          </p>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "4rem 0", background: "#07090F" }}>
        <div className="ijg-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              className="section-label"
              style={{ marginBottom: "1rem", display: "inline-block" }}
            >
              {t.careers_values_label}
            </span>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#F5F0E8",
              }}
            >
              {t.careers_values_title}
            </h2>
            <div className="gold-divider" style={{ margin: "1rem auto 0" }} />
          </div>
          <div
            id="careers-values"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.25rem",
            }}
          >
            {VALUES.map((value) => (
              <div key={value.titleKey} className="ijg-card">
                <div style={{ color: "#C9A84C", marginBottom: "1rem" }}>
                  <value.icon size={32} />
                </div>
                <h3
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#F5F0E8",
                    marginBottom: "0.5rem",
                  }}
                >
                  {value.titleKey}
                </h3>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    color: "#9CA3AF",
                    lineHeight: 1.65,
                  }}
                >
                  {value.descKey}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (min-width: 640px) {
            #careers-values {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (min-width: 1024px) {
            #careers-values {
              grid-template-columns: repeat(4, 1fr) !important;
            }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "4rem 0",
          background: "#0D1117",
          borderTop: "1px solid #1F2937",
          textAlign: "center",
        }}
      >
        <div className="ijg-container">
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#F5F0E8",
              marginBottom: "1rem",
            }}
          >
            {t.careers_cta_title}
          </h2>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "#9CA3AF",
              fontSize: "0.95rem",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            {t.careers_cta_body}
          </p>
          <a
            href={`mailto:${COMPANY_INFO.email}?subject=Career%20Enquiry`}
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            {t.careers_cta_button}
          </a>
        </div>
      </section>
    </>
  );
}
