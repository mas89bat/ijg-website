"use client";

import {
  User,
  ShieldCheck,
  Target,
  Calendar,
  Wallet,
  Mail,
  Phone,
  MapPin,
  Edit3,
  TrendingUp,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
} from "lucide-react";
import { Language } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

const INVESTOR_PROFILE = {
  name: "Alex Shimanda",
  email: "alex.shimanda@email.com",
  phone: "+264 81 234 5678",
  address: "Windhoek, Namibia",
  clientId: "IJG-NAM-2024-1847",
  memberSince: "October 2024",
  riskProfile: "Moderate Growth",
  riskScore: 6,
  advisor: "Johan Mostert, CFP®, CFA",
  advisorEmail: "johan.mostert@ijg.net",
  advisorPhone: "+264 61 256 666",
  portfolioValue: "N$2,450,000",
  portfolioChange: "+4.2%",
  portfolioUp: true,
  lastReview: "15 Mar 2026",
  nextReview: "15 Jun 2026",
  plan: "Professional",
  investmentGoals: [
    { goal: "Retirement at 60", target: "N$8,000,000", progress: 31, horizon: "18 years", allocated: "N$1,850,000" },
    { goal: "Children's Education", target: "N$1,200,000", progress: 52, horizon: "8 years", allocated: "N$624,000" },
    { goal: "Emergency Fund", target: "N$300,000", progress: 87, horizon: "Ongoing", allocated: "N$261,000" },
  ],
  allocation: [
    { asset: "Namibian Equities", pct: 35, color: "#C9A84C" },
    { asset: "SA Equities", pct: 20, color: "#3B82F6" },
    { asset: "Fixed Income", pct: 25, color: "#10B981" },
    { asset: "Property", pct: 10, color: "#8B5CF6" },
    { asset: "Cash & Money Market", pct: 10, color: "#F59E0B" },
  ],
};

export interface ProfileTabProps {
  language: Language;
}

