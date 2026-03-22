import type { Metadata } from "next";
import { SERVICE_DETAILS } from "@/lib/service-details";
import { ServiceDetailPage } from "@/components/sections/service-detail";

export const metadata: Metadata = {
  title: "Wealth Management",
  description: "Holistic financial planning covering retirement, estate, education, offshore solutions, and stock portfolios.",
};

export default function WealthManagementPage() {
  return <ServiceDetailPage service={SERVICE_DETAILS["wealth-management"]} />;
}
