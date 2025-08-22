"use client";

import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(8),
});

type LoginFormData = yup.InferType<typeof schema>;

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post("/api/users/login", data, { withCredentials: true });
      if (res.status === 200) {
        toast.success("Login successful 🎉");
        const role = res.data.data.role?.toLowerCase();
        if (role === "admin") window.location.href = "/admin-dashboard";
        else if (role === "guide") window.location.href = "/guide-dashboard";
        else if (role === "traveller") window.location.href = "/traveller-dashboard";
        else window.location.href = "/register";
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 pt-20">
        <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-xl backdrop-blur-md">
          <h1 className="text-4xl font-extrabold text-indigo-700 text-center">Login</h1>
          <p className="text-gray-600 text-center mb-6">Welcome back 👋 Please sign in</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className={`w-full rounded-xl border p-3 text-gray-800 placeholder-gray-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`w-full rounded-xl border p-3 text-gray-800 placeholder-gray-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 disabled:opacity-70"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

         <p className="mt-6 text-center text-sm text-gray-600">
  Don’t have an account?{" "}
  <Link href="/register">
    <span className="text-indigo-600 hover:underline">Register</span>
  </Link>
</p>
        </div>
      </div>
    </>
  );
};

export default Login;
