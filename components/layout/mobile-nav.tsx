"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";

import { NAV_ITEMS, COMPANY_INFO } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  function handleScrollTo(e: React.MouseEvent) {
    e.preventDefault();
    onOpenChange(false);
    // Small delay to allow sheet close animation before scrolling
    requestAnimationFrame(() => {
      const target = document.getElementById("prospect-form");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 bg-background p-0">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-baseline gap-1.5">
            <span className="font-sans text-xl font-bold tracking-tight text-primary">
              IJG
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Securities
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col px-6 py-6">
          {/* Primary CTAs */}
          <div className="flex flex-col gap-3">
            <a
              href="#prospect-form"
              onClick={handleScrollTo}
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              Start Investing
            </a>
            <a
              href={COMPANY_INFO.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
            >
              Client Login
            </a>
          </div>

          <Separator className="my-6" />

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Contact info pushed to bottom */}
          <div className="mt-auto pt-6">
            <Separator className="mb-6" />
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 shrink-0 text-primary" />
                {COMPANY_INFO.phone}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <Mail className="size-4 shrink-0 text-primary" />
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
