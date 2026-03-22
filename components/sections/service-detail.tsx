import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import type { ServiceDetail } from "@/lib/service-details";

export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  return (
    <main style={{ background: "#07090F", color: "#F5F0E8" }}>
      <SiteHeader />

      {/* Hero */}
      <section style={{ padding: "5rem 0 3rem", background: "#0D1117" }}>
        <div className="ijg-container">
          <Link
            href="/services"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.875rem",
              color: "#9CA3AF",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: "1.5rem",
            }}
          >
            &larr; All Services
          </Link>
          <span
            className="section-label"
            style={{ marginBottom: "1rem", display: "block" }}
          >
            OUR SERVICES
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
            {service.title}
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
            {service.headline}
          </p>
        </div>
      </section>

      {/* Description */}
      <section style={{ padding: "4rem 0", background: "#07090F" }}>
        <div className="ijg-container">
          <div
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {service.description.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#9CA3AF",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
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
              CAPABILITIES
            </span>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#F5F0E8",
              }}
            >
              What We Offer
            </h2>
            <div className="gold-divider" style={{ margin: "1rem auto 0" }} />
          </div>
          <div
            id="service-features"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.25rem",
            }}
          >
            {service.features.map((feature) => (
              <div key={feature.title} className="ijg-card">
                <h3
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#F5F0E8",
                    marginBottom: "0.5rem",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    color: "#9CA3AF",
                    lineHeight: 1.65,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (min-width: 640px) {
            #service-features {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "4rem 0",
          background: "#07090F",
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
            Ready to Get Started?
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
            Speak to one of our specialists about how IJG can help you achieve
            your financial objectives.
          </p>
          <Link
            href="/#prospect-form"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            {service.cta}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
