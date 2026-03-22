// ── IJG Wealth Platform — Shared Data & Constants ──

export const IJG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028599722/VsevFbwkaMGuPb39gKXwpF/ijg-logo_39f2ff17.png";
export const TAKAT_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028599722/VsevFbwkaMGuPb39gKXwpF/takat-logo_46fef55a.png";
export const WA_NUMBER = "+264810000000";
export const WA_BASE = `https://wa.me/${WA_NUMBER.replace(/\D/g, "")}`;

export const PRIME_RATE = 11.25;
export const INFLATION_RATE = 5.4;
export const PROPERTY_GROWTH_PA = 6.2;

// ── Product definitions ──
export type ProductKey = "home-loan" | "vehicle-finance" | "retirement" | "education" | "invest";

export interface ProductDef {
  key: ProductKey;
  title: string;
  tagline: string;
  icon: string;
  color: string;
  heroHeadline: string;
  heroSub: string;
  contextHeadline: string;
  contextBody: string[];
  ijgView: string;
  waMessage: string;
}

export const PRODUCTS: Record<ProductKey, ProductDef> = {
  "home-loan": {
    key: "home-loan",
    title: "Home Loan",
    tagline: "Bond repayment & affordability",
    icon: "Home",
    color: "#1565C0",
    heroHeadline: "Is now the right time to buy property in Namibia?",
    heroSub: "Namibian residential property has delivered 6.2% annual growth over the last decade. Understanding your affordability \u2014 and the market cycle \u2014 is the first step to making the right decision.",
    contextHeadline: "The Namibian Property Market",
    contextBody: [
      "Windhoek\u2019s residential property market has remained resilient through successive rate cycles, with median house prices growing from N$1.1m in 2014 to N$1.9m in 2024 \u2014 a compound annual growth rate of 6.2%.",
      "The Bank of Namibia\u2019s prime lending rate currently stands at 11.25%, which is 1.45 percentage points above its 10-year average of 9.8%. Rate relief is anticipated as the global easing cycle continues, which would meaningfully improve affordability for new buyers.",
      "First National Bank Namibia and Standard Bank Namibia together account for approximately 68% of new mortgage originations. Both institutions apply a maximum debt-service ratio of 30% of gross income for primary residences.",
    ],
    ijgView: "The current rate environment is elevated relative to the 10-year average, but property prices have not corrected meaningfully. Buyers with a deposit of 15% or more and a debt-service ratio below 28% are well-positioned. Those at the margin should consider waiting 6\u201312 months for potential rate relief.",
    waMessage: "Hi, I'd like to speak to an IJG Wealth advisor about a home loan.",
  },
  "vehicle-finance": {
    key: "vehicle-finance",
    title: "Vehicle Finance",
    tagline: "Hire-purchase & total cost",
    icon: "Car",
    color: "#0D47A1",
    heroHeadline: "What does your next vehicle really cost?",
    heroSub: "Vehicle finance in Namibia is one of the most widely used credit products \u2014 and one of the most misunderstood. The sticker price is only the beginning.",
    contextHeadline: "Namibian Vehicle Market Trends",
    contextBody: [
      "New vehicle sales in Namibia have averaged approximately 14,200 units per year over the last decade, peaking at 17,800 in 2019 before the COVID-19 disruption. Sales have recovered to approximately 13,400 units in 2024.",
      "Toyota dominates with approximately 38% market share, followed by Volkswagen (14%) and Ford (11%). The average transaction price for a new passenger vehicle has risen from N$280,000 in 2014 to N$480,000 in 2024 \u2014 a 71% increase driven by currency depreciation and global supply chain pressures.",
      "Vehicle finance in Namibia is typically structured over 60\u201372 months at prime plus 1.5\u20133.5%, depending on credit profile. Balloon payments of 20\u201330% are common but significantly increase total cost of credit.",
    ],
    ijgView: "With the prime rate at 11.25% and vehicle prices near record highs in Namibian dollar terms, the total cost of credit on a new vehicle is at a 10-year high. Buyers who can defer to Q3 2025 may benefit from both rate relief and improved supply. Pre-owned vehicles currently offer significantly better value per kilometre.",
    waMessage: "Hi, I'd like to speak to an IJG Wealth advisor about vehicle finance.",
  },
  "retirement": {
    key: "retirement",
    title: "Retirement Planning",
    tagline: "Project your nest egg",
    icon: "Clock",
    color: "#4A148C",
    heroHeadline: "Will you have enough to retire on your terms?",
    heroSub: "Most Namibians retire on less than 40% of their pre-retirement income. With the right plan, that number can be very different.",
    contextHeadline: "Retirement Readiness in Namibia",
    contextBody: [
      "According to the Namibia Financial Institutions Supervisory Authority (NAMFISA), approximately 68% of formally employed Namibians are members of a pension fund. However, the average replacement ratio \u2014 retirement income as a percentage of final salary \u2014 is estimated at just 38%, well below the internationally recommended 70\u201380%.",
      "The Namibian retirement fund industry manages approximately N$180 billion in assets. The Government Institutions Pension Fund (GIPF) accounts for roughly 60% of this, with private sector funds making up the balance.",
      "Namibia\u2019s life expectancy at birth is 65 years, but conditional life expectancy at age 60 is approximately 79 years \u2014 meaning a 60-year-old retiree should plan for at least 19 years of retirement income.",
    ],
    ijgView: "The gap between what most Namibians are saving and what they will need in retirement is significant. The single most powerful lever is starting early \u2014 a 25-year-old saving N$2,000/month will accumulate approximately 3.5x more than a 35-year-old saving the same amount. IJG Wealth\u2019s retirement planning service focuses on closing this gap with a personalised, tax-efficient strategy.",
    waMessage: "Hi, I'd like to speak to an IJG Wealth advisor about retirement planning.",
  },
  "education": {
    key: "education",
    title: "Education Savings",
    tagline: "Plan for tuition and fees",
    icon: "GraduationCap",
    color: "#1B5E20",
    heroHeadline: "The cost of a university degree is rising faster than inflation.",
    heroSub: "Education inflation in Namibia has averaged 7.8% per year over the last decade \u2014 nearly double the general CPI. Planning ahead is the only way to stay ahead.",
    contextHeadline: "The Cost of Education in Namibia",
    contextBody: [
      "Annual tuition fees at the University of Namibia (UNAM) for undergraduate programmes range from approximately N$28,000 to N$65,000 per year, depending on the faculty. The Namibia University of Science and Technology (NUST) is broadly comparable. Including accommodation, meals, and materials, the total annual cost of a university education in Namibia ranges from N$80,000 to N$150,000.",
      "Education cost inflation in Namibia has averaged approximately 7.8% per year over the last 10 years, significantly above general CPI of 5.4%. This means a degree that costs N$400,000 today will cost approximately N$580,000 in 5 years and N$840,000 in 10 years.",
      "The Namibia Students Financial Assistance Fund (NSFAF) provides loans and bursaries, but competition is intense and awards are not guaranteed. Private education savings plans remain the most reliable way to ensure your child\u2019s access to tertiary education.",
    ],
    ijgView: "Parents who start saving when their child is born have a significant structural advantage. A monthly contribution of N$1,500 started at birth, growing at 10% p.a., will accumulate approximately N$1.1m by the time a child turns 18 \u2014 enough to cover a full 4-year degree with room to spare. Waiting until the child is 10 requires contributions of approximately N$5,200/month to achieve the same outcome.",
    waMessage: "Hi, I'd like to speak to an IJG Wealth advisor about education savings.",
  },
  "invest": {
    key: "invest",
    title: "Grow Your Wealth",
    tagline: "Compound growth calculator",
    icon: "TrendingUp",
    color: "#BF360C",
    heroHeadline: "Compound interest is the eighth wonder of the world.",
    heroSub: "Time in the market beats timing the market. See exactly what consistent investing can do for your financial future.",
    contextHeadline: "Investing in Namibia",
    contextBody: [
      "The Namibian Stock Exchange (NSX) Overall Index has delivered an average annual return of approximately 12.4% over the last 10 years, though with significant year-to-year volatility. Dual-listed South African equities account for the majority of market capitalisation, with a growing number of Namibian-domiciled listings.",
      "Unit trusts and collective investment schemes regulated by NAMFISA provide Namibian investors with access to diversified equity, bond, and money market portfolios. Total assets under management in Namibian unit trusts have grown from N$8.2 billion in 2014 to approximately N$32 billion in 2024.",
      "Regulation 28 of the Pension Funds Act limits offshore exposure for retirement funds to 45% of assets, encouraging domestic investment. For non-retirement savings, there are no offshore limits, giving investors flexibility to diversify globally.",
    ],
    ijgView: "For long-term wealth accumulation, a diversified portfolio of Namibian and global equities has historically been the most effective strategy. IJG Securities\u2019 discretionary portfolio management service targets real returns (above inflation) of 5\u20137% per annum over rolling 5-year periods. The key discipline is consistency \u2014 regular contributions through market cycles, not market timing.",
    waMessage: "Hi, I'd like to speak to an IJG Wealth advisor about investment options.",
  },
};

