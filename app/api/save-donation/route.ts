import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@sanity/client';
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Create a new donation document in Sanity
    const donation = await client.create({
      _type: "donation", // Make sure you have this schema in Sanity
      name: data.name,
      transactionId: data.transactionId,
      honoreeName: data.honoreeName,
      message: data.message,
      paymentMethod: data.paymentMethod,
      paymentProvider: data.paymentProvider,
      bankName: data.bankName,
      branchName: data.branchName,
      referenceNumber: data.referenceNumber,
      email: data.email,
      paypalTransactionId: data.paypalTransactionId,
      selectedMobileAccount: data.selectedMobileAccount,
      submittedAt: data.submittedAt,
      status: "pending", // or 'received'
    });

    return NextResponse.json({ success: true, donation }, { status: 200 });
  } catch (error) {
    console.error("Error saving donation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save donation" },
      { status: 500 },
    );
  }
}
