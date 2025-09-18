// "use client";

// import React from "react";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import toast from "react-hot-toast";
// import Navbar from "@/components/Navbar";
// import api from "@/lib/api";
// import Link from "next/link";
// import { useRouter } from 'next/navigation';

// const schema = yup.object().shape({
//   email: yup.string().required("Email is required").email("Invalid email"),
//   password: yup.string().required("Password is required").min(8),
// });

// type LoginFormData = yup.InferType<typeof schema>;

// const Login = () => {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     try {
//       const res = await api.post("/api/users/login", data, { withCredentials: true });
//       toast.success("Login successful");

//       const role = res.data.data.role?.toLowerCase();
//       const token = res.data.access_token;

//       await fetch("/api/auth/set-cookie", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, role }),
//       });

//       if (role === "admin") window.location.href = "/admin-dashboard";
//       else if (role === "guide") window.location.href = "/guide-dashboard";
//       else if (role === "traveller") router.push("/traveller-dashboard");
//       else window.location.href = "/register";
//     } catch (err) {
//       toast.error("Login failed");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex min-h-screen items-center justify-center p-4 pt-24 bg-[#d1cfc8]">
//         <div className="w-full max-w-md rounded-3xl bg-[#1f2937]/90 p-8 shadow-2xl backdrop-blur-md border border-[#3b82f6]/30">
//           <h1 className="text-4xl font-extrabold text-[#fdfdfd] text-center mb-2">Login</h1>
//           <p className="text-[#93c5fd] text-center mb-6">Welcome back 👋 Please sign in</p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <div>
//               <input
//                 {...register("email")}
//                 type="email"
//                 placeholder="Email"
//                 className={`w-full rounded-xl border p-3 bg-[#22252c] text-[#fdfdfd] placeholder-[#93c5fd] ${
//                   errors.email ? "border-red-500" : "border-[#3b82f6]"
//                 } focus:ring focus:ring-[#3b82f6]`}
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             <div>
//               <input
//                 {...register("password")}
//                 type="password"
//                 placeholder="Password"
//                 className={`w-full rounded-xl border p-3 bg-[#22252c] text-[#fdfdfd] placeholder-[#93c5fd] ${
//                   errors.password ? "border-red-500" : "border-[#3b82f6]"
//                 } focus:ring focus:ring-[#3b82f6]`}
//               />
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full rounded-full bg-[#bc7a24]  py-3 text-[#fdfdfd] font-semibold hover:from-[#3b82f6] hover:to-[#1e3a8a] transition disabled:opacity-70 cursor-pointer"
//             >
//               {isSubmitting ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-[#93c5fd]">
//             Don’t have an account?{" "}
//             <Link href="/register">
//               <span className=" px-2 py-1 rounded-full text-[#fdfdfd] hover:text-white transition cursor-pointer">
//                 Register
//               </span>
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;







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
import { Eye, EyeOff, Mail, Lock, MapPin, Compass } from 'lucide-react';

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(8),
});

type LoginFormData = yup.InferType<typeof schema>;

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post("/api/users/login", data, { withCredentials: true });
      toast.success("Login successful");

       const { role, isVerified } = res.data.data;
      const token = res.data.access_token;


        //  Guide not verified → don't store cookie, just redirect
      if (role === "guide" && !isVerified) {
        toast.error("Your account is pending admin verification.");
        router.push("/pending-verification");
        return;
      }

      await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, role }),
      });

      if (role === "admin") window.location.href = "/admin-dashboard";
      else if (role === "guide")window.location.href = "/guide-dashboard";
      else if (role === "traveller") router.push("/traveller-dashboard");
      else window.location.href = "/register";
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4 pt-24">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-16 opacity-20">
            <Compass className="w-12 h-12 text-orange-300" />
          </div>
          <div className="absolute top-32 right-20 opacity-15">
            <MapPin className="w-10 h-10 text-amber-400" />
          </div>
          <div className="absolute bottom-40 left-24 opacity-20">
            <Compass className="w-8 h-8 text-orange-400" />
          </div>
          <div className="absolute bottom-32 right-32 opacity-15">
            <MapPin className="w-11 h-11 text-amber-300" />
          </div>
        </div>

        {/* Main Login Card */}
        <div className="relative z-10 w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg mb-6">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Continue your journey with Journiq
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-200 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-200 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none shadow-md"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Start Your Journey"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                New to Journiq?{" "}
                <Link 
                  href="/register" 
                  className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Footer Text */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Your trusted companion for extraordinary travel experiences
              </p>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-white/50">
              <div className="text-2xl mb-2">🌍</div>
              <p className="text-sm font-medium text-gray-700">200+ Destinations</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-white/50">
              <div className="text-2xl mb-2">👥</div>
              <p className="text-sm font-medium text-gray-700">Expert Guides</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;