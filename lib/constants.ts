import type {
  ServicePillar,
  ResearchArticle,
  TrustMetric,
  NavItem,
} from "@/types";

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "advisory",
    title: "Advisory",
    description:
      "Strategic corporate finance advice, capital raising, and M&A guidance for businesses across Namibia.",
    icon: "Lightbulb",
    href: "/services/advisory",
  },
  {
    id: "investment-management",
    title: "Investment Management",
    description:
      "Active portfolio management across equities, fixed income, and balanced mandates tailored to your goals.",
    icon: "TrendingUp",
    href: "/services/investment-management",
  },
  {
    id: "stockbroking",
    title: "Stockbroking",
    description:
      "Direct access to the NSX and JSE with research-backed execution and personalised trading support.",
    icon: "BarChart3",
    href: "/services/stockbroking",
  },
  {
    id: "private-equity",
    title: "Private Equity",
    description:
      "Growth capital and strategic partnerships for high-potential Namibian and regional businesses.",
    icon: "Building2",
    href: "/services/private-equity",
  },
  {
    id: "wealth-management",
    title: "Wealth Management",
    description:
      "Holistic financial planning covering retirement, estate, education, offshore solutions, and stock portfolios.",
    icon: "Shield",
    href: "/services/wealth-management",
  },
];

export const TRUST_METRICS: TrustMetric[] = [
  { value: "N$15B+", label: "Assets Under Management" },
  { value: "30+", label: "Years of Excellence" },
  { value: "NAMFISA", label: "Regulated" },
  { value: "2,500+", label: "Clients Served" },
];

export const NAV_ITEMS: NavItem[] = [
  { title: "Our Services", href: "/services" },
  { title: "Research", href: "/research" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: "1",
    title: "Namibian Economic Outlook Q1 2026",
    abstract:
      "GDP growth projections, inflation trends, and fiscal policy analysis for the year ahead.",
    category: "economic",
    publishedAt: "2026-03-14",
    href: "/research/namibian-economic-outlook-q1-2026",
  },
  {
    id: "2",
    title: "NSX Equity Strategy: Banking Sector Review",
    abstract:
      "Comprehensive analysis of Namibian banking stocks with updated valuations and investment recommendations.",
    category: "equity",
    publishedAt: "2026-03-10",
    href: "/research/nsx-banking-sector-review",
  },
  {
    id: "3",
    title: "Fixed Income Monitor: March 2026",
    abstract:
      "Government bond yield analysis, money market rates, and duration positioning for institutional investors.",
    category: "fixed-income",
    publishedAt: "2026-03-07",
    href: "/research/fixed-income-monitor-march-2026",
  },
];

export const DIFFERENTIATORS = [
  {
    icon: "Scale",
    title: "Truly Independent",
    description:
      "No bank ownership, no product bias. Advice that serves your interests first.",
  },
  {
    icon: "ShieldCheck",
    title: "NAMFISA Regulated",
    description:
      "Fully licensed and regulated by the Namibia Financial Institutions Supervisory Authority.",
  },
  {
    icon: "MapPin",
    title: "Local Expertise",
    description:
      "Deep understanding of Namibian markets, regulations, and investment opportunities.",
  },
  {
    icon: "Globe",
    title: "Global Access",
    description:
      "Offshore investment solutions and international market access through established partnerships.",
  },
];

export const COMPANY_INFO = {
  name: "IJG Securities (Pty) Ltd",
  tagline: "Independent. Focused. Personalised.",
  address:
    "4th Floor, 1@Steps, Corner of Grove & Chasie Streets, Kleine Kuppe, Windhoek, Namibia",
  phone: "+264 61 256 666",
  email: "info@ijg.net",
  portalUrl: "https://ijgwealth.myfinance-hub.co.za/login/",
  unitTrustUrl: "https://www.ijgunittrusts.net/",
  researchUrl: "https://ijgresearch.net/",
  regulatory:
    "IJG Securities (Pty) Ltd is an authorised financial services provider regulated by NAMFISA.",
};
