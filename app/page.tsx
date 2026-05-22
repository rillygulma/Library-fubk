"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTypewriter } from "react-simple-typewriter";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/effect-cards";
import Footer from "@/components/Footer";

type Announcement = {
  title: string;
  message: string;
  createdBy?: string;
};

type NavItem = {
  link: string;
  path: string;
  submenu?: {
    sublink: string;
    subpath: string;
  }[];
};

const HomePage = () => {
  const [text] = useTypewriter({
    words: [
      "Welcome to 👋",
      "Federal University Birnin Kebbi",
      "Library Complex",
    ],
    loop: true,
    typeSpeed: 20,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch("/api/announcements");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setAnnouncement(data[0]);
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Failed to fetch announcement:", error);
      }
    };

    fetchAnnouncement();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const closeMenus = () => {
    setOpenSubmenu(null);
    setIsMenuOpen(false);
  };

  const navItems: NavItem[] = [
    {
      link: "About the Library⬇️",
      path: "/about",
      submenu: [
        {
          sublink: "Welcome Note by UL",
          subpath: "/welcomeNote",
        },
        {
          sublink: "History",
          subpath: "/history",
        },
        {
          sublink: "Mission & Vision",
          subpath: "/mission-vision",
        },
        {
          sublink: "Facilities",
          subpath: "/facilities",
        },
        {
          sublink: "Contact Us",
          subpath: "/contact-us",
        },
      ],
    },
    {
      link: "Resources⬇️",
      path: "",
      submenu: [
        {
          sublink: "Fubk AI I Know Everything",
          subpath: "/fubkAiChat",
        },
        {
          sublink: "TERAS",
          subpath: "https://teras.ng/",
        },
        {
          sublink: "Subscription Database",
          subpath: "/subscription-database",
        },
        {
          sublink: "Free Resources",
          subpath: "/free-resources",
        },
      ],
    },
    {
      link: "SECTIONS & UNITS",
      path: "/staff",
    },
    {
      link: "Branches",
      path: "/branches",
    },
    {
      link: "Services & Operations",
      path: "/services",
    },
    {
      link: "Help⬇️",
      path: "",
      submenu: [
        {
          sublink: "Fubk AI Librarian",
          subpath: "/fubkChatBot",
        },
        {
          sublink: "Rules & Regulation",
          subpath: "/help",
        },
      ],
    },
    {
      link: "Library Membership",
      path: "/library-Membership",
    },
    {
      link: "News & Events",
      path: "/events",
    },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300">
        <nav className={`py-4 px-5 ${isSticky ? "bg-blue-300" : ""}`}>
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-sky-600">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="/images/fubk-logo.jpg"
                  alt="FUBK Logo"
                  width={60}
                  height={60}
                  className="rounded ml-2"
                />

                <span className="hidden text-sm font-bold leading-6 text-white md:block lg:text-lg">
                  FEDERAL UNIVERSITY BIRNIN KEBBI
                  <br />
                  LIBRARY COMPLEX
                </span>
              </Link>

              {/* Desktop Nav */}
              <ul className="hidden items-center space-x-6 md:flex">
                {navItems.map(({ link, path, submenu }) => (
                  <li key={link} className="relative">
                    {submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(link)}
                          className="text-sm uppercase text-white transition hover:text-black"
                        >
                          {link}
                        </button>

                        {openSubmenu === link && (
                          <ul className="absolute left-0 top-full mt-3 w-64 rounded-lg bg-blue-500 p-3 shadow-xl">
                            {submenu.map(({ sublink, subpath }) => (
                              <li key={sublink} className="mb-2">
                                <Link
                                  href={subpath}
                                  onClick={closeMenus}
                                  className="block rounded-md px-3 py-2 text-sm uppercase text-white transition hover:bg-blue-400 hover:text-black"
                                >
                                  {sublink}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={path}
                        className="text-sm uppercase text-white transition hover:text-black"
                      >
                        {link}
                      </Link>
                    )}
                  </li>
                ))}

                <Link
                  href="/admin/dashboard"
                  className="rounded-lg bg-white mr-2 px-4 py-2 text-sm font-semibold uppercase text-blue-700 transition hover:bg-black hover:text-white"
                >
                  Login
                </Link>
              </ul>

              {/* Mobile Toggle */}
              <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white">
                  {isMenuOpen ? (
                    <FaXmark className="h-6 w-6" />
                  ) : (
                    <FaBarsStaggered className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mt-4 rounded-xl bg-blue-500 p-5 md:hidden">
              <div className="space-y-4">
                {navItems.map(({ link, path, submenu }) => (
                  <div key={link}>
                    {submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(link)}
                          className="block text-left text-sm uppercase text-white"
                        >
                          {link}
                        </button>

                        {openSubmenu === link && (
                          <ul className="ml-4 mt-3 space-y-2">
                            {submenu.map(({ sublink, subpath }) => (
                              <li key={sublink}>
                                <Link
                                  href={subpath}
                                  onClick={closeMenus}
                                  className="block text-sm uppercase text-white"
                                >
                                  {sublink}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={path}
                        onClick={closeMenus}
                        className="block text-sm uppercase text-white"
                      >
                        {link}
                      </Link>
                    )}
                  </div>
                ))}

                <Link
                  href="/admin/dashboard"
                  className="inline-block rounded-lg bg-white px-4 py-2 font-semibold text-blue-700"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-teal-100 px-4 sm:px-6 lg:px-24">
        {/* Popup */}
        {showPopup && announcement && (
          <div className="absolute left-1/2 top-28 z-50 w-full max-w-md -translate-x-1/2 rounded-xl border border-blue-300 bg-white p-5 shadow-2xl">
            <h3 className="mb-3 text-lg font-bold text-blue-600">
              📢 {announcement.title}
            </h3>

            <p className="mb-3 text-gray-700">{announcement.message}</p>

            <p className="text-right text-sm italic text-gray-500">
              - {announcement.createdBy || "University Librarian"}
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        )}

        <div className="flex w-full flex-col items-center justify-between gap-16 py-32 md:flex-row">
          {/* Left */}
          <div className="space-y-8 md:w-1/2">
            <h1 className="text-4xl font-bold uppercase leading-tight text-blue-600 md:text-5xl">
              {text}
            </h1>

            <p className="text-lg leading-8 text-gray-700 md:w-4/5">
              Federal University Birnin Kebbi Library was established in 2013 to
              support the University in achieving its goals of teaching,
              learning, and research.
            </p>

            <Link href="/welcomeNote">
              <button className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">
                Read the University Librarian Welcome Note
              </button>
            </Link>

            
          </div>

          {/* Right */}
          <div className="flex flex-col items-center">
            <div className="w-[300px]">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {[
                  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
                  "https://images.unsplash.com/photo-1512820790803-83ca734da794",
                  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
                  "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
                  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
                  "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
                ].map((img, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={img}
                      alt="Book"
                      className="h-full w-full rounded-2xl object-cover"
                      fill
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <h2 className="mt-6 text-center text-lg font-bold text-blue-700">
              Swipe for More Books ➡️ ⬅️
            </h2>
          </div>
        </div>

        {/* Swiper Styling */}
        <style jsx global>{`
          .mySwiper {
            width: 300px;
            height: 400px;
          }

          .swiper-slide {
            border-radius: 20px;
            overflow: hidden;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
