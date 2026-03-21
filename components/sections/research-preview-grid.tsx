import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RESEARCH_ARTICLES } from "@/lib/constants";
import { categoryLabels } from "@/types";

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ResearchPreviewGrid() {
  return (
    <section id="research" className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Latest Research &amp; Insights
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Market analysis and investment commentary from our research desk
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group glass rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:glow-blue hover:scale-[1.01] shimmer"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  {formatDate(article.publishedAt)}
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                  {categoryLabels[article.category]}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {article.abstract}
              </p>

              <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Read Analysis
                <ArrowUpRight className="size-3.5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/research"
            className="glass inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-foreground transition-all hover:scale-[1.02] hover:bg-white/[0.08] gradient-border"
          >
            Browse All Research
          </Link>
        </div>
      </div>
    </section>
  );
}
