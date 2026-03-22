"use client";

import { useState } from "react";
import ProductPage from "@/components/wealth/product-page";
import { PRODUCTS, SA_UNIVERSITIES, fmtNFull, fmtPct } from "@/lib/wealth-data";

const product = PRODUCTS["education"];

const TUITION_COST_DATA = [
  { year: "2014", cost: 28000 }, { year: "2015", cost: 30200 }, { year: "2016", cost: 32600 },
  { year: "2017", cost: 35100 }, { year: "2018", cost: 37900 }, { year: "2019", cost: 40900 },
  { year: "2020", cost: 44100 }, { year: "2021", cost: 47600 }, { year: "2022", cost: 51300 },
  { year: "2023", cost: 55300 }, { year: "2024", cost: 59700 },
];

const CHARTS = [
  {
    title: "UNAM Annual Tuition (N$)",
    data: TUITION_COST_DATA,
    dataKey: "cost",
    yLabel: "N$ per year (average undergraduate)",
    color: "#66BB6A",
    type: "line" as const,
  },
];

function calcEducation(childAge: number, startAge: number, yearsAtUniversity: number, currentTuition: number, eduInflation: number, monthlyContrib: number, returnRate: number) {
  const yearsToSave = startAge - childAge;
  const monthlyRate = returnRate / 100 / 12;
  const months = yearsToSave * 12;
  const projectedAnnualCost = currentTuition * Math.pow(1 + eduInflation / 100, yearsToSave);
  const totalCost = projectedAnnualCost * yearsAtUniversity;
  const fvContribs = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const shortfall = Math.max(0, totalCost - fvContribs);
  const surplus = Math.max(0, fvContribs - totalCost);
  const requiredMonthly = totalCost / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const coverageRatio = (fvContribs / totalCost) * 100;

  let recommendation: "strong-buy" | "buy" | "wait" | "caution";
  let summary: string;

  if (coverageRatio >= 100) {
    recommendation = "strong-buy";
    summary = `Your current savings plan will fully cover the projected cost of ${fmtNFull(totalCost)}, with a surplus of ${fmtNFull(surplus)}. You are in an excellent position. Consider whether the surplus should be redirected to other financial goals.`;
  } else if (coverageRatio >= 75) {
    recommendation = "buy";
    summary = `Your savings plan covers ${fmtPct(coverageRatio)} of projected costs. You have a shortfall of ${fmtNFull(shortfall)}. Increasing your monthly contribution to ${fmtNFull(requiredMonthly)} would fully cover the projected cost.`;
  } else if (coverageRatio >= 40) {
    recommendation = "wait";
    summary = `Your savings plan currently covers only ${fmtPct(coverageRatio)} of projected education costs. With education inflation at ${fmtPct(eduInflation)}, the gap will widen if contributions are not increased. Target: ${fmtNFull(requiredMonthly)}/month.`;
  } else {
    recommendation = "caution";
    summary = `Your current savings plan covers only ${fmtPct(coverageRatio)} of projected costs. The projected total cost of ${fmtNFull(totalCost)} requires a monthly contribution of ${fmtNFull(requiredMonthly)} to be fully funded. Starting now is critical.`;
  }

  return {
    rows: [
      { label: "Years to University",          value: `${yearsToSave} years` },
      { label: "Current Annual Cost",          value: fmtNFull(currentTuition) },
      { label: "Education Inflation",          value: fmtPct(eduInflation) + " p.a." },
      { label: "Projected Annual Cost",        value: fmtNFull(projectedAnnualCost), highlight: true },
      { label: "Total Projected Cost",         value: fmtNFull(totalCost), highlight: true },
      { label: "Projected Savings",            value: fmtNFull(fvContribs) },
      { label: "Coverage Ratio",               value: fmtPct(coverageRatio) },
      { label: "Required Monthly Contribution",value: fmtNFull(requiredMonthly) },
    ],
    recommendation,
    summary,
  };
}

