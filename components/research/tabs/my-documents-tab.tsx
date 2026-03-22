"use client";

import { useState } from "react";
import {
  FileText,
  BarChart3,
  MonitorPlay,
  Bookmark,
  X,
  ExternalLink,
  Download,
  Share2,
  Search,
  Clock,
  User,
  ShieldCheck,
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Wallet,
  FileCheck,
  FilePlus,
  Eye,
} from "lucide-react";
import { Language } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

/* ------------------------------------------------------------------ */
/* Types & mock data                                                    */
/* ------------------------------------------------------------------ */

interface SavedItem {
  title: string;
  type: "report" | "infographic" | "data";
  savedDate: string;
  sector: string;
}

interface GeneratedDoc {
  title: string;
  format: string;
  generatedDate: string;
  pages: number;
}

interface SearchHistoryItem {
  query: string;
  date: string;
  results: number;
}

const SAVED_RESEARCH: SavedItem[] = [
  { title: "IJG Daily: NSX gains 1.2% on mining strength", type: "report", savedDate: "21 Mar 2026", sector: "Equities" },
  { title: "Namibia CPI Analysis: February 2026", type: "report", savedDate: "19 Mar 2026", sector: "Macro" },
  { title: "NSX Weekly Performance Dashboard", type: "infographic", savedDate: "21 Mar 2026", sector: "Equities" },
  { title: "Uranium Market Outlook 2026", type: "report", savedDate: "14 Mar 2026", sector: "Mining" },
  { title: "Banking Sector Quarterly Data Pack", type: "data", savedDate: "15 Mar 2026", sector: "Banking" },
];

const GENERATED_DOCS: GeneratedDoc[] = [
  { title: "Inflation Trend Analysis", format: "PDF Report", generatedDate: "Today, 10:35 AM", pages: 4 },
  { title: "Uranium Market Infographic", format: "Infographic", generatedDate: "Today, 9:20 AM", pages: 1 },
  { title: "Bank Windhoek Results Summary", format: "Presentation", generatedDate: "Yesterday, 4:25 PM", pages: 5 },
];

const SEARCH_HISTORY: SearchHistoryItem[] = [
  { query: "Namibia inflation trend", date: "Today", results: 12 },
  { query: "uranium price forecast", date: "Today", results: 8 },
  { query: "Bank Windhoek results", date: "Yesterday", results: 5 },
  { query: "property market Namibia", date: "18 Mar", results: 15 },
];

/* Financial Profile Data */
interface FinancialDocument {
  title: string;
  category: "proposal" | "kyc" | "statement" | "tax" | "compliance";
  status: "active" | "pending" | "expired" | "accepted" | "review";
  date: string;
  advisor?: string;
}

const FINANCIAL_DOCUMENTS: FinancialDocument[] = [
  { title: "Wealth Management Proposal — Growth Portfolio", category: "proposal", status: "pending", date: "20 Mar 2026", advisor: "Johan Mostert" },
  { title: "Retirement Annuity Restructure Proposal", category: "proposal", status: "accepted", date: "15 Mar 2026", advisor: "Johan Mostert" },
  { title: "Tax-Free Savings Account — New Allocation", category: "proposal", status: "review", date: "18 Mar 2026", advisor: "Linette van Wyk" },
  { title: "Portfolio Valuation Statement — Feb 2026", category: "statement", status: "active", date: "1 Mar 2026" },
  { title: "Annual Tax Certificate 2025/2026", category: "tax", status: "active", date: "28 Feb 2026" },
  { title: "KYC / FICA Verification Documents", category: "kyc", status: "active", date: "12 Jan 2026" },
  { title: "Risk Profile Assessment — Moderate Growth", category: "compliance", status: "active", date: "10 Jan 2026" },
  { title: "Anti-Money Laundering Declaration", category: "compliance", status: "active", date: "10 Jan 2026" },
  { title: "Investment Policy Statement", category: "proposal", status: "accepted", date: "5 Dec 2025", advisor: "Johan Mostert" },
  { title: "Portfolio Valuation Statement — Jan 2026", category: "statement", status: "active", date: "1 Feb 2026" },
];

const INVESTOR_PROFILE = {
  name: "Alex Shimanda",
  clientId: "IJG-NAM-2024-1847",
  riskProfile: "Moderate Growth",
  advisor: "Johan Mostert, CFP®, CFA",
  portfolioValue: "N$2,450,000",
  lastReview: "15 Mar 2026",
  nextReview: "15 Jun 2026",
  investmentGoals: [
    { goal: "Retirement at 60", target: "N$8,000,000", progress: 31, horizon: "18 years" },
    { goal: "Children's Education", target: "N$1,200,000", progress: 52, horizon: "8 years" },
    { goal: "Emergency Fund", target: "N$300,000", progress: 87, horizon: "Ongoing" },
  ],
};

