import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AboutContent } from "@/components/sections/about-content";

export const metadata: Metadata = {
  title: "About IJG",
  description:
    "Learn about IJG Securities — Namibia's leading independent financial services group since 1994. NAMFISA regulated, N$15B+ assets under management.",
};

export default function AboutPage() {
  return (
    <main style={{ background: "#07090F", color: "#F5F0E8" }}>
      <SiteHeader />
      <AboutContent />
      <SiteFooter />
    </main>
  );
}
