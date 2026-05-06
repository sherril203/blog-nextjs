"use client";

import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [name, setName] = useState("User");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setName(parsed?.username || "User");
      }
    } catch (err) {
      console.error(err);
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
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Top Section - FULL WIDTH */}
      <div className="grid md:grid-cols-2 gap-6 w-full">

        {/* Profile */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Profile</h2>
          <p className="text-xl font-semibold">{name}</p>

          <button
            onClick={handleLogout}
            className="mt-4 w-full p-3 bg-blue-500 text-white font-bold rounded"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Stats</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded p-4 text-center">
              <p>Posts</p>
              <p className="text-2xl font-bold">{totalPosts}</p>
            </div>

            <div className="bg-gray-100 rounded p-4 text-center">
              <p>Categories</p>
              <p className="text-2xl font-bold">{totalCategories}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts - FULL WIDTH */}
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Posts</h2>

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
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default UserProfile;