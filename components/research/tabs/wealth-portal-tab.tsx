"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp,
  Home,
  Car,
  Clock,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import { PRIME_RATE, INFLATION_RATE, PRODUCTS, fmtNFull, WA_BASE } from "@/lib/wealth-data";
import { useIsMobile } from "@/hooks/use-is-mobile";

/* ── Calculator Definitions ── */

interface Calculator {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

const CALCULATORS: Calculator[] = [
  { id: "bond", title: "Bond Affordability", subtitle: "How much property can you afford?", icon: <Home size={20} />, color: "#1565C0" },
  { id: "vehicle", title: "Vehicle Finance", subtitle: "Monthly cost of your next vehicle", icon: <Car size={20} />, color: "#0D47A1" },
  { id: "retirement", title: "Retirement Planning", subtitle: "Project your retirement nest egg", icon: <Clock size={20} />, color: "#4A148C" },
  { id: "education", title: "Education Savings", subtitle: "Plan for your child's future", icon: <GraduationCap size={20} />, color: "#1B5E20" },
  { id: "invest", title: "Investment Growth", subtitle: "See the power of compound growth", icon: <TrendingUp size={20} />, color: "#BF360C" },
];

/* ── Shared Styles ── */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  color: "#E8E4DD",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#7A7680",
  marginBottom: 6,
  display: "block",
};

const resultBoxStyle: React.CSSProperties = {
  background: "rgba(196,154,42,0.06)",
  border: "1px solid rgba(196,154,42,0.15)",
  borderRadius: 10,
  padding: 16,
  textAlign: "center" as const,
};

const resultLabelStyle: React.CSSProperties = { fontSize: 11, color: "#7A7680", marginBottom: 4 };
const resultValueStyle: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: "#C49A2A" };

/* ── Individual Calculator Components ── */

function BondCalculator() {
  const isMobile = useIsMobile();
  const [income, setIncome] = useState(45000);
  const [depositPct, setDepositPct] = useState(10);
  const rate = PRIME_RATE / 100 / 12;
  const term = 240; // 20 years
  const maxPayment = income * 0.3;
  const loanAmount = maxPayment * ((1 - Math.pow(1 + rate, -term)) / rate);
  const maxProperty = loanAmount / (1 - depositPct / 100);

  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Gross Monthly Income (N$)</label>
          <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Deposit (%)</label>
          <input type="range" min={0} max={50} value={depositPct} onChange={e => setDepositPct(Number(e.target.value))} style={{ width: "100%", accentColor: "#C49A2A" }} />
          <span style={{ fontSize: 13, color: "#E8E4DD" }}>{depositPct}%</span>
        </div>
        <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Based on prime rate {PRIME_RATE}%, 20-year term, 30% debt-service ratio.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Max Monthly Payment</p>
          <p style={resultValueStyle}>{fmtNFull(maxPayment)}</p>
        </div>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Max Property Value</p>
          <p style={resultValueStyle}>{fmtNFull(maxProperty)}</p>
        </div>
      </div>
    </div>
  );
}

