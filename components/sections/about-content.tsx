"use client";

import { useLanguage } from "@/contexts/language-context";
import { T } from "@/lib/translations";
import { COMPANY_INFO, DIFFERENTIATORS, TRUST_METRICS } from "@/lib/constants";
import {
  Scale,
  ShieldCheck,
  MapPin,
  Globe,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  ShieldCheck,
  MapPin,
  Globe,
};

export function AboutContent() {
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
            {t.about_page_label}
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
            {t.about_page_title}
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
            {COMPANY_INFO.tagline}
          </p>
        </div>
      </section>

      {/* Story + Stats */}
      <section style={{ padding: "4rem 0", background: "#07090F" }}>
        <div className="ijg-container">
          <div
            id="about-story"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#F5F0E8",
                  marginBottom: "1.5rem",
                }}
              >
                {t.about_page_story_title}
              </h2>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#9CA3AF",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <p>{t.about_page_story_1}</p>
                <p>{t.about_page_story_2}</p>
                <p>{t.about_page_story_3}</p>
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.25rem",
                alignSelf: "center",
              }}
            >
              {TRUST_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="ijg-card"
                  style={{ textAlign: "center", padding: "1.5rem" }}
                >
                  <p
                    style={{
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#C9A84C",
                    }}
                  >
                    {metric.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.82rem",
                      color: "#9CA3AF",
                      marginTop: "0.25rem",
                    }}
                  >
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            #about-story {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* Differentiators */}
      <section
        style={{
          padding: "4rem 0",
          background: "#0D1117",
          borderTop: "1px solid #1F2937",
        }}
      >
        <div className="ijg-container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              className="section-label"
              style={{ marginBottom: "1rem", display: "inline-block" }}
            >
              {t.about_label}
            </span>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#F5F0E8",
              }}
            >
              {t.about_label}
            </h2>
            <div className="gold-divider" style={{ margin: "1rem auto 0" }} />
          </div>
          <div
            id="about-diff"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.25rem",
            }}
          >
            {DIFFERENTIATORS.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.title} className="ijg-card">
                  {Icon && (
                    <div style={{ color: "#C9A84C", marginBottom: "1rem" }}>
                      <Icon size={32} />
                    </div>
                  )}
                  <h3
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "#F5F0E8",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.875rem",
                      color: "#9CA3AF",
                      lineHeight: 1.65,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (min-width: 640px) {
            #about-diff {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (min-width: 1024px) {
            #about-diff {
              grid-template-columns: repeat(4, 1fr) !important;
            }
          }
        `}</style>
      </section>

      {/* Regulation & Address */}
      <section
        style={{
          padding: "4rem 0",
          background: "#07090F",
          borderTop: "1px solid #1F2937",
        }}
      >
        <div className="ijg-container">
          <div
            id="about-reg"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#F5F0E8",
                  marginBottom: "1rem",
                }}
              >
                {t.about_page_reg_title}
              </h2>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#9CA3AF",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "1rem",
                }}
              >
                {COMPANY_INFO.regulatory}
              </p>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#9CA3AF",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                }}
              >
                We adhere to the highest standards of governance, compliance, and
                client protection as mandated by Namibian financial regulations.
              </p>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#F5F0E8",
                  marginBottom: "1rem",
                }}
              >
                {t.about_page_visit_title}
              </h2>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#9CA3AF",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                }}
              >
                {COMPANY_INFO.address}
              </p>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#9CA3AF",
                  fontSize: "0.95rem",
                  marginTop: "0.5rem",
                }}
              >
                {t.footer_phone}: {COMPANY_INFO.phone}
              </p>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#9CA3AF",
                  fontSize: "0.95rem",
                  marginTop: "0.25rem",
                }}
              >
                {t.footer_email}:{" "}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  style={{ color: "#C9A84C", textDecoration: "none" }}
                >
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            #about-reg {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
