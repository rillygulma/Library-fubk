import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";

// ================= GET SINGLE USER =================

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const user = await User.findById(params.id).select(
      "-password"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}

// ================= UPDATE USER =================

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const user = await User.findById(params.id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // ================= GENDER VALIDATION =================

    if (
      gender &&
      !["male", "female"].includes(gender)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid gender",
        },
        { status: 400 }
      );
    }

    // ================= HASH PASSWORD =================

    let hashedPassword = user.password;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // ================= CLOUDINARY UPLOAD =================

    let imageUrl = user.profilePicture;

    if (profilePicture) {
      const uploadRes =
        await cloudinary.uploader.upload(
          profilePicture,
          {
            folder: "library-users",
          }
        );

      imageUrl = uploadRes.secure_url;
    }

    // ================= UPDATE USER =================

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      {
        fullName,
        email,
        password: hashedPassword,

        role,
        gender, 

        admissionNo:
          role === "student"
            ? admissionNo
            : "",

        staffNo:
          ["staff", "librarian", "admin"].includes(
            role
          )
            ? staffNo
            : "",

        department,
        faculty,
        phoneNo,

        profilePicture: imageUrl,
      },
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
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
      },
      { status: 500 }
    );
  }
}

// ================= DELETE USER =================

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const user = await User.findById(params.id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    await User.findByIdAndDelete(params.id);

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      { status: 500 }
    );
  }
}