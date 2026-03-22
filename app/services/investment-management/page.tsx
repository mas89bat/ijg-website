import type { Metadata } from "next";
import { SERVICE_DETAILS } from "@/lib/service-details";
import { ServiceDetailPage } from "@/components/sections/service-detail";

export const metadata: Metadata = {
  title: "Investment Management",
  description: "Active portfolio management across equities, fixed income, and balanced mandates tailored to your goals.",
};

export default function InvestmentManagementPage() {
  return <ServiceDetailPage service={SERVICE_DETAILS["investment-management"]} />;
}
