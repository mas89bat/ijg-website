"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";

import { NAV_ITEMS, COMPANY_INFO, SERVICE_PILLARS } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { SocialLinks } from "@/components/shared/social-links";
import { useLanguage } from "@/contexts/language-context";
import { T } from "@/lib/translations";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MOBILE_DROPDOWNS: Record<string, { title: string; href: string }[]> = {
  "/services": SERVICE_PILLARS.map((p) => ({ title: p.title, href: p.href })),
  "/wealth": [
    { title: "Home Loan", href: "/wealth/home-loan" },
    { title: "Vehicle Finance", href: "/wealth/vehicle-finance" },
    { title: "Retirement", href: "/wealth/retirement" },
    { title: "Education", href: "/wealth/education" },
    { title: "Invest", href: "/wealth/invest" },
  ],
  "/research": [
    { title: "Research Hub", href: "/research" },
    { title: "AI Query", href: "/research/app" },
  ],
};

const NAV_TRANSLATION_MAP: Record<string, keyof typeof T.en> = {
  "/services": "nav_services",
  "/wealth": "nav_wealth",
  "/research": "nav_research",
  "/about": "nav_about",
  "/contact": "nav_contact",
};

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = T[language];

  function handleScrollTo(e: React.MouseEvent) {
    e.preventDefault();
    onOpenChange(false);
    // Small delay to allow sheet close animation before scrolling
    requestAnimationFrame(() => {
      const target = document.getElementById("prospect-form");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 p-0" style={{ background: "#0D1117", borderLeft: "1px solid #1F2937" }}>
        <SheetHeader className="px-6 py-5" style={{ borderBottom: "1px solid #1F2937" }}>
          <SheetTitle>
            <img src="/ijg-logo.png" alt="IJG" style={{ height: 32, width: "auto" }} />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col px-6 py-6">
          {/* Primary CTAs */}
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/26481000000?text=Hello%2C%20I%27d%20like%20to%20start%20investing%20with%20IJG."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #C49A2A, #A8843B)",
                color: "#07090F",
                fontSize: "0.875rem",
                fontWeight: 600,
                fontFamily: "DM Sans, sans-serif",
                textDecoration: "none",
                border: "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t.mobile_start_investing}
            </a>
            <a
              href={COMPANY_INFO.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                background: "transparent",
                color: "#C9A84C",
                fontSize: "0.875rem",
                fontWeight: 600,
                fontFamily: "DM Sans, sans-serif",
                textDecoration: "none",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              {t.mobile_client_login}
            </a>
          </div>

          <div style={{ height: "1px", background: "#1F2937", margin: "24px 0" }} />

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 overflow-y-auto" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const subItems = MOBILE_DROPDOWNS[item.href];
              const isExpanded = expandedSection === item.href;
              const translationKey = NAV_TRANSLATION_MAP[item.href];
              const label = translationKey ? t[translationKey] : item.title;

              return (
                <div key={item.href}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => onOpenChange(false)}
                      style={{
                        flex: 1,
                        borderRadius: "8px",
                        padding: "0.625rem 0.75rem",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        fontFamily: "DM Sans, sans-serif",
                        color: isActive ? "#C9A84C" : "#9CA3AF",
                        background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
                        textDecoration: "none",
                        transition: "color 0.15s, background 0.15s",
                      }}
                    >
                      {label}
                    </Link>
                    {subItems && (
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : item.href)}
                        style={{ borderRadius: "8px", padding: "8px", color: "#7A7680", background: "none", border: "none", cursor: "pointer" }}
                        aria-label={`Expand ${label}`}
                      >
                        <ChevronDown className={cn("size-4 transition-transform", isExpanded && "rotate-180")} style={{ color: "inherit" }} />
                      </button>
                    )}
                  </div>
                  {subItems && isExpanded && (
                    <div style={{ marginLeft: "16px", display: "flex", flexDirection: "column", gap: "2px", borderLeft: "1px solid rgba(201,168,76,0.1)", paddingLeft: "12px", paddingTop: "4px", paddingBottom: "4px" }}>
                      {subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => onOpenChange(false)}
                          style={{
                            borderRadius: "6px",
                            padding: "0.5rem 0.75rem",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            fontFamily: "DM Sans, sans-serif",
                            color: pathname === sub.href ? "#C9A84C" : "#7A7680",
                            textDecoration: "none",
                            transition: "color 0.15s",
                          }}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Contact info pushed to bottom */}
          <div style={{ marginTop: "auto", paddingTop: "24px" }}>
            <div style={{ height: "1px", background: "#1F2937", marginBottom: "24px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.875rem" }}>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                style={{ display: "flex", alignItems: "center", gap: "12px", color: "#9CA3AF", textDecoration: "none" }}
              >
                <Phone size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />
                {COMPANY_INFO.phone}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                style={{ display: "flex", alignItems: "center", gap: "12px", color: "#9CA3AF", textDecoration: "none" }}
              >
                <Mail size={16} style={{ color: "#C9A84C", flexShrink: 0 }} />
                {COMPANY_INFO.email}
              </a>
              <SocialLinks className="mt-2" />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
