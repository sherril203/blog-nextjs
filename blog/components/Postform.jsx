"use client";
import React, { useState } from "react";

const Postform = () => {
  const API = process.env.NEXT_PUBLIC_API ;

  // ✅ separate states (like RecordForm)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and Description are required");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("posted_by", postedBy);
    data.append("category", category);
    if (image) data.append("image", image);

    try {
      setLoading(true);

      const res = await fetch(`${API}/post`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create post");
      }

      alert("Post created successfully!");

      // ✅ reset
      setTitle("");
      setDescription("");
      setPostedBy("");
      setCategory("");
      setImage(null);

    } catch (err) {
      console.error("ERROR:", err);
      alert(err.message || "Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-[400px] space-y-4"
      >

        <h2 className="text-xl font-bold text-center">New Post</h2>

        {/* Image */}
        <div>
          <label>Image</label>
          <input
            type="file"
            className="border w-full p-2 rounded mt-1"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Title */}
        <div>
          <label>Title</label>
          <input
            type="text"
            className="border w-full p-2 rounded mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            className="border w-full p-2 rounded mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <input
            type="text"
            className="border w-full p-2 rounded mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Posted By */}
        <div>
          <label>Posted By</label>
          <input
            type="text"
            className="border w-full p-2 rounded mt-1"
            value={postedBy}
            onChange={(e) => setPostedBy(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Create Post"}
        </button>

      </form>
    </div>
  );
};

export default Postform;