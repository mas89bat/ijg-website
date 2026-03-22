"use client";

import { useState } from "react";
import {
  FileText,
  Check,
  Calendar,
  Upload,
  Send,
  Phone,
  Mail,
  MessageCircle,
  Download,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FilePlus,
} from "lucide-react";
import { Language } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

/* ------------------------------------------------------------------ */
/*  Types & mock data                                                  */
/* ------------------------------------------------------------------ */

type ProposalStatus = "awaiting" | "accepted" | "draft" | "expired";

interface Proposal {
  id: number;
  title: string;
  status: ProposalStatus;
  date: string;
  summary: string;
  terms?: string[];
}

const STATUS_META: Record<
  ProposalStatus,
  { label: string; bg: string; color: string; stripe: string }
> = {
  awaiting: {
    label: "Awaiting Your Review",
    bg: "rgba(245,166,35,0.12)",
    color: "#F5A623",
    stripe: "#F5A623",
  },
  accepted: {
    label: "Accepted",
    bg: "rgba(80,200,120,0.12)",
    color: "#50C878",
    stripe: "#50C878",
  },
  draft: {
    label: "Draft",
    bg: "rgba(255,255,255,0.06)",
    color: "#7A7680",
    stripe: "#7A7680",
  },
  expired: {
    label: "Expired",
    bg: "rgba(220,53,69,0.12)",
    color: "#DC3545",
    stripe: "#DC3545",
  },
};

const PROPOSALS: Proposal[] = [
  {
    id: 1,
    title: "Retirement Planning Proposal",
    status: "awaiting",
    date: "18 Mar 2026",
    summary:
      "Comprehensive retirement strategy based on your current savings of N$850,000 and target retirement age of 60. Recommended monthly contribution increase to N$4,500.",
    terms: [
      "Monthly contribution increase from N$3,200 to N$4,500",
      "Target retirement corpus: N$8.5 million by age 60",
      "Asset allocation: 55% equity, 30% fixed income, 15% alternatives",
      "Annual review and rebalance included",
      "IJG management fee: 0.85% per annum",
    ],
  },
  {
    id: 2,
    title: "Investment Portfolio Rebalance",
    status: "accepted",
    date: "12 Mar 2026",
    summary:
      "Q1 2026 portfolio rebalance recommendation. Increase equity allocation from 45% to 52%, reduce fixed income from 35% to 28%.",
  },
  {
    id: 3,
    title: "Education Savings Plan",
    status: "draft",
    date: "8 Mar 2026",
    summary:
      "Structured education savings plan for two children. Target: N$1.2m per child by 2038. Recommended vehicle: IJG Education Growth Fund.",
  },
  {
    id: 4,
    title: "Tax Optimization Strategy",
    status: "expired",
    date: "15 Feb 2026",
    summary:
      "End-of-year tax optimization for 2025/26 tax year. Estimated tax saving: N$42,000.",
  },
];

interface TimelineEntry {
  icon: typeof FileText;
  text: string;
  time: string;
}

const TIMELINE: TimelineEntry[] = [
  { icon: FileText, text: "Johan shared Retirement Planning Proposal", time: "18 Mar, 10:30 AM" },
  { icon: Check, text: "You accepted Investment Portfolio Rebalance", time: "12 Mar, 2:15 PM" },
  { icon: Calendar, text: "Johan scheduled a review call", time: "10 Mar, 9:00 AM" },
  { icon: Upload, text: "You uploaded tax documents", time: "5 Mar, 4:45 PM" },
  { icon: Send, text: "Johan sent Education Savings Draft", time: "8 Mar, 11:20 AM" },
];

const DOCUMENTS = [
  { name: "2025/26 Tax Certificate", type: "PDF", date: "5 Mar 2026" },
  { name: "Portfolio Statement Q4 2025", type: "PDF", date: "15 Jan 2026" },
  { name: "KYC Documents", type: "Verified", date: "10 Dec 2025" },
  { name: "Risk Profile Assessment", type: "Completed", date: "8 Dec 2025" },
];

