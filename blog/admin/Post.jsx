"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Post = () => {
  const [posts, setPosts] = useState([]);

  const API = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    if (!API) return;

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API}/getall`);
        const result = await response.json();
        setPosts(result.data || []);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchPosts();
  }, [API]);

  const totalPosts = posts.length;

  const totalCategories = [...new Set(posts.map(p => p.category))].length;

  return (
    <div>
     
      {/* Header */}
      <div className="p-3 flex justify-between items-center">
        
        <p className="font-bold text-xl">Post page</p>

        <Link
          href="/posts/new"
          className="p-2 text-white bg-blue-500 rounded"
        >
          New Post
        </Link>
      </div>
       <div className="flex gap-6 p-3">
        <div className="p-3 border-2 rounded">
          <p className="font-bold text-2xl">No of posts</p>
          <p className="font-bold text-xl">{totalPosts}</p>
        </div>
        <div className="p-3 border-2 rounded">
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