export function ProfileTab({ language }: ProfileTabProps) {
  const isMobile = useIsMobile();
  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 24, color: "#E8E4DD" }}>
        My Profile
      </h1>

      {/* Profile Header */}
      <div style={{
        background: "linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02))",
        borderRadius: 16, border: "1px solid rgba(201,168,76,0.15)", padding: 28, marginBottom: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24, flexWrap: isMobile ? "wrap" : "nowrap" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(201,168,76,0.15)", border: "2px solid rgba(201,168,76,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 700, color: "#C9A84C", fontFamily: "DM Sans, sans-serif",
            flexShrink: 0,
          }}>
            AS
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 600, color: "#E8E4DD", margin: 0 }}>{INVESTOR_PROFILE.name}</h2>
            <p style={{ fontSize: 13, color: "#7A7680", margin: "2px 0 0" }}>Client ID: {INVESTOR_PROFILE.clientId} · Member since {INVESTOR_PROFILE.memberSince}</p>
            <span style={{
              display: "inline-block", marginTop: 6,
              fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
              background: "rgba(201,168,76,0.15)", color: "#C9A84C", textTransform: "uppercase", letterSpacing: "0.5px",
            }}>{INVESTOR_PROFILE.plan} Plan</span>
          </div>
          <div style={{ textAlign: isMobile ? "left" : "right", width: isMobile ? "100%" : "auto", marginTop: isMobile ? 8 : 0 }}>
            <p style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: "#C9A84C", margin: 0 }}>{INVESTOR_PROFILE.portfolioValue}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: isMobile ? "flex-start" : "flex-end", marginTop: 2 }}>
              {INVESTOR_PROFILE.portfolioUp
                ? <ArrowUpRight size={14} color="#10B981" />
                : <ArrowDownRight size={14} color="#EF4444" />
              }
              <span style={{ fontSize: 13, fontWeight: 600, color: INVESTOR_PROFILE.portfolioUp ? "#10B981" : "#EF4444" }}>
                {INVESTOR_PROFILE.portfolioChange}
              </span>
              <span style={{ fontSize: 12, color: "#7A7680" }}>YTD</span>
            </div>
          </div>
        </div>

        {/* Contact + Key Info Grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 12 }}>
          {[
            { icon: Mail, label: "Email", value: INVESTOR_PROFILE.email, color: "#3B82F6" },
            { icon: Phone, label: "Phone", value: INVESTOR_PROFILE.phone, color: "#10B981" },
            { icon: MapPin, label: "Location", value: INVESTOR_PROFILE.address, color: "#8B5CF6" },
            { icon: ShieldCheck, label: "Risk Profile", value: `${INVESTOR_PROFILE.riskProfile} (${INVESTOR_PROFILE.riskScore}/10)`, color: "#F59E0B" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "12px 14px", background: "rgba(13,17,23,0.6)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <item.icon size={12} color={item.color} />
                <span style={{ fontSize: 10, color: "#7A7680", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</span>
              </div>
              <p style={{ fontSize: 12, color: "#E8E4DD", fontWeight: 500, margin: 0, wordBreak: "break-all" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout: Goals + Allocation */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Investment Goals */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <Target size={16} color="#C9A84C" /> Investment Goals
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {INVESTOR_PROFILE.investmentGoals.map((goal, i) => (
              <div key={i} style={{
                padding: "16px 18px", background: "#0D1117", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#E8E4DD", margin: 0 }}>{goal.goal}</p>
                    <p style={{ fontSize: 11, color: "#7A7680", margin: "2px 0 0" }}>
                      Target: {goal.target} · Allocated: {goal.allocated} · {goal.horizon}
                    </p>
                  </div>
                  <span style={{
                    fontSize: 18, fontWeight: 700,
                    color: goal.progress >= 75 ? "#10B981" : goal.progress >= 40 ? "#F59E0B" : "#C9A84C",
                  }}>
                    {goal.progress}%
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 99, width: `${goal.progress}%`,
                    background: goal.progress >= 75 ? "linear-gradient(90deg, #10B981, #34D399)" : goal.progress >= 40 ? "linear-gradient(90deg, #F59E0B, #FBBF24)" : "linear-gradient(90deg, #C49A2A, #D4A843)",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Allocation */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <PieChart size={16} color="#C9A84C" /> Portfolio Allocation
          </h3>
          <div style={{
            padding: "20px 18px", background: "#0D1117", borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            {/* Horizontal bar */}
            <div style={{ display: "flex", height: 12, borderRadius: 99, overflow: "hidden", marginBottom: 20 }}>
              {INVESTOR_PROFILE.allocation.map((a, i) => (
                <div key={i} style={{ width: `${a.pct}%`, background: a.color, transition: "width 0.3s" }} />
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {INVESTOR_PROFILE.allocation.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: a.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, color: "#E8E4DD" }}>{a.asset}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: a.color }}>{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Your Advisor */}
      <div style={{
        padding: 24, background: "#0D1117", borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24,
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <User size={16} color="#C9A84C" /> Your Advisor
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: isMobile ? "wrap" : "nowrap" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
            border: "1px solid rgba(201,168,76,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: "#C9A84C", flexShrink: 0,
          }}>
            JM
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#E8E4DD", margin: 0 }}>{INVESTOR_PROFILE.advisor}</p>
            <p style={{ fontSize: 12, color: "#7A7680", margin: "2px 0 0" }}>Senior Wealth Manager · IJG Securities</p>
            <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#7A7680", display: "flex", alignItems: "center", gap: 4 }}>
                <Mail size={11} color="#3B82F6" /> {INVESTOR_PROFILE.advisorEmail}
              </span>
              <span style={{ fontSize: 12, color: "#7A7680", display: "flex", alignItems: "center", gap: 4 }}>
                <Phone size={11} color="#10B981" /> {INVESTOR_PROFILE.advisorPhone}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", width: isMobile ? "100%" : "auto" }}>
            <button style={{
              padding: "8px 16px", borderRadius: 8,
              border: "1px solid rgba(37,211,102,0.3)", background: "rgba(37,211,102,0.06)",
              color: "#25D366", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <MessageCircle size={14} /> WhatsApp
            </button>
            <button style={{
              padding: "8px 16px", borderRadius: 8,
              border: "1px solid rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.06)",
              color: "#C9A84C", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <Calendar size={14} /> Schedule Call
            </button>
          </div>
        </div>

        {/* Review timeline */}
        <div style={{ display: "flex", gap: isMobile ? 10 : 16, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)", flexDirection: isMobile ? "column" : "row" }}>
          <div style={{ flex: 1, padding: "10px 14px", background: "rgba(59,130,246,0.06)", borderRadius: 8, border: "1px solid rgba(59,130,246,0.1)" }}>
            <span style={{ fontSize: 10, color: "#3B82F6", fontWeight: 600, textTransform: "uppercase" }}>Last Review</span>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#E8E4DD", margin: "4px 0 0" }}>{INVESTOR_PROFILE.lastReview}</p>
          </div>
          <div style={{ flex: 1, padding: "10px 14px", background: "rgba(16,185,129,0.06)", borderRadius: 8, border: "1px solid rgba(16,185,129,0.1)" }}>
            <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600, textTransform: "uppercase" }}>Next Review</span>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#E8E4DD", margin: "4px 0 0" }}>{INVESTOR_PROFILE.nextReview}</p>
          </div>
          <div style={{ flex: 1, padding: "10px 14px", background: "rgba(201,168,76,0.06)", borderRadius: 8, border: "1px solid rgba(201,168,76,0.1)" }}>
            <span style={{ fontSize: 10, color: "#C9A84C", fontWeight: 600, textTransform: "uppercase" }}>Subscription</span>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#E8E4DD", margin: "4px 0 0" }}>{INVESTOR_PROFILE.plan} Plan</p>
          </div>
        </div>
      </div>

      {/* Edit Profile CTA */}
      <div style={{
        padding: 20, background: "rgba(201,168,76,0.04)", borderRadius: 12,
        border: "1px solid rgba(201,168,76,0.1)", display: "flex", alignItems: "center", gap: 16,
      }}>
        <Edit3 size={20} color="#C9A84C" />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", margin: 0 }}>Update your profile</p>
          <p style={{ fontSize: 12, color: "#7A7680", margin: "2px 0 0" }}>Contact your advisor to update your risk profile, investment goals, or personal details.</p>
        </div>
        <button style={{
          padding: "8px 20px", borderRadius: 8,
          border: "1px solid rgba(201,168,76,0.3)", background: "transparent",
          color: "#C9A84C", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
        }}>
          Request Update
        </button>
      </div>
    </>
  );
}
