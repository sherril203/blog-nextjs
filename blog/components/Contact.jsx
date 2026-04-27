"use client";
import React, { useState } from "react";

const Contact = () => {
  const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:6000";

  // ✅ separate states (like your reference)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!name || !email || !message) {
      alert("All fields are required");
      return;
    }

    const formData = {
      name: name,
      email: email,
      message: message,
    };

    try {
      const response = await fetch(`${API}/postcontact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");

        // reset form
        setName("");
        setEmail("");
        setMessage("");
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
            className="border w-full p-2 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            className="border w-full p-2 rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Message */}
        <div>
          <label>Message</label>
          <textarea
            className="border w-full p-2 rounded mt-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button className="w-full bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600">
          Submit
        </button>

      </form>
    </div>
  );
};

export default Contact;