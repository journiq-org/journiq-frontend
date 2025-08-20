"use client";

import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/lib/api";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type LoginFormData = yup.InferType<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post("/users/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Login successful 🎉");

      // Save token & user in localStorage
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      // Role-based navigation
      const role = res.data.data.role?.toLowerCase();
      if (role === "admin") {
        window.location.href = "/admin-dashboard";
      } else if (role === "guide") {
        window.location.href = "/guide-dashboard";
      } else if (role === "traveller") {
        window.location.href = "/traveller-dashboard";
      } else {
        window.location.href = "/register"; // fallback
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-xl backdrop-blur-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700">Login</h1>
          <p className="mt-2 text-gray-600">Welcome back 👋 Please sign in</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              className={`w-full rounded-xl border p-3 text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className={`w-full rounded-xl border p-3 text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-md transition hover:scale-[1.02] hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
