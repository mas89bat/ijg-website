"use client";

import { useState } from "react";
import {
  FileText,
  BarChart3,
  Play,
  Headphones,
  Table2,
  Filter,
  Search,
  Sparkles,
  Lock,
} from "lucide-react";
import { Article, Language, RESEARCH } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { PremiumPaywall } from "../premium-paywall";

/* ------------------------------------------------------------------ */
/* Content type definitions                                            */
/* ------------------------------------------------------------------ */

const CONTENT_TYPES = {
  report: { label: "Report", icon: FileText, color: "#C9A84C" },
  infographic: { label: "Infographic", icon: BarChart3, color: "#5DADE2" },
  video: { label: "Video Brief", icon: Play, color: "#E74C3C" },
  podcast: { label: "Podcast", icon: Headphones, color: "#2ECC71" },
  data: { label: "Data Sheet", icon: Table2, color: "#F39C12" },
} as const;

type ContentType = keyof typeof CONTENT_TYPES;

const PREVIEW_GRADIENTS: Record<ContentType, string> = {
  report: "linear-gradient(135deg, #1a2340, #0D1117)",
  infographic: "linear-gradient(135deg, #0D2137, #0D1117)",
  video: "linear-gradient(135deg, #2D1117, #0D1117)",
  podcast: "linear-gradient(135deg, #0D2117, #0D1117)",
  data: "linear-gradient(135deg, #2D2117, #0D1117)",
};

const PREVIEW_CTA: Record<ContentType, string> = {
  report: "Read Report",
  infographic: "View Infographic",
  video: "Watch Video",
  podcast: "Listen",
  data: "View Data",
};

/* ------------------------------------------------------------------ */
/* Extended library data (local to this tab)                           */
/* ------------------------------------------------------------------ */

interface LibraryItem {
  id: number;
  title: string;
  contentType: ContentType;
  sector: string;
  cat: string;
  date: string;
  author: string;
  readTime: string;
  premium: boolean;
  confidence: number;
  preview: string;
  thumbnail: string;
}

// Map existing RESEARCH items into the library format
const MAPPED_RESEARCH: LibraryItem[] = RESEARCH.map((r) => ({
  id: r.id,
  title: r.title,
  contentType: "report" as ContentType,
  sector: r.sector,
  cat: r.cat,
  date: r.date,
  author: r.author,
  readTime: r.readTime,
  premium: r.premium,
  confidence: r.confidence,
  preview: r.intro.slice(0, 160),
  thumbnail: "doc",
}));

