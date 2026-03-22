export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GOOGLE_AI_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { query, answer } = await req.json();

    // Truncate answer to avoid hitting token limits
    const trimmedAnswer = (answer || "").slice(0, 1500);

    const prompt = `Generate a professional financial infographic image.

DESIGN SPEC:
- Dark navy background (#07090F), gold accents (#C49A2A), white text (#E8E4DD)
- Clean modern financial style, institutional quality, suitable for print at 4K
- Header: "IJG SECURITIES" with gold accent bar, subtitle "Independent. Focused. Personalised."
- Footer: "Source: IJG Securities Research | March 2026"
- Large bold numbers for key metrics, clean section dividers, bullet points with gold markers
- Professional typography, no clutter

TOPIC: ${query}

DATA TO VISUALIZE:
${trimmedAnswer}

Make this look like a premium sell-side research infographic — Bloomberg Terminal quality meets boutique advisory house aesthetic.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return new Response(
        JSON.stringify({ error: "Image generation failed", details: errText }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    // Extract image from response
    const parts = data.candidates?.[0]?.content?.parts;
    if (!parts) {
      return new Response(
        JSON.stringify({ error: "No content in response", raw: JSON.stringify(data).slice(0, 500) }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const imagePart = parts.find(
      (p: { inlineData?: { mimeType: string; data: string } }) =>
        p.inlineData?.mimeType?.startsWith("image/")
    );

    if (!imagePart?.inlineData) {
      return new Response(
        JSON.stringify({ error: "No image in response", parts: parts.map((p: { text?: string }) => p.text ? "text" : "other") }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        image: imagePart.inlineData.data,
        mimeType: imagePart.inlineData.mimeType,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Infographic generation error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