// ── Dummy market data ──

export const PROPERTY_PRICE_INDEX = [
  { year: "2014", value: 1100 },
  { year: "2015", value: 1168 },
  { year: "2016", value: 1240 },
  { year: "2017", value: 1316 },
  { year: "2018", value: 1397 },
  { year: "2019", value: 1483 },
  { year: "2020", value: 1490 },
  { year: "2021", value: 1560 },
  { year: "2022", value: 1660 },
  { year: "2023", value: 1780 },
  { year: "2024", value: 1900 },
];

export const VEHICLE_SALES = [
  { year: "2014", units: 13200 },
  { year: "2015", units: 14800 },
  { year: "2016", units: 15600 },
  { year: "2017", units: 16200 },
  { year: "2018", units: 16900 },
  { year: "2019", units: 17800 },
  { year: "2020", units: 10200 },
  { year: "2021", units: 11800 },
  { year: "2022", units: 12900 },
  { year: "2023", units: 13100 },
  { year: "2024", units: 13400 },
];

export const PRIME_RATE_HISTORY = [
  { year: "2014", rate: 9.25 },
  { year: "2015", rate: 9.75 },
  { year: "2016", rate: 10.50 },
  { year: "2017", rate: 10.50 },
  { year: "2018", rate: 10.25 },
  { year: "2019", rate: 10.00 },
  { year: "2020", rate: 8.75 },
  { year: "2021", rate: 7.75 },
  { year: "2022", rate: 8.50 },
  { year: "2023", rate: 11.25 },
  { year: "2024", rate: 11.25 },
];