/* ------------------------------------------------------------------ */
/*  Shared styles                                                      */
/* ------------------------------------------------------------------ */

const GOLD = "#C49A2A";
const GOLD_LIGHT = "#D4A843";
const CARD_BG = "#0D1117";
const CARD_BORDER = "1px solid rgba(255,255,255,0.06)";
const FONT = "'DM Sans', sans-serif";

const sectionTitle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#7A7680",
  marginBottom: 16,
  fontFamily: FONT,
};

const cardBase: React.CSSProperties = {
  background: CARD_BG,
  borderRadius: 12,
  border: CARD_BORDER,
  padding: 20,
  fontFamily: FONT,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export interface AdvisoryTabProps {
  language: Language;
}

export function AdvisoryTab({ language }: AdvisoryTabProps) {
  const isMobile = useIsMobile();
  const [expandedProposal, setExpandedProposal] = useState<number | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [acceptedProposals, setAcceptedProposals] = useState<Set<number>>(
    () => new Set()
  );

  const handleAccept = (id: number) => {
    setAcceptedProposals((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setExpandedProposal(null);
    setTermsAccepted(false);
  };

  return (
    <>
      {/* Page heading */}
      <p
        style={{
          fontSize: 12,
          color: "#7A7680",
          fontWeight: 500,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        Client Advisory Hub
      </p>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 300,
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
          marginBottom: 32,
          color: "#E8E4DD",
        }}
      >
        Your advisor &amp; proposals
      </h1>

      {/* ============================================================ */}
      {/*  Section 1 — Your Advisor Card                                */}
      {/* ============================================================ */}
      <div style={{ ...cardBase, marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
          {/* Avatar */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#06070D", fontWeight: 700, fontSize: 22, fontFamily: FONT }}>
              JM
            </span>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#E8E4DD", marginBottom: 2 }}>
              Johan Mostert
            </p>
            <p style={{ fontSize: 14, color: "#7A7680", marginBottom: 2 }}>
              Senior Financial Advisor
            </p>
            <p style={{ fontSize: 13, color: GOLD, marginBottom: 10 }}>CFP®, CFA</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "#9A9A9A" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Phone size={14} color="#7A7680" /> +264 61 256 666
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Mail size={14} color="#7A7680" /> johan.mostert@ijg.net
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: 8, flexShrink: 0, flexWrap: "wrap", width: isMobile ? "100%" : "auto" }}>
            <button
              style={{
                padding: "10px 22px",
                borderRadius: 8,
                border: "none",
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                color: "#06070D",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: FONT,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Phone size={14} /> Schedule a Call
            </button>
            <button
              style={{
                padding: "10px 22px",
                borderRadius: 8,
                border: "none",
                background: "#25D366",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: FONT,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MessageCircle size={14} /> Message via WhatsApp
            </button>
          </div>
        </div>

        {/* Availability badge */}
        <div
          style={{
            marginTop: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 99,
            background: "rgba(80,200,120,0.08)",
            fontSize: 11,
            color: "#50C878",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#50C878",
              display: "inline-block",
            }}
          />
          Available Mon–Fri 8:00–17:00 WAT
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Section 2 — Active Proposals                                 */}
      {/* ============================================================ */}
      <p style={sectionTitle}>Active Proposals</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {PROPOSALS.map((p) => {
          const meta =
            acceptedProposals.has(p.id) && p.status === "awaiting"
              ? STATUS_META.accepted
              : STATUS_META[p.status];
          const isExpanded = expandedProposal === p.id;
          const wasJustAccepted = acceptedProposals.has(p.id);

          return (
            <div key={p.id}>
              {/* Proposal card */}
              <div
                style={{
                  ...cardBase,
                  padding: 0,
                  display: "flex",
                  overflow: "hidden",
                }}
              >
                {/* Color stripe */}
                <div
                  style={{
                    width: 4,
                    flexShrink: 0,
                    background: meta.stripe,
                    borderRadius: "12px 0 0 12px",
                  }}
                />

                <div style={{ flex: 1, padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <FileText size={22} color="#7A7680" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flexWrap: "wrap",
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#E8E4DD" }}>
                        {p.title}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "2px 10px",
                          borderRadius: 99,
                          background: meta.bg,
                          color: meta.color,
                        }}
                      >
                        {wasJustAccepted && p.status === "awaiting" ? "Accepted" : meta.label}
                      </span>
                      <span style={{ fontSize: 12, color: "#555" }}>{p.date}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#9A9A9A", lineHeight: 1.6, marginBottom: 12 }}>
                      {p.summary}
                    </p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {p.status === "awaiting" && !wasJustAccepted && (
                        <>
                          <button
                            onClick={() => {
                              setExpandedProposal(isExpanded ? null : p.id);
                              setTermsAccepted(false);
                            }}
                            style={{
                              padding: "8px 18px",
                              borderRadius: 8,
                              border: "none",
                              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                              color: "#06070D",
                              fontWeight: 700,
                              fontSize: 12,
                              cursor: "pointer",
                              fontFamily: FONT,
                            }}
                          >
                            Review &amp; Accept
                          </button>
                          <button
                            style={{
                              padding: "8px 18px",
                              borderRadius: 8,
                              border: `1px solid rgba(255,255,255,0.1)`,
                              background: "transparent",
                              color: "#9A9A9A",
                              fontWeight: 600,
                              fontSize: 12,
                              cursor: "pointer",
                              fontFamily: FONT,
                            }}
                          >
                            <Download size={12} style={{ marginRight: 6, verticalAlign: "middle" }} />
                            Download PDF
                          </button>
                        </>
                      )}
                      {(p.status === "accepted" || wasJustAccepted) && (
                        <button
                          style={{
                            padding: "8px 18px",
                            borderRadius: 8,
                            border: `1px solid rgba(255,255,255,0.1)`,
                            background: "transparent",
                            color: "#9A9A9A",
                            fontWeight: 600,
                            fontSize: 12,
                            cursor: "pointer",
                            fontFamily: FONT,
                          }}
                        >
                          View Details
                        </button>
                      )}
                      {p.status === "draft" && (
                        <button
                          style={{
                            padding: "8px 18px",
                            borderRadius: 8,
                            border: `1px solid rgba(255,255,255,0.1)`,
                            background: "transparent",
                            color: "#9A9A9A",
                            fontWeight: 600,
                            fontSize: 12,
                            cursor: "pointer",
                            fontFamily: FONT,
                          }}
                        >
                          Preview Draft
                        </button>
                      )}
                      {p.status === "expired" && (
                        <button
                          style={{
                            padding: "8px 18px",
                            borderRadius: 8,
                            border: `1px solid rgba(255,255,255,0.1)`,
                            background: "transparent",
                            color: "#9A9A9A",
                            fontWeight: 600,
                            fontSize: 12,
                            cursor: "pointer",
                            fontFamily: FONT,
                          }}
                        >
                          Request Updated Proposal
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/*  Section 3 — Expanded acceptance view                    */}
              {/* ====================================================== */}
              {isExpanded && p.terms && (
                <div
                  style={{
                    background: "#111621",
                    borderRadius: "0 0 12px 12px",
                    border: "1px solid rgba(196,154,42,0.18)",
                    borderTop: "none",
                    padding: 24,
                    marginTop: -4,
                    fontFamily: FONT,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#E8E4DD",
                      marginBottom: 4,
                    }}
                  >
                    {p.title}
                  </p>
                  <p style={{ fontSize: 12, color: "#7A7680", marginBottom: 16 }}>
                    Prepared by Johan Mostert &middot; {p.date}
                  </p>

                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: GOLD,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: 10,
                    }}
                  >
                    Key Terms
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 18, marginBottom: 20 }}>
                    {p.terms.map((t, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 13,
                          color: "#B0ACA5",
                          lineHeight: 1.8,
                        }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Checkbox */}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 18,
                      cursor: "pointer",
                      fontSize: 13,
                      color: "#E8E4DD",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      style={{ accentColor: GOLD, width: 16, height: 16 }}
                    />
                    I have read and understood this proposal
                  </label>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      disabled={!termsAccepted}
                      onClick={() => handleAccept(p.id)}
                      style={{
                        padding: "10px 24px",
                        borderRadius: 8,
                        border: "none",
                        background: termsAccepted
                          ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`
                          : "rgba(255,255,255,0.06)",
                        color: termsAccepted ? "#06070D" : "#555",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: termsAccepted ? "pointer" : "not-allowed",
                        fontFamily: FONT,
                        transition: "all 0.2s",
                      }}
                    >
                      Accept Proposal
                    </button>
                    <button
                      onClick={() => setExpandedProposal(null)}
                      style={{
                        padding: "10px 24px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "transparent",
                        color: "#9A9A9A",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                        fontFamily: FONT,
                      }}
                    >
                      Request Changes
                    </button>
                  </div>

                  <p
                    style={{
                      fontSize: 11,
                      color: "#555",
                      marginTop: 14,
                      lineHeight: 1.5,
                    }}
                  >
                    Acceptance is subject to IJG&apos;s terms and conditions. This does not
                    constitute a binding contract.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/*  Section 4 — Recent Communications                            */}
      {/* ============================================================ */}
      <p style={sectionTitle}>Recent Communications</p>
      <div style={{ ...cardBase, marginBottom: 32, padding: "20px 24px" }}>
        {TIMELINE.map((entry, i) => {
          const Icon = entry.icon;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                position: "relative",
                paddingBottom: i < TIMELINE.length - 1 ? 20 : 0,
              }}
            >
              {/* Timeline line */}
              {i < TIMELINE.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 13,
                    top: 28,
                    bottom: 0,
                    width: 2,
                    background: `linear-gradient(to bottom, ${GOLD}44, ${GOLD}11)`,
                  }}
                />
              )}
              {/* Icon circle */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(196,154,42,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                <Icon size={14} color={GOLD} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: "#E8E4DD", marginBottom: 2 }}>{entry.text}</p>
                <p style={{ fontSize: 11, color: "#555" }}>{entry.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/*  Section 5 — Documents Vault                                  */}
      {/* ============================================================ */}
      <p style={sectionTitle}>Documents Vault</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {DOCUMENTS.map((doc, i) => (
          <div key={i} style={{ ...cardBase, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FileText size={18} color={GOLD} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#E8E4DD", flex: 1 }}>
                {doc.name}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: "rgba(255,255,255,0.06)",
                  color: "#7A7680",
                }}
              >
                {doc.type}
              </span>
              <span style={{ fontSize: 11, color: "#555" }}>{doc.date}</span>
            </div>
            <button
              style={{
                padding: "7px 14px",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                color: "#9A9A9A",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: FONT,
                display: "flex",
                alignItems: "center",
                gap: 6,
                alignSelf: "flex-start",
              }}
            >
              <Download size={12} /> Download
            </button>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/*  Section 6 — CTA                                              */}
      {/* ============================================================ */}
      <div
        style={{
          ...cardBase,
          background: "linear-gradient(135deg, rgba(27,79,114,0.15), rgba(196,154,42,0.08))",
          border: "1px solid rgba(196,154,42,0.12)",
          textAlign: "center",
          padding: 28,
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 16, fontWeight: 600, color: "#E8E4DD", marginBottom: 6 }}>
          Need to discuss something?
        </p>
        <p style={{ fontSize: 13, color: "#7A7680", marginBottom: 18 }}>
          Reach out to Johan directly for personalised financial guidance.
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: "#06070D",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: FONT,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Phone size={14} /> Call Advisor
          </button>
          <button
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: "#25D366",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: FONT,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <MessageCircle size={14} /> WhatsApp
          </button>
          <button
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "#9A9A9A",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: FONT,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Mail size={14} /> Email
          </button>
        </div>
      </div>
    </>
  );
}
