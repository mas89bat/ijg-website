import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ContactContent } from "@/components/sections/contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with IJG Securities in Windhoek, Namibia. Phone, email, or visit our offices at 1@Steps, Kleine Kuppe.",
};

export default function ContactPage() {
  return (
    <main style={{ background: "#07090F", color: "#F5F0E8" }}>
      <SiteHeader />
      <ContactContent />
      <SiteFooter hideContactSection />
    </main>
  );
}
