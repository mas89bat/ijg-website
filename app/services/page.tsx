import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ServicesContent } from "@/components/sections/services-content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "IJG offers advisory, investment management, stockbroking, private equity, and wealth management services in Namibia.",
};

export default function ServicesPage() {
  return (
    <main style={{ background: "#07090F", color: "#F5F0E8" }}>
      <SiteHeader />
      <ServicesContent />
      <SiteFooter />
    </main>
  );
}
