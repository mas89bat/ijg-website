"use client";

import { Mail, MessageCircle, Bell, ArrowRight } from "lucide-react";
import { Language, RESEARCH } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

export interface CommunicationsTabProps {
  language: Language;
}

export function CommunicationsTab({ language }: CommunicationsTabProps) {
  const isMobile = useIsMobile();
  return (
    <>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 300,
          fontFamily: "'Georgia',serif",
          fontStyle: "italic",
          marginBottom: 8,
          color: "#E8E4DD",
        }}
      >
        Communications
      </h1>
      <p style={{ fontSize: 14, color: "#7A7680", marginBottom: 28 }}>
        Manage your research delivery channels and preferences.
      </p>

      {/* Subsection 1: Daily Briefing */}
      <div
        style={{
          background: "#0D0E16",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(27,79,114,0.3),rgba(196,154,42,0.1))",
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#C49A2A",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Daily Briefing
          </p>
          <p
            style={{
              fontSize: 11,
              color: "#7A7680",
              marginBottom: 12,
            }}
          >
            AI-curated market intelligence delivered every morning at 7:00 AM.
          </p>
        </div>

        {/* Latest issue */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#C49A2A",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Latest Issue
          </p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#E8E4DD",
              fontFamily: "'Georgia',serif",
              fontStyle: "italic",
            }}
          >
            NSX rallies on uranium strength; BoN MPC preview
          </p>
          <p style={{ fontSize: 12, color: "#7A7680", marginTop: 4 }}>
            Saturday, 21 March 2026 &middot; 7:00 AM
          </p>
        </div>

        <div style={{ padding: "20px 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {[
              {
                label: "NSX Overall",
                value: "+1.2%",
                sub: "1,847 pts",
                color: "#2ECC71",
              },
              {
                label: "Uranium Spot",
                value: "$83.50/lb",
                sub: "19-yr high",
                color: "#C49A2A",
              },
              {
                label: "Namibia CPI",
                value: "4.1%",
                sub: "Feb 2026",
                color: "#5DADE2",
              },
              {
                label: "Repo Rate",
                value: "7.00%",
                sub: "Expected hold",
                color: "#7A7680",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 8,
                  padding: "10px 12px",
                }}
              >
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: s.color,
                    marginBottom: 2,
                  }}
                >
                  {s.value}
                </p>
                <p style={{ fontSize: 11, color: "#7A7680" }}>{s.label}</p>
                <p style={{ fontSize: 10, color: "#7A7680" }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Content depth tiers */}
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#E8E4DD",
              marginBottom: 4,
            }}
          >
            Content Depth
          </p>
          <p
            style={{ fontSize: 13, color: "#7A7680", marginBottom: 12 }}
          >
            Choose the level of detail for your daily briefing.
          </p>
          <div style={{ display: "flex", gap: 8, flexDirection: isMobile ? "column" : "row" }}>
            {[
              {
                tier: "Headlines",
                desc: "Key stories only",
                active: false,
              },
              {
                tier: "Summary",
                desc: "Summary + key stats",
                active: false,
              },
              {
                tier: "Full Analysis",
                desc: "Complete with citations",
                active: true,
              },
            ].map((tier, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 8,
                  textAlign: "center",
                  background: tier.active
                    ? "rgba(196,154,42,0.1)"
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${
                    tier.active
                      ? "rgba(196,154,42,0.3)"
                      : "rgba(255,255,255,0.04)"
                  }`,
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: tier.active ? "#C49A2A" : "#7A7680",
                    marginBottom: 2,
                  }}
                >
                  {tier.tier}
                </p>
                <p style={{ fontSize: 10, color: "#7A7680" }}>{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subsection 2: WhatsApp Delivery */}
      <div
        style={{
          background: "#0D0E16",
          borderRadius: 16,
          padding: 24,
          border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: 24,
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: "#25D366",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          WhatsApp Delivery
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 16,
          }}
        >
          {/* Connected status */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: 12,
              padding: 20,
              border: "1px solid rgba(37,211,102,0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(37,211,102,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={18} color="#25D366" />
              </div>
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#E8E4DD",
                  }}
                >
                  WhatsApp Connected
                </p>
                <p style={{ fontSize: 12, color: "#25D366" }}>
                  +264 81 *** *** &middot; Active
                </p>
              </div>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#7A7680",
                lineHeight: 1.6,
              }}
            >
              Your WhatsApp number is connected. You receive daily briefings and
              can query the AI directly from WhatsApp.
            </p>
          </div>

          {/* Active alerts */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: 12,
              padding: 20,
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#E8E4DD",
                marginBottom: 12,
              }}
            >
              Active Alerts
            </p>
            {[
              {
                topic: "Uranium price",
                trigger: "> $85/lb",
              },
              {
                topic: "BoN MPC decisions",
                trigger: "Any change",
              },
              {
                topic: "Capricorn Group",
                trigger: "New research",
              },
            ].map((alert, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  padding: "6px 0",
                  borderBottom:
                    i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <Bell size={14} color="#C9A84C" />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#E8E4DD",
                    }}
                  >
                    {alert.topic}
                  </p>
                  <p style={{ fontSize: 11, color: "#7A7680" }}>
                    Trigger: {alert.trigger}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    padding: "2px 8px",
                    borderRadius: 99,
                    background: "rgba(46,204,113,0.1)",
                    color: "#2ECC71",
                    fontWeight: 700,
                  }}
                >
                  ON
                </span>
              </div>
            ))}
            <button
              style={{
                marginTop: 12,
                width: "100%",
                padding: "8px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                color: "#7A7680",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              + Add New Alert
            </button>
          </div>
        </div>
      </div>

      {/* Subsection 3: Delivery Preferences */}
      <div
        style={{
          background: "#0D0E16",
          borderRadius: 16,
          padding: 24,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: "#C49A2A",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Delivery Preferences
        </p>
        {[
          {
            icon: <Mail size={20} color="#C9A84C" />,
            label: "Email",
            desc: "Full newsletter in your inbox",
            active: true,
          },
          {
            icon: <MessageCircle size={20} color="#25D366" />,
            label: "WhatsApp",
            desc: "Condensed mobile format",
            active: true,
          },
          {
            icon: <Bell size={20} color="#C9A84C" />,
            label: "Push notifications",
            desc: "Breaking market alerts",
            active: false,
          },
        ].map((opt, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: "10px 0",
              borderBottom:
                i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            <span style={{ fontSize: 20 }}>{opt.icon}</span>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#E8E4DD",
                }}
              >
                {opt.label}
              </p>
              <p style={{ fontSize: 11, color: "#7A7680" }}>{opt.desc}</p>
            </div>
            <div
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: opt.active
                  ? "#C49A2A"
                  : "rgba(255,255,255,0.1)",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#fff",
                  position: "absolute",
                  top: 3,
                  left: opt.active ? 21 : 3,
                  transition: "left 0.2s",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
