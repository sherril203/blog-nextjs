"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const Form = () => {
  const API = process.env.NEXT_PUBLIC_API;
  const { id } = useParams(); // ✅ get id
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    postedBy: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null); // ✅ image preview
  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!id) return;

  const fetchPost = async () => {
    try {
      const res = await fetch(`${API}/getpost/${id}`, {
        cache: "no-store", 
      });

      if (!res.ok) throw new Error("Failed to fetch post");

      const result = await res.json();
      const data = result.data;

      setForm({
        title: data.title || "",
        description: data.description || "",
        postedBy: data.posted_by || "",
        category: data.category || "",
        image: null,
      });

      if (data.image) {
        setPreview(`${API}/files/${data.image}`);
      }

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchPost();
}, [id]);   // ✅ ONLY id

  // ✅ handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ handle file
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setForm({
      ...form,
      image: file,
    });

    // preview
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ submit (create OR update)
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

      const url = id
        ? `${API}/updatepost/${id}` // ✅ UPDATE
        : `${API}/post`;           // ✅ CREATE

      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Operation failed");
      }

      alert(id ? "Post updated!" : "Post created!");

      router.push("/admin/posts"); 

    } catch (err) {
      console.error(err);
      alert(err.message || "Error");
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
        <h2 className="text-xl font-bold text-center">
          {id ? "Edit Post" : "New Post"}
        </h2>

        {/* Image preview */}
        {preview && (
          <img
            src={preview}
            className="w-full h-40 object-cover rounded"
          />
        )}

        {/* Image */}
        <input type="file" onChange={handleFileChange} />

        {/* Title */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border w-full p-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border w-full p-2 rounded"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border w-full p-2 rounded"
        />

        {/* Posted By */}
        <input
          type="text"
          name="postedBy"
          value={form.postedBy}
          onChange={handleChange}
          placeholder="Posted By"
          className="border w-full p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading
            ? id
              ? "Updating..."
              : "Posting..."
            : id
            ? "Update Post"
            : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default Form;