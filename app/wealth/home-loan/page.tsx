"use client";

import { useState } from "react";
import ProductPage from "@/components/wealth/product-page";
import { PRODUCTS, PROPERTY_PRICE_INDEX, fmtNFull, fmtPct } from "@/lib/wealth-data";

const product = PRODUCTS["home-loan"];

const CHARTS = [
  {
    title: "Windhoek Median House Price",
    data: PROPERTY_PRICE_INDEX,
    dataKey: "value",
    yLabel: "N$'000",
    color: "#4A90D9",
    type: "line" as const,
    refValue: 1900,
    refLabel: "2024",
  },
];

function calcAffordability(income: number, existingDebt: number, deposit: number, price: number, term: number) {
  const rate = 11.25 / 100 / 12;
  const loanAmount = price - deposit;
  const n = term * 12;
  const monthly = loanAmount * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
  const totalRepayment = monthly * n;
  const totalInterest = totalRepayment - loanAmount;
  const dsr = ((monthly + existingDebt) / income) * 100;
  const maxAffordable = ((income * 0.30) - existingDebt) / (rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1));

  let recommendation: "strong-buy" | "buy" | "wait" | "caution";
  let summary: string;

  if (dsr <= 25 && deposit / price >= 0.20) {
    recommendation = "strong-buy";
    summary = `Your DSR of ${fmtPct(dsr)} is well within the 30% guideline, and your ${fmtPct((deposit/price)*100)} deposit provides a strong equity buffer. IJG recommends proceeding — your financial position is robust.`;
  } else if (dsr <= 30 && deposit / price >= 0.10) {
    recommendation = "buy";
    summary = `Your DSR of ${fmtPct(dsr)} is within the 30% guideline. With a ${fmtPct((deposit/price)*100)} deposit, you are eligible for standard bond financing. Consider locking in a fixed rate given the current elevated prime rate environment.`;
  } else if (dsr <= 35) {
    recommendation = "wait";
    summary = `Your DSR of ${fmtPct(dsr)} exceeds the standard 30% guideline. You may qualify for financing, but you would be at the margin. IJG recommends waiting 6\u201312 months for potential rate relief, or increasing your deposit.`;
  } else {
    recommendation = "caution";
    summary = `Your DSR of ${fmtPct(dsr)} significantly exceeds the 30% guideline. Most Namibian banks would decline this application. Focus on reducing existing debt obligations before applying.`;
  }

  return {
    rows: [
      { label: "Purchase Price",       value: fmtNFull(price) },
      { label: "Deposit",              value: `${fmtNFull(deposit)} (${fmtPct((deposit/price)*100)})` },
      { label: "Loan Amount",          value: fmtNFull(loanAmount) },
      { label: "Interest Rate",        value: "11.25% p.a. (Prime)" },
      { label: "Monthly Repayment",    value: fmtNFull(monthly), highlight: true },
      { label: "Total Interest Cost",  value: fmtNFull(totalInterest) },
      { label: "Total Repayment",      value: fmtNFull(totalRepayment) },
      { label: "Debt-Service Ratio",   value: fmtPct(dsr), highlight: true },
      { label: "Max Affordable Bond",  value: fmtNFull(Math.max(0, maxAffordable)) },
    ],
    recommendation,
    summary,
  };
}

export default function HomeLoanPage() {
  const [income, setIncome]     = useState(45000);
  const [existingDebt, setDebt] = useState(3500);
  const [deposit, setDeposit]   = useState(300000);
  const [price, setPrice]       = useState(1900000);
  const [term, setTerm]         = useState(20);
  const [result, setResult]     = useState<ReturnType<typeof calcAffordability> | null>(null);

  const calculator = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label className="field-label">Gross Monthly Income (N$)</label>
        <input className="ijg-input" type="number" value={income} onChange={e => setIncome(+e.target.value)} placeholder="e.g. 45000" />
      </div>
      <div>
        <label className="field-label">Existing Monthly Debt (N$)</label>
        <input className="ijg-input" type="number" value={existingDebt} onChange={e => setDebt(+e.target.value)} placeholder="e.g. 3500" />
        <div className="field-hint">Car payments, personal loans, credit cards, etc.</div>
      </div>
      <div>
        <label className="field-label">Property Purchase Price (N$)</label>
        <input className="ijg-input" type="number" value={price} onChange={e => setPrice(+e.target.value)} placeholder="e.g. 1900000" />
      </div>
      <div>
        <label className="field-label">Deposit Available (N$)</label>
        <input className="ijg-input" type="number" value={deposit} onChange={e => setDeposit(+e.target.value)} placeholder="e.g. 300000" />
      </div>
      <div>
        <label className="field-label">Loan Term</label>
        <select className="ijg-select" value={term} onChange={e => setTerm(+e.target.value)}>
          {[10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} years</option>)}
        </select>
      </div>
      <button className="btn-primary" onClick={() => setResult(calcAffordability(income, existingDebt, deposit, price, term))}>
        Calculate Affordability {"\u2192"}
      </button>
    </div>
  );

  return (
    <ProductPage product={product} charts={CHARTS} calculator={calculator} calcResult={result} />
  );
}
