"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Globe, Bell, LogOut, User, Mail, CreditCard, Check } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage, Language } from "@/contexts/language-context";
import { LANG_LABELS } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

const PLANS = [
  {
    name: "Free",
    price: "N$0",
    period: "/mo",
    features: ["Headlines only", "3 queries/day", "Email newsletter"],
    cta: "Downgrade",
    ctaStyle: "muted" as const,
  },
  {
    name: "Essentials",
    price: "N$199",
    period: "/mo",
    features: ["Summary + key stats", "10 queries/day", "Email + WhatsApp"],
    cta: "Downgrade",
    ctaStyle: "muted" as const,
  },
  {
    name: "Professional",
    price: "N$499",
    period: "/mo",
    features: ["Full analysis + citations", "Unlimited queries", "All delivery channels", "Document generation"],
    cta: "Current Plan",
    ctaStyle: "current" as const,
  },
  {
    name: "Institutional",
    price: "Contact us",
    period: "",
    features: ["Raw data + methodology", "API access", "Custom reports", "Dedicated analyst"],
    cta: "Contact Sales",
    ctaStyle: "gold" as const,
  },
];

export interface SettingsTabProps {
  language: Language;
}

export function SettingsTab({ language }: SettingsTabProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    whatsapp: true,
  });

  const currentPlan = user?.plan ?? "Professional";

  const handleLogout = () => {
    logout();
    router.push("/research");
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 8, color: "#E8E4DD" }}>
        <Settings size={24} style={{ display: "inline", verticalAlign: "middle", marginRight: 8 }} />
        Account Settings
      </h1>
      <p style={{ fontSize: 14, color: "#7A7680", marginBottom: 28 }}>Manage your profile, preferences, and notifications.</p>

      {/* Plan / Upgrade Section */}
      <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: "#C49A2A", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>
          <CreditCard size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
          Your Plan
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {PLANS.map((plan) => {
            const isCurrent = plan.name.toLowerCase() === currentPlan.toLowerCase();
            return (
              <div
                key={plan.name}
                style={{
                  background: "#0D1117",
                  borderRadius: 12,
                  padding: 20,
                  border: isCurrent ? "2px solid #C49A2A" : "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {isCurrent && (
                  <span style={{
                    position: "absolute",
                    top: -10,
                    right: 12,
                    background: "#C49A2A",
                    color: "#0D0E16",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}>
                    Current Plan
                  </span>
                )}
                <p style={{ fontSize: 16, fontWeight: 600, color: "#E8E4DD", marginBottom: 4 }}>{plan.name}</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: isCurrent ? "#C49A2A" : "#E8E4DD", marginBottom: 14 }}>
                  {plan.price}<span style={{ fontSize: 13, fontWeight: 400, color: "#7A7680" }}>{plan.period}</span>
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, marginBottom: 16 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Check size={14} color={isCurrent ? "#C49A2A" : "#4ADE80"} />
                      <span style={{ fontSize: 12, color: "#9A9A9A" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    borderRadius: 8,
                    border: isCurrent
                      ? "1px solid rgba(196,154,42,0.3)"
                      : plan.ctaStyle === "gold"
                        ? "1px solid rgba(196,154,42,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                    background: isCurrent
                      ? "rgba(196,154,42,0.1)"
                      : plan.ctaStyle === "gold"
                        ? "rgba(196,154,42,0.08)"
                        : "rgba(255,255,255,0.03)",
                    color: isCurrent
                      ? "#C49A2A"
                      : plan.ctaStyle === "gold"
                        ? "#C49A2A"
                        : "#7A7680",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: isCurrent ? "default" : "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                    opacity: isCurrent ? 0.7 : 1,
                  }}
                  disabled={isCurrent}
                >
                  {isCurrent ? "Current Plan" : plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* User info */}
      <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: "#C49A2A", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Profile</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <User size={16} color="#7A7680" />
            <div>
              <p style={{ fontSize: 11, color: "#7A7680", marginBottom: 2 }}>Name</p>
              <p style={{ fontSize: 14, color: "#E8E4DD", fontWeight: 500 }}>{user?.name ?? "Andri Sobczak"}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Mail size={16} color="#7A7680" />
            <div>
              <p style={{ fontSize: 11, color: "#7A7680", marginBottom: 2 }}>Email</p>
              <p style={{ fontSize: 14, color: "#E8E4DD", fontWeight: 500 }}>{user?.email ?? "demo@ijg.net"}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <CreditCard size={16} color="#7A7680" />
            <div>
              <p style={{ fontSize: 11, color: "#7A7680", marginBottom: 2 }}>Plan</p>
              <p style={{ fontSize: 14, color: "#C49A2A", fontWeight: 600, textTransform: "capitalize" }}>{user?.plan ?? "Professional"} Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Language selector */}
      <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: "#C49A2A", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>
          <Globe size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
          Language
        </p>
        <p style={{ fontSize: 13, color: "#7A7680", marginBottom: 14 }}>Choose your preferred language for AI responses and the interface.</p>
        <div style={{ display: "flex", gap: 8, flexDirection: isMobile ? "column" : "row" }}>
          {(["en", "af", "osh"] as Language[]).map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 8,
                background: language === lang ? "rgba(196,154,42,0.1)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${language === lang ? "rgba(196,154,42,0.3)" : "rgba(255,255,255,0.04)"}`,
                color: language === lang ? "#C49A2A" : "#7A7680",
                fontSize: 13, fontWeight: language === lang ? 700 : 400,
                cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Notification preferences */}
      <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: "#C49A2A", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>
          <Bell size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
          Notification Preferences
        </p>
        {[
          { key: "email" as const, label: "Email notifications", desc: "Daily briefing and research alerts" },
          { key: "push" as const, label: "Push notifications", desc: "Breaking market news and alerts" },
          { key: "whatsapp" as const, label: "WhatsApp notifications", desc: "Condensed research and alerts" },
        ].map((pref, i) => (
          <div key={pref.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#E8E4DD" }}>{pref.label}</p>
              <p style={{ fontSize: 11, color: "#7A7680" }}>{pref.desc}</p>
            </div>
            <div
              onClick={() => toggleNotification(pref.key)}
              style={{
                width: 40, height: 22, borderRadius: 11,
                background: notifications[pref.key] ? "#C49A2A" : "rgba(255,255,255,0.1)",
                position: "relative", cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <div style={{
                width: 16, height: 16, borderRadius: "50%", background: "#fff",
                position: "absolute", top: 3,
                left: notifications[pref.key] ? 21 : 3,
                transition: "left 0.2s",
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Sign out */}
      <button
        onClick={handleLogout}
        style={{
          width: "100%", padding: "14px", borderRadius: 10,
          border: "1px solid rgba(231,76,60,0.2)",
          background: "rgba(231,76,60,0.05)",
          color: "#E74C3C", fontWeight: 600, fontSize: 14,
          cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "all 0.15s",
        }}
      >
        <LogOut size={16} /> Sign Out
      </button>
    </>
  );
}