const NEW_ITEMS: LibraryItem[] = [
  { id: 101, title: "NSX Weekly Performance Dashboard", contentType: "infographic", sector: "Equities", cat: "Market Update", date: "21 Mar 2026", author: "IJG Research", readTime: "2 min", premium: false, confidence: 94, preview: "Interactive visualization of weekly NSX index movements, top gainers, and volume analysis.", thumbnail: "chart" },
  { id: 102, title: "Paladin Energy: Uranium Price Catalyst", contentType: "report", sector: "Mining", cat: "Company Analysis", date: "20 Mar 2026", author: "IJG Equity Research", readTime: "8 min", premium: true, confidence: 96, preview: "Deep dive into Paladin's Langer Heinrich mine restart and the uranium supercycle thesis.", thumbnail: "doc" },
  { id: 103, title: "Namibia CPI Breakdown: February 2026", contentType: "infographic", sector: "Macro", cat: "Economics", date: "19 Mar 2026", author: "IJG Economics", readTime: "3 min", premium: false, confidence: 97, preview: "Visual breakdown of CPI basket contributors, month-on-month changes, and trend analysis.", thumbnail: "chart" },
  { id: 104, title: "BoN MPC Preview: March 2026", contentType: "video", sector: "Macro", cat: "Economics", date: "18 Mar 2026", author: "IJG Economics", readTime: "5 min", premium: false, confidence: 95, preview: "Video briefing on expected MPC decision and implications for lending rates.", thumbnail: "video" },
  { id: 105, title: "Bank Windhoek FY2025 Results Infographic", contentType: "infographic", sector: "Banking", cat: "Company Analysis", date: "17 Mar 2026", author: "IJG Equity Research", readTime: "2 min", premium: true, confidence: 96, preview: "Key financial metrics, ROE trends, and peer comparison in visual format.", thumbnail: "chart" },
  { id: 106, title: "Namibian Banking Sector: Quarterly Data Pack", contentType: "data", sector: "Banking", cat: "Sector Analysis", date: "15 Mar 2026", author: "IJG Research", readTime: "10 min", premium: true, confidence: 94, preview: "Comprehensive quarterly data including NPL ratios, capital adequacy, and lending growth.", thumbnail: "data" },
  { id: 107, title: "Uranium Market Outlook: Audio Briefing", contentType: "podcast", sector: "Mining", cat: "Sector Analysis", date: "14 Mar 2026", author: "IJG Research", readTime: "12 min", premium: true, confidence: 91, preview: "Expert discussion on uranium spot prices, Namibian production, and global demand drivers.", thumbnail: "audio" },
  { id: 108, title: "Mining Sector NAV Comparison", contentType: "infographic", sector: "Mining", cat: "Sector Analysis", date: "12 Mar 2026", author: "IJG Equity Research", readTime: "3 min", premium: false, confidence: 93, preview: "Side-by-side NAV analysis of Namibian mining companies vs JSE-listed peers.", thumbnail: "chart" },
  { id: 109, title: "Capricorn Group: Elephant Book Summary", contentType: "report", sector: "Banking", cat: "Company Analysis", date: "10 Mar 2026", author: "IJG Equity Research", readTime: "12 min", premium: true, confidence: 93, preview: "Comprehensive analysis with fair value estimate and investment thesis.", thumbnail: "doc" },
  { id: 110, title: "NSX All Share: YTD Returns by Sector", contentType: "infographic", sector: "Equities", cat: "Market Update", date: "8 Mar 2026", author: "IJG Research", readTime: "2 min", premium: false, confidence: 95, preview: "Sector-by-sector breakdown of year-to-date performance on the NSX.", thumbnail: "chart" },
  { id: 111, title: "Property Market: Rate Cycle Impact", contentType: "report", sector: "Macro", cat: "Economics", date: "5 Mar 2026", author: "IJG Economics", readTime: "6 min", premium: false, confidence: 94, preview: "Analysis of how the current rate environment affects Namibian residential property.", thumbnail: "doc" },
  { id: 112, title: "Weekly Market Wrap: 3-7 March 2026", contentType: "video", sector: "Equities", cat: "Market Update", date: "7 Mar 2026", author: "IJG Research", readTime: "4 min", premium: false, confidence: 92, preview: "Video summary of the week's key market movements and upcoming catalysts.", thumbnail: "video" },
];

const EXTENDED_LIBRARY: LibraryItem[] = [...NEW_ITEMS, ...MAPPED_RESEARCH];

const ALL_SECTORS = ["All", "Equities", "Macro", "Banking", "Mining"];
const ALL_CONTENT_FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "report", label: "Reports" },
  { key: "infographic", label: "Infographics" },
  { key: "video", label: "Videos" },
  { key: "podcast", label: "Podcasts" },
  { key: "data", label: "Data" },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export interface LibraryTabProps {
  language: Language;
  onReadArticle: (article: Article) => void;
}

