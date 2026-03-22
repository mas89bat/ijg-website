"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { T } from "@/lib/translations";

const WA_NUMBER = "26481000000";

type Step = 1 | 2 | 3;

const AMOUNTS = [
  "Under N$100,000",
  "N$100,000 \u2013 N$500,000",
  "N$500,000 \u2013 N$2,000,000",
  "N$2,000,000 \u2013 N$10,000,000",
  "Over N$10,000,000",
  "Not sure yet",
];

export function NewLeadCapture() {
  const { language } = useLanguage();
  const t = T[language];

  const NEEDS = [
    { id: "wealth", label: t.lead_need_wealth },
    { id: "invest", label: t.lead_need_invest },
    { id: "research", label: t.lead_need_research },
    { id: "stockbroking", label: t.lead_need_stockbroking },
    { id: "corporate", label: t.lead_need_corporate },
    { id: "other", label: t.lead_need_other },
  ];

  const TIMELINES = [
    { id: "now", label: t.lead_timeline_now },
    { id: "soon", label: t.lead_timeline_soon },
    { id: "exploring", label: t.lead_timeline_exploring },
  ];

  const [step, setStep] = useState<Step>(1);
  const [need, setNeed] = useState("");
  const [amount, setAmount] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const needLabel = NEEDS.find((n) => n.id === need)?.label || need;
    const timelineLabel =
      TIMELINES.find((tl) => tl.id === timeline)?.label || timeline;
    const msg = encodeURIComponent(
      `Hello IJG,\n\nI'd like to speak with an advisor.\n\nName: ${name}\nPhone: ${phone}\nNeed: ${needLabel}\nInvestment amount: ${amount}\nTimeline: ${timelineLabel}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        style={{
          padding: "5rem 0",
          background: "#0D1117",
          borderTop: "1px solid #1F2937",
          borderBottom: "1px solid #1F2937",
        }}
      >
        <div
          className="ijg-container"
          style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}
        >
          <CheckCircle
            size={56}
            color="#10B981"
            style={{ margin: "0 auto 1.5rem" }}
          />
          <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>
            {t.lead_success_title}
          </h2>
          <p style={{ color: "#9CA3AF", lineHeight: 1.7 }}>
            {t.lead_success_body}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="start"
      style={{
        padding: "5rem 0",
        background: "#0D1117",
        borderTop: "1px solid #1F2937",
        borderBottom: "1px solid #1F2937",
      }}
    >
      <div className="ijg-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left -- copy */}
          <div>
            <span
              className="section-label"
              style={{ marginBottom: "1.25rem", display: "inline-block" }}
            >
              {t.lead_label}
            </span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                marginBottom: "1rem",
              }}
            >
              {t.lead_title}
            </h2>
            <div className="gold-divider" />
            <p
              style={{
                color: "#9CA3AF",
                fontSize: "1rem",
                lineHeight: 1.7,
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              {t.lead_body}
            </p>
            {/* Trust points */}
            {[
              t.lead_trust_1,
              t.lead_trust_2,
              t.lead_trust_3,
              t.lead_trust_4,
            ].map((point, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#C9A84C",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.9rem",
                    color: "#9CA3AF",
                  }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Right -- form */}
          <div className="ijg-card" style={{ padding: "2rem" }}>
            {/* Step indicator */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
              {([1, 2, 3] as Step[]).map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: "4px",
                    borderRadius: "2px",
                    background: step >= s ? "#C9A84C" : "#1F2937",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>

            {/* Step 1 -- What do you need? */}
            {step === 1 && (
              <div>
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {t.lead_step1_title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {NEEDS.map((n) => (
                    <label
                      key={n.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        border: `1px solid ${need === n.id ? "#C9A84C" : "#1F2937"}`,
                        borderRadius: "8px",
                        cursor: "pointer",
                        background:
                          need === n.id
                            ? "rgba(201,168,76,0.08)"
                            : "transparent",
                        transition: "border-color 0.2s, background 0.2s",
                      }}
                    >
                      <input
                        type="radio"
                        name="need"
                        value={n.id}
                        checked={need === n.id}
                        onChange={() => setNeed(n.id)}
                        style={{
                          accentColor: "#C9A84C",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "0.9rem",
                          color: "#F5F0E8",
                        }}
                      >
                        {n.label}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  className="btn-primary"
                  style={{ width: "100%" }}
                  disabled={!need}
                  onClick={() => setStep(2)}
                >
                  {t.lead_continue} <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2 -- Amount + timeline */}
            {step === 2 && (
              <div>
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {t.lead_step2_amount}
                </h3>
                <select
                  className="ijg-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ marginBottom: "1.5rem", background: "#111827" }}
                >
                  <option value="">{t.lead_select_amount}</option>
                  {AMOUNTS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>

                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {t.lead_step2_timeline}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {TIMELINES.map((tl) => (
                    <label
                      key={tl.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        border: `1px solid ${timeline === tl.id ? "#C9A84C" : "#1F2937"}`,
                        borderRadius: "8px",
                        cursor: "pointer",
                        background:
                          timeline === tl.id
                            ? "rgba(201,168,76,0.08)"
                            : "transparent",
                        transition: "border-color 0.2s, background 0.2s",
                      }}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={tl.id}
                        checked={timeline === tl.id}
                        onChange={() => setTimeline(tl.id)}
                        style={{
                          accentColor: "#C9A84C",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "0.9rem",
                          color: "#F5F0E8",
                        }}
                      >
                        {tl.label}
                      </span>
                    </label>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    className="btn-outline"
                    onClick={() => setStep(1)}
                    style={{ flex: "0 0 auto" }}
                  >
                    {t.lead_back}
                  </button>
                  <button
                    className="btn-primary"
                    style={{ flex: 1 }}
                    disabled={!amount || !timeline}
                    onClick={() => setStep(3)}
                  >
                    {t.lead_continue} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 -- Contact details */}
            {step === 3 && (
              <div>
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {t.lead_step3_title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.8rem",
                        color: "#9CA3AF",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {t.lead_name}
                    </label>
                    <input
                      className="ijg-input"
                      type="text"
                      placeholder={t.lead_name_placeholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.8rem",
                        color: "#9CA3AF",
                        display: "block",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {t.lead_phone}
                    </label>
                    <input
                      className="ijg-input"
                      type="tel"
                      placeholder={t.lead_phone_placeholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    className="btn-outline"
                    onClick={() => setStep(2)}
                    style={{ flex: "0 0 auto" }}
                  >
                    {t.lead_back}
                  </button>
                  <button
                    className="btn-wa"
                    style={{ flex: 1 }}
                    disabled={!name || !phone}
                    onClick={handleSubmit}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t.lead_submit}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #start > div > div {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
