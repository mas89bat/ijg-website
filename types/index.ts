export interface ServicePillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface ResearchArticle {
  id: string;
  title: string;
  abstract: string;
  category: "equity" | "fixed-income" | "economic" | "special";
  publishedAt: string;
  href: string;
}

export interface ProspectFormData {
  interest: "investing" | "planning" | "stockbroking" | "corporate" | "other";
  aumBand: string;
  timeline: "immediately" | "1-3-months" | "exploring";
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "email" | "phone" | "whatsapp";
  meetingPreference?: "morning" | "afternoon" | "flexible";
  privacyConsent: boolean;
}

export interface ProspectRouting {
  team:
    | "unit-trusts"
    | "wealth-management"
    | "stockbroking"
    | "advisory"
    | "general";
  emailTo: string;
  priority: "high" | "standard";
}

export interface TrustMetric {
  value: string;
  label: string;
}

export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export const categoryLabels: Record<ResearchArticle["category"], string> = {
  equity: "Equity Research",
  "fixed-income": "Fixed Income",
  economic: "Economic Commentary",
  special: "Special Report",
};
