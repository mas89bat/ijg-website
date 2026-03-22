"use client";

import { useState } from "react";
import ProductPage from "@/components/wealth/product-page";
import { PRODUCTS, VEHICLE_SALES, fmtNFull, fmtPct } from "@/lib/wealth-data";

const product = PRODUCTS["vehicle-finance"];

const CHARTS = [
  {
    title: "Namibia New Vehicle Sales",
    data: VEHICLE_SALES,
    dataKey: "units",
    yLabel: "Units sold per year",
    color: "#42A5F5",
    type: "bar" as const,
  },
];

function calcVehicle(price: number, deposit: number, term: number, balloon: number, income: number, existingDebt: number) {
  const loanAmount = price - deposit - balloon;
  const rate = (11.25 + 2.5) / 100 / 12;
  const n = term * 12;
  const monthly = loanAmount * (rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
  const totalRepayment = monthly * n + balloon;
  const totalInterest = totalRepayment - (price - deposit);
  const dsr = ((monthly + existingDebt) / income) * 100;
  const depreciation5yr = price * 0.55;

  let recommendation: "strong-buy" | "buy" | "wait" | "caution";
  let summary: string;

  if (dsr <= 20 && deposit / price >= 0.15 && balloon === 0) {
    recommendation = "strong-buy";
    summary = `Your debt-service ratio of ${fmtPct(dsr)} is well within guidelines, and you have no balloon payment \u2014 meaning you will own the vehicle outright at the end of the term. This is the most financially sound structure for vehicle finance.`;
  } else if (dsr <= 25 && deposit / price >= 0.10) {
    recommendation = "buy";
    summary = `Your debt-service ratio of ${fmtPct(dsr)} is acceptable. ${balloon > 0 ? `Note that your balloon payment of ${fmtNFull(balloon)} will be due at the end of the term \u2014 ensure you have a plan to settle this.` : "Your structure is sound with no balloon payment."}`;
  } else if (dsr <= 30) {
    recommendation = "wait";
    summary = `Your debt-service ratio of ${fmtPct(dsr)} is at the upper limit. With vehicle prices near 10-year highs in Namibian dollar terms, IJG recommends considering a pre-owned vehicle at a lower price point, or increasing your deposit.`;
  } else {
    recommendation = "caution";
    summary = `Your debt-service ratio of ${fmtPct(dsr)} is too high for comfortable vehicle finance. The total interest cost on this vehicle would be ${fmtNFull(totalInterest)}. Consider a significantly less expensive vehicle or defer the purchase.`;
  }

  return {
    rows: [
      { label: "Vehicle Price",              value: fmtNFull(price) },
      { label: "Deposit",                    value: `${fmtNFull(deposit)} (${fmtPct((deposit/price)*100)})` },
      { label: "Balloon Payment",            value: balloon > 0 ? fmtNFull(balloon) : "None" },
      { label: "Finance Amount",             value: fmtNFull(loanAmount) },
      { label: "Interest Rate (Prime+2.5%)", value: "13.75% p.a." },
      { label: "Monthly Instalment",         value: fmtNFull(monthly), highlight: true },
      { label: "Total Interest Cost",        value: fmtNFull(totalInterest) },
      { label: "5-Year Depreciation",        value: fmtNFull(depreciation5yr) },
      { label: "Debt-Service Ratio",         value: fmtPct(dsr), highlight: true },
    ],
    recommendation,
    summary,
  };
}

export default function VehicleFinancePage() {
  const [price, setPrice]       = useState(480000);
  const [deposit, setDeposit]   = useState(50000);
  const [term, setTerm]         = useState(5);
  const [balloon, setBalloon]   = useState(0);
  const [income, setIncome]     = useState(35000);
  const [existingDebt, setDebt] = useState(2000);
  const [result, setResult]     = useState<ReturnType<typeof calcVehicle> | null>(null);

  const calculator = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label className="field-label">Vehicle Price (N$)</label>
        <input className="ijg-input" type="number" value={price} onChange={e => setPrice(+e.target.value)} placeholder="e.g. 480000" />
      </div>
      <div>
        <label className="field-label">Deposit (N$)</label>
        <input className="ijg-input" type="number" value={deposit} onChange={e => setDeposit(+e.target.value)} placeholder="e.g. 50000" />
      </div>
      <div>
        <label className="field-label">Balloon Payment (N$)</label>
        <input className="ijg-input" type="number" value={balloon} onChange={e => setBalloon(+e.target.value)} placeholder="0" />
        <div className="field-hint">Leave at 0 if no balloon. Balloon payments reduce monthly cost but increase total interest.</div>
      </div>
      <div>
        <label className="field-label">Finance Term</label>
        <select className="ijg-select" value={term} onChange={e => setTerm(+e.target.value)}>
          {[3, 4, 5, 6].map(y => <option key={y} value={y}>{y} years</option>)}
        </select>
      </div>
      <div>
        <label className="field-label">Gross Monthly Income (N$)</label>
        <input className="ijg-input" type="number" value={income} onChange={e => setIncome(+e.target.value)} placeholder="e.g. 35000" />
      </div>
      <div>
        <label className="field-label">Existing Monthly Debt (N$)</label>
        <input className="ijg-input" type="number" value={existingDebt} onChange={e => setDebt(+e.target.value)} placeholder="e.g. 2000" />
      </div>
      <button className="btn-primary" onClick={() => setResult(calcVehicle(price, deposit, term, balloon, income, existingDebt))}>
        Calculate Total Cost {"\u2192"}
      </button>
    </div>
  );

  return (
    <ProductPage product={product} charts={CHARTS} calculator={calculator} calcResult={result} />
  );
}
