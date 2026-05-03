"use client";

import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const API = process.env.NEXT_PUBLIC_API;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

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

      // ✅ FIXED PART
      const token = result?.data?.token;
      const userData = result?.data?.user;

      if (!token) {
        throw new Error("Token not received from server");
      }

      // ✅ store token
      localStorage.setItem("token", token);

      // ✅ store user/admin
      if (isAdmin) {
        localStorage.setItem("admin", JSON.stringify(userData));
      } else {
        localStorage.setItem("user", JSON.stringify(userData));
      }

      alert(`${isAdmin ? "Admin" : "User"} login successful!`);

      // ✅ FORCE reload so Navbar updates
      window.location.href = isAdmin ? "/admin" : "/dashboard";

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