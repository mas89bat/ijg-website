"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { IJG_LOGO } from "@/lib/research-data";

interface Props {
  onClose: () => void;
  onStart?: () => void;
}

export default function TrialModal({ onClose, onStart }: Props) {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleSubmit = () => {
    if (!email.trim()) return;
    setStep(2);
    setTimeout(() => {
      if (onStart) {
        onStart();
      } else {
        router.push("/research/app");
      }
    }, 1200);
  };

  return (
    <div
      className="modal-backdrop"
      style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0D0E16", borderRadius: 20, padding: 40, width: 440,
          border: "1px solid rgba(255,255,255,0.06)", position: "relative",
          animation: "fade-in-up 0.3s ease-out",
        }}
      >
        <div style={{ height: 3, background: "linear-gradient(90deg,#C49A2A,#D4A843)", position: "absolute", top: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0" }} />

        {step === 1 ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <img src={IJG_LOGO} alt="IJG" style={{ height: 32, width: "auto" }} />
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C49A2A", marginBottom: 8 }}>Start Your Free Trial</p>
            <h3 style={{ fontSize: 24, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 8, color: "#E8E4DD" }}>14 days of Professional access</h3>
            <p style={{ fontSize: 13, color: "#7A7680", lineHeight: 1.6, marginBottom: 24 }}>Unlimited AI queries, document generation, full research archive, and WhatsApp delivery. No credit card required.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                placeholder="Your email address"
                style={{ width: "100%", padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)", color: "#E8E4DD", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              />
              <input
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                placeholder="WhatsApp number (optional, e.g. +264 81 000 0000)"
                style={{ width: "100%", padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)", color: "#E8E4DD", fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#C49A2A,#D4A843)", color: "#06070D", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 12 }}
            >
              Start Free Trial →
            </button>

            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              {["No credit card", "Cancel anytime", "Full access"].map((item, i) => (
                <span key={i} style={{ fontSize: 11, color: "#7A7680", display: "flex", alignItems: "center", gap: 3 }}><Check size={11} color="#7A7680" /> {item}</span>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,rgba(196,154,42,0.2),rgba(196,154,42,0.05))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Check size={26} color="#C49A2A" /></div>
            <h3 style={{ fontSize: 22, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", color: "#E8E4DD", marginBottom: 8 }}>Welcome to IJG Research</h3>
            <p style={{ fontSize: 14, color: "#7A7680" }}>Setting up your trial access...</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
              {[0, 1, 2].map(i => (
                <div key={i} className={`pulse-dot pulse-dot-${i + 1}`} style={{ width: 8, height: 8, borderRadius: "50%", background: "#C49A2A" }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