export default function EducationPage() {
  const [childAge, setChildAge]         = useState(5);
  const [startAge, setStartAge]         = useState(18);
  const [yearsAtUni, setYearsAtUni]     = useState(4);
  const [tuition, setTuition]           = useState(80000);
  const [eduInflation, setEduInflation] = useState(7.8);
  const [monthlyContrib, setContrib]    = useState(1500);
  const [returnRate, setReturn]         = useState(10);
  const [result, setResult]             = useState<ReturnType<typeof calcEducation> | null>(null);

  const calculator = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label className="field-label">Child&apos;s Age</label>
          <input className="ijg-input" type="number" value={childAge} onChange={e => setChildAge(+e.target.value)} min={0} max={17} />
        </div>
        <div>
          <label className="field-label">University Start Age</label>
          <input className="ijg-input" type="number" value={startAge} onChange={e => setStartAge(+e.target.value)} min={17} max={22} />
        </div>
      </div>
      <div>
        <label className="field-label">Years at University</label>
        <select className="ijg-select" value={yearsAtUni} onChange={e => setYearsAtUni(+e.target.value)}>
          {[3, 4, 5, 6].map(y => <option key={y} value={y}>{y} years</option>)}
        </select>
      </div>
      <div>
        <label className="field-label">Current Annual Cost (N$)</label>
        <input className="ijg-input" type="number" value={tuition} onChange={e => setTuition(+e.target.value)} placeholder="e.g. 80000" />
        <div className="field-hint">UNAM/NUST tuition + accommodation + meals {"\u2248"} N$80,000{"\u2013"}N$150,000</div>
      </div>
      <div>
        <label className="field-label">Education Inflation Rate</label>
        <select className="ijg-select" value={eduInflation} onChange={e => setEduInflation(+e.target.value)}>
          <option value={5.4}>5.4% — General CPI</option>
          <option value={7.8}>7.8% — Education CPI (10yr avg)</option>
          <option value={10}>10% — Conservative estimate</option>
        </select>
      </div>
      <div>
        <label className="field-label">Monthly Savings Contribution (N$)</label>
        <input className="ijg-input" type="number" value={monthlyContrib} onChange={e => setContrib(+e.target.value)} placeholder="e.g. 1500" />
      </div>
      <div>
        <label className="field-label">Expected Annual Return</label>
        <select className="ijg-select" value={returnRate} onChange={e => setReturn(+e.target.value)}>
          <option value={7}>7% — Conservative</option>
          <option value={10}>10% — Moderate</option>
          <option value={12}>12% — Growth</option>
        </select>
      </div>
      <button className="btn-primary" onClick={() => setResult(calcEducation(childAge, startAge, yearsAtUni, tuition, eduInflation, monthlyContrib, returnRate))}>
        Calculate Education Plan {"\u2192"}
      </button>
    </div>
  );

  const universitiesTable = (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
        <div style={{
          display: "inline-flex", alignItems: "center",
          background: "rgba(201,168,76,0.08)",
          border: "1px solid rgba(201,168,76,0.18)",
          borderRadius: 20, padding: "4px 14px",
          fontSize: 10, fontWeight: 800, color: "#C9A84C",
          letterSpacing: "1.5px", textTransform: "uppercase" as const,
          whiteSpace: "nowrap" as const,
        }}>University Cost Comparison</div>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
      </div>

      <h2 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, marginBottom: 8, marginTop: 0 }}>
        Southern African University Costs
      </h2>
      <p style={{ fontSize: 14, color: "rgba(237,232,223,0.45)", marginBottom: 28, marginTop: 0, lineHeight: 1.6 }}>
        Estimated annual costs in Namibian dollars (N$). Includes tuition only (low{"\u2013"}high range) and total cost of study
        (tuition + accommodation + meals + materials). All figures are indicative for 2024/2025 academic year.
      </p>

      {/* Mobile: card stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="uni-cards">
        {SA_UNIVERSITIES.map((uni, i) => (
          <div key={i} style={{
            background: "rgba(26,35,64,0.6)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 14, padding: "18px 20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" as const, gap: 8, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#EDE8DF", marginBottom: 3 }}>{uni.university}</div>
                <div style={{ fontSize: 12, color: "rgba(237,232,223,0.4)", letterSpacing: "0.3px" }}>{uni.location}</div>
              </div>
              {i === 0 || i === 1 ? (
                <span style={{
                  fontSize: 10, fontWeight: 700, color: "#22C55E",
                  background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: 20, padding: "3px 10px", letterSpacing: "0.8px", textTransform: "uppercase" as const,
                  whiteSpace: "nowrap" as const,
                }}>Local</span>
              ) : (
                <span style={{
                  fontSize: 10, fontWeight: 700, color: "#C9A84C",
                  background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 20, padding: "3px 10px", letterSpacing: "0.8px", textTransform: "uppercase" as const,
                  whiteSpace: "nowrap" as const,
                }}>South Africa</span>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px",
              }}>
                <div style={{ fontSize: 10, color: "rgba(237,232,223,0.38)", letterSpacing: "0.8px", textTransform: "uppercase" as const, marginBottom: 4 }}>Tuition Only</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#EDE8DF" }}>
                  {fmtNFull(uni.tuitionLow)} – {fmtNFull(uni.tuitionHigh)}
                </div>
                <div style={{ fontSize: 10, color: "rgba(237,232,223,0.35)", marginTop: 2 }}>per year</div>
              </div>
              <div style={{
                background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.12)",
                borderRadius: 10, padding: "10px 14px",
              }}>
                <div style={{ fontSize: 10, color: "rgba(201,168,76,0.7)", letterSpacing: "0.8px", textTransform: "uppercase" as const, marginBottom: 4 }}>Total Annual Cost</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#C9A84C" }}>
                  {fmtNFull(uni.totalLow)} – {fmtNFull(uni.totalHigh)}
                </div>
                <div style={{ fontSize: 10, color: "rgba(237,232,223,0.35)", marginTop: 2 }}>incl. accommodation</div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: "rgba(237,232,223,0.5)", lineHeight: 1.6 }}>{uni.notes}</div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 20,
        padding: "14px 18px",
        background: "rgba(201,168,76,0.05)",
        border: "1px solid rgba(201,168,76,0.12)",
        borderRadius: 12,
        fontSize: 12,
        color: "rgba(237,232,223,0.4)",
        lineHeight: 1.7,
      }}>
        {"\u26A0\uFE0F"} All figures are illustrative estimates in Namibian dollars. South African fees are converted at approximate exchange rates and subject to annual increases. Costs vary significantly by faculty, programme, and residence type. Verify directly with each institution before planning.
      </div>
    </div>
  );

  return (
    <ProductPage product={product} charts={CHARTS} calculator={calculator} calcResult={result} extraContent={universitiesTable} />
  );
}
