import Anthropic from "@anthropic-ai/sdk";
import { jsPDF } from "jspdf";

const REPORT_SYSTEM_PROMPT = `You are an IJG Securities research report writer. Generate a structured financial research report based on the user's query and the AI analysis provided.

OUTPUT FORMAT — Return ONLY valid JSON (no markdown, no code fences):
{
  "title": "Report title",
  "subtitle": "One-line subtitle",
  "date": "March 2026",
  "sections": [
    {
      "heading": "Section heading",
      "content": "Paragraph text for this section. Use plain text, no markdown."
    }
  ],
  "keyMetrics": [
    { "label": "Metric name", "value": "N$1.19bn", "change": "+12.8%" }
  ],
  "disclaimer": "Standard IJG disclaimer text"
}

RULES:
- Write 4-6 sections of 2-4 sentences each
- Include 4-6 key metrics
- Professional financial writing style
- All data must come from the provided analysis — do not invent figures
- Include a standard disclaimer about this being for information purposes only`;

export async function POST(req: Request) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { query, answer } = await req.json();

    // Step 1: Use Anthropic to generate structured report content
    const anthropic = new Anthropic({ apiKey: anthropicKey });
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: REPORT_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Generate a research report for the following query and analysis.

QUERY: ${query}

ANALYSIS:
${answer}`,
        },
      ],
      temperature: 0.2,
    });

    const textBlock = msg.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return new Response(
        JSON.stringify({ error: "No text in Anthropic response" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let reportData;
    try {
      // Strip markdown code fences if present
      let jsonText = textBlock.text.trim();
      if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
      }
      reportData = JSON.parse(jsonText);
    } catch {
      return new Response(
        JSON.stringify({ error: "Failed to parse report structure", raw: textBlock.text.slice(0, 300) }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Step 2: Generate PDF using jsPDF
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 0;

    // --- HEADER BAR ---
    doc.setFillColor(7, 9, 15); // #07090F
    doc.rect(0, 0, pageWidth, 45, "F");

    // Gold accent line
    doc.setFillColor(196, 154, 42); // #C49A2A
    doc.rect(0, 45, pageWidth, 2, "F");

    // IJG SECURITIES header
    doc.setTextColor(196, 154, 42);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("IJG SECURITIES", margin, 20);

    // Subtitle
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 200, 200);
    doc.text("Independent. Focused. Personalised.", margin, 28);

    // Date
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(reportData.date || "March 2026", pageWidth - margin, 20, { align: "right" });
    doc.text("Research Report", pageWidth - margin, 28, { align: "right" });

    y = 55;

    // --- REPORT TITLE ---
    doc.setTextColor(20, 20, 30);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const titleLines = doc.splitTextToSize(reportData.title || query, contentWidth);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 8 + 2;

    // Subtitle
    if (reportData.subtitle) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 100, 100);
      doc.text(reportData.subtitle, margin, y);
      y += 8;
    }

    // Thin line
    doc.setDrawColor(196, 154, 42);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // --- KEY METRICS BAR ---
    if (reportData.keyMetrics && reportData.keyMetrics.length > 0) {
      doc.setFillColor(245, 243, 238);
      doc.roundedRect(margin, y, contentWidth, 28, 3, 3, "F");

      const metrics = reportData.keyMetrics.slice(0, 4);
      const metricWidth = contentWidth / metrics.length;

      metrics.forEach((m: { label: string; value: string; change?: string }, i: number) => {
        const mx = margin + i * metricWidth + metricWidth / 2;

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(7, 9, 15);
        doc.text(m.value, mx, y + 12, { align: "center" });

        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        const label = m.change ? `${m.label} (${m.change})` : m.label;
        doc.text(label, mx, y + 19, { align: "center" });

        // Vertical divider
        if (i < metrics.length - 1) {
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.2);
          doc.line(margin + (i + 1) * metricWidth, y + 5, margin + (i + 1) * metricWidth, y + 23);
        }
      });

      y += 36;
    }

    // --- SECTIONS ---
    for (const section of reportData.sections || []) {
      // Check page break
      if (y > pageHeight - 50) {
        doc.addPage();
        y = 20;
      }

      // Section heading
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(7, 9, 15);
      doc.text(section.heading, margin, y);
      y += 6;

      // Gold underline
      doc.setDrawColor(196, 154, 42);
      doc.setLineWidth(0.3);
      doc.line(margin, y, margin + 40, y);
      y += 5;

      // Content
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      const lines = doc.splitTextToSize(section.content, contentWidth);
      doc.text(lines, margin, y);
      y += lines.length * 5 + 8;
    }

    // --- DISCLAIMER ---
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 20;
    }

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    doc.setFontSize(7);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(140, 140, 140);
    const disclaimer =
      reportData.disclaimer ||
      "No representation is given about, and no responsibility is accepted, for the accuracy or completeness of this document. Any views reflect the current views of IJG Holdings (Pty) Ltd. This document is provided for information purposes only and should not be construed as an offer or solicitation to buy or sell securities or derivatives.";
    const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
    doc.text(disclaimerLines, margin, y);
    y += disclaimerLines.length * 3 + 4;

    // Footer
    doc.setFontSize(7);
    doc.setTextColor(196, 154, 42);
    doc.text("IJG Securities (Pty) Ltd | 4th Floor, 1@Steps, Windhoek | +264 61 256 666 | info@ijg.net", pageWidth / 2, pageHeight - 10, { align: "center" });

    // Generate PDF as base64
    const pdfBase64 = doc.output("datauristring").split(",")[1];

    return new Response(
      JSON.stringify({
        pdf: pdfBase64,
        title: reportData.title || query,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Report generation error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
