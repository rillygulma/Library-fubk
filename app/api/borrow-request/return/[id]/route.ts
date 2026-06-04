import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BorrowRequest from "@/models/BorrowRequest";

export const runtime = "nodejs";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const borrow = await BorrowRequest.findById(id).populate("user");

    if (!borrow) {
      return NextResponse.json(
        { success: false, message: "Borrow not found" },
        { status: 404 }
      );
    }

    const today = new Date();

    let fine = 0;

    if (borrow.dueDate && today > borrow.dueDate) {
      const daysLate = Math.ceil(
        (today.getTime() - borrow.dueDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      fine = daysLate * 100;
    }

    borrow.status = "returned";
    borrow.isReturned = true;
    borrow.returnDate = today;
    borrow.fine = fine;

    await borrow.save();

    return NextResponse.json({
      success: true,
      message: "Book returned successfully",
      fine,
      borrow,
    });
  } catch (error) {
    console.error("RETURN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}