import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, message } = body;

    // Validation
    if (!name || !email || !phone || !address || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Save to Sanity
    const sanityResult = await client.create({
      _type: "volunteer",
      name,
      email,
      phone,
      address,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    return NextResponse.json({
      success: true,
      message: "Volunteer application submitted successfully",
      data: sanityResult,
    });
  } catch (error) {
    console.error("Error submitting volunteer application:", error);
    return NextResponse.json(
      { error: "Failed to submit volunteer application" },
      { status: 500 },
    );
  }
}