export const NSX_RETURNS = [
  { year: "2014", return: 8.2 },
  { year: "2015", return: -3.1 },
  { year: "2016", return: 5.4 },
  { year: "2017", return: 18.7 },
  { year: "2018", return: -11.2 },
  { year: "2019", return: 22.4 },
  { year: "2020", return: -8.6 },
  { year: "2021", return: 28.3 },
  { year: "2022", return: 14.1 },
  { year: "2023", return: 9.8 },
  { year: "2024", return: 12.1 },
];

// ── Additional index data for Invest page ──

export const IJG_MONEY_MARKET = [
  { year: "2014", return: 6.8 },
  { year: "2015", return: 7.1 },
  { year: "2016", return: 7.8 },
  { year: "2017", return: 7.9 },
  { year: "2018", return: 8.2 },
  { year: "2019", return: 8.0 },
  { year: "2020", return: 6.5 },
  { year: "2021", return: 5.2 },
  { year: "2022", return: 6.1 },
  { year: "2023", return: 9.4 },
  { year: "2024", return: 9.8 },
];

export const IJG_ALL_BOND = [
  { year: "2014", return: 9.2 },
  { year: "2015", return: 4.1 },
  { year: "2016", return: 15.3 },
  { year: "2017", return: 10.6 },
  { year: "2018", return: 7.8 },
  { year: "2019", return: 12.4 },
  { year: "2020", return: 8.9 },
  { year: "2021", return: 6.2 },
  { year: "2022", return: 4.8 },
  { year: "2023", return: 11.7 },
  { year: "2024", return: 10.3 },
];

export const JSE_SWIX = [
  { year: "2014", return: 11.4 },
  { year: "2015", return: 5.1 },
  { year: "2016", return: 3.8 },
  { year: "2017", return: 21.2 },
  { year: "2018", return: -11.7 },
  { year: "2019", return: 12.0 },
  { year: "2020", return: 7.0 },
  { year: "2021", return: 29.2 },
  { year: "2022", return: 4.6 },
  { year: "2023", return: 8.9 },
  { year: "2024", return: 13.4 },
];

// ── SA University cost comparison data ──
export interface UniversityCost {
  university: string;
  location: string;
  tuitionLow: number;
  tuitionHigh: number;
  totalLow: number;
  totalHigh: number;
  notes: string;
}

export const SA_UNIVERSITIES: UniversityCost[] = [
  {
    university: "University of Namibia (UNAM)",
    location: "Windhoek, Namibia",
    tuitionLow: 28000,
    tuitionHigh: 65000,
    totalLow: 80000,
    totalHigh: 150000,
    notes: "Largest university in Namibia. Tuition varies by faculty.",
  },
  {
    university: "NUST Namibia",
    location: "Windhoek, Namibia",
    tuitionLow: 30000,
    tuitionHigh: 68000,
    totalLow: 85000,
    totalHigh: 155000,
    notes: "Focus on science, technology & engineering programmes.",
  },
  {
    university: "University of the Witwatersrand (Wits)",
    location: "Johannesburg, SA",
    tuitionLow: 45000,
    tuitionHigh: 110000,
    totalLow: 160000,
    totalHigh: 280000,
    notes: "Top-ranked research university. High demand for medicine & law.",
  },
  {
    university: "University of Cape Town (UCT)",
    location: "Cape Town, SA",
    tuitionLow: 48000,
    tuitionHigh: 120000,
    totalLow: 175000,
    totalHigh: 310000,
    notes: "Africa's top-ranked university. Accommodation costs are high.",
  },
  {
    university: "Stellenbosch University",
    location: "Stellenbosch, SA",
    tuitionLow: 42000,
    tuitionHigh: 105000,
    totalLow: 155000,
    totalHigh: 270000,
    notes: "Strong in agriculture, engineering & business. Afrikaans-medium option.",
  },
  {
    university: "University of Pretoria (Tuks)",
    location: "Pretoria, SA",
    tuitionLow: 40000,
    tuitionHigh: 100000,
    totalLow: 145000,
    totalHigh: 255000,
    notes: "Large comprehensive university. Strong veterinary & health sciences.",
  },
];

// ── Formatting helpers ──
export function fmtN(n: number, decimals = 0): string {
  if (n >= 1_000_000) return `N$${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000)     return `N$${(n / 1_000).toFixed(0)}k`;
  return `N$${n.toFixed(decimals)}`;
}

export function fmtNFull(n: number): string {
  return "N$" + Math.round(n).toLocaleString("en-NA");
}

export function fmtPct(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}