export function LibraryTab({ language, onReadArticle }: LibraryTabProps) {
  const isMobile = useIsMobile();
  const [contentFilter, setContentFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [paywallItem, setPaywallItem] = useState<LibraryItem | null>(null);

  const filtered = EXTENDED_LIBRARY.filter((item) => {
    if (contentFilter !== "all" && item.contentType !== contentFilter) return false;
    if (sectorFilter !== "All" && item.sector !== sectorFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.preview.toLowerCase().includes(q) ||
        item.sector.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const featured = filtered[0];
  const gridItems = filtered.slice(1);

  return (
    <>
      {/* ---- Header row ---- */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", color: "#E8E4DD", margin: 0 }}>
            Research Library
          </h1>
          <span style={{ fontSize: 13, color: "#7A7680" }}>
            {filtered.length} publications
          </span>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#7A7680" }} />
          <input
            type="text"
            placeholder="Search library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              background: "#0D1117",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              color: "#E8E4DD",
              fontSize: 13,
              fontFamily: "inherit",
              outline: "none",
            }}
          />
        </div>

        {/* Content type filter pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: isMobile ? "nowrap" : "wrap", overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 4 : 0 }}>
          {ALL_CONTENT_FILTERS.map((f) => {
            const isActive = contentFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setContentFilter(f.key)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 99,
                  border: `1px solid ${isActive ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.08)"}`,
                  background: isActive ? "rgba(201,168,76,0.1)" : "transparent",
                  color: isActive ? "#C9A84C" : "#7A7680",
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.15s ease",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Sector filter pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: isMobile ? "nowrap" : "wrap", alignItems: "center", overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 4 : 0 }}>
          <Filter size={14} style={{ color: "#7A7680", marginRight: 4 }} />
          {ALL_SECTORS.map((s) => {
            const isActive = sectorFilter === s;
            return (
              <button
                key={s}
                onClick={() => setSectorFilter(s)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 99,
                  border: `1px solid ${isActive ? "rgba(93,173,226,0.3)" : "rgba(255,255,255,0.06)"}`,
                  background: isActive ? "rgba(93,173,226,0.08)" : "transparent",
                  color: isActive ? "#5DADE2" : "#7A7680",
                  fontSize: 11,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.15s ease",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---- Featured hero card ---- */}
      {featured && <FeaturedCard item={featured} onClickItem={(item) => {
        if (item.premium) { setPaywallItem(item); } else {
          const article = RESEARCH.find(r => r.id === item.id);
          if (article) onReadArticle(article);
        }
      }} />}

      {/* ---- Content grid ---- */}
      {gridItems.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
          className="library-grid"
        >
          {gridItems.map((item) => (
            <ContentCard key={item.id} item={item} onClickItem={(it) => {
              if (it.premium) { setPaywallItem(it); } else {
                const article = RESEARCH.find(r => r.id === it.id);
                if (article) onReadArticle(article);
              }
            }} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#7A7680" }}>
          <Search size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p style={{ fontSize: 15 }}>No publications match your filters.</p>
        </div>
      )}

      {/* Responsive grid styles */}
      <style>{`
        .library-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        @media (max-width: 1024px) {
          .library-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .library-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Premium paywall modal */}
      {paywallItem && (
        <PremiumPaywall
          isOpen={!!paywallItem}
          onClose={() => setPaywallItem(null)}
          title={paywallItem.title}
          contentType={CONTENT_TYPES[paywallItem.contentType].label}
          sector={paywallItem.sector}
          preview={paywallItem.preview}
          author={paywallItem.author}
          date={paywallItem.date}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Featured Card                                                       */
/* ------------------------------------------------------------------ */

function FeaturedCard({ item, onClickItem }: { item: LibraryItem; onClickItem: (item: LibraryItem) => void }) {
  const ct = CONTENT_TYPES[item.contentType];
  const Icon = ct.icon;

  return (
    <div
      onClick={() => onClickItem(item)}
      style={{
        background: "#0D1117",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 24,
        cursor: "pointer",
        transition: "border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      {/* Accent bar */}
      <div style={{ height: 3, background: ct.color }} />

      <div style={{ display: "flex", gap: 0 }} className="featured-inner">
        {/* Visual preview */}
        <div
          style={{
            width: 360,
            minWidth: 360,
            minHeight: 200,
            background: PREVIEW_GRADIENTS[item.contentType],
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            position: "relative",
          }}
          className="featured-preview"
        >
          <Icon size={48} style={{ color: ct.color, opacity: 0.7 }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: ct.color }}>{PREVIEW_CTA[item.contentType]}</span>
          {/* FEATURED badge */}
          <span style={{
            position: "absolute", top: 12, left: 12,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
            padding: "3px 10px", borderRadius: 99,
            background: "rgba(201,168,76,0.15)", color: "#C9A84C",
          }}>
            <Sparkles size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            FEATURED
          </span>
        </div>

        {/* Info */}
        <div style={{ padding: "24px 28px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 11, fontWeight: 600, color: ct.color,
              background: `${ct.color}15`, padding: "3px 10px", borderRadius: 99,
            }}>
              <Icon size={12} /> {ct.label}
            </span>
            {item.premium ? (
              <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 99, background: "rgba(201,168,76,0.15)", color: "#C9A84C", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 3 }}>
                <Lock size={9} /> PREMIUM
              </span>
            ) : (
              <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 99, background: "rgba(46,204,113,0.1)", color: "#2ECC71", fontWeight: 700 }}>FREE</span>
            )}
            <span style={{ fontSize: 11, color: "#7A7680" }}>{item.sector} &middot; {item.cat}</span>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 600, color: "#E8E4DD", marginBottom: 8, lineHeight: 1.3 }}>{item.title}</h2>
          <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 16 }}>{item.preview}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#7A7680" }}>
            <span>{item.author}</span>
            <span>&middot;</span>
            <span>{item.date}</span>
            <span>&middot;</span>
            <span>{item.readTime}</span>
            <span style={{
              marginLeft: "auto", padding: "3px 8px", borderRadius: 99,
              background: "rgba(46,204,113,0.08)", color: "#2ECC71", fontWeight: 600,
              fontSize: 11,
            }}>
              {item.confidence}% conf.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-inner {
            flex-direction: column !important;
          }
          .featured-preview {
            width: 100% !important;
            min-width: unset !important;
            min-height: 160px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content Card                                                        */
/* ------------------------------------------------------------------ */

function ContentCard({ item, onClickItem }: { item: LibraryItem; onClickItem: (item: LibraryItem) => void }) {
  const ct = CONTENT_TYPES[item.contentType];
  const Icon = ct.icon;

  return (
    <div
      onClick={() => onClickItem(item)}
      style={{
        background: "#0D1117",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(201,168,76,0.2)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(255,255,255,0.06)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: ct.color }} />

      {/* Visual preview area */}
      <div
        style={{
          height: 120,
          background: PREVIEW_GRADIENTS[item.contentType],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          position: "relative",
        }}
      >
        {/* Content type badge — top left */}
        <span style={{
          position: "absolute", top: 10, left: 10,
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 10, fontWeight: 600, color: ct.color,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          padding: "3px 8px", borderRadius: 99,
        }}>
          <Icon size={11} /> {ct.label}
        </span>

        {/* Premium / Free badge — top right */}
        <span style={{
          position: "absolute", top: 10, right: 10,
          fontSize: 9, fontWeight: 700, letterSpacing: "0.04em",
          padding: "3px 8px", borderRadius: 99,
          background: item.premium ? "rgba(201,168,76,0.2)" : "rgba(46,204,113,0.15)",
          color: item.premium ? "#C9A84C" : "#2ECC71",
          display: "inline-flex", alignItems: "center", gap: 3,
          backdropFilter: "blur(4px)",
        }}>
          {item.premium && <Lock size={8} />}
          {item.premium ? "PREMIUM" : "FREE"}
        </span>

        {/* Center icon + CTA */}
        <Icon size={32} style={{ color: ct.color, opacity: 0.6 }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: ct.color, opacity: 0.8 }}>
          {PREVIEW_CTA[item.contentType]}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{
          fontSize: 15, fontWeight: 600, color: "#E8E4DD",
          marginBottom: 6, lineHeight: 1.35,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {item.title}
        </h3>
        <p style={{
          fontSize: 13, color: "#7A7680", lineHeight: 1.5,
          marginBottom: 12,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {item.preview}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "#7A7680" }}>
          <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
            <span>{item.author}</span>
            <span>&middot;</span>
            <span>{item.date}</span>
            <span>&middot;</span>
            <span>{item.readTime}</span>
          </div>
          <span style={{
            padding: "2px 7px", borderRadius: 99,
            background: "rgba(46,204,113,0.08)", color: "#2ECC71", fontWeight: 600,
            fontSize: 10, flexShrink: 0,
          }}>
            {item.confidence}%
          </span>
        </div>
      </div>
    </div>
  );
}
