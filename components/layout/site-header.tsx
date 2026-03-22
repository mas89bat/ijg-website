"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, Globe, User, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

import { NAV_ITEMS, SERVICE_PILLARS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useLanguage, type Language } from "@/contexts/language-context";
import { T } from "@/lib/translations";

const WA_NUMBER = "26481000000";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%27d%20like%20to%20speak%20with%20an%20IJG%20advisor.`;

const LANGUAGES = [
  { code: "en" as Language, label: "English" },
  { code: "af" as Language, label: "Afrikaans" },
  { code: "osh" as Language, label: "Oshiwambo" },
];

const LANG_LABELS: Record<string, string> = {
  en: "EN",
  af: "AF",
  osh: "OSH",
};

const NAV_TRANSLATION_MAP: Record<string, keyof typeof T.en> = {
  "/services": "nav_services",
  "/wealth": "nav_wealth",
  "/research": "nav_research",
  "/about": "nav_about",
  "/contact": "nav_contact",
};

const DROPDOWN_ITEMS: Record<string, { title: string; href: string }[]> = {
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

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = T[language];

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleScrollToStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const target = document.getElementById("start");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* Sentinel element -- when it scrolls out of view, header compacts */}
      <div ref={sentinelRef} className="absolute top-0 left-0 h-px w-full" />

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(7,9,15,0.85)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          borderBottom: "1px solid #1F2937",
          transition: "height 0.3s",
          height: isScrolled ? "56px" : "72px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.25rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <Image
              src="/ijg-logo.png"
              alt="IJG Securities"
              width={86}
              height={40}
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const dropdownItems = DROPDOWN_ITEMS[item.href];
                const translationKey = NAV_TRANSLATION_MAP[item.href];
                const label = translationKey ? t[translationKey] : item.title;

                if (dropdownItems) {
                  return (
                    <NavigationMenuItem key={item.href} className="relative">
                      <div
                        onMouseEnter={() => {
                          if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                          setOpenDropdown(item.href);
                        }}
                        onMouseLeave={() => {
                          dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
                        }}
                      >
                        <Link
                          href={item.href}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "0.5rem 0.75rem",
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: isActive ? "#C9A84C" : "#9CA3AF",
                            textDecoration: "none",
                            transition: "color 0.2s",
                          }}
                        >
                          {label}
                          <ChevronDown className={cn(
                            "size-3 transition-transform",
                            openDropdown === item.href && "rotate-180"
                          )} style={{ color: "inherit" }} />
                        </Link>
                        {openDropdown === item.href && (
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "100%",
                              zIndex: 50,
                              marginTop: "4px",
                              minWidth: "200px",
                              borderRadius: "8px",
                              border: "1px solid #1F2937",
                              background: "rgba(13,17,23,0.95)",
                              backdropFilter: "blur(16px)",
                              padding: "0.5rem",
                              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                            }}
                          >
                            {dropdownItems.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                style={{
                                  display: "block",
                                  borderRadius: "6px",
                                  padding: "0.5rem 0.75rem",
                                  fontFamily: "DM Sans, sans-serif",
                                  fontSize: "0.875rem",
                                  color: pathname === sub.href ? "#C9A84C" : "#9CA3AF",
                                  textDecoration: "none",
                                  transition: "background 0.15s, color 0.15s",
                                  background: pathname === sub.href ? "rgba(201,168,76,0.08)" : "transparent",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                  e.currentTarget.style.color = "#F5F0E8";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = pathname === sub.href ? "rgba(201,168,76,0.08)" : "transparent";
                                  e.currentTarget.style.color = pathname === sub.href ? "#C9A84C" : "#9CA3AF";
                                }}
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        padding: "0.5rem 0.75rem",
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: isActive ? "#C9A84C" : "#9CA3AF",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = "#F5F0E8";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = "#9CA3AF";
                      }}
                    >
                      {label}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA -- Language + WhatsApp */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Language dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "1px solid #1F2937",
                  borderRadius: "6px",
                  padding: "0.4rem 0.75rem",
                  color: "#9CA3AF",
                  fontSize: "0.78rem",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                <Globe size={14} />
                {LANG_LABELS[language]}
                <ChevronDown size={12} style={{ transform: langOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
              </button>
              {langOpen && (
                <div style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  marginTop: "4px",
                  minWidth: "140px",
                  borderRadius: "8px",
                  border: "1px solid #1F2937",
                  background: "rgba(13,17,23,0.95)",
                  backdropFilter: "blur(16px)",
                  padding: "0.35rem",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  zIndex: 60,
                }}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        background: language === lang.code ? "rgba(201,168,76,0.08)" : "transparent",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.5rem 0.75rem",
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.82rem",
                        color: language === lang.code ? "#C9A84C" : "#9CA3AF",
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
              style={{
                fontSize: "0.8rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "6px",
                minHeight: "auto",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.nav_speak}
            </a>
            {/* Profile dropdown (far right, always visible) */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  if (isAuthenticated && user) {
                    setProfileOpen(!profileOpen);
                  } else {
                    router.push("/research/login");
                  }
                }}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: isAuthenticated ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.06)",
                  border: isAuthenticated ? "1px solid rgba(201,168,76,0.3)" : "1px solid #1F2937",
                  color: isAuthenticated ? "#C9A84C" : "#7A7680",
                  fontSize: 12, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "DM Sans, sans-serif",
                }}
                aria-label={isAuthenticated ? "Profile menu" : "Sign in"}
              >
                {isAuthenticated && user
                  ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2)
                  : <User size={16} />
                }
              </button>
              {profileOpen && isAuthenticated && user && (
                <div style={{
                  position: "absolute", right: 0, top: "100%", marginTop: 4,
                  minWidth: 220, borderRadius: 10,
                  border: "1px solid #1F2937",
                  background: "rgba(13,17,23,0.97)",
                  backdropFilter: "blur(12px)",
                  padding: "12px 0",
                  zIndex: 200,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                }}>
                  <div style={{ padding: "8px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#F5F0E8", fontFamily: "DM Sans, sans-serif" }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: "#7A7680", fontFamily: "DM Sans, sans-serif" }}>{user.email}</div>
                    <span style={{
                      display: "inline-block", marginTop: 6,
                      fontSize: 10, fontWeight: 700,
                      padding: "2px 8px", borderRadius: 99,
                      background: "rgba(201,168,76,0.15)",
                      color: "#C9A84C",
                      textTransform: "capitalize",
                    }}>{user.plan}</span>
                  </div>
                  {[
                    { label: "Portal", icon: User, href: "/research/app" },
                    { label: "My Profile", icon: User, href: "/research/app?tab=profile" },
                    { label: "Settings", icon: Settings, href: "/research/app?tab=settings" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { setProfileOpen(false); router.push(item.href); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        width: "100%", padding: "10px 16px",
                        background: "none", border: "none",
                        color: "#9CA3AF", fontSize: 13, cursor: "pointer",
                        fontFamily: "DM Sans, sans-serif",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#F5F0E8"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.background = "none"; }}
                    >
                      <item.icon size={14} /> {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { setProfileOpen(false); logout(); router.push("/research"); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      width: "100%", padding: "10px 16px",
                      background: "none", border: "none",
                      color: "#9CA3AF", fontSize: 13, cursor: "pointer",
                      fontFamily: "DM Sans, sans-serif",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.background = "rgba(239,68,68,0.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.background = "none"; }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind the fixed header */}
      <div
        style={{
          transition: "height 0.3s",
          height: isScrolled ? "56px" : "72px",
        }}
      />

      {/* Mobile Navigation Sheet */}
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
