"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Language, TRANSLATIONS, RESEARCH } from "@/lib/research-data";
import type { Article } from "@/lib/research-data";
import { X, Download, Loader2, BarChart3, FileText } from "lucide-react";
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

function InfographicModal({ onClose, query, answer }: { onClose: () => void; query: string; answer: string }) {
  const [generating, setGenerating] = useState(true);
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/generate-infographic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, answer }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Generation failed");
        }
        return res.json();
      })
      .then((data) => {
        setImageData(`data:${data.mimeType};base64,${data.image}`);
        setGenerating(false);
      })
      .catch((err) => {
        setError(err.message);
        setGenerating(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    if (!imageData) return;
    const link = document.createElement("a");
    link.href = imageData;
    link.download = `IJG_Infographic_${query.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 40)}.png`;
    link.click();
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 20 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#0D0E16", borderRadius: 20, width: "min(90vw, 800px)", maxHeight: "90vh", border: "1px solid rgba(255,255,255,0.06)", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <div style={{ height: 3, background: "linear-gradient(90deg,#C49A2A,#D4A843)", position: "absolute", top: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <BarChart3 size={16} color="#C49A2A" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#C49A2A", letterSpacing: "1px", textTransform: "uppercase" }}>Infographic Generation</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#7A7680", cursor: "pointer" }}><X size={18} /></button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
          {generating && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <Loader2 size={32} color="#C49A2A" style={{ animation: "spin 1s linear infinite", marginBottom: 16 }} />
              <p style={{ fontSize: 14, color: "#E8E4DD", fontWeight: 600, marginBottom: 6 }}>Generating 4K Infographic...</p>
              <p style={{ fontSize: 12, color: "#7A7680" }}>Applying IJG branding, formatting data, rendering charts</p>
              <p style={{ fontSize: 11, color: "#7A7680", marginTop: 12, opacity: 0.6 }}>This may take 15–30 seconds</p>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {error && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ fontSize: 14, color: "#E85A5A", marginBottom: 8 }}>Generation failed</p>
              <p style={{ fontSize: 12, color: "#7A7680" }}>{error}</p>
              <button
                onClick={onClose}
                style={{ marginTop: 16, padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(196,154,42,0.2)", background: "transparent", color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}
              >Close</button>
            </div>
          )}

          {imageData && (
            <>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16 }}>
                <img src={imageData} alt="Generated Infographic" style={{ width: "100%", display: "block" }} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleDownload}
                  style={{
                    flex: 1, padding: "12px", borderRadius: 10, border: "none",
                    background: "linear-gradient(135deg,#C49A2A,#D4A843)",
                    color: "#06070D", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  <Download size={14} /> Download 4K Infographic
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PdfReportModal({ onClose, query, answer }: { onClose: () => void; query: string; answer: string }) {
  const [generating, setGenerating] = useState(true);
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/generate-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, answer }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Report generation failed");
        }
        return res.json();
      })
      .then((data) => {
        setPdfData(`data:application/pdf;base64,${data.pdf}`);
        setPdfTitle(data.title || query);
        setGenerating(false);
      })
      .catch((err) => {
        setError(err.message);
        setGenerating(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    if (!pdfData) return;
    const link = document.createElement("a");
    link.href = pdfData;
    link.download = `IJG_Report_${pdfTitle.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 40)}.pdf`;
    link.click();
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 20 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#0D0E16", borderRadius: 20, width: "min(90vw, 800px)", maxHeight: "90vh", border: "1px solid rgba(255,255,255,0.06)", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <div style={{ height: 3, background: "linear-gradient(90deg,#C49A2A,#D4A843)", position: "absolute", top: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={16} color="#C49A2A" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#C49A2A", letterSpacing: "1px", textTransform: "uppercase" }}>PDF Report Generation</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#7A7680", cursor: "pointer" }}><X size={18} /></button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
          {generating && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <Loader2 size={32} color="#C49A2A" style={{ animation: "spin 1s linear infinite", marginBottom: 16 }} />
              <p style={{ fontSize: 14, color: "#E8E4DD", fontWeight: 600, marginBottom: 6 }}>Generating IJG-branded PDF Report...</p>
              <p style={{ fontSize: 12, color: "#7A7680" }}>Structuring analysis, applying IJG template, formatting metrics</p>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {error && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ fontSize: 14, color: "#E85A5A", marginBottom: 8 }}>Generation failed</p>
              <p style={{ fontSize: 12, color: "#7A7680" }}>{error}</p>
              <button onClick={onClose} style={{ marginTop: 16, padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(196,154,42,0.2)", background: "transparent", color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Close</button>
            </div>
          )}

          {pdfData && (
            <>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16, background: "#fff" }}>
                <iframe src={pdfData} style={{ width: "100%", height: 500, border: "none" }} title="PDF Preview" />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleDownload}
                  style={{
                    flex: 1, padding: "12px", borderRadius: 10, border: "none",
                    background: "linear-gradient(135deg,#C49A2A,#D4A843)",
                    color: "#06070D", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  <Download size={14} /> Download PDF Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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

// AI answer is now fetched from /api/research-query (Anthropic Claude)

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
  const [showPdfGen, setShowPdfGen] = useState(false);

  const sectionLabel = SECTION_LABELS[activeTab] || "Home";
  const abortRef = useRef<AbortController | null>(null);

  const handleQuerySubmit = useCallback(async (overrideQuery?: string) => {
    const q = overrideQuery || query;
    if (!q.trim() || isQuerying) return;
    setQuery(q);
    setIsQuerying(true);
    setActiveTab("query");
    setTypedAnswer("");
    setQueryDone(false);

    // Abort any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/research-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        setIsQuerying(false);
        setTypedAnswer("Sorry, an error occurred. Please try again.");
        setQueryDone(true);
        return;
      }

      setIsQuerying(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") {
            setQueryDone(true);
            break;
          }
          try {
            const parsed = JSON.parse(payload);
            if (parsed.text) {
              fullText += parsed.text;
              setTypedAnswer(fullText);
            }
          } catch {
            // skip malformed chunks
          }
        }
      }

      if (!fullText) {
        setTypedAnswer("No response received. Please try a different query.");
      }
      setQueryDone(true);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setIsQuerying(false);
        setTypedAnswer("Sorry, an error occurred. Please try again.");
        setQueryDone(true);
      }
    }
  }, [query, isQuerying]);

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
                onShowPdfGen={() => setShowPdfGen(true)}
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
      {showDocGen && (
        <InfographicModal
          onClose={() => setShowDocGen(false)}
          query={query}
          answer={typedAnswer}
        />
      )}
      {showPdfGen && (
        <PdfReportModal
          onClose={() => setShowPdfGen(false)}
          query={query}
          answer={typedAnswer}
        />
      )}
    </div>
  );
}
