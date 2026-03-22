"use client";

import { MessageCircle, Bell } from "lucide-react";
import { Language } from "@/lib/research-data";

export interface WhatsAppTabProps {
  language: Language;
}

export function WhatsAppTab({ language }: WhatsAppTabProps) {
  return (
    <>
      <h1 style={{ fontSize: 28, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 8, color: "#E8E4DD" }}>WhatsApp Intelligence</h1>
      <p style={{ fontSize: 14, color: "#7A7680", marginBottom: 28 }}>Manage your WhatsApp research delivery and alerts.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Connected status */}
        <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(37,211,102,0.12)" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(37,211,102,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}><MessageCircle size={20} color="#25D366" /></div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD" }}>WhatsApp Connected</p>
              <p style={{ fontSize: 12, color: "#25D366" }}>+264 81 *** *** · Active</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "#7A7680", lineHeight: 1.6 }}>Your WhatsApp number is connected. You receive daily briefings and can query the AI directly from WhatsApp.</p>
        </div>

        {/* Active alerts */}
        <div style={{ background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 16 }}>Active Alerts</p>
          {[
            { topic: "Uranium price", trigger: "> $85/lb", status: "active" },
            { topic: "BoN MPC decisions", trigger: "Any change", status: "active" },
            { topic: "Capricorn Group", trigger: "New research", status: "active" },
          ].map((alert, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <span style={{ fontSize: 14 }}><Bell size={14} color="#C9A84C" /></span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#E8E4DD" }}>{alert.topic}</p>
                <p style={{ fontSize: 11, color: "#7A7680" }}>Trigger: {alert.trigger}</p>
              </div>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: "rgba(46,204,113,0.1)", color: "#2ECC71", fontWeight: 700 }}>ON</span>
            </div>
          ))}
          <button style={{ marginTop: 14, width: "100%", padding: "10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#7A7680", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            + Add New Alert
          </button>
        </div>
      </div>

      {/* Content depth */}
      <div style={{ marginTop: 20, background: "#0D0E16", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DD", marginBottom: 4 }}>Content Depth</p>
        <p style={{ fontSize: 13, color: "#7A7680", marginBottom: 16 }}>Your subscription tier determines the depth of content you receive via WhatsApp.</p>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { tier: "Free", desc: "Headlines only", active: false },
            { tier: "Essentials", desc: "Summary + key stats", active: false },
            { tier: "Professional", desc: "Full analysis + citations", active: true },
            { tier: "Institutional", desc: "Raw data + methodology", active: false },
          ].map((tier, i) => (
            <div key={i} style={{
              flex: 1, padding: "10px 12px", borderRadius: 8, textAlign: "center",
              background: tier.active ? "rgba(196,154,42,0.1)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${tier.active ? "rgba(196,154,42,0.3)" : "rgba(255,255,255,0.04)"}`,
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: tier.active ? "#C49A2A" : "#7A7680", marginBottom: 2 }}>{tier.tier}</p>
              <p style={{ fontSize: 10, color: "#7A7680" }}>{tier.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
