"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
const SignUp = () => {
  const API = process.env.NEXT_PUBLIC_API;

  // ✅ single object state
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false);
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

  if (!form.username || !form.email || !form.password) {
    alert("All fields are required");
    return;
  }

  try {
    setLoading(true);

    // ✅ choose correct API
    const endpoint = isAdmin ? "/adminRegister" : "/userRegister";

    const res = await fetch(`${API}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Signup failed");
    }

    alert(`${isAdmin ? "Admin" : "User"} signup successful!`);

    // ✅ redirect
    router.push("/login");

  } catch (err) {
    console.error("ERROR:", err);
    alert(err.message || "Error signing up");
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
        <h2 className="text-xl font-bold text-center">Sign Up</h2>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <label>Register as Admin</label>
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p >
          Already Registered? <Link href="/login">Login</Link>
        </p>
      </form>


    </div>
  );
};

export default SignUp;