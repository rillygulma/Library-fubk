"use client";

import {
  LayoutDashboard,
  BookOpen,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Activity,
  User,
  Bookmark,
  ClipboardList,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // SAME STYLE STATS AS ADMIN (but user-focused)
  const stats = [
    {
      title: "Books Borrowed",
      value: "8",
      icon: BookOpen,
      growth: "+2 this month",
    },
    {
      title: "Active Loans",
      value: "3",
      icon: ClipboardList,
      growth: "Due soon",
    },
    {
      title: "Saved Books",
      value: "12",
      icon: Bookmark,
      growth: "+5 this week",
    },
    {
      title: "Library Activity",
      value: "24",
      icon: Activity,
      growth: "+10% increase",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR (same design as admin) */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/fubk-logo.jpg"
              alt="Library"
              width={48}
              height={48}
              className="rounded-full"
            />

            <div>
              <h1 className="text-2xl font-bold text-blue-700">
                FUBK Library
              </h1>
              <p className="text-sm text-gray-500">
                Student / Staff Portal
              </p>
            </div>
          </div>

          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X />
          </button>
        </div>

        {/* NAVIGATION (ADMIN ITEMS REMOVED, USER ITEMS ADDED) */}
        <nav className="flex-1 space-y-2 p-4">
          {[
            {
              icon: LayoutDashboard,
              label: "Dashboard",
              path: "/dashboard",
            },
            {
              icon: BookOpen,
              label: "E-Library",
              path: "/library",
            },
            {
              icon: ClipboardList,
              label: "Borrowed Books",
              path: "/borrowed",
            },
            {
              icon: Bookmark,
              label: "Saved Books",
              path: "/saved",
            },
            {
              icon: Bell,
              label: "Announcements",
              path: "/announcements",
            },
            {
              icon: User,
              label: "Profile",
              path: "/profile",
            },
            {
              icon: Settings,
              label: "Settings",
              path: "/settings",
            },
            {
              icon: LogOut,
              label: "Logout",
              path: "/api/auth/logout",
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.path}
              className="flex items-center gap-4 rounded-2xl px-4 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* USER CARD */}
        <div className="p-4">
          <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-xl">
            <h2 className="text-lg font-semibold">
              {user?.fullName || "User"}
            </h2>
            <p className="text-sm text-blue-100">
              {user?.role || "Student/Staff"}
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT (SAME ADMIN STRUCTURE) */}
      <main className="lg:ml-72">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl p-2 hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-blue-700">
                Dashboard Overview
              </h2>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.fullName || "User"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center rounded-2xl border bg-gray-50 px-4 py-2 md:flex">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search books..."
                className="ml-2 bg-transparent text-sm outline-none"
              />
            </div>

            <button className="relative rounded-xl bg-gray-100 p-3 hover:bg-gray-200">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="flex items-center gap-3 rounded-2xl bg-gray-100 px-3 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {user?.fullName?.charAt(0) || "U"}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.fullName || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role || "Student/Staff"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* STATS */}
        <div className="p-4 sm:p-6 lg:p-8">
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold">
                      {stat.value}
                    </h3>
                  </div>

                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>

                <p className="mt-4 text-sm text-green-600">
                  {stat.growth}
                </p>
              </div>
            ))}
          </section>

          {/* QUICK ACTIONS (USER VERSION OF ADMIN CARDS) */}
          <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold">Browse E-Library</h3>
              <p className="text-sm text-gray-500">
                Access academic resources
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold">Borrow Books</h3>
              <p className="text-sm text-gray-500">
                Request or return books
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold">Library Rules</h3>
              <p className="text-sm text-gray-500">
                Read guidelines & policies
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}