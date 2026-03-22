"use client";

import { useState } from "react";
import ProductPage from "@/components/wealth/product-page";
import { PRODUCTS, NSX_RETURNS, IJG_MONEY_MARKET, IJG_ALL_BOND, JSE_SWIX, fmtNFull, fmtPct } from "@/lib/wealth-data";

const product = PRODUCTS["invest"];

const CHARTS = [
  {
    title: "NSX Overall Index — Annual Return",
    data: NSX_RETURNS,
    dataKey: "return",
    yLabel: "% annual return",
    color: "#EF5350",
    type: "bar" as const,
  },
  {
    title: "IJG Money Market Index — Annual Return",
    data: IJG_MONEY_MARKET,
    dataKey: "return",
    yLabel: "% annual return",
    color: "#26C6DA",
    type: "line" as const,
    refValue: 7.7,
    refLabel: "10yr avg",
  },
  {
    title: "IJG All Bond Index — Annual Return",
    data: IJG_ALL_BOND,
    dataKey: "return",
    yLabel: "% annual return",
    color: "#AB47BC",
    type: "bar" as const,
  },
  {
    title: "JSE Capped SWIX — Annual Return",
    data: JSE_SWIX,
    dataKey: "return",
    yLabel: "% annual return",
    color: "#FFA726",
    type: "bar" as const,
  },
];

function calcInvestment(initialAmount: number, monthlyContrib: number, years: number, returnRate: number, inflation: number, income: number) {
  const monthlyRate = returnRate / 100 / 12;
  const months = years * 12;
  const fvInitial = initialAmount * Math.pow(1 + monthlyRate, months);
  const fvContribs = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const totalFV = fvInitial + fvContribs;
  const totalContributed = initialAmount + monthlyContrib * months;
  const totalGrowth = totalFV - totalContributed;
  const growthMultiple = totalFV / totalContributed;
  const realFV = totalFV / Math.pow(1 + inflation / 100, years);
  const savingsRate = (monthlyContrib / income) * 100;

  let recommendation: "strong-buy" | "buy" | "wait" | "caution";
  let summary: string;

  if (savingsRate >= 20 && returnRate >= 10) {
    recommendation = "strong-buy";
    summary = `Your savings rate of ${fmtPct(savingsRate)} is excellent \u2014 well above the recommended 15% minimum. At ${fmtPct(returnRate)} p.a., your ${fmtNFull(totalContributed)} in contributions will grow to ${fmtNFull(totalFV)} over ${years} years. In real terms, this is worth ${fmtNFull(realFV)} today.`;
  } else if (savingsRate >= 15) {
    recommendation = "buy";
    summary = `Your savings rate of ${fmtPct(savingsRate)} meets the recommended minimum. Your projected portfolio value of ${fmtNFull(totalFV)} represents a ${growthMultiple.toFixed(1)}x multiple on your total contributions. Consider increasing contributions as your income grows.`;
  } else if (savingsRate >= 10) {
    recommendation = "wait";
    summary = `Your savings rate of ${fmtPct(savingsRate)} is below the recommended 15%. While your projected portfolio of ${fmtNFull(totalFV)} is meaningful, increasing your monthly contribution by ${fmtNFull(income * 0.05)} (5% of income) would add significantly to your final portfolio.`;
  } else {
    recommendation = "caution";
    summary = `Your savings rate of ${fmtPct(savingsRate)} is below the minimum recommended level. The most powerful action you can take is to increase your savings rate \u2014 even small increases compound significantly over time. An IJG advisor can help you identify areas to optimise.`;
  }

  return {
    rows: [
      { label: "Initial Lump Sum",          value: fmtNFull(initialAmount) },
      { label: "Monthly Contribution",      value: fmtNFull(monthlyContrib) },
      { label: "Investment Period",         value: `${years} years` },
      { label: "Expected Return",           value: fmtPct(returnRate) + " p.a." },
      { label: "Total Contributed",         value: fmtNFull(totalContributed) },
      { label: "Investment Growth",         value: fmtNFull(totalGrowth) },
      { label: "Final Portfolio Value",     value: fmtNFull(totalFV), highlight: true },
      { label: "Real Value (inflation-adj.)", value: fmtNFull(realFV), highlight: true },
      { label: "Savings Rate",              value: fmtPct(savingsRate) },
    ],
    recommendation,
    summary,
  };
}

export default function InvestPage() {
  const [initialAmount, setInitial]  = useState(50000);
  const [monthlyContrib, setContrib] = useState(3000);
  const [years, setYears]            = useState(20);
  const [returnRate, setReturn]      = useState(10);
  const [inflation, setInflation]    = useState(5.4);
  const [income, setIncome]          = useState(30000);
  const [result, setResult]          = useState<ReturnType<typeof calcInvestment> | null>(null);

  const calculator = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label className="field-label">Initial Lump Sum (N$)</label>
        <input className="ijg-input" type="number" value={initialAmount} onChange={e => setInitial(+e.target.value)} placeholder="e.g. 50000" />
        <div className="field-hint">Enter 0 if starting from scratch</div>
      </div>
      <div>
        <label className="field-label">Monthly Contribution (N$)</label>
        <input className="ijg-input" type="number" value={monthlyContrib} onChange={e => setContrib(+e.target.value)} placeholder="e.g. 3000" />
      </div>
      <div>
        <label className="field-label">Gross Monthly Income (N$)</label>
        <input className="ijg-input" type="number" value={income} onChange={e => setIncome(+e.target.value)} placeholder="e.g. 30000" />
        <div className="field-hint">Used to calculate your savings rate</div>
      </div>
      <div>
        <label className="field-label">Investment Period</label>
        <select className="ijg-select" value={years} onChange={e => setYears(+e.target.value)}>
          {[5, 10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} years</option>)}
        </select>
      </div>
      <div>
        <label className="field-label">Expected Annual Return</label>
        <select className="ijg-select" value={returnRate} onChange={e => setReturn(+e.target.value)}>
          <option value={7}>7% — Conservative (bonds / money market)</option>
          <option value={10}>10% — Moderate (balanced fund)</option>
          <option value={12}>12% — Growth (NSX equity)</option>
          <option value={14}>14% — Aggressive (high-equity)</option>
        </select>
      </div>
      <div>
        <label className="field-label">Inflation Rate</label>
        <select className="ijg-select" value={inflation} onChange={e => setInflation(+e.target.value)}>
          <option value={5.4}>5.4% — Current CPI</option>
          <option value={6}>6% — Moderate</option>
          <option value={7}>7% — Conservative</option>
        </select>
      </div>
      <button className="btn-primary" onClick={() => setResult(calcInvestment(initialAmount, monthlyContrib, years, returnRate, inflation, income))}>
        Project My Wealth {"\u2192"}
      </button>
    </div>
  );

  return (
    <ProductPage product={product} charts={CHARTS} calculator={calculator} calcResult={result} />
  );
}
