"use client";

import { Gift } from "lucide-react";
import { Language } from "@/lib/research-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

export interface ReferralTabProps {
  language: Language;
}

export function ReferralTab({ language }: ReferralTabProps) {
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
        Referral Programme
      </h1>
      <p style={{ fontSize: 14, color: "#7A7680", marginBottom: 28 }}>
        Invite friends and earn rewards on your subscription.
      </p>

      {/* Invite Friends card */}
      <div
        style={{
          background: "#0D0E16",
          borderRadius: 16,
          padding: 32,
          border: "1px solid rgba(196,154,42,0.12)",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <Gift size={20} color="#C9A84C" />
          <p
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#E8E4DD",
              fontFamily: "'Georgia',serif",
              fontStyle: "italic",
            }}
          >
            Invite Friends
          </p>
        </div>
        <p
          style={{
            fontSize: 14,
            color: "#7A7680",
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          Refer 3 friends to get 1 month of Professional free. Share your
          unique referral link below.
        </p>

        {/* Referral link */}
        <p
          style={{
            fontSize: 12,
            color: "#9CA3AF",
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          Your referral link
        </p>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <div
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              fontSize: 14,
              color: "#7A7680",
              fontFamily: "monospace",
            }}
          >
            ijg.research/ref/andri-2026
          </div>
          <button
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              border: "1px solid rgba(196,154,42,0.2)",
              background: "rgba(196,154,42,0.08)",
              color: "#C49A2A",
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 600,
            }}
          >
            Copy
          </button>
        </div>

        {/* Progress */}
        <p
          style={{
            fontSize: 12,
            color: "#9CA3AF",
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          Referral progress
        </p>
        <div
          style={{
            height: 8,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 4,
            overflow: "hidden",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              height: "100%",
              width: "33%",
              background: "linear-gradient(90deg,#C49A2A,#D4A843)",
              borderRadius: 4,
            }}
          />
        </div>
        <p style={{ fontSize: 13, color: "#7A7680" }}>
          1 of 3 referrals completed
        </p>
      </div>

      {/* Benefit description */}
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
            fontSize: 14,
            fontWeight: 600,
            color: "#E8E4DD",
            marginBottom: 12,
          }}
        >
          How it works
        </p>
        <div style={{ display: "flex", gap: 16, flexDirection: isMobile ? "column" : "row" }}>
          {[
            {
              step: "1",
              title: "Share your link",
              desc: "Send your unique referral link to friends and colleagues.",
            },
            {
              step: "2",
              title: "They sign up",
              desc: "Your friend creates an account using your referral link.",
            },
            {
              step: "3",
              title: "You earn rewards",
              desc: "After 3 successful referrals, get 1 month Professional free.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "16px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(196,154,42,0.12)",
                  color: "#C49A2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                {item.step}
              </div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#E8E4DD",
                  marginBottom: 4,
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#7A7680",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
