"use client";

import React, { useState } from "react";
import Link from "next/link";

// ✅ Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    // ✅ validation toast
    if (!form.email || !form.password) {
      toast.error("All fields are required");
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

      // ✅ token + user data
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

      // ✅ success toast
      toast.success(
        `${isAdmin ? "Admin" : "User"} login successful!`
      );

      // ✅ redirect after short delay
      setTimeout(() => {
        window.location.href = isAdmin
          ? "/admin"
          : "/dashboard";
      }, 1500);

    } catch (err) {
      console.error("ERROR:", err);

      // ✅ error toast
      toast.error(err.message || "Error login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      {/* ✅ Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-[400px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Login
        </h2>

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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          New Account?{" "}
          <Link
            href="/signup"
            className="text-blue-500"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;