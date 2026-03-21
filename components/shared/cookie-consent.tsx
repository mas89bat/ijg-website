"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ijg-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleConsent(choice: "essential" | "all") {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 translate-y-0 border-t border-border bg-card transition-transform duration-300 ease-out data-[hidden=true]:translate-y-full"
      data-hidden={!visible}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          We use cookies to improve your experience. See our{" "}
          <Link
            href="/legal/cookies"
            className="underline underline-offset-4 transition-colors hover:text-primary"
          >
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleConsent("essential")}
          >
            Essential Only
          </Button>
          <Button size="sm" onClick={() => handleConsent("all")}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
