import { NextRequest, NextResponse } from "next/server";

import { fullProspectSchema } from "@/lib/validations";
import { getProspectRouting } from "@/lib/prospect-routing";

// Simple in-memory rate limiting: IP -> timestamps of recent submissions
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];

  // Remove entries older than the window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  rateLimitMap.set(ip, recent);

  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = fullProspectSchema.safeParse(body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        { success: false, error: "Validation failed", details },
        { status: 400 }
      );
    }

    const routing = getProspectRouting(result.data);

    // Phase 1: Log routing result (no email service yet)
    console.log("[api/prospect] New enquiry received", {
      team: routing.team,
      emailTo: routing.emailTo,
      priority: routing.priority,
      interest: result.data.interest,
      aumBand: result.data.aumBand,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry received",
      routing: { team: routing.team },
    });
  } catch (error) {
    console.error("[api/prospect] Unexpected error", {
      error: String(error),
      stack: (error as Error).stack,
    });

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
