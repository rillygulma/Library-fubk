"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

type Role =
  | "undergraduate"
  | "postgraduate"
  | "staff"
  | "librarian"
  | "admin";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "undergraduate" as Role,
    gender: "",
    admissionNo: "",
    staffNo: "",
    department: "",
    faculty: "",
    phoneNo: "",
    profilePicture: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        profilePicture: reader.result as string,
      }));

      toast.success("Profile picture selected");
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(data.message || "Account created successfully");

      setForm({
        fullName: "",
        email: "",
        password: "",
        role: "undergraduate",
        gender: "",
        admissionNo: "",
        staffNo: "",
        department: "",
        faculty: "",
        phoneNo: "",
        profilePicture: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#003566] to-[#00509d] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            User Registration
          </h1>
          <p className="text-gray-200 mt-2 text-sm md:text-base">
            Create account for Library Management System
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-6 md:p-10"
        >
          {/* PROFILE */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-[#003566] flex items-center justify-center">
              {form.profilePicture ? (
                <Image
                  src={form.profilePicture}
                  alt="profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500">Upload</span>
              )}
            </div>

            <label className="mt-4 block cursor-pointer text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
              <div className="px-4 py-3 border-2 border-dashed rounded-xl">
                Choose Profile Picture
              </div>
            </label>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input"
              required
            />

            {/* ROLE */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="input"
            >
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="staff">Staff</option>
              <option value="librarian">Librarian</option>
            </select>

            {/* ADMISSION / STAFF */}
            {["undergraduate", "postgraduate"].includes(form.role) ? (
              <input
                name="admissionNo"
                placeholder="Admission Number"
                value={form.admissionNo}
                onChange={handleChange}
                className="input"
              />
            ) : (
              <input
                name="staffNo"
                placeholder="Staff Number"
                value={form.staffNo}
                onChange={handleChange}
                className="input"
              />
            )}

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              className="input"
            />

            <input
              name="faculty"
              placeholder="Faculty"
              value={form.faculty}
              onChange={handleChange}
              className="input"
            />

            <input
              name="phoneNo"
              placeholder="Phone Number"
              value={form.phoneNo}
              onChange={handleChange}
              className="input"
            />
          </div>

          <button
            disabled={loading}
            className="mt-8 w-full bg-[#003566] hover:bg-[#00264d] text-white font-semibold py-3 rounded-2xl"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          outline: none;
        }

        .input:focus {
          border-color: #003566;
          box-shadow: 0 0 0 3px rgba(0, 53, 102, 0.15);
        }
      `}</style>
    </main>
  );
}