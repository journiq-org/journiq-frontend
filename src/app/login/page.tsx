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
      <div className="flex min-h-screen items-center justify-center bg-[#E2E0DF] p-4 pt-24">
        <div className="w-full max-w-md rounded-3xl bg-[#d1cfc8]/95 p-8 shadow-lg backdrop-blur-md">
          <h1 className="text-4xl font-extrabold text-[#0c0c0c] text-center mb-2">Login</h1>
          <p className="text-[#4E4D45] text-center mb-6">Welcome back 👋 Please sign in</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className={`w-full rounded-xl border p-3 text-[#0c0c0c] placeholder-[#4E4D45] bg-white ${
                  errors.email ? "border-red-500" : "border-[#4E4D45]"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`w-full rounded-xl border p-3 text-[#0c0c0c] placeholder-[#4E4D45] bg-white ${
                  errors.password ? "border-red-500" : "border-[#4E4D45]"
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-[#0c0c0c] py-3 text-white font-semibold hover:bg-[#4E4D45] transition disabled:opacity-70"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#4E4D45]">
            Don’t have an account?{" "}
            <Link href="/register">
              <span className="bg-[#d1cfc8] px-2 py-1 rounded-full text-[#0c0c0c] hover:bg-[#4E4D45] hover:text-white transition cursor-pointer">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;