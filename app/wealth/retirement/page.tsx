"use client";

import { useState } from "react";
import ProductPage from "@/components/wealth/product-page";
import { PRODUCTS, fmtNFull, fmtPct } from "@/lib/wealth-data";

const product = PRODUCTS["retirement"];

const REPLACEMENT_RATIO_DATA = [
  { year: "2014", ratio: 35 }, { year: "2015", ratio: 36 }, { year: "2016", ratio: 36 },
  { year: "2017", ratio: 37 }, { year: "2018", ratio: 37 }, { year: "2019", ratio: 38 },
  { year: "2020", ratio: 36 }, { year: "2021", ratio: 37 }, { year: "2022", ratio: 37 },
  { year: "2023", ratio: 38 }, { year: "2024", ratio: 38 },
];

const PENSION_ASSETS_DATA = [
  { year: "2014", value: 8.2 },  { year: "2015", value: 9.1 },  { year: "2016", value: 10.4 },
  { year: "2017", value: 12.1 }, { year: "2018", value: 13.8 }, { year: "2019", value: 16.2 },
  { year: "2020", value: 18.1 }, { year: "2021", value: 22.4 }, { year: "2022", value: 26.8 },
  { year: "2023", value: 29.4 }, { year: "2024", value: 32.0 },
];

const CHARTS = [
  {
    title: "Namibia Avg Replacement Ratio",
    data: REPLACEMENT_RATIO_DATA,
    dataKey: "ratio",
    yLabel: "% of final salary",
    color: "#AB47BC",
    type: "line" as const,
    refValue: 75,
    refLabel: "Target: 75%",
  },
  {
    title: "Unit Trust AUM (N$ billion)",
    data: PENSION_ASSETS_DATA,
    dataKey: "value",
    yLabel: "N$ billion",
    color: "#7E57C2",
    type: "line" as const,
  },
];

function calcRetirement(currentAge: number, retireAge: number, currentSavings: number, monthlyContrib: number, returnRate: number, targetIncome: number) {
  const years = retireAge - currentAge;
  const months = years * 12;
  const monthlyRate = returnRate / 100 / 12;
  const fvExisting = currentSavings * Math.pow(1 + monthlyRate, months);
  const fvContribs = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const totalNestEgg = fvExisting + fvContribs;
  const sustainableMonthly = totalNestEgg * 0.04 / 12;
  const replacementRatio = (sustainableMonthly / targetIncome) * 100;
  const targetNestEgg = targetIncome * 0.75 * 12 / 0.04;
  const shortfall = Math.max(0, targetNestEgg - totalNestEgg);
  const requiredMonthly = shortfall > 0 ? shortfall / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) : 0;

  let recommendation: "strong-buy" | "buy" | "wait" | "caution";
  let summary: string;

  if (replacementRatio >= 75) {
    recommendation = "strong-buy";
    summary = `You are on track to achieve a ${fmtPct(replacementRatio)} replacement ratio \u2014 above the recommended 75% target. Your projected nest egg of ${fmtNFull(totalNestEgg)} will sustain approximately ${fmtNFull(sustainableMonthly)}/month in retirement income.`;
  } else if (replacementRatio >= 50) {
    recommendation = "buy";
    summary = `You are on track for a ${fmtPct(replacementRatio)} replacement ratio \u2014 below the recommended 75% but above the Namibian average of 38%. To close the gap, you would need to increase monthly contributions by approximately ${fmtNFull(requiredMonthly)}/month.`;
  } else if (replacementRatio >= 30) {
    recommendation = "wait";
    summary = `Your projected replacement ratio of ${fmtPct(replacementRatio)} is below the Namibian average of 38%. Urgent action is needed. Increasing your monthly contribution to ${fmtNFull(monthlyContrib + requiredMonthly)} would put you on track for a 75% replacement ratio.`;
  } else {
    recommendation = "caution";
    summary = `Your projected replacement ratio of ${fmtPct(replacementRatio)} indicates a significant retirement savings gap. Your current trajectory will not sustain your lifestyle in retirement. An IJG Wealth advisor can help you build a comprehensive catch-up strategy.`;
  }

  return {
    rows: [
      { label: "Years to Retirement",          value: `${years} years` },
      { label: "Current Savings",              value: fmtNFull(currentSavings) },
      { label: "Monthly Contribution",         value: fmtNFull(monthlyContrib) },
      { label: "Assumed Return",               value: fmtPct(returnRate) + " p.a." },
      { label: "Projected Nest Egg",           value: fmtNFull(totalNestEgg), highlight: true },
      { label: "Sustainable Monthly Income",   value: fmtNFull(sustainableMonthly), highlight: true },
      { label: "Replacement Ratio",            value: fmtPct(replacementRatio) },
      { label: "Additional Contribution Needed", value: requiredMonthly > 0 ? fmtNFull(requiredMonthly) + "/mo" : "On track \u2713" },
    ],
    recommendation,
    summary,
  };
}

export default function RetirementPage() {
  const [currentAge, setCurrentAge]  = useState(35);
  const [retireAge, setRetireAge]    = useState(65);
  const [currentSavings, setSavings] = useState(250000);
  const [monthlyContrib, setContrib] = useState(3000);
  const [returnRate, setReturn]      = useState(10);
  const [targetIncome, setTarget]    = useState(25000);
  const [result, setResult]          = useState<ReturnType<typeof calcRetirement> | null>(null);

  const calculator = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label className="field-label">Current Age</label>
          <input className="ijg-input" type="number" value={currentAge} onChange={e => setCurrentAge(+e.target.value)} min={18} max={64} />
        </div>
        <div>
          <label className="field-label">Retirement Age</label>
          <input className="ijg-input" type="number" value={retireAge} onChange={e => setRetireAge(+e.target.value)} min={55} max={75} />
        </div>
      </div>
      <div>
        <label className="field-label">Current Retirement Savings (N$)</label>
        <input className="ijg-input" type="number" value={currentSavings} onChange={e => setSavings(+e.target.value)} placeholder="e.g. 250000" />
        <div className="field-hint">Total in pension fund, RA, or savings</div>
      </div>
      <div>
        <label className="field-label">Monthly Contribution (N$)</label>
        <input className="ijg-input" type="number" value={monthlyContrib} onChange={e => setContrib(+e.target.value)} placeholder="e.g. 3000" />
        <div className="field-hint">Including employer contributions</div>
      </div>
      <div>
        <label className="field-label">Expected Annual Return</label>
        <select className="ijg-select" value={returnRate} onChange={e => setReturn(+e.target.value)}>
          <option value={7}>7% — Conservative (bonds / cash)</option>
          <option value={10}>10% — Moderate (balanced fund)</option>
          <option value={12}>12% — Growth (equity-heavy)</option>
        </select>
      </div>
      <div>
        <label className="field-label">Target Monthly Income in Retirement (N$)</label>
        <input className="ijg-input" type="number" value={targetIncome} onChange={e => setTarget(+e.target.value)} placeholder="e.g. 25000" />
        <div className="field-hint">In today&apos;s money — we&apos;ll project forward</div>
      </div>
      <button className="btn-primary" onClick={() => setResult(calcRetirement(currentAge, retireAge, currentSavings, monthlyContrib, returnRate, targetIncome))}>
        Project My Retirement {"\u2192"}
      </button>
    </div>
  );

  return (
    <ProductPage product={product} charts={CHARTS} calculator={calculator} calcResult={result} />
  );
}
