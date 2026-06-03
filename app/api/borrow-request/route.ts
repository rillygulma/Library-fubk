import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BorrowRequest from "@/models/BorrowRequest";
import User from "@/models/User";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const borrows = await BorrowRequest.find()
      .populate("user", "fullName email role")
      .sort({ createdAt: -1 });

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

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      email,
      title,
      author,
      isbn,
      dueDate,
    } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const borrow = await BorrowRequest.create({
      user: user._id,
      title,
      author,
      isbn,
      dueDate,
    });

    return NextResponse.json(
      {
        success: true,
        borrow,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}