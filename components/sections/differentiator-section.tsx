"use client";

import type { LucideIcon } from "lucide-react";
import {
  Scale,
  ShieldCheck,
  MapPin,
  Globe,
  TrendingUp,
  Users,
  Award,
  Building2,
} from "lucide-react";
import { DIFFERENTIATORS } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  ShieldCheck,
  MapPin,
  Globe,
};

const TRUST_STATS = [
  {
    value: "30+",
    label: "Years",
    sublabel: "of Excellence",
    icon: Award,
    span: "col-span-1",
  },
  {
    value: "N$15B+",
    label: "Assets Under",
    sublabel: "Management",
    icon: TrendingUp,
    span: "col-span-1",
  },
  {
    value: "2,500+",
    label: "Clients",
    sublabel: "Served",
    icon: Users,
    span: "col-span-1",
  },
  {
    value: "100%",
    label: "Independent",
    sublabel: "No Bank Ownership",
    icon: Building2,
    span: "col-span-1",
  },
];

export function DifferentiatorSection() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section heading */}
        <div className="mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Our Difference
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
            Why IJG
          </h2>
        </div>

        {/* Unified grid: differentiators + stats in one flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 4 differentiator cards */}
          {DIFFERENTIATORS.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="glass rounded-2xl p-6 flex flex-col gap-3 transition-all hover:glow-gold hover:scale-[1.01]"
              >
                {Icon && (
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                    <Icon className="text-primary" size={20} aria-hidden="true" />
                  </div>
                )}
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}

          {/* Stats card — spans full width on mobile, 1 col on desktop */}
          <div className="glass-strong rounded-2xl p-6 gradient-border flex flex-col justify-between gap-5 sm:col-span-2 lg:col-span-1">
            <div className="grid grid-cols-2 gap-4">
              {TRUST_STATS.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div key={stat.label} className="flex flex-col gap-2">
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
                      <StatIcon className="text-primary" size={16} aria-hidden="true" />
                    </div>
                    <div className="text-xl font-bold font-mono text-gradient-gold leading-none">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-tight">
                      {stat.label} {stat.sublabel}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3">
              <ShieldCheck className="text-emerald-400 shrink-0" size={18} />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">NAMFISA Regulated</span> — trusted by generations of Namibian investors since 1994.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
