import type { Metadata } from "next";
import { SERVICE_DETAILS } from "@/lib/service-details";
import { ServiceDetailPage } from "@/components/sections/service-detail";

export const metadata: Metadata = {
  title: "Advisory Services",
  description: "Strategic corporate finance advice, capital raising, and M&A guidance for businesses across Namibia.",
};

export default function AdvisoryPage() {
  return <ServiceDetailPage service={SERVICE_DETAILS.advisory} />;
}