const FIN_CATEGORY_META: Record<string, { icon: typeof FileText; color: string; label: string }> = {
  proposal: { icon: FilePlus, color: "#C49A2A", label: "Proposal" },
  kyc: { icon: ShieldCheck, color: "#3B82F6", label: "KYC / FICA" },
  statement: { icon: FileCheck, color: "#10B981", label: "Statement" },
  tax: { icon: Wallet, color: "#8B5CF6", label: "Tax" },
  compliance: { icon: ShieldCheck, color: "#F59E0B", label: "Compliance" },
};

const FIN_STATUS_META: Record<string, { color: string; bg: string; label: string }> = {
  active: { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Active" },
  pending: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Awaiting Review" },
  expired: { color: "#EF4444", bg: "rgba(239,68,68,0.1)", label: "Expired" },
  accepted: { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Accepted" },
  review: { color: "#3B82F6", bg: "rgba(59,130,246,0.1)", label: "Under Review" },
};

const TYPE_COLORS: Record<string, string> = {
  report: "#C9A84C",
  infographic: "#5DADE2",
  data: "#F39C12",
};

const FORMAT_ICONS: Record<string, typeof FileText> = {
  "PDF Report": FileText,
  "Infographic": BarChart3,
  "Presentation": MonitorPlay,
};

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export interface MyDocumentsTabProps {
  language: Language;
}

type SubTab = "saved" | "generated" | "history" | "financial";

export function MyDocumentsTab({ language }: MyDocumentsTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("saved");
  const isMobile = useIsMobile();

  const subTabs: { key: SubTab; label: string; count: number }[] = [
    { key: "saved", label: "Saved Research", count: SAVED_RESEARCH.length },
    { key: "generated", label: "Generated Documents", count: GENERATED_DOCS.length },
    { key: "financial", label: "Financial Documents", count: FINANCIAL_DOCUMENTS.length },
    { key: "history", label: "Search History", count: SEARCH_HISTORY.length },
  ];

  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 20, color: "#E8E4DD" }}>
        My Documents
      </h1>

      {/* Sub-tab pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, overflowX: isMobile ? "auto" : "visible", flexWrap: isMobile ? "nowrap" : "wrap", paddingBottom: isMobile ? 4 : 0 }}>
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSubTab(tab.key)}
              style={{
                padding: "8px 18px",
                borderRadius: 99,
                border: `1px solid ${isActive ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.08)"}`,
                background: isActive ? "rgba(201,168,76,0.1)" : "transparent",
                color: isActive ? "#C9A84C" : "#7A7680",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
              <span style={{
                fontSize: 11,
                padding: "1px 7px",
                borderRadius: 99,
                background: isActive ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                color: isActive ? "#C9A84C" : "#7A7680",
                fontWeight: 600,
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Saved Research */}
      {activeSubTab === "saved" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SAVED_RESEARCH.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: isMobile ? "flex-start" : "center",
                gap: isMobile ? 10 : 14,
                padding: isMobile ? "12px 14px" : "14px 18px",
                flexWrap: isMobile ? "wrap" : "nowrap",
                background: "#0D1117",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              {/* Type icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: `${TYPE_COLORS[item.type]}15`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {item.type === "report" && <FileText size={18} color={TYPE_COLORS[item.type]} />}
                {item.type === "infographic" && <BarChart3 size={18} color={TYPE_COLORS[item.type]} />}
                {item.type === "data" && <FileText size={18} color={TYPE_COLORS[item.type]} />}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#E8E4DD", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.title}
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
                    background: "rgba(93,173,226,0.1)", color: "#5DADE2",
                  }}>
                    {item.sector}
                  </span>
                  <span style={{ fontSize: 11, color: "#7A7680" }}>{item.savedDate}</span>
                </div>
              </div>

              {/* Actions */}
              <button
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, display: "flex", color: "#7A7680", transition: "color 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#E74C3C"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#7A7680"; }}
                title="Remove"
              >
                <X size={16} />
              </button>
              <button
                style={{
                  padding: "6px 14px", borderRadius: 8,
                  border: "1px solid rgba(196,154,42,0.2)", background: "rgba(196,154,42,0.06)",
                  color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 4,
                }}
              >
                <ExternalLink size={12} /> Open
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Generated Documents */}
      {activeSubTab === "generated" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {GENERATED_DOCS.map((doc, i) => {
            const Icon = FORMAT_ICONS[doc.format] || FileText;
            const formatColor = doc.format === "PDF Report" ? "#C9A84C" : doc.format === "Infographic" ? "#5DADE2" : "#E74C3C";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  background: "#0D1117",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                {/* Format icon */}
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: `${formatColor}15`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={18} color={formatColor} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#E8E4DD", margin: 0 }}>{doc.title}</p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
                      background: `${formatColor}15`, color: formatColor,
                    }}>
                      {doc.format}
                    </span>
                    <span style={{ fontSize: 11, color: "#7A7680" }}>{doc.generatedDate}</span>
                    <span style={{ fontSize: 11, color: "#7A7680" }}>{doc.pages} {doc.pages === 1 ? "page" : "pages"}</span>
                  </div>
                </div>

                {/* Actions */}
                <button
                  style={{
                    padding: "6px 14px", borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)", background: "transparent",
                    color: "#7A7680", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 4,
                    transition: "color 0.15s, border-color 0.15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#E8E4DD"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#7A7680"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <Share2 size={12} /> Share
                </button>
                <button
                  style={{
                    padding: "6px 14px", borderRadius: 8,
                    border: "1px solid rgba(196,154,42,0.2)", background: "rgba(196,154,42,0.06)",
                    color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 4,
                  }}
                >
                  <Download size={12} /> Download
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Financial Documents */}
      {activeSubTab === "financial" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FINANCIAL_DOCUMENTS.map((doc, i) => {
                const catMeta = FIN_CATEGORY_META[doc.category];
                const statusMeta = FIN_STATUS_META[doc.status];
                const CatIcon = catMeta.icon;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 10 : 14,
                      padding: isMobile ? "12px 14px" : "14px 18px", background: "#0D1117", borderRadius: 12,
                      border: doc.status === "pending" ? "1px solid rgba(245,158,11,0.2)" : "1px solid rgba(255,255,255,0.06)",
                      transition: "border-color 0.15s",
                      flexWrap: isMobile ? "wrap" : "nowrap",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.2)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = doc.status === "pending" ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)"; }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: `${catMeta.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <CatIcon size={18} color={catMeta.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#E8E4DD", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {doc.title}
                      </p>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
                          background: `${catMeta.color}15`, color: catMeta.color,
                        }}>{catMeta.label}</span>
                        <span style={{ fontSize: 11, color: "#7A7680" }}>{doc.date}</span>
                        {doc.advisor && <span style={{ fontSize: 11, color: "#7A7680" }}>· {doc.advisor}</span>}
                      </div>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
                      background: statusMeta.bg, color: statusMeta.color,
                      whiteSpace: "nowrap",
                    }}>{statusMeta.label}</span>
                    {doc.status === "pending" ? (
                      <button style={{
                        padding: "6px 14px", borderRadius: 8,
                        border: "none", background: "linear-gradient(135deg,#C49A2A,#D4A843)",
                        color: "#06070D", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 700,
                        display: "flex", alignItems: "center", gap: 4,
                      }}>
                        <CheckCircle size={12} /> Review
                      </button>
                    ) : (
                      <button style={{
                        padding: "6px 14px", borderRadius: 8,
                        border: "1px solid rgba(196,154,42,0.2)", background: "rgba(196,154,42,0.06)",
                        color: "#C49A2A", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
                        display: "flex", alignItems: "center", gap: 4,
                      }}>
                        <Eye size={12} /> View
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Request documents CTA */}
          <div style={{
            padding: 20, background: "rgba(201,168,76,0.04)", borderRadius: 12,
            border: "1px solid rgba(201,168,76,0.1)", display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "rgba(201,168,76,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <FilePlus size={20} color="#C9A84C" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", margin: 0 }}>Need a document?</p>
              <p style={{ fontSize: 12, color: "#7A7680", margin: "2px 0 0" }}>Request a new statement, tax certificate, or compliance document from your advisor.</p>
            </div>
            <button style={{
              padding: "8px 20px", borderRadius: 8,
              border: "1px solid rgba(201,168,76,0.3)", background: "transparent",
              color: "#C9A84C", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
            }}>
              Request Document
            </button>
          </div>
        </div>
      )}

      {/* Search History */}
      {activeSubTab === "history" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SEARCH_HISTORY.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
                background: "#0D1117",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              {/* Search icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "rgba(122,118,128,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Search size={16} color="#7A7680" />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#E8E4DD", margin: 0 }}>{item.query}</p>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: "#7A7680", display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={11} /> {item.date}
                  </span>
                </div>
              </div>

              {/* Result count badge */}
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 99,
                background: "rgba(46,204,113,0.08)", color: "#2ECC71",
              }}>
                {item.results} results found
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
