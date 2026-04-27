"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const API = process.env.NEXT_PUBLIC_API ;
useEffect(() => {
  if (!id || !API) return; // ✅ important

  const fetchPost = async () => {
    try {
      const res = await fetch(`${API}/post/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }

      const data = await res.json();
      setPost(data.data);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchPost();
}, [id, API]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-5">
        <h1 className="text-3xl font-bold mt-4 p-3 ">{post.title}</h1>
         <p className="mt-4 text-2xl p-3">By: {post.posted_by}</p>
      {post.image && (
        
        <img
          src={`${API}/files/${post.image}`}
          className="object-cover rounded w-full h-full"
        />
      )}
      <p className="mt-2 text-gray-600 text-2xl">{post.description}</p>
     
    </div>
  );
};

export default PostPage;