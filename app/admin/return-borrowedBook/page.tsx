"use client";

import { useState } from "react";
import { Search, BookCheck, AlertCircle } from "lucide-react";

interface Borrow {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  status: string;
  dueDate: string;
  isReturned: boolean;
  user: {
    fullName: string;
    email: string;
  };
}

export default function ReturnBookPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [borrow, setBorrow] = useState<Borrow | null>(null);
  const [returning, setReturning] = useState(false);

  // ================= SEARCH BORROW =================
  const searchBorrow = async () => {
    if (!query.trim()) return alert("Enter book ISBN or user email");

    try {
      setLoading(true);
      setBorrow(null);

      const res = await fetch(
        `/api/borrow-request/search?query=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Not found");
        return;
      }

      setBorrow(data.borrow);
    } catch (error) {
      console.error(error);
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= RETURN BOOK =================
  const handleReturn = async () => {
    if (!borrow?._id) return;

    try {
      setReturning(true);

      const res = await fetch(
        `/api/borrow-request/return/${borrow._id}`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert(
        `Book returned successfully. Fine: ₦${data.fine || 0}`
      );

      setBorrow(null);
      setQuery("");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to return book"
      );
    } finally {
      setReturning(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Return Book
          </h1>
          <p className="text-gray-500">
            Search borrowed book and process return
          </p>
        </div>

        {/* SEARCH */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="flex gap-3">
            <input
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Search by ISBN or user email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              onClick={searchBorrow}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 text-white"
            >
              {loading ? "Searching..." : <Search />}
            </button>
          </div>
        </div>

        {/* RESULT */}
        {borrow && (
          <div className="mt-6 rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {borrow.title}
                </h2>
                <p className="text-gray-500">
                  {borrow.author}
                </p>
                <p className="text-sm text-gray-400">
                  ISBN: {borrow.isbn}
                </p>
              </div>

              {borrow.isReturned ? (
                <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                  Returned
                </span>
              ) : (
                <span className="rounded-full bg-yellow-100 px-4 py-2 text-yellow-700">
                  Not Returned
                </span>
              )}
            </div>

            <div className="mt-4 border-t pt-4 text-sm text-gray-600">
              <p>
                Borrowed by: <b>{borrow.user.fullName}</b>
              </p>
              <p>Email: {borrow.user.email}</p>
              <p>Due Date: {new Date(borrow.dueDate).toDateString()}</p>
            </div>

            {!borrow.isReturned && (
              <button
                onClick={handleReturn}
                disabled={returning}
                className="mt-5 flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white"
              >
                <BookCheck size={18} />
                {returning ? "Processing..." : "Mark as Returned"}
              </button>
            )}

            {borrow.isReturned && (
              <div className="mt-4 flex items-center gap-2 text-green-600">
                <AlertCircle size={18} />
                Already returned
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}