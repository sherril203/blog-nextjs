"use client";

import React, { useState, useEffect } from "react";

const AdminProfile = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [posts, setPosts] = useState([]);

  // ✅ Get admin
  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) {
        const parsed = JSON.parse(storedAdmin);
        setAdminName(parsed?.username || "Admin");
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ✅ Fetch posts
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
        const postArray = Array.isArray(data.data) ? data.data : [];

        setPosts(postArray);
      } catch (err) {
        console.error(err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const totalPosts = posts.length;
  const totalCategories = posts.length
    ? [...new Set(posts.map((p) => p.category))].length
    : 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Top Section - FULL WIDTH */}
      <div className="grid md:grid-cols-2 gap-6 w-full">

        {/* Admin Info */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Admin Profile</h2>
          <p className="text-xl font-semibold">{adminName}</p>

          <button
            onClick={handleLogout}
            className="mt-4 w-full p-3 bg-blue-500 text-white font-bold rounded"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Platform Stats
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded p-4 text-center">
              <p>Total Posts</p>
              <p className="text-2xl font-bold">{totalPosts}</p>
            </div>

            <div className="bg-gray-100 rounded p-4 text-center">
              <p>Total Categories</p>
              <p className="text-2xl font-bold">{totalCategories}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts - FULL WIDTH */}
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>

        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow rounded p-4 hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.category}</p>
                <p className="text-sm mt-2">By: {post.posted_by}</p>

                {/* Optional actions */}
                <div className="flex gap-2 mt-3">
                  <button className="bg-yellow-400 px-2 py-1 rounded text-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminProfile;