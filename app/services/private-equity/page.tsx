import type { Metadata } from "next";
import { SERVICE_DETAILS } from "@/lib/service-details";
import { ServiceDetailPage } from "@/components/sections/service-detail";

export const metadata: Metadata = {
  title: "Private Equity",
  description: "Growth capital and strategic partnerships for high-potential Namibian and regional businesses.",
};

export default function PrivateEquityPage() {
  return <ServiceDetailPage service={SERVICE_DETAILS["private-equity"]} />;
}
