import { NextRequest, NextResponse } from "next/server";
import { scrapeFacebook } from "@/lib/scrapers/facebook";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      );
    }

    const result = await scrapeFacebook(url);

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        detail: err.message,
      },
      { status: 500 }
    );
  }
}
