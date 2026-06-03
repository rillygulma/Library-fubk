import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BorrowRequest from "@/models/BorrowRequest";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  await connectDB();

  const { userId } = await params;

  const borrows = await BorrowRequest.find({
    user: userId,
  }).sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    borrows,
  });
}