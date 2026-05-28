"use client";

import React, { useState } from "react";
import Link from "next/link";

import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

const Nav = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    window.location.href = "/login";
  };

  return (
    <div className="bg-blue-600 text-white text-xl">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">

        {/* Logo */}
        <Link href="/admin" className="font-bold text-2xl">
          admin
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/admin/dashboard"
                className="hover:text-blue-200 flex items-center gap-1"
              >
              <LuLayoutDashboard className="text-2xl"/>  DashBoard
              </Link>
            </li>

            <li>
              <Link
                href="/admin/posts"
                className="hover:text-blue-200 flex items-center "
              >
              <MdOutlinePostAdd className="text-2xl"/>  Posts
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="hover:text-blue-200 flex items-center "
              >
              <MdOutlineContactSupport className="text-2xl" />  Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-3xl"
          >
            <RxHamburgerMenu className="font-bold" />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-4 w-56 bg-white text-black rounded-xl shadow-xl overflow-hidden z-50">

              <Link
                href="/admin/profile"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <CgProfile className="text-2xl" />
                <span>Profile</span>
              </Link>

  
              <Link
                href="/admin/posts"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <MdOutlinePostAdd className="text-2xl" />
                <span>Posts</span>
              </Link>


              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 "
              >
                <LuLogOut className="text-2xl" />
                <span>Logout</span>
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;