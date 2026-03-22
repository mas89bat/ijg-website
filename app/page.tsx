import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NewHero } from "@/components/sections/new-hero";
import { NewServices } from "@/components/sections/new-services";
import { WealthPreview } from "@/components/sections/wealth-preview";
import { NewLeadCapture } from "@/components/sections/new-lead-capture";
import { ResearchPreviewGrid } from "@/components/sections/research-preview-grid";
import { NewAbout } from "@/components/sections/new-about";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { JsonLd } from "@/components/shared/json-ld";

export default function Home() {
  return (
    <main>
      <JsonLd />
      <SiteHeader />
      <NewHero />
      <NewServices />
      <WealthPreview />
      <NewLeadCapture />
      <ResearchPreviewGrid />
      <NewAbout />
      <SiteFooter />
      <CookieConsent />
    </main>
  );
}
