"use client";

import { useEffect, useRef, useState } from "react";
import { TRUST_METRICS } from "@/lib/constants";

function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const numMatch = value.match(/^([\d,]+)/);
  const prefix = value.match(/^([^\d]*)/)?.[1] ?? "";
  const suffix = value.replace(/^[^\d]*[\d,]+/, "");

  if (!numMatch) {
    return <span className="font-mono text-4xl md:text-5xl font-bold text-gradient-gold">{value}</span>;
  }

  const target = parseInt(numMatch[1].replace(/,/g, ""), 10);
  return <Counter target={target} prefix={prefix} suffix={suffix} inView={inView} />;
}

function Counter({ target, prefix, suffix, inView }: { target: number; prefix: string; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, target]);

  const formatted = count.toLocaleString();
  return (
    <span className="font-mono text-4xl md:text-5xl font-bold text-gradient-gold">
      {prefix}{formatted}{suffix}
    </span>
  );
}

export function MetricStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Subtle mesh gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-50" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {TRUST_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="glass rounded-2xl p-6 flex flex-col items-center text-center gap-2 transition-all hover:glow-gold hover:scale-[1.02]"
            >
              <AnimatedValue value={metric.value} inView={inView} />
              <span className="text-sm text-muted-foreground font-medium">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
