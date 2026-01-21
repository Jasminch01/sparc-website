import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Save to Sanity
    const sanityResult = await client.create({
      _type: "partnershipProposal",
      name,
      company: company || "",
      email,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    return NextResponse.json({
      success: true,
      message: "Proposal submitted successfully",
      data: sanityResult,
    });
  } catch (error) {
    console.error("Error submitting proposal:", error);
    return NextResponse.json(
      { error: "Failed to submit proposal" },
      { status: 500 },
    );
  }
}
