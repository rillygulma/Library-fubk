"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type Staff = {
  id: number;
  imgSrc: string;
  name: string;
  position: string;
  bio: string;
};

const staffs: Staff[] = [
  {
    id: 1,
    imgSrc: "/images/UL.jpg",
    name: "Prof. Ahmad Abdu Balarabe CLN, FNLA",
    position: "The University Librarian",
    bio: "Prof. Ahmad Balarabe is a Professor of Library and Information Science at Usmanu Danfodiyo University, Sokoto (UDUS). He was born on 17th March, 1958, and is married with children. He served as Acting University Librarian and later substantive University Librarian of UDUS from 1998 to 2017.",
  },
  {
    id: 2,
    imgSrc: "/images/aliero.jpg",
    name: "Dr. Salisu Adamu Aliero",
    position: "Faculty Education Librarian",
    bio: "Responsible for registration of library users, book lending, retrieval, clearance, and maintaining orderliness within the Library.",
  },
  {
    id: 3,
    imgSrc: "/images/Hajiya.jpg",
    name: "Hajiya Hadiza Bande",
    position: "Law Librarian",
    bio: "Responsible for registration of library users, book lending, retrieval, clearance, and maintaining orderliness within the Library.",
  },
  {
    id: 4,
    imgSrc: "/images/Musa Kaystal.jpg",
    name: "Musa Bako Katsayal",
    position: "Reader Services Librarian",
    bio: "Responsible for registration of library users, book lending, retrieval, clearance, and maintaining orderliness within the Library.",
  },
  {
    id: 5,
    imgSrc: "/images/zubairu.jpeg",
    name: "Umar Zabairu Zauro",
    position: "Head Of Take-OFF And COHS Medical Library",
    bio: "Responsible for overseeing the administration and development of both the Take-OFF Library and COHS Medical Library.",
  },
  {
    id: 6,
    imgSrc: "/images/Mubarak.jpg",
    name: "Mubarak Aliyu",
    position: "ICT Librarian",
    bio: "Handles electronic resources, databases, digitization, institutional repository, and E-Library services.",
  },
  {
    id: 7,
    imgSrc: "/images/Hassan.jpeg",
    name: "Hassan Idris",
    position: "Collection Development Librarian",
    bio: "Responsible for acquisition of books and other learning materials needed for teaching and research.",
  },
  {
    id: 8,
    imgSrc: "/images/Abdulkarim.png",
    name: "Yahaya Abdulkareem",
    position: "Processing Librarian",
    bio: "Responsible for cataloguing, classification, and maintenance of the Open Public Access Catalogue (OPAC).",
  },
  {
    id: 9,
    imgSrc: "/images/usman.jpeg",
    name: "Usman Ibrahim",
    position: "Head of Research & Bibliography/Document and Africana",
    bio: "Responsible for research support services, bibliographic tools, and Africana collections.",
  },
  {
    id: 10,
    imgSrc: "/images/Rilly.jpeg",
    name: "Rilwanu Idris",
    position: "System Analyst",
    bio: "Responsible for managing and maintaining the Library digital systems and technical infrastructure.",
  },
];

const StaffPage = () => {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  return (
    <div className="min-h-screen px-3 py-10 sm:px-6 lg:px-24">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 sm:text-4xl md:text-5xl">
          Library Staff Directory
        </h1>

        <p className="mx-auto mt-4 max-w-3xl px-2 text-sm leading-7 text-gray-600 sm:text-base md:text-lg">
          Meet the dedicated professionals managing the Federal University
          Birnin Kebbi Library Complex.
        </p>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {staffs.map((staff) => (
          <div
            key={staff.id}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Image */}
            <div className="relative w-full overflow-hidden bg-gray-200">
              <Image
                src={staff.imgSrc}
                alt={staff.name}
                width={500}
                height={500}
                className="h-auto w-full object-contain sm:object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex h-[230px] flex-col items-center p-5 text-center">
              <h2 className="line-clamp-2 min-h-[60px] text-lg font-bold text-gray-800 sm:text-xl">
                {staff.name}
              </h2>

              <p className="mt-2 min-h-[50px] text-sm font-medium italic text-blue-600">
                {staff.position}
              </p>

              <div className="mt-auto w-full">
                <button
                  onClick={() => setSelectedStaff(staff)}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-blue-700 active:scale-95"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5">
          <div className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedStaff(null)}
              className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 transition hover:bg-red-100"
            >
              <X className="h-5 w-5 text-red-500" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center">
              {/* Image */}
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-blue-500 shadow-lg sm:h-40 sm:w-40">
                <Image
                  src={selectedStaff.imgSrc}
                  alt={selectedStaff.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              {/* Name */}
              <h2 className="mt-5 text-2xl font-bold text-gray-800 sm:text-3xl">
                {selectedStaff.name}
              </h2>

              {/* Position */}
              <p className="mt-2 text-sm font-semibold italic text-blue-600 sm:text-lg">
                {selectedStaff.position}
              </p>

              {/* Bio */}
              <div className="mt-6 text-left text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
                {selectedStaff.bio}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedStaff(null)}
                className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPage;
