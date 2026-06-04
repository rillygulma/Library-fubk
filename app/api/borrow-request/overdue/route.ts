import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BorrowRequest from "@/models/BorrowRequest";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const today = new Date();

    const overdue = await BorrowRequest.find({
      status: "approved",
      isReturned: false,
      dueDate: { $lt: today },
    }).populate("user", "fullName email role");

    return NextResponse.json({
      success: true,
      overdue,
    });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}