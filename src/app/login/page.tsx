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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
        {/* Polaroid-style background images */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-16 transform -rotate-12 opacity-60">
            <div className="bg-white p-2 shadow-lg border-4 border-white">
              <div className="w-24 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-sm flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute top-32 right-20 transform rotate-6 opacity-50">
            <div className="bg-white p-2 shadow-lg border-4 border-white">
              <div className="w-20 h-16 bg-gradient-to-br from-green-200 to-green-300 rounded-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute bottom-40 left-24 transform -rotate-3 opacity-40">
            <div className="bg-white p-2 shadow-lg border-4 border-white">
              <div className="w-28 h-20 bg-gradient-to-br from-purple-200 to-purple-300 rounded-sm flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute bottom-32 right-32 transform rotate-12 opacity-30">
            <div className="bg-white p-2 shadow-lg border-4 border-white">
              <div className="w-24 h-18 bg-gradient-to-br from-red-200 to-red-300 rounded-sm flex items-center justify-center">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Postcard-style login form */}
        <div className="relative z-10 transform transition-transform duration-300 hover:rotate-1 hover:scale-105 cursor-pointer">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg shadow-2xl border-4 border-white relative">
            {/* Stamp corners */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-2 border-red-600 transform rotate-12"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500 rounded-full border-2 border-green-600 transform -rotate-12"></div>
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full border border-yellow-500"></div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border border-purple-600 transform rotate-45"></div>

            {/* Postcard content */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">Greetings from</h1>
              <h2 className="text-xl text-blue-600 font-semibold">Your Travel Journey</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mt-2 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Your email address"
                  className={`w-full px-4 py-3 border-2 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none transition-all ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Your secret password"
                  className={`w-full px-4 py-3 border-2 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none transition-all ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-gray-900 hover:from-blue-600 hover:to-gray-600 text-white font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isSubmitting ? "Sending..." : "✈️ Start Adventure"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                New traveler?{" "}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-wavy">
                  Join the journey
                </Link>
              </p>
            </div>

            {/* Postcard address section styling */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-xs text-gray-500 italic text-center">Your gateway to amazing destinations</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;










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
//       <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
//         {/* Scrolling Monuments Background */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="animate-scroll-left flex items-end space-x-16">
//             {/* First set of monuments */}
//             <div className="flex-shrink-0 w-32 h-48 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t-full relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-full transform scale-90"></div>
//               <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full opacity-80"></div>
//             </div>
            
//             <div className="flex-shrink-0 w-40 h-56 bg-gradient-to-t from-white to-gray-100 rounded-t-lg relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-200 to-white rounded-t-lg transform scale-95"></div>
//               <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-white border border-gray-300"></div>
//             </div>
            
//             <div className="flex-shrink-0 w-36 h-52 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-full relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-orange-700 to-orange-500 rounded-t-full transform scale-90"></div>
//               <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-yellow-300 rounded-sm"></div>
//             </div>
            
//             <div className="flex-shrink-0 w-44 h-60 bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-red-700 to-red-500 rounded-t-lg transform scale-95"></div>
//               <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-yellow-300 rounded-full"></div>
//             </div>
            
//             <div className="flex-shrink-0 w-32 h-48 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-full relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-yellow-700 to-yellow-500 rounded-t-full transform scale-90"></div>
//             </div>
            
//             <div className="flex-shrink-0 w-38 h-54 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-green-700 to-green-500 rounded-t-lg transform scale-95"></div>
//               <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-5 h-7 bg-yellow-300 rounded-sm"></div>
//             </div>
            
//             {/* Duplicate for seamless loop */}
//             <div className="flex-shrink-0 w-32 h-48 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t-full relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-full transform scale-90"></div>
//               <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full opacity-80"></div>
//             </div>
            
//             <div className="flex-shrink-0 w-40 h-56 bg-gradient-to-t from-white to-gray-100 rounded-t-lg relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-200 to-white rounded-t-lg transform scale-95"></div>
//               <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-white border border-gray-300"></div>
//             </div>
            
//             <div className="flex-shrink-0 w-36 h-52 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-full relative">
//               <div className="absolute inset-0 bg-gradient-to-t from-orange-700 to-orange-500 rounded-t-full transform scale-90"></div>
//               <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-yellow-300 rounded-sm"></div>
//             </div>
//           </div>
//         </div>

//         {/* Login Form Overlay */}
//         <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-24">
//           <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
//             <div className="text-center mb-8">
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                 </svg>
//               </div>
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Explorer</h1>
//               <p className="text-gray-600">Your journey begins here</p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div>
//                 <input
//                   {...register("email")}
//                   type="email"
//                   placeholder="Email address"
//                   className={`w-full px-4 py-3 border-2 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none transition-all ${
//                     errors.email 
//                       ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
//                       : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                   }`}
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <input
//                   {...register("password")}
//                   type="password"
//                   placeholder="Password"
//                   className={`w-full px-4 py-3 border-2 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none transition-all ${
//                     errors.password 
//                       ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
//                       : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
//                   }`}
//                 />
//                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
//               >
//                 <span className="relative z-10 flex items-center justify-center">
//                   {isSubmitting ? "Signing in..." : "Start Your Journey"}
//                 </span>
                
//                 {/* Plane Animation */}
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="plane-animation opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <svg className="w-6 h-6 text-white transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                     </svg>
//                   </div>
//                 </div>
//               </button>
//             </form>

//             <div className="text-center mt-6">
//               <p className="text-gray-600 text-sm">
//                 New to our community?{" "}
//                 <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
//                   Create account
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes scroll-left {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .animate-scroll-left {
//           animation: scroll-left 20s linear infinite;
//         }

//         @keyframes plane-fly {
//           0% {
//             transform: translateX(-100%) rotate(-12deg);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           90% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateX(400%) rotate(-12deg);
//             opacity: 0;
//           }
//         }

//         .plane-animation {
//           animation: plane-fly 2s ease-in-out infinite;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Login;









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
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 pt-24">
//         <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-slate-700/50">
//           {/* Compass Illustration */}
//           <div className="text-center mb-8">
//             <div className="relative w-20 h-20 mx-auto mb-4">
//               <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full border-2 border-slate-500"></div>
//               <div className="absolute inset-2 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
//                 <div className="relative w-full h-full">
//                   {/* Compass points */}
//                   <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-red-500"></div>
//                   <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-white"></div>
//                   <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-3 h-0.5 bg-white"></div>
//                   <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-0.5 bg-white"></div>
                  
//                   {/* Center dot */}
//                   <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-400 rounded-full border border-slate-300"></div>
                  
//                   {/* Small plane in center */}
//                   <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <svg className="w-3 h-3 text-slate-300 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
//             <p className="text-slate-400">Continue your journey</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div>
//               <input
//                 {...register("email")}
//                 type="email"
//                 placeholder="Email address"
//                 className={`w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                   errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
//                 }`}
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             <div>
//               <input
//                 {...register("password")}
//                 type="password"
//                 placeholder="Password"
//                 className={`w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                   errors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
//                 }`}
//               />
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-yellow-500/25 border border-yellow-400/30"
//             >
//               {isSubmitting ? "Signing in..." : "Continue Journey"}
//             </button>
//           </form>

//           <div className="text-center mt-6">
//             <p className="text-slate-400 text-sm">
//               New traveler?{" "}
//               <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
//                 Create account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;






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
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
//         {/* Subtle World Map Background */}
//         <div className="absolute inset-0 opacity-5">
//           <svg viewBox="0 0 1000 600" className="w-full h-full">
//             <path d="M150,200 Q200,180 250,200 T350,200 Q400,180 450,200 T550,200 Q600,180 650,200 T750,200 Q800,180 850,200" stroke="#3B82F6" strokeWidth="1" fill="none"/>
//             <path d="M150,250 Q200,230 250,250 T350,250 Q400,230 450,250 T550,250 Q600,230 650,250 T750,250 Q800,230 850,250" stroke="#3B82F6" strokeWidth="1" fill="none"/>
//             <path d="M150,300 Q200,280 250,300 T350,300 Q400,280 450,300 T550,300 Q600,280 650,300 T750,300 Q800,280 850,300" stroke="#3B82F6" strokeWidth="1" fill="none"/>
//             <circle cx="200" cy="220" r="8" fill="#10B981"/>
//             <circle cx="600" cy="250" r="6" fill="#10B981"/>
//             <circle cx="750" cy="280" r="10" fill="#10B981"/>
//             <circle cx="400" cy="200" r="5" fill="#10B981"/>
//             <circle cx="550" cy="300" r="7" fill="#10B981"/>
//           </svg>
//         </div>

//         {/* Boarding Pass Login Form */}
//         <div className="relative z-10 w-full max-w-lg">
//           <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-200 overflow-hidden">
//             {/* Boarding Pass Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h1 className="text-lg font-bold">TRAVEL PASS</h1>
//                   <p className="text-xs opacity-90">Boarding Pass</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xs opacity-90">PASSENGER</div>
//                   <div className="font-semibold">TRAVELER</div>
//                 </div>
//               </div>
//             </div>

//             {/* Perforated Line */}
//             <div className="relative">
//               <div className="border-t-2 border-dashed border-gray-300"></div>
//               <div className="absolute inset-0 flex justify-center">
//                 <div className="bg-white px-4 text-xs text-gray-500 font-medium">BOARDING PASS</div>
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Passenger Name</label>
//                   <input
//                     {...register("email")}
//                     type="email"
//                     placeholder="Email Address"
//                     className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.email 
//                         ? "border-red-400 focus:border-red-500" 
//                         : "border-gray-300 focus:border-blue-500"
//                     }`}
//                   />
//                   {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Destination</label>
//                   <input
//                     {...register("password")}
//                     type="password"
//                     placeholder="Password"
//                     className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.password 
//                         ? "border-red-400 focus:border-red-500" 
//                         : "border-gray-300 focus:border-blue-500"
//                     }`}
//                   />
//                   {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
//                 </div>
//               </div>

//               {/* Flight Details Row */}
//               <div className="bg-gray-50 rounded p-3">
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   <div>
//                     <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Flight</div>
//                     <div className="text-sm font-bold text-blue-600">TRVL-001</div>
//                   </div>
//                   <div>
//                     <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Seat</div>
//                     <div className="text-sm font-bold text-blue-600">AUTO</div>
//                   </div>
//                   <div>
//                     <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Gate</div>
//                     <div className="text-sm font-bold text-blue-600">READY</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Board Now Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Boarding...
//                   </div>
//                 ) : (
//                   "✈️ Board Now"
//                 )}
//               </button>
//             </div>

//             {/* Boarding Pass Footer */}
//             <div className="bg-gray-100 px-6 py-3 border-t border-gray-200">
//               <div className="flex justify-between items-center text-xs">
//                 <div>
//                   <span className="text-gray-600">New passenger? </span>
//                   <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
//                     Register here
//                   </Link>
//                 </div>
//                 <div className="text-gray-500">
//                   Valid for: Unlimited Travel
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;










