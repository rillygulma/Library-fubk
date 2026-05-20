import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

// ==============================
// CREATE CONTACT MESSAGE
// ==============================
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        data: newContact,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// ==============================
// GET ALL CONTACT MESSAGES
// ==============================
export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        count: contacts.length,
        data: contacts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch messages",
      },
      {
        status: 500,
      }
    );
  }
}

// ==============================
// DELETE CONTACT MESSAGE
// ==============================
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Message ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete message",
      },
      {
        status: 500,
      }
    );
  }
}