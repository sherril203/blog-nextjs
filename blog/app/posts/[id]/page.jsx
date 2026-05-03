"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from '../../../common/Navbar'
import Footer from '../../../common/Footer'
const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const API = process.env.NEXT_PUBLIC_API ;
useEffect(() => {
  if (!id) return;

  const fetchPost = async () => {
    try {
      console.log("Fetching:", `${API}/getpost/${id}`);

      const res = await fetch(`${API}/getpost/${id}`);

      if (!res.ok) {
        const text = await res.text();
        console.log("ERROR RESPONSE:", text);
        throw new Error("Failed to fetch post");
      }

      const result = await res.json();
      setPost(result.data);

    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  fetchPost();
}, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <Navbar/>
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
    <Footer/>
    </div>
    
  );
};

export default PostPage;