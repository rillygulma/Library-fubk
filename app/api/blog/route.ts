import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";

// CLOUDINARY UPLOAD
const uploadToCloudinary = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "fubk-library/blogs",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url as string);
      }
    );

    stream.end(buffer);
  });
};

// GET
export async function GET() {
  await connectDB();

  const posts = await Blog.find().sort({ createdAt: -1 });

  return NextResponse.json(posts);
}

// POST
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const content = formData.get("content")?.toString() || "";

    const files = formData.getAll("images") as File[];

    const validFiles = files.filter(
      (file) => file instanceof File && file.size > 0
    );

    const images =
      validFiles.length > 0
        ? await Promise.all(validFiles.map(uploadToCloudinary))
        : [];

    const newPost = await Blog.create({
      title,
      description,
      content,
      images,
      date: new Date().toISOString(), // ✅ FIX for your schema
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.log("POST ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const id = new URL(req.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const content = formData.get("content")?.toString() || "";

    const files = formData.getAll("images") as File[];

    const validFiles = files.filter(
      (file) => file instanceof File && file.size > 0
    );

    const images =
      validFiles.length > 0
        ? await Promise.all(validFiles.map(uploadToCloudinary))
        : [];

    const updateData: any = {
      title,
      description,
      content,
    };

    if (images.length > 0) {
      updateData.images = images;
    }

    const updated = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.log("PUT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const id = new URL(req.url).searchParams.get("id");

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}