function VehicleCalculator() {
  const isMobile = useIsMobile();
  const [price, setPrice] = useState(450000);
  const [termMonths, setTermMonths] = useState(60);
  const rate = (PRIME_RATE + 2) / 100 / 12;
  const payment = price * (rate * Math.pow(1 + rate, termMonths)) / (Math.pow(1 + rate, termMonths) - 1);
  const totalCost = payment * termMonths;

  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Vehicle Price (N$)</label>
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Finance Term</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[48, 60, 72].map(t => (
              <button key={t} onClick={() => setTermMonths(t)} style={{
                flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", cursor: "pointer",
                background: termMonths === t ? "rgba(196,154,42,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${termMonths === t ? "rgba(196,154,42,0.3)" : "rgba(255,255,255,0.06)"}`,
                color: termMonths === t ? "#C49A2A" : "#7A7680", fontWeight: termMonths === t ? 700 : 400,
              }}>{t} months</button>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Rate: prime + 2% ({PRIME_RATE + 2}% p.a.)</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Monthly Payment</p>
          <p style={resultValueStyle}>{fmtNFull(payment)}</p>
        </div>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Total Cost of Credit</p>
          <p style={resultValueStyle}>{fmtNFull(totalCost)}</p>
        </div>
      </div>
    </div>
  );
}

function RetirementCalculator() {
  const isMobile = useIsMobile();
  const [age, setAge] = useState(30);
  const [salary, setSalary] = useState(35000);
  const [contribution, setContribution] = useState(3000);
  const retireAge = 65;
  const years = Math.max(retireAge - age, 1);
  const growthRate = 0.10;
  const monthlyRate = growthRate / 12;
  const months = years * 12;
  const fv = contribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const replacementRatio = ((fv * 0.04) / 12 / salary) * 100;

  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Current Age</label>
          <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} style={inputStyle} min={18} max={64} />
        </div>
        <div>
          <label style={labelStyle}>Monthly Salary (N$)</label>
          <input type="number" value={salary} onChange={e => setSalary(Number(e.target.value))} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Monthly Contribution (N$)</label>
          <input type="number" value={contribution} onChange={e => setContribution(Number(e.target.value))} style={inputStyle} />
        </div>
        <p style={{ fontSize: 11, color: "#555" }}>Assumes 10% p.a. growth, retirement at 65, 4% drawdown.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Projected Fund at 65</p>
          <p style={resultValueStyle}>{fmtNFull(fv)}</p>
        </div>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Monthly Retirement Income</p>
          <p style={resultValueStyle}>{fmtNFull(fv * 0.04 / 12)}</p>
        </div>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Replacement Ratio</p>
          <p style={{ ...resultValueStyle, color: replacementRatio >= 70 ? "#4ADE80" : replacementRatio >= 40 ? "#F59E0B" : "#EF4444" }}>
            {replacementRatio.toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}

function EducationCalculator() {
  const isMobile = useIsMobile();
  const [childAge, setChildAge] = useState(5);
  const [targetCost, setTargetCost] = useState(800000);
  const educationInflation = 0.078;
  const yearsToUni = Math.max(18 - childAge, 1);
  const futureCost = targetCost * Math.pow(1 + educationInflation, yearsToUni);
  const growthRate = 0.10 / 12;
  const months = yearsToUni * 12;
  const monthlySavings = futureCost / ((Math.pow(1 + growthRate, months) - 1) / growthRate);

  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Child&apos;s Current Age</label>
          <input type="number" value={childAge} onChange={e => setChildAge(Number(e.target.value))} style={inputStyle} min={0} max={17} />
        </div>
        <div>
          <label style={labelStyle}>Target Degree Cost Today (N$)</label>
          <input type="number" value={targetCost} onChange={e => setTargetCost(Number(e.target.value))} style={inputStyle} />
        </div>
        <p style={{ fontSize: 11, color: "#555" }}>Education inflation: 7.8% p.a. Investment growth: 10% p.a.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Future Cost (at age 18)</p>
          <p style={resultValueStyle}>{fmtNFull(futureCost)}</p>
        </div>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Monthly Savings Needed</p>
          <p style={resultValueStyle}>{fmtNFull(monthlySavings)}</p>
        </div>
      </div>
    </div>
  );
}

function InvestmentCalculator() {
  const isMobile = useIsMobile();
  const [lumpSum, setLumpSum] = useState(100000);
  const [growthRate, setGrowthRate] = useState(10);
  const [years] = useState(10);
  const projections = useMemo(() => {
    const pts: { year: number; value: number }[] = [];
    for (let y = 0; y <= years; y++) {
      pts.push({ year: y, value: lumpSum * Math.pow(1 + growthRate / 100, y) });
    }
    return pts;
  }, [lumpSum, growthRate, years]);
  const finalValue = projections[projections.length - 1].value;
  const maxVal = finalValue;

  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Lump Sum Investment (N$)</label>
          <input type="number" value={lumpSum} onChange={e => setLumpSum(Number(e.target.value))} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Expected Growth Rate (% p.a.)</label>
          <input type="range" min={2} max={20} value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))} style={{ width: "100%", accentColor: "#C49A2A" }} />
          <span style={{ fontSize: 13, color: "#E8E4DD" }}>{growthRate}%</span>
        </div>
        {/* Mini bar chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80, marginTop: 8 }}>
          {projections.map((p) => (
            <div key={p.year} style={{
              flex: 1,
              height: `${(p.value / maxVal) * 100}%`,
              background: p.year === years ? "#C49A2A" : "rgba(196,154,42,0.25)",
              borderRadius: 3,
              minHeight: 4,
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#555" }}>
          <span>Year 0</span><span>Year {years}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Value After {years} Years</p>
          <p style={resultValueStyle}>{fmtNFull(finalValue)}</p>
        </div>
        <div style={resultBoxStyle}>
          <p style={resultLabelStyle}>Total Growth</p>
          <p style={resultValueStyle}>{fmtNFull(finalValue - lumpSum)}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Tab Component ── */

export function WealthPortalTab() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  const renderCalculator = (id: string) => {
    switch (id) {
      case "bond": return <BondCalculator />;
      case "vehicle": return <VehicleCalculator />;
      case "retirement": return <RetirementCalculator />;
      case "education": return <EducationCalculator />;
      case "invest": return <InvestmentCalculator />;
      default: return null;
    }
  };

  return (
    <>
      {/* Section 1: Hero */}
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <h1 style={{ fontSize: 32, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 8, color: "#E8E4DD" }}>
          Wealth Planning Tools
        </h1>
        <p style={{ fontSize: 15, color: "#7A7680", marginBottom: 28, maxWidth: 520, margin: "0 auto 28px" }}>
          Interactive calculators powered by Namibian market data
        </p>

        {/* Product cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 8 }}>
          {CALCULATORS.map((calc) => (
            <button
              key={calc.id}
              onClick={() => toggle(calc.id)}
              style={{
                background: expanded === calc.id ? "rgba(196,154,42,0.08)" : "#0D1117",
                borderRadius: 12,
                padding: "18px 14px",
                border: expanded === calc.id ? "1px solid rgba(196,154,42,0.3)" : "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              <div style={{ color: expanded === calc.id ? "#C49A2A" : calc.color, marginBottom: 8, display: "flex", justifyContent: "center" }}>
                {calc.icon}
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#E8E4DD", marginBottom: 2 }}>{calc.title}</p>
              <p style={{ fontSize: 11, color: "#7A7680" }}>{calc.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Calculator Accordions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
        {CALCULATORS.map((calc) => {
          const isOpen = expanded === calc.id;
          return (
            <div
              key={calc.id}
              style={{
                background: "#0D0E16",
                borderRadius: 14,
                border: isOpen ? "1px solid rgba(196,154,42,0.25)" : "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => toggle(calc.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                <div style={{ color: isOpen ? "#C49A2A" : calc.color, flexShrink: 0 }}>{calc.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#E8E4DD" }}>{calc.title}</p>
                  <p style={{ fontSize: 12, color: "#7A7680" }}>{calc.subtitle}</p>
                </div>
                {isOpen ? <ChevronUp size={18} color="#C49A2A" /> : <ChevronDown size={18} color="#7A7680" />}
              </button>
              {isOpen && (
                <div style={{ padding: "4px 20px 24px 20px" }}>
                  {renderCalculator(calc.id)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Section 3: CTA */}
      <div style={{
        background: "#0D1117",
        borderRadius: 16,
        padding: "28px 24px",
        border: "1px solid rgba(196,154,42,0.15)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 18, fontWeight: 600, color: "#E8E4DD", marginBottom: 6 }}>
          Want personalized advice?
        </p>
        <p style={{ fontSize: 14, color: "#7A7680", marginBottom: 18 }}>
          Speak to an IJG advisor about your unique financial situation.
        </p>
        <a
          href={`${WA_BASE}?text=${encodeURIComponent("Hi, I'd like to speak to an IJG Wealth advisor.")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 28px",
            borderRadius: 10,
            background: "#25D366",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "inherit",
            transition: "opacity 0.15s",
          }}
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>
      </div>
    </>
  );
}
