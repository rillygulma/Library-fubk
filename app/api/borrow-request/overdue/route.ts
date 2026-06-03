import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BorrowRequest from "@/models/BorrowRequest";

export const runtime = "nodejs";

export async function GET() {
  await connectDB();

  const borrows = await BorrowRequest.find({
    dueDate: { $lt: new Date() },
    isReturned: false,
  }).populate(
    "user",
    "fullName email"
  );

  return NextResponse.json({
    success: true,
    borrows,
  });
}