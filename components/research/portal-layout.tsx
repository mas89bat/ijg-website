"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Language, TRANSLATIONS, RESEARCH } from "@/lib/research-data";
import type { Article } from "@/lib/research-data";
import PortalSidebar from "./portal-sidebar";
import PortalHeader from "./portal-header";
import { HomeTab } from "./tabs/home-tab";
import { QueryTab } from "./tabs/query-tab";
import { LibraryTab } from "./tabs/library-tab";
import { CommunicationsTab } from "./tabs/communications-tab";
import { ReferralTab } from "./tabs/referral-tab";
import { SettingsTab } from "./tabs/settings-tab";
import { WealthPortalTab } from "./tabs/wealth-portal-tab";
import { TradingTab } from "./tabs/trading-tab";
import { AdvisoryTab } from "./tabs/advisory-tab";
import { MyDocumentsTab } from "./tabs/my-documents-tab";
import { ProfileTab } from "./tabs/profile-tab";

const SECTION_LABELS: Record<string, string> = {
  home: "Home",
  query: "AI Query",
  trading: "Stock Market",
  advisory: "Advisory",
  library: "Library",
  documents: "My Documents",
  communications: "Communications",
  wealth: "Wealth Management",
  referral: "Referral Programme",
  settings: "Settings",
  profile: "My Profile",
};

// Simulated AI answer for demo
const DEMO_ANSWER = `Based on IJG's proprietary research database, Namibia's inflation trend over the last 5 years shows a gradual moderation from 4.5% in 2021 to 4.1% in February 2026.

**Key findings:**
- CPI peaked at 6.1% in mid-2022, driven by global supply chain disruptions and elevated fuel prices
- The Bank of Namibia maintained a restrictive monetary stance through 2023-2024, with the repo rate reaching 7.75%
- Housing and transport remain the largest contributors to the CPI basket
- Food inflation has moderated significantly, dropping from 8.2% to 3.9% over the period

The current trajectory suggests inflation will remain within the 3-6% target range through 2026, supporting expectations for gradual monetary easing.`;

export default function PortalLayout() {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const router = useRouter();
  const isMobile = useIsMobile();

  // Query state (shared between home and query tabs)
  const [query, setQuery] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [queryDone, setQueryDone] = useState(false);
  const [alertSet, setAlertSet] = useState(false);
  const [showDocGen, setShowDocGen] = useState(false);

  const sectionLabel = SECTION_LABELS[activeTab] || "Home";

  // Simulated typing effect
  const simulateTyping = useCallback((text: string) => {
    setTypedAnswer("");
    setQueryDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setTypedAnswer(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setQueryDone(true);
      }
    }, 8);
    return () => clearInterval(interval);
  }, []);

  const handleQuerySubmit = useCallback(() => {
    if (!query.trim() || isQuerying) return;
    setIsQuerying(true);
    setActiveTab("query");
    // Simulate delay then typing
    setTimeout(() => {
      setIsQuerying(false);
      simulateTyping(DEMO_ANSWER);
    }, 1500);
  }, [query, isQuerying, simulateTyping]);

  const handleReadArticle = useCallback((article: { id: number }) => {
    router.push(`/research/${article.id}`);
  }, [router]);

  const handleGoLanding = useCallback(() => {
    router.push("/research");
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#07090F",
        fontFamily: "'DM Sans', sans-serif",
        color: "#E8E4DD",
      }}
    >
      <PortalSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
          height: "100vh",
        }}
      >
        <PortalHeader
          currentSection={sectionLabel}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: isMobile ? "16px" : "32px 24px",
          }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            {activeTab === "home" && (
              <HomeTab
                language={language as Language}
                query={query}
                onQueryChange={setQuery}
                onQuerySubmit={handleQuerySubmit}
                onSwitchToQuery={() => setActiveTab("query")}
                onSwitchToTrading={() => setActiveTab("trading")}
                onSwitchToAdvisory={() => setActiveTab("advisory")}
                onReadArticle={handleReadArticle}
                onGoLanding={handleGoLanding}
              />
            )}
            {activeTab === "query" && (
              <QueryTab
                language={language as Language}
                query={query}
                onQueryChange={setQuery}
                onQuerySubmit={handleQuerySubmit}
                isQuerying={isQuerying}
                typedAnswer={typedAnswer}
                queryDone={queryDone}
                alertSet={alertSet}
                onSetAlert={() => setAlertSet(true)}
                onShowDocGen={() => setShowDocGen(true)}
              />
            )}
            {activeTab === "trading" && (
              <TradingTab language={language as Language} />
            )}
            {activeTab === "advisory" && (
              <AdvisoryTab language={language as Language} />
            )}
            {activeTab === "library" && (
              <LibraryTab
                language={language as Language}
                onReadArticle={handleReadArticle}
              />
            )}
            {activeTab === "documents" && (
              <MyDocumentsTab language={language as Language} />
            )}
            {activeTab === "communications" && (
              <CommunicationsTab language={language as Language} />
            )}
            {activeTab === "referral" && (
              <ReferralTab language={language as Language} />
            )}
            {activeTab === "wealth" && (
              <WealthPortalTab />
            )}
            {activeTab === "settings" && (
              <SettingsTab language={language as Language} />
            )}
            {activeTab === "profile" && (
              <ProfileTab language={language as Language} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
