import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

import { COMPANY_INFO, NAV_ITEMS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

const LEGAL_LINKS = [
  { title: "Privacy Policy", href: "/legal/privacy" },
  { title: "Terms of Use", href: "/legal/terms" },
  { title: "PAIA Manual", href: "/legal/paia" },
  { title: "Complaints", href: "/legal/complaints" },
  { title: "Cookie Policy", href: "/legal/cookies" },
];

const QUICK_LINKS = [
  ...NAV_ITEMS,
  { title: "Careers", href: "/careers" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-primary/10 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient opacity-20" aria-hidden="true" />
      <div className="absolute inset-0 bg-card/80" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/ijg-logo.png"
                alt="IJG Securities"
                width={86}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="mt-2 font-sans text-sm font-medium tracking-tight text-primary/80">
              {COMPANY_INFO.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Namibia&apos;s leading independent financial services group,
              delivering expert advisory, investment management, and wealth
              solutions since 1994.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-tight text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-tight text-foreground">
              Legal
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-tight text-foreground">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary/70" />
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary/70" />
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary/70" />
                <span>{COMPANY_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <Separator />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <p className="max-w-lg">{COMPANY_INFO.regulatory}</p>
        </div>
      </div>
    </footer>
  );
}
