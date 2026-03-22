"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { SiteHeader } from "@/components/layout/site-header";

export default function ResearchLoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/research/app");
    }
  }, [isLoading, isAuthenticated, router]);

  function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      router.push("/research/app");
    } else {
      setError("Invalid email or password.");
    }
  }

  function handleCreateNext(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (!email.trim()) {
        setError("Email is required.");
        return;
      }
      if (!mobile.trim()) {
        setError("Mobile number is required.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (password.length < 4) {
        setError("Password must be at least 4 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      // Step 3: auto-login and redirect
      setStep(3);
      const success = login(email, password);
      if (success) {
        router.push("/research/app");
      } else {
        setError("Account creation simulated. Use demo credentials.");
        setStep(2);
      }
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    color: "#F5F0E8",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 6,
    color: "#9CA3AF",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 500,
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "10px 0",
    background: "transparent",
    border: "none",
    borderBottom: active ? "2px solid #C9A84C" : "2px solid transparent",
    color: active ? "#C9A84C" : "#7A7680",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    cursor: "pointer",
    transition: "all 0.15s ease",
  });

  const stepIndicatorStyle = (s: number): React.CSSProperties => ({
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    background: step >= s ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
    color: step >= s ? "#C9A84C" : "#7A7680",
    border: step >= s ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(255,255,255,0.08)",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#07090F" }}>
      <SiteHeader />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 80px)",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 440,
            background: "#0D1117",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          {/* Gold accent line */}
          <div
            style={{
              height: 4,
              background: "linear-gradient(90deg, #C9A84C, #E8D48B, #C9A84C)",
            }}
          />

          <div style={{ padding: isMobile ? "28px 20px 28px" : "40px 36px 36px" }}>
            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <img src="/ijg-logo.png" alt="IJG" height={40} />
            </div>

            {/* Heading */}
            <h1
              style={{
                textAlign: "center",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 28,
                fontWeight: 400,
                color: "#F5F0E8",
                margin: "0 0 8px",
              }}
            >
              Research Portal
            </h1>

            {/* Subtitle */}
            <p
              style={{
                textAlign: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "#9CA3AF",
                margin: "0 0 24px",
              }}
            >
              {mode === "signin"
                ? "Sign in to access IJG market intelligence"
                : "Create your account to get started"}
            </p>

            {/* Tab toggle */}
            <div
              style={{
                display: "flex",
                marginBottom: 28,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                onClick={() => {
                  setMode("signin");
                  setError("");
                  setStep(1);
                }}
                style={tabStyle(mode === "signin")}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMode("create");
                  setError("");
                  setStep(1);
                }}
                style={tabStyle(mode === "create")}
              >
                Create Account
              </button>
            </div>

            {/* Sign In Form */}
            {mode === "signin" && (
              <form onSubmit={handleSignIn}>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    background: "linear-gradient(135deg, #C9A84C, #E8D48B)",
                    color: "#07090F",
                    border: "none",
                    borderRadius: 10,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: 0.3,
                  }}
                >
                  Sign In &rarr;
                </button>

                {error && (
                  <p
                    style={{
                      color: "#EF4444",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      textAlign: "center",
                      margin: "14px 0 0",
                    }}
                  >
                    {error}
                  </p>
                )}
              </form>
            )}

            {/* Create Account Flow */}
            {mode === "create" && (
              <>
                {/* Step indicators */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  <div style={stepIndicatorStyle(1)}>1</div>
                  <div
                    style={{
                      width: 32,
                      height: 2,
                      background:
                        step >= 2
                          ? "rgba(201,168,76,0.4)"
                          : "rgba(255,255,255,0.06)",
                    }}
                  />
                  <div style={stepIndicatorStyle(2)}>2</div>
                  <div
                    style={{
                      width: 32,
                      height: 2,
                      background:
                        step >= 3
                          ? "rgba(201,168,76,0.4)"
                          : "rgba(255,255,255,0.06)",
                    }}
                  />
                  <div style={stepIndicatorStyle(3)}>3</div>
                </div>

                <form onSubmit={handleCreateNext}>
                  {/* Step 1: Email + Mobile */}
                  {step === 1 && (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        <label style={labelStyle}>Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ marginBottom: 24 }}>
                        <label style={labelStyle}>Mobile Number</label>
                        <div style={{ display: "flex", gap: 8 }}>
                          <div
                            style={{
                              ...inputStyle,
                              width: 80,
                              flex: "none",
                              color: "#7A7680",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "12px 8px",
                            }}
                          >
                            +264
                          </div>
                          <input
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="81 234 5678"
                            required
                            style={{ ...inputStyle, flex: 1 }}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        style={{
                          width: "100%",
                          padding: "14px 24px",
                          background:
                            "linear-gradient(135deg, #C9A84C, #E8D48B)",
                          color: "#07090F",
                          border: "none",
                          borderRadius: 10,
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: "pointer",
                          letterSpacing: 0.3,
                        }}
                      >
                        Continue &rarr;
                      </button>
                    </>
                  )}

                  {/* Step 2: Passwords */}
                  {step === 2 && (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        <label style={labelStyle}>Create Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="At least 4 characters"
                          required
                          style={inputStyle}
                        />
                      </div>
                      <div style={{ marginBottom: 24 }}>
                        <label style={labelStyle}>Confirm Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter your password"
                          required
                          style={inputStyle}
                        />
                      </div>
                      <div
                        style={{ display: "flex", gap: 12, marginBottom: 0 }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setStep(1);
                            setError("");
                          }}
                          style={{
                            flex: 1,
                            padding: "14px 24px",
                            background: "transparent",
                            color: "#9CA3AF",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 10,
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          &larr; Back
                        </button>
                        <button
                          type="submit"
                          style={{
                            flex: 1,
                            padding: "14px 24px",
                            background:
                              "linear-gradient(135deg, #C9A84C, #E8D48B)",
                            color: "#07090F",
                            border: "none",
                            borderRadius: 10,
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: "pointer",
                            letterSpacing: 0.3,
                          }}
                        >
                          Create Account &rarr;
                        </button>
                      </div>
                    </>
                  )}

                  {/* Step 3: Auto-login in progress */}
                  {step === 3 && (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: "rgba(201,168,76,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px",
                          color: "#C9A84C",
                          fontSize: 24,
                        }}
                      >
                        &#10003;
                      </div>
                      <p
                        style={{
                          color: "#F5F0E8",
                          fontSize: 16,
                          fontWeight: 600,
                          fontFamily: "'DM Sans', sans-serif",
                          marginBottom: 8,
                        }}
                      >
                        Account Created
                      </p>
                      <p
                        style={{
                          color: "#7A7680",
                          fontSize: 13,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        Redirecting to your portal...
                      </p>
                    </div>
                  )}

                  {error && (
                    <p
                      style={{
                        color: "#EF4444",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        textAlign: "center",
                        margin: "14px 0 0",
                      }}
                    >
                      {error}
                    </p>
                  )}
                </form>
              </>
            )}

            {/* Demo hint */}
            <p
              style={{
                textAlign: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#9CA3AF",
                marginTop: 24,
                opacity: 0.7,
              }}
            >
              Demo: demo@ijg.net / demo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
