"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
const Post = () => {
  const [posts, setPosts] = useState([]);
  const API = process.env.NEXT_PUBLIC_API ;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API}/getall`);

        if (!res.ok) throw new Error("Failed to fetch posts");

        const result = await res.json();
        setPosts(result.data || []);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchPosts();
  }, [API]);

  const totalPosts = posts.length;
  const totalCategories = [...new Set(posts.map(p => p.category))].length;


  const handleDelete = async (id) => {
    const confirmDelete = confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/deletepost/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Delete failed");
      }

  
      setPosts((prev) => prev.filter((p) => p._id !== id));

      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || "Error deleting post");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="p-3 flex justify-between items-center">
        <p className="font-bold text-xl">Post page</p>
      </div>

      {/* Stats */}
      <div className="flex gap-6 p-3">
        <div className="p-3 bg-white shadow-lg rounded">
          <p className="font-bold text-2xl">No of posts</p>
          <p className="font-bold text-xl">{totalPosts}</p>
        </div>
        <div className="p-3  bg-white shadow-lg rounded">
          <p className="font-bold text-2xl">No of categories</p>
          <p className="font-bold text-xl">{totalCategories}</p>
        </div>
      </div>

      <p className="p-3 font-bold text-2xl">Latest blog posts</p>

      {/* Posts Grid */}
      <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="border p-3 rounded shadow">

              {post.image && (
                <img
                  src={`${API}/files/${post.image}`}
                  alt="post"
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <Link href={`/posts/${post._id}`}>
                <h2 className="font-bold text-2xl mt-2 cursor-pointer text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </Link>

              <h2 className="text-xl font-bold mt-2">{post.category}</h2>
              <p className="text-xl mt-2">{post.posted_by}</p>

              {/* ✅ ACTION BUTTONS */}
              <div className="flex justify-between mt-4">

                <Link
                  href={`/admin/posts/edit/${post._id}`}  // ✅ correct admin route
                  className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-2 text-l"
                >
                <MdOutlineEdit className="text-l"/>  Edit
                </Link>


                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-l flex items-center gap-2"
                >
                <FaRegTrashCan className="text-l"/>  Delete
                </button>

              </div>

            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Post;