import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Lightbulb,
  TrendingUp,
  BarChart3,
  Building2,
  Shield,
} from "lucide-react";
import { SERVICE_PILLARS } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  TrendingUp,
  BarChart3,
  Building2,
  Shield,
};

export function ServicePillarGrid() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 mesh-gradient opacity-30" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Our Expertise
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Comprehensive financial services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {SERVICE_PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.icon];
            return (
              <Link
                key={pillar.id}
                href={pillar.href}
                className="group glass rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:glow-gold hover:scale-[1.02] gradient-border"
              >
                {Icon && (
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon
                      className="text-primary"
                      size={24}
                      aria-hidden="true"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {pillar.description}
                </p>
                <span className="text-primary text-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
