"use client";
import React, { useState } from "react";

const Contact = () => {
  const API = process.env.NEXT_PUBLIC_API_URL ;

  // ✅ single object state
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ handle all inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!form.name || !form.email || !form.message) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch(`${API}/postcontact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // ✅ send full form
      });

      const result = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");

        // ✅ reset form
        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert("Submission failed: " + result.message);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Server connection error");
    }
  };

  return (
    <div className="flex justify-center items-center p-10 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-[400px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Contact Form</h2>

        {/* Name */}
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        {/* Message */}
        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;