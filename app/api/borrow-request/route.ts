import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BorrowRequest from "@/models/BorrowRequest";
import User from "@/models/User";

export const runtime = "nodejs";

/* ================= GET ALL BORROWS ================= */
export async function GET() {
  try {
    await connectDB();

    const borrows = await BorrowRequest.find()
      .populate("user", "fullName email role phoneNo")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      borrows,
    });
  } catch (error) {
    console.error("GET BORROWS ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch borrows" },
      { status: 500 }
    );
  }
}

/* ================= CREATE BORROW REQUEST ================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, title, author, isbn } = body;

    if (!email || !title || !author || !isbn) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const role = (user.role || "").toLowerCase();

    let daysAllowed = 14;

    if (role === "student") {
      daysAllowed = 14;
    } else if (["staff", "librarian", "admin"].includes(role)) {
      daysAllowed = 30;
    }

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + daysAllowed);

    const borrow = await BorrowRequest.create({
      user: user._id,
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),

      // ✅ FIXED: must match schema enum
      status: "borrowed",

      borrowDate,
      dueDate,

      isReturned: false,
      fine: 0,
    });

    return NextResponse.json(
      { success: true, borrow },
      { status: 201 }
    );
  } catch (error) {
    console.error("BORROW ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while creating borrow request",
      },
      { status: 500 }
    );
  }
}