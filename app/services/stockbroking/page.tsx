import type { Metadata } from "next";
import { SERVICE_DETAILS } from "@/lib/service-details";
import { ServiceDetailPage } from "@/components/sections/service-detail";

export const metadata: Metadata = {
  title: "Stockbroking",
  description: "Direct access to the NSX and JSE with research-backed execution and personalised trading support.",
};

export default function StockbrokingPage() {
  return <ServiceDetailPage service={SERVICE_DETAILS.stockbroking} />;
}
