"use client";
import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const API = process.env.NEXT_PUBLIC_API;

  // ✅ single object state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ handle all inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // ✅ send full form
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "login failed");
      }

      alert("login successful!");

    } catch (err) {
      console.error("ERROR:", err);
      alert(err.message || "Error login");
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
        <h2 className="text-xl font-bold text-center">Login</h2>

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

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "logining..." : "Login"}
        </button>
        <p >
        New Account? <Link href="/signup">Sign Up</Link>
      </p>
      </form>

      
    </div>
  );
};

export default Login;