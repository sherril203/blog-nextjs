"use client";

import React, { useState, useEffect } from "react";

const Profile = () => {
  const [name, setName] = useState("User");
  const [posts, setPosts] = useState([]);

  // ✅ Get user safely
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setName(parsed?.username || "User");
      }
    } catch (err) {
      console.error("User parse error");
    }
  }, []);

 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/getall`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("API RESPONSE:", data);

      // ✅ FIXED HERE
      const postArray = Array.isArray(data.data) ? data.data : [];

      setPosts(postArray);

    } catch (err) {
      console.error("Fetch error:", err);
      setPosts([]);
    }
  };

  fetchPosts();
}, []);
  // ✅ SAFE calculations (no crash)
  const totalPosts = posts.length;

  const totalCategories = posts.length
    ? [...new Set(posts.map(p => p.category))].length
    : 0;

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      
      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px] space-y-4 text-center">
        <p className="text-xl font-bold">{name}</p>

        <button
          onClick={handleLogout}
          className="p-3 bg-blue-500 text-white font-bold rounded w-full"
        >
          Logout
        </button>
      </div>

      <h2 className="mt-6 text-2xl font-bold">Your Posts</h2>

      <div className="flex gap-6 p-3">
        <div className="p-3 rounded text-center bg-white shadow-lg">
          <p className="font-bold text-2xl">No of posts</p>
          <p className="font-bold text-xl">{totalPosts}</p>
        </div>

        <div className="p-3 rounded text-center bg-white shadow-lg">
          <p className="font-bold text-2xl">No of categories</p>
          <p className="font-bold text-xl">{totalCategories}</p>
        </div>
      </div>

    </div>
  );
};

export default Profile;