"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RESEARCH_ARTICLES } from "@/lib/constants";
import { categoryLabels } from "@/types";
import { useLanguage } from "@/contexts/language-context";
import { T } from "@/lib/translations";

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ResearchPreviewGrid() {
  const { language } = useLanguage();
  const t = T[language];

  return (
    <section id="research" style={{ padding: "5rem 0", background: "#07090F" }}>
      <div className="ijg-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            className="section-label"
            style={{ marginBottom: "1rem", display: "inline-block" }}
          >
            {t.research_label}
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
            {t.research_title}
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
            {t.research_subtitle}
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
        >
          {RESEARCH_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={article.href}
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.75rem",
                    color: "#6B7280",
                  }}
                >
                  {formatDate(article.publishedAt)}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: "9999px",
                    background: "rgba(201,168,76,0.1)",
                    padding: "0.2rem 0.6rem",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    color: "#C9A84C",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.08em",
                  }}
                >
                  {categoryLabels[article.category]}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  lineHeight: 1.4,
                }}
              >
                {article.title}
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
                {article.abstract}
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
                {t.research_read} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
          <Link
            href="/research"
            className="btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {t.research_cta} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #research > div > div:nth-child(2) {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
