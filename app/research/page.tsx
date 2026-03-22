"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResearchLanding } from "@/components/research/research-landing";

export default function ResearchPage() {
  return (
    <main>
      <SiteHeader />
      <ResearchLanding />
      <SiteFooter />
    </main>
  );
}
