"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const API = process.env.NEXT_PUBLIC_API;
  const router = useRouter();

  // ✅ form state
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ✅ admin toggle
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);

  // ✅ handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      // ✅ choose correct endpoint
      const endpoint = isAdmin ? "/adminlogin" : "/userlogin";

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      // ✅ success
      alert(`${isAdmin ? "Admin" : "User"} login successful!`);

      // store token
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      // redirect
      router.push(isAdmin ? "/admin" : "/");

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

        {/* ✅ Admin toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          />
          <label>Login as Admin</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          New Account? <Link href="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;