import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CareersContent } from "@/components/sections/careers-content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join IJG Securities — Namibia's leading independent financial services group. Explore career opportunities in Windhoek.",
};

export default function CareersPage() {
  return (
    <main style={{ background: "#07090F", color: "#F5F0E8" }}>
      <SiteHeader />
      <CareersContent />
      <SiteFooter />
    </main>
  );
}
