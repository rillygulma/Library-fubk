import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BorrowRequest from "@/models/BorrowRequest";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    await connectDB();

    const { userId } = await context.params;

    const borrows = await BorrowRequest.find({
      user: userId,
    }).populate("user");

    return NextResponse.json({
      success: true,
      borrows,
    });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}