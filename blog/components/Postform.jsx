"use client";
import React, { useState } from "react";

const Postform = () => {
  const API = process.env.NEXT_PUBLIC_API;

  // ✅ single object state
  const [form, setForm] = useState({
    title: "",
    description: "",
    postedBy: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // ✅ handle all text inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ handle file separately
  const handleFileChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Title and Description are required");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("posted_by", form.postedBy);
    data.append("category", form.category);
    if (form.image) data.append("image", form.image);

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

      // ✅ reset form
      setForm({
        title: "",
        description: "",
        postedBy: "",
        category: "",
        image: null,
      });

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
            onChange={handleFileChange}
          />
        </div>

        {/* Title */}
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        {/* Posted By */}
        <div>
          <label>Posted By</label>
          <input
            type="text"
            name="postedBy"
            value={form.postedBy}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        <button
          type="submit"
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