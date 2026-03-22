"use client";

import { useRef } from "react";
import Link from "next/link";
import AnimatedGradient from "@/components/ui/animated-gradient";

export function HeroSection() {
  const _ = useRef(null); // keep client component

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated WebGL gradient background */}
      <AnimatedGradient
        config={{
          preset: "custom",
          color1: "#050810",
          color2: "#1a3a6e",
          color3: "#0a1628",
          rotation: -30,
          proportion: 20,
          scale: 0.01,
          speed: 12,
          distortion: 0,
          swirl: 40,
          swirlIterations: 12,
          softness: 80,
          offset: -200,
          shape: "Checks",
          shapeSize: 50,
        }}
        noise={{ opacity: 15, scale: 1 }}
      />

      {/* Grid pattern overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Left: Copy */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6">
            {/* Badge */}
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">
                Namibia&apos;s Leading Independent Financial Group
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-foreground leading-[1.05]">
              Independent Wealth{" "}
              <br className="hidden md:block" />
              Management for{" "}
              <span className="text-gradient-gold">Namibia</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Personalised advisory, investment management, and financial
              planning — built on 30 years of Namibian market expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="#prospect-form"
                className="group relative inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_oklch(0.72_0.19_230/30%)]"
              >
                Start Investing
                <span className="ml-2 transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </Link>
              <Link
                href="/research"
                className="glass inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-foreground transition-all hover:scale-[1.02] hover:bg-white/[0.08]"
              >
                View Our Research
              </Link>
            </div>
          </div>

          {/* Right: Floating glassmorphic dashboard mockup */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="glass-strong rounded-2xl p-6 glow-blue" style={{ animation: "float 6s ease-in-out infinite" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Portfolio Overview</span>
                  <span className="text-xs text-emerald-400 font-mono">+12.4%</span>
                </div>

                <div className="text-3xl font-bold font-mono text-foreground mb-1">
                  N$2,847,320
                </div>
                <div className="text-xs text-muted-foreground mb-6">Total Portfolio Value</div>

                {/* Mini chart bars */}
                <div className="flex items-end gap-1.5 h-20 mb-4">
                  {[40, 55, 35, 65, 50, 75, 60, 80, 70, 90, 85, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all"
                      style={{
                        height: `${h}%`,
                        background: i >= 10
                          ? "oklch(0.72 0.19 230)"
                          : i >= 8
                            ? "oklch(0.72 0.19 230 / 70%)"
                            : "oklch(0.45 0.18 250 / 60%)",
                      }}
                    />
                  ))}
                </div>

                {/* Asset allocation row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Equities", value: "48%", color: "bg-primary" },
                    { label: "Fixed Income", value: "32%", color: "bg-accent" },
                    { label: "Alternatives", value: "20%", color: "bg-emerald-500/70" },
                  ].map((asset) => (
                    <div key={asset.label} className="text-center">
                      <div className={`h-1 rounded-full ${asset.color} mb-2`} />
                      <div className="text-sm font-mono font-semibold text-foreground">{asset.value}</div>
                      <div className="text-[10px] text-muted-foreground">{asset.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Small floating card — top right */}
              <div
                className="absolute -top-6 -right-6 glass rounded-xl p-3 glow-blue"
                style={{ animation: "float 5s ease-in-out infinite 1s" }}
              >
                <div className="text-[10px] text-muted-foreground mb-1">NSX All Share</div>
                <div className="text-sm font-mono font-bold text-emerald-400">+1.2%</div>
              </div>

              {/* Small floating card — bottom left */}
              <div
                className="absolute -bottom-4 -left-4 glass rounded-xl p-3"
                style={{ animation: "float 7s ease-in-out infinite 2s" }}
              >
                <div className="text-[10px] text-muted-foreground mb-1">Unit Trusts</div>
                <div className="text-sm font-mono font-bold text-primary">NAV ↑</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
