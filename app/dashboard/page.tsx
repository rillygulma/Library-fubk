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
  TrendingUp,
  DollarSign,
  Activity,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  Megaphone,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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

const recentUsers = [
  {
    id: 1,
    name: "Amina Yusuf",
    email: "amina@example.com",
    role: "Student",
    status: "Active",
  },
  {
    id: 2,
    name: "Sani Ibrahim",
    email: "sani@example.com",
    role: "Lecturer",
    status: "Pending",
  },
  {
    id: 3,
    name: "Fatima Bello",
    email: "fatima@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 4,
    name: "Usman Garba",
    email: "usman@example.com",
    role: "Student",
    status: "Inactive",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        {/* Top */}
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
              <h1 className="text-2xl font-bold text-blue-700">FUBK Admin</h1>
              <p className="text-sm text-gray-500">Management Dashboard</p>
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
            { icon: Users, label: "Users", path: "/admin/users" },
            {
              icon: Megaphone,
              label: "Announcements",
              path: "/admin/announcements",
            },
            { icon: FileText, label: "Blog Posts", path: "/admin/blog" },
            { icon: TrendingUp, label: "Analytics", path: "/admin/analytics" },
            { icon: Settings, label: "Settings", path: "/admin/settings" },
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
                RI
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Rilwanu Idris
                </p>
                <p className="text-xs text-gray-500">System Analyst</p>
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

          {/* Analytics Cards */}
          <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white shadow-xl xl:col-span-2">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-blue-100">Monthly Revenue</p>
                  <h2 className="mt-2 text-4xl font-bold">₦4,250,000</h2>
                  <p className="mt-4 max-w-lg text-blue-100">
                    Your library and management system performance increased by
                    18% this month compared to previous records.
                  </p>
                </div>

                <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-lg">
                  <DollarSign className="h-14 w-14" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">New Registrations</p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-800">248</h3>
                </div>

                <div className="rounded-2xl bg-green-100 p-4 text-green-700">
                  <UserPlus className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-500">Students</span>
                    <span className="font-semibold">80%</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-200">
                    <div className="h-3 w-[80%] rounded-full bg-blue-600"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-500">Staff</span>
                    <span className="font-semibold">60%</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-200">
                    <div className="h-3 w-[60%] rounded-full bg-green-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Users Table */}
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
                      Status
                    </th>
                    <th className="pb-4 text-sm font-semibold text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b last:border-none hover:bg-gray-50"
                    >
                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                            {user.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-5 text-gray-700">{user.role}</td>

                      <td className="py-5">
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-semibold ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : user.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <button className="rounded-xl bg-blue-100 p-3 text-blue-700 transition hover:bg-blue-200">
                            <Eye className="h-4 w-4" />
                          </button>

                          <button className="rounded-xl bg-green-100 p-3 text-green-700 transition hover:bg-green-200">
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button className="rounded-xl bg-red-100 p-3 text-red-700 transition hover:bg-red-200">
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
