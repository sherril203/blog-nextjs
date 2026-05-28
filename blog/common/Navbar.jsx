"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { CgProfile } from "react-icons/cg";
import { GrHomeRounded } from "react-icons/gr";
import { TiInfoLarge } from "react-icons/ti";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { MdLogin } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="bg-blue-600 text-white text-xl shadow-md">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="font-bold text-3xl">
          Blog
        </Link>


        {!isLoggedIn ? (

          /* Guest Navbar */
          <nav>
            <ul className="flex items-center space-x-8">

              <li>
                <Link
                  href="/"
                  className="hover:text-blue-200 flex items-center gap-1"
                >
                  <GrHomeRounded className="text-2xl" />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-200 flex items-center gap-1"
                >
                  <TiInfoLarge className="text-2xl" />
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/posts"
                  className="hover:text-blue-200 flex items-center gap-1"
                >
                  <MdOutlinePostAdd className="text-2xl" />
                  Posts
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-200 flex items-center gap-1"
                >
                  <MdOutlineContactSupport className="text-2xl" />
                  Contact
                </Link>
              </li>

            </ul>
          </nav>

        ) : (

          /* Logged In Navbar */
          <nav>
            <ul className="flex items-center space-x-8">

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-200 flex items-center gap-1"
                >
                <LuLayoutDashboard className="text-2xl"/>  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/posts"
                  className="hover:text-blue-200 flex items-center gap-1"
                >
                < MdOutlinePostAdd className="text-2xl"/>  Posts
                </Link>
              </li>

            </ul>
          </nav>

        )}

        <div className="relative">

          {!isLoggedIn ? (

            /* Guest Buttons */
            <div className="flex gap-3">

              <Link href="/signup">
                <button className="border-2 border-white rounded-lg px-4 py-2 hover:bg-white hover:text-blue-600 transition">
                  Sign Up
                </button>
              </Link>

              <Link href="/login">
                <button className="border-2 border-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-white hover:text-blue-600 transition">
                  <MdLogin className="text-2xl" />
                  Login
                </button>
              </Link>

            </div>

          ) : (

            /* Hamburger Menu */
            <div>

              <button
                onClick={() => setOpen(!open)}
                className="text-4xl hover:text-blue-200"
              >
                <RxHamburgerMenu/>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-xl shadow-xl overflow-hidden z-50">

                  {/* Profile */}
                  <Link href="/dashboard/profile">
                    <div className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                      <CgProfile className="text-2xl" />
                      <span>Profile</span>
                    </div>
                  </Link>

                  {/* My Posts */}
                  <Link href="/dashboard/myposts">
                    <div className="p-4 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                      <MdOutlinePostAdd className="text-2xl" />
                      <span>My Posts</span>
                    </div>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-4   flex items-center gap-3 hover:bg-gray-100 "
                  >
                    <LuLogOut className="text-2xl" />
                    <span>Logout</span>
                  </button>

                </div>
              )}

            </div>

          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;