"use client";

import React, { useState, useEffect } from "react";

const Profile = () => {
  const [adminName, setAdminName] = useState("admin");

  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("admin");

      if (storedAdmin) {
        const parsed = JSON.parse(storedAdmin);
        setAdminName(parsed?.username || "Admin");
      }
    } catch (err) {
      console.error("Error reading admin data", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.href = "/login"; // simple redirect
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px] text-center space-y-4">
        <h1 className="text-2xl font-bold">Admin Profile</h1>

        {/* ✅ Always shows something */}
        <p className="text-xl font-semibold">
          {adminName}
        </p>

        <button
          onClick={handleLogout}
          className="w-full p-3 bg-blue-500 text-white font-bold rounded"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Profile;