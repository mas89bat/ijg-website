"use client";

import { useParams } from "next/navigation";
import { RESEARCH } from "@/lib/research-data";
import ArticleView from "@/components/research/article-view";

export default function ArticlePage() {
  const params = useParams();
  const articleSlug = params.articleSlug as string;
  const articleId = parseInt(articleSlug, 10);
  const article = RESEARCH.find(r => r.id === articleId);

  if (!article) {
    return (
      <div style={{
        background: "#06070D", minHeight: "100vh", color: "#E8E4DD",
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 36, fontWeight: 300, fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 16 }}>Article not found</h1>
          <p style={{ fontSize: 14, color: "#7A7680", marginBottom: 24 }}>The article you are looking for does not exist.</p>
          <a href="/research" style={{
            padding: "12px 28px", borderRadius: 99, border: "none",
            background: "linear-gradient(135deg,#C49A2A,#D4A843)",
            color: "#06070D", fontSize: 14, fontWeight: 700, textDecoration: "none",
            display: "inline-block",
          }}>
            Back to Research
          </a>
        </div>
      </div>
    );
  }

  return <ArticleView article={article} />;
}
