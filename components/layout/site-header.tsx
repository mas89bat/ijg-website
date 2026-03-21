"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { NAV_ITEMS, COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleStartInvesting = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const target = document.getElementById("prospect-form");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      {/* Sentinel element — when it scrolls out of view, header compacts */}
      <div ref={sentinelRef} className="absolute top-0 left-0 h-px w-full" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 glass-strong border-b border-primary/10 transition-all duration-300",
          isScrolled ? "h-14" : "h-[72px]"
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/ijg-logo.png"
              alt="IJG Securities"
              width={86}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {NAV_ITEMS.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={COMPANY_INFO.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Client Login
            </a>
            <a
              href="#prospect-form"
              onClick={handleStartInvesting}
              className={cn(buttonVariants({ size: "sm" }), "hover:shadow-[0_0_20px_oklch(0.72_0.19_230/30%)] transition-all")}
            >
              Start Investing
            </a>
          </div>

          {/* Mobile: hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind the fixed header */}
      <div
        className={cn(
          "transition-all duration-300",
          isScrolled ? "h-14" : "h-[72px]"
        )}
      />

      {/* Mobile Navigation Sheet */}
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
