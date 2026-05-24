"use client";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Activity,
  Eye,
  Pencil,
  Trash2,
  Megaphone,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const stats = [
  {
    title: "Total Users",
    value: "12,540",
    icon: Users,
    growth: "+12% this month",
  },
  {
    title: "Books Borrowed",
    value: "3,420",
    icon: BookOpen,
    growth: "+8% this week",
  },
  {
    title: "Blog Posts",
    value: "124",
    icon: FileText,
    growth: "+4 new posts",
  },
  {
    title: "Active Sessions",
    value: "1,240",
    icon: Activity,
    growth: "+18% today",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ================= USERS FROM API =================
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/fubk-logo.jpg"
              alt="FUBK Logo"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />

            <div>
              <h1 className="text-2xl font-bold text-blue-700">
                FUBK Admin
              </h1>
              <p className="text-sm text-gray-500">
                Management Dashboard
              </p>
            </div>
          </div>

          <button
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto space-y-2 p-4">
          {[
            {
              icon: LayoutDashboard,
              label: "Dashboard",
              path: "/admin/dashboard",
            },
            { icon: Users, label: "Users", path: "/register" },
            {
              icon: Megaphone,
              label: "Announcements",
              path: "/admin/announcements",
            },
            { icon: FileText, label: "Blog Posts", path: "/admin/blog" },
            { icon: Settings, label: "Settings", path: "" },
            { icon: LogOut, label: "Logout", path: "/api/authlogout" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-300 ${
                index === 0
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Card */}
        <div className="p-4">
          <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-xl">
            <h2 className="text-lg font-semibold">Need Help?</h2>
            <p className="mt-2 text-sm text-blue-100">
              Contact the ICT department for technical assistance.
            </p>

            <button className="mt-4 w-full rounded-xl bg-white py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl p-2 hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-blue-700 sm:text-2xl">
                Dashboard Overview
              </h2>
              <p className="text-sm text-gray-500">
                Welcome back, Administrator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center rounded-2xl border bg-gray-50 px-4 py-2 md:flex">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent text-sm outline-none"
              />
            </div>

            <button className="relative rounded-xl bg-gray-100 p-3 hover:bg-gray-200">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="flex items-center gap-3 rounded-2xl bg-gray-100 px-3 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {users?.[0]?.fullName?.charAt(0) || "A"}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {users?.[0]?.fullName || "Admin"}
                </p>
                <p className="text-xs text-gray-500">
                  {users?.[0]?.role || "System User"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-gray-800">
                      {stat.value}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-blue-100 p-4 text-blue-700">
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>

                <p className="mt-5 text-sm font-medium text-green-600">
                  {stat.growth}
                </p>
              </div>
            ))}
          </section>

          {/* USERS TABLE (UPDATED ONLY DATA SOURCE) */}
          <section className="mt-8 rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Users
                </h2>
                <p className="text-sm text-gray-500">
                  Manage recently registered users
                </p>
              </div>

              <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                Add New User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-4 text-sm font-semibold text-gray-500">
                      User
                    </th>
                    <th className="pb-4 text-sm font-semibold text-gray-500">
                      Role
                    </th>
                    <th className="pb-4 text-sm font-semibold text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b last:border-none hover:bg-gray-50"
                    >
                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                            {user.fullName?.charAt(0)}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {user.fullName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-5 text-gray-700">
                        {user.role}
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <button className="rounded-xl bg-blue-100 p-3 text-blue-700">
                            <Eye className="h-4 w-4" />
                          </button>

                          <button className="rounded-xl bg-green-100 p-3 text-green-700">
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button className="rounded-xl bg-red-100 p-3 text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}