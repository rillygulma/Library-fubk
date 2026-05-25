"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "student" | "staff" | "librarian" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= LOGIN =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const user = data.user;

      // ================= ROLE ROUTING =================
      if (user.role === "admin") {
        router.push("/admin-dashboard");
      } else if (user.role === "librarian") {
        router.push("/librarian-dashboard");
      } else if (user.role === "staff") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#003566] to-[#00509d] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-200 text-sm mt-2">
            Login to access the E-Library system
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8"
        >
          <div className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="mt-6 w-full bg-[#003566] hover:bg-[#00264d] transition text-white font-semibold py-3 rounded-2xl shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-[#003566] font-semibold"
            >
              Register
            </a>
          </p>
        </form>
      </div>

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          outline: none;
          transition: 0.2s ease-in-out;
        }

        .input:focus {
          border-color: #003566;
          box-shadow: 0 0 0 3px rgba(0, 53, 102, 0.15);
        }
      `}</style>
    </main>
  );
}