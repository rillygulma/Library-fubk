import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type UserRole = "admin" | "librarian" | "student" | "staff";

type User = {
  role: UserRole;
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  let user: User | null = null;

  // Decode token safely
  if (token) {
    try {
      user = jwt.decode(token) as User;
    } catch (err) {
      user = null;
    }
  }

  const role = user?.role;

  // ========================
  // 1. Redirect logged-in users away from login page
  // ========================
  if (pathname === "/login") {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    }
    if (role === "librarian") {
      return NextResponse.redirect(new URL("/librarian-dashboard", req.url));
    }
    if (role === "student" || role === "staff") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // ========================
  // 2. Protect Admin Dashboard
  // ========================
  if (pathname.startsWith("/admin-dashboard")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ========================
  // 3. Protect Librarian Dashboard
  // ========================
  if (pathname.startsWith("/librarian-dashboard")) {
    if (!token || role !== "librarian") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ========================
  // 4. Protect Student/Staff Dashboard
  // ========================
  if (pathname.startsWith("/dashboard")) {
    if (!token || (role !== "student" && role !== "staff")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/librarian-dashboard/:path*",
    "/dashboard/:path*",
    "/login",
  ],
};