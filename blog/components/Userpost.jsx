"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlinePostAdd } from "react-icons/md";
const Userpost = () => {
  const [posts, setPosts] = useState([]);

  const API = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    if (!API) return;

    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const storedUser = localStorage.getItem("user");

        const parsedUser = JSON.parse(storedUser);

        const username = parsedUser?.username;

        const response = await fetch(`${API}/getall`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        const postArray = Array.isArray(result.data)
          ? result.data
          : [];

        // ✅ filter only logged-in user's posts
        const matchedPosts = postArray.filter(
          (post) =>
            post.posted_by?.toLowerCase() ===
            username?.toLowerCase()
        );

        setPosts(matchedPosts);

      } catch (error) {
        console.error("Error fetching records:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [API]);

  return (
    <div>

      <div className="p-3 flex justify-between items-center">
        <p className="font-bold text-2xl p-2">
          My Post
        </p>

        <Link
          href="/posts/new"
          className="p-2 text-white bg-blue-500 rounded flex items-center gap-2"
        >
        <MdOutlinePostAdd className="text-2xl"/>  New Post
        </Link>
      </div>

      <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-4">

        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="border p-3 rounded shadow"
            >

              {post.image && (
                <img
                  src={`${API}/files/${post.image}`}
                  alt="post"
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <Link href={`/dashboard/myposts/${post._id}`}>
                <h2 className="font-bold text-2xl mt-2 cursor-pointer text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </Link>

              <h2 className="text-xl font-bold mt-2">
                {post.category}
              </h2>

              <p className="text-xl mt-2">
                {post.posted_by}
              </p>

            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}

      </div>
    </div>
  );
};

export default Userpost;