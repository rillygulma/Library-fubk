import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BorrowRequest from "@/models/BorrowRequest";
import User from "@/models/User";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { success: false, message: "Query is required" },
        { status: 400 }
      );
    }

    // ================= FIND USER =================
    const user = await User.findOne({
      $or: [
        { email: query },
        { phoneNo: query }
      ],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ================= FIND LATEST BORROW =================
    const borrow = await BorrowRequest.findOne({
      user: user._id,
    })
      .sort({ createdAt: -1 })
      .populate("user", "fullName email phoneNo role profilePicture");

    if (!borrow) {
      return NextResponse.json(
        { success: false, message: "No borrow record found for user" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      borrow,
    });
  } catch (error) {
    console.error("SEARCH BORROW ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}