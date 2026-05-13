"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

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
    <div className="bg-blue-600 text-white text-xl">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">

        <Link href="/" className="font-bold text-2xl">
          Blog
        </Link>

        <nav>
          <ul className="flex space-x-8">
            <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-200">About</Link></li>
            <li><Link href="/posts" className="hover:text-blue-200">Posts</Link></li>
            <li><Link href="/contact" className="hover:text-blue-200">Contact</Link></li>
          </ul>
        </nav>

        <div className="relative">

          {!isLoggedIn ? (
            <div className="flex gap-2">
              <Link href="/signup">
                <button className="border-2 rounded p-3">Sign Up</button>
              </Link>
              <Link href="/login">
                <button className="border-2 rounded p-3">Login</button>
              </Link>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setOpen(!open)}
                className="text-3xl"
              >
                ☰
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                  <Link href="/dashboard/profile">
                    <p className="p-3 hover:bg-gray-200 cursor-pointer">
                      Profile
                    </p>
                  </Link>

                  <p
                    onClick={handleLogout}
                    className="p-3 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </p>
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