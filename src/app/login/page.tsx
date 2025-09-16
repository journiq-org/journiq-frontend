"use client";

import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(8),
});

type LoginFormData = yup.InferType<typeof schema>;

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post("/api/users/login", data, { withCredentials: true });
      toast.success("Login successful");

      const role = res.data.data.role?.toLowerCase();
      const token = res.data.access_token;

      await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, role }),
      });

      if (role === "admin") window.location.href = "/admin-dashboard";
      else if (role === "guide") window.location.href = "/guide-dashboard";
      else if (role === "traveller") router.push("/traveller-dashboard");
      else window.location.href = "/register";
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center p-4 pt-24 bg-[#d1cfc8]">
        <div className="w-full max-w-md rounded-3xl bg-[#1f2937]/90 p-8 shadow-2xl backdrop-blur-md border border-[#3b82f6]/30">
          <h1 className="text-4xl font-extrabold text-[#fdfdfd] text-center mb-2">Login</h1>
          <p className="text-[#93c5fd] text-center mb-6">Welcome back 👋 Please sign in</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className={`w-full rounded-xl border p-3 bg-[#22252c] text-[#fdfdfd] placeholder-[#93c5fd] ${
                  errors.email ? "border-red-500" : "border-[#3b82f6]"
                } focus:ring focus:ring-[#3b82f6]`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`w-full rounded-xl border p-3 bg-[#22252c] text-[#fdfdfd] placeholder-[#93c5fd] ${
                  errors.password ? "border-red-500" : "border-[#3b82f6]"
                } focus:ring focus:ring-[#3b82f6]`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-[#bc7a24]  py-3 text-[#fdfdfd] font-semibold hover:from-[#3b82f6] hover:to-[#1e3a8a] transition disabled:opacity-70 cursor-pointer"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#93c5fd]">
            Don’t have an account?{" "}
            <Link href="/register">
              <span className=" px-2 py-1 rounded-full text-[#fdfdfd] hover:text-white transition cursor-pointer">
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

