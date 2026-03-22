"use client";

import { useLanguage } from "@/contexts/language-context";
import { T } from "@/lib/translations";
import { COMPANY_INFO } from "@/lib/constants";
import { SocialLinks } from "@/components/shared/social-links";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export function ContactContent() {
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
            {t.contact_label}
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
            {t.contact_title}
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
            {t.contact_subtitle}
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section style={{ padding: "4rem 0", background: "#07090F" }}>
        <div className="ijg-container">
          <div
            id="contact-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}
          >
            {/* Contact Details */}
            <div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#F5F0E8",
                  marginBottom: "0.75rem",
                }}
              >
                {t.contact_get_in_touch}
              </h2>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#9CA3AF",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                {t.contact_body}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                  className="ijg-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(201,168,76,0.1)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={20} style={{ color: "#C9A84C" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#F5F0E8",
                      }}
                    >
                      {t.footer_phone}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        color: "#9CA3AF",
                      }}
                    >
                      {COMPANY_INFO.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="ijg-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(201,168,76,0.1)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={20} style={{ color: "#C9A84C" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#F5F0E8",
                      }}
                    >
                      {t.footer_email}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        color: "#9CA3AF",
                      }}
                    >
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                </a>

                <div
                  className="ijg-card"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(201,168,76,0.1)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={20} style={{ color: "#C9A84C" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#F5F0E8",
                      }}
                    >
                      {t.footer_office}
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        color: "#9CA3AF",
                      }}
                    >
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/264612566666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ijg-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "rgba(16,185,129,0.1)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={20} style={{ color: "#10B981" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#F5F0E8",
                      }}
                    >
                      WhatsApp
                    </p>
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        color: "#9CA3AF",
                      }}
                    >
                      {t.footer_wa}
                    </p>
                  </div>
                </a>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <h3
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#F5F0E8",
                    marginBottom: "0.75rem",
                  }}
                >
                  {t.contact_follow}
                </h3>
                <SocialLinks />
              </div>
            </div>

            {/* Map Embed */}
            <div
              style={{
                overflow: "hidden",
                borderRadius: "12px",
                border: "1px solid #1F2937",
                background: "#0D1117",
                height: "100%",
                minHeight: "400px",
              }}
            >
              <iframe
                title="IJG Securities Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.5!2d17.0844!3d-22.5908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM1JzI3LjAiUyAxN8KwMDUnMDMuOCJF!5e0!3m2!1sen!2sna!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            #contact-grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
