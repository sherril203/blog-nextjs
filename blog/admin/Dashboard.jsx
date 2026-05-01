"use client"
import React from 'react'
import {useState,useEffect} from "react"
import Link from "next/link"
const Dashboard = () => {
const [posts, setPosts] = useState([]);

  const API = process.env.NEXT_PUBLIC_API;
  console.log("API:", API);
  useEffect(() => {
    if (!API) return;

    const fetchPosts = async () => {
      try {
        console.log("API:", API);

        const response = await fetch(`${API}/getall`);

        const result = await response.json();
        setPosts(result.data);

      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchPosts();
  }, [API]);

  return (
    <div>
       <p className="text-2xl font-bold p-3">Admin Dashboard</p>

      <p className="p-3 font-bold text-2xl">blogs posts</p>

      <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="border p-3 rounded shadow">

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
              <h2 className="text-xl font-bold mt-2"> {post.category}</h2>
              <p className="text-xl mt-2">{post.posted_by}</p>

            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard
