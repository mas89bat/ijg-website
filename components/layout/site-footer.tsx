"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

import { COMPANY_INFO, NAV_ITEMS } from "@/lib/constants";
import { SocialLinks } from "@/components/shared/social-links";
import { useLanguage } from "@/contexts/language-context";
import { T } from "@/lib/translations";

const LEGAL_LINKS = [
  { title: "Privacy Policy", href: "/legal/privacy" },
  { title: "Terms of Use", href: "/legal/terms" },
  { title: "PAIA Manual", href: "/legal/paia" },
  { title: "Complaints", href: "/legal/complaints" },
  { title: "Cookie Policy", href: "/legal/cookies" },
];

const QUICK_LINKS = [
  ...NAV_ITEMS,
  { title: "Careers", href: "/careers" },
];

const WEALTH_LINKS = [
  { title: "Home Loan Calculator", href: "/wealth/home-loan" },
  { title: "Vehicle Finance", href: "/wealth/vehicle-finance" },
  { title: "Retirement Planner", href: "/wealth/retirement" },
  { title: "Education Savings", href: "/wealth/education" },
  { title: "Investment Growth", href: "/wealth/invest" },
];

const WA_NUMBER = "264612566666";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%27d%20like%20to%20speak%20with%20an%20IJG%20advisor.`;

export function SiteFooter({ hideContactSection = false }: { hideContactSection?: boolean } = {}) {
  const { language } = useLanguage();
  const t = T[language];

  return (
    <>
      {/* Contact Section */}
      {!hideContactSection && <section
        id="contact-footer"
        style={{
          padding: "5rem 0",
          background: "#0D1117",
          borderTop: "1px solid #1F2937",
        }}
      >
        <div className="ijg-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}>
            {/* Left */}
            <div>
              <span
                className="section-label"
                style={{ marginBottom: "1.25rem", display: "inline-block" }}
              >
                {t.footer_contact_label}
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
                {t.footer_contact_title}
              </h2>
              <div className="gold-divider" />
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#9CA3AF",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  marginTop: "1.25rem",
                  marginBottom: "2rem",
                }}
              >
                {t.footer_contact_body}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ color: "#C9A84C", marginTop: "2px" }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: 600,
                        color: "#F5F0E8",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {t.footer_office}
                    </div>
                    <div
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        color: "#9CA3AF",
                        lineHeight: 1.6,
                      }}
                    >
                      {COMPANY_INFO.address}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ color: "#C9A84C" }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: 600,
                        color: "#F5F0E8",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {t.footer_phone}
                    </div>
                    <a
                      href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        color: "#9CA3AF",
                        textDecoration: "none",
                      }}
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ color: "#C9A84C" }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontWeight: 600,
                        color: "#F5F0E8",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {t.footer_email}
                    </div>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        color: "#9CA3AF",
                        textDecoration: "none",
                      }}
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  {t.footer_wa}
                </a>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <SocialLinks />
              </div>
            </div>

            {/* Right -- map placeholder */}
            <div
              className="ijg-card"
              style={{
                minHeight: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "1rem",
                background: "rgba(201,168,76,0.04)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <MapPin size={40} color="#C9A84C" />
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "#F5F0E8",
                    marginBottom: "0.5rem",
                  }}
                >
                  1@Steps, Kleine Kuppe
                </div>
                <div
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    color: "#9CA3AF",
                  }}
                >
                  Windhoek, Namibia
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=1@Steps+Windhoek+Namibia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem" }}
              >
                {t.footer_maps}
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            #contact-footer > div > div {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      </section>}

      {/* Footer */}
      <footer
        style={{
          background: "#07090F",
          borderTop: "1px solid #1F2937",
          padding: "3rem 0 2rem",
        }}
      >
        <div className="ijg-container">
          <div
            id="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.25rem",
                  color: "#F5F0E8",
                  marginBottom: "0.75rem",
                }}
              >
                IJG Group
              </div>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.85rem",
                  color: "#6B7280",
                  lineHeight: 1.7,
                  maxWidth: "280px",
                }}
              >
                {t.footer_brand_desc}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "#9CA3AF",
                  marginBottom: "1rem",
                }}
              >
                {t.footer_quick_links}
              </div>
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                    marginBottom: "0.6rem",
                    textDecoration: "none",
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Wealth Tools */}
            <div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "#9CA3AF",
                  marginBottom: "1rem",
                }}
              >
                {t.footer_wealth_tools}
              </div>
              {WEALTH_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                    marginBottom: "0.6rem",
                    textDecoration: "none",
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* Legal */}
            <div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "#9CA3AF",
                  marginBottom: "1rem",
                }}
              >
                {t.footer_legal}
              </div>
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                    marginBottom: "0.6rem",
                    textDecoration: "none",
                  }}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            id="footer-bottom"
            style={{
              borderTop: "1px solid #1F2937",
              paddingTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.75rem",
                color: "#4B5563",
                lineHeight: 1.6,
              }}
            >
              {COMPANY_INFO.regulatory}
            </p>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.75rem",
                color: "#4B5563",
              }}
            >
              &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 12,
              }}
            >
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.7rem", color: "#6B7280" }}>
                Powered by
              </span>
              <a
                href="https://takat.ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  textDecoration: "none",
                }}
              >
                <img
                  src="/takat-logo.svg"
                  alt="takat.ai"
                  style={{ height: 16, width: "auto" }}
                />
                <span style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#9CA3AF",
                  letterSpacing: "-0.01em",
                }}>
                  takat<span style={{ color: "#E87454" }}>.</span>ai
                </span>
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 768px) {
            #footer-grid {
              grid-template-columns: 2fr 1fr 1fr 1fr !important;
            }
            #footer-bottom {
              flex-direction: row !important;
              justify-content: space-between !important;
              align-items: center !important;
            }
          }
        `}</style>
      </footer>
    </>
  );
}
