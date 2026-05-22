import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

// GET ALL BLOG POSTS
export async function GET() {
  try {
    await connectDB();

    const posts = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json(posts, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// CREATE BLOG POST
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newPost = await Blog.create(body);

    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

// UPDATE BLOG POST (EDIT)
export async function PUT(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedPost = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog updated successfully", data: updatedPost },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE BLOG POST
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}