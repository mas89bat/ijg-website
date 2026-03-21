import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { MetricStrip } from "@/components/sections/metric-strip";
import { ServicePillarGrid } from "@/components/sections/service-pillar-grid";
import { ProspectForm } from "@/components/sections/prospect-form";
import { ResearchPreviewGrid } from "@/components/sections/research-preview-grid";
import { DifferentiatorSection } from "@/components/sections/differentiator-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { JsonLd } from "@/components/shared/json-ld";

export default function Home() {
  return (
    <main>
      <JsonLd />
      <SiteHeader />
      <HeroSection />
      <MetricStrip />
      <ServicePillarGrid />
      <ProspectForm />
      <ResearchPreviewGrid />
      <DifferentiatorSection />
      <SiteFooter />
      <CookieConsent />
    </main>
  );
}
