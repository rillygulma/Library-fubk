import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";

// ================= GET ALL USERS =================
export async function GET() {
  try {
    await connectDB();

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: users.length,
        users,
      },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}

// ================= CREATE USER =================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      fullName,
      email,
      password,
      admissionNo,
      staffNo,
      department,
      faculty,
      phoneNo,
      role,
      gender,
      profilePicture,
    } = body;

    // ================= NORMALIZE =================
    const normalizedEmail = email?.trim().toLowerCase();

    // ================= VALIDATIONS =================
    if (
      !fullName ||
      !normalizedEmail ||
      !password ||
      !role ||
      !gender
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
        },
        { status: 400 }
      );
    }

    if (!["male", "female"].includes(gender)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid gender",
        },
        { status: 400 }
      );
    }

    if (role === "student" && !admissionNo) {
      return NextResponse.json(
        {
          success: false,
          message: "Admission number is required for students",
        },
        { status: 400 }
      );
    }

    if (
      ["staff", "librarian", "admin"].includes(role) &&
      !staffNo
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Staff number is required",
        },
        { status: 400 }
      );
    }

    // ================= CHECK EXISTING USER =================
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    // ================= HASH PASSWORD =================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ================= CLOUDINARY UPLOAD =================
    let imageUrl = "";

    if (profilePicture) {
      const uploadRes = await cloudinary.uploader.upload(
        profilePicture,
        {
          folder: "library-users",
        }
      );

      imageUrl = uploadRes.secure_url;
    }

    // ================= CREATE USER =================
    const user = await User.create({
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      gender,
      admissionNo: role === "student" ? admissionNo : "",
      staffNo: ["staff", "librarian", "admin"].includes(role)
        ? staffNo
        : "",
      department,
      faculty,
      phoneNo,
      profilePicture: imageUrl,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Server Error",
      },
      { status: 500 }
    );
  }
}