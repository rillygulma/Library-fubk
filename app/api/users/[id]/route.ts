import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";

// ================= GET SINGLE USER =================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// ================= UPDATE USER =================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
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

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ================= GENDER VALIDATION =================
    if (gender && !["male", "female"].includes(gender)) {
      return NextResponse.json(
        { success: false, message: "Invalid gender" },
        { status: 400 }
      );
    }

    // ================= PASSWORD HANDLING =================
    let hashedPassword: string | undefined;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // ================= PROFILE IMAGE =================
    let imageUrl = user.profilePicture;

    if (profilePicture) {
      const uploadRes = await cloudinary.uploader.upload(
        profilePicture,
        {
          folder: "library-users",
        }
      );

      imageUrl = uploadRes.secure_url;
    }

    // ================= UPDATE DATA (SAFE BUILD) =================
    const updateData: Record<string, unknown> = {
      fullName,
      email,
      role,
      gender,
      department,
      faculty,
      phoneNo,
      profilePicture: imageUrl,
    };

    if (hashedPassword) {
      updateData.password = hashedPassword;
    }

    updateData.admissionNo =
      role === "student" ? admissionNo : "";

    updateData.staffNo =
      ["staff", "librarian", "admin"].includes(role)
        ? staffNo
        : "";

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// ================= DELETE USER =================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    );
  }
}