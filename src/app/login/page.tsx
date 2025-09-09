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
              className="w-full rounded-full bg-[#bc7a24]  py-3 text-[#fdfdfd] font-semibold hover:from-[#3b82f6] hover:to-[#1e3a8a] transition disabled:opacity-70"
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

// const onSubmit = async (data: LoginFormData) => {
//   try {
//     const res = await api.post("/api/users/login", data, { withCredentials: true })

//     toast.success("Login successful ")

//     const role = res.data.data.role?.toLowerCase()
//     const token = res.data.access_token

//     // Wait for set-cookie request
//     const cookieRes = await fetch("/api/auth/set-cookie", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token, role }),
//     })

//     const cookieData = await cookieRes.json()

//     if (role === "admin") window.location.href = "/admin-dashboard"
//     else if (role === "guide") window.location.href = "/guide-dashboard"
//     else if (role === "traveller") router.push("/traveller-dashboard");
//     else window.location.href = "/register"
//   } catch (err) {
//    toast.error("login failed" )
//   }
// }



//   return (
//     <>
//       <Navbar />
//       <div className="flex min-h-screen items-center justify-center p-4 pt-24">
//         <div className="w-full max-w-md rounded-3xl bg-[#d1cfc8]/95 p-8 shadow-lg backdrop-blur-md">
//           <h1 className="text-4xl font-extrabold text-[#0c0c0c] text-center mb-2">Login</h1>
//           <p className="text-[#4E4D45] text-center mb-6">Welcome back 👋 Please sign in</p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <div>
//               <input
//                 {...register("email")}
//                 type="email"
//                 placeholder="Email"
//                 className={`w-full rounded-xl border p-3 text-[#0c0c0c] placeholder-[#4E4D45] bg-white ${
//                   errors.email ? "border-red-500" : "border-[#4E4D45]"
//                 }`}
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             <div>
//               <input
//                 {...register("password")}
//                 type="password"
//                 placeholder="Password"
//                 className={`w-full rounded-xl border p-3 text-[#0c0c0c] placeholder-[#4E4D45] bg-white ${
//                   errors.password ? "border-red-500" : "border-[#4E4D45]"
//                 }`}
//               />
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full rounded-full bg-[#0c0c0c] py-3 text-white font-semibold hover:bg-[#4E4D45] transition disabled:opacity-70"
//             >
//               {isSubmitting ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-[#4E4D45]">
//             Don’t have an account?{" "}
//             <Link href="/register">
//               <span className="bg-[#d1cfc8] px-2 py-1 rounded-full text-[#0c0c0c] hover:bg-[#4E4D45] hover:text-white transition cursor-pointer">
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
// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   Compass,
//   ArrowRight,
//   Loader2,
//   CheckCircle,
//   AlertCircle,
//   Shield,
//   Award,
//   Users,
//   Sparkles
// } from "lucide-react";

// const schema = yup.object().shape({
//   email: yup.string().required("Email is required").email("Invalid email"),
//   password: yup.string().required("Password is required").min(8),
// });

// type LoginFormData = yup.InferType<typeof schema>;

// const Login = () => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = React.useState(false);

//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     try {
//       const res = await api.post("/api/users/login", data, { withCredentials: true })

//       toast.success("Login successful 🎉")

//       const role = res.data.data.role?.toLowerCase()
//       const token = res.data.access_token

//       // Wait for set-cookie request
//       const cookieRes = await fetch("/api/auth/set-cookie", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, role }),
//       })

//       const cookieData = await cookieRes.json()

//       console.log(role, "user role...........")

//       if (role === "admin") window.location.href = "/admin-dashboard"
//       else if (role === "guide") window.location.href = "/guide-dashboard"
//       else if (role === "traveller") router.push("/traveller-dashboard");
//       else window.location.href = "/register"
//     } catch (err: any) {
//       console.error("Error:", err)
//       toast.error(err.response?.data?.message || "Invalid credentials", {
//         icon: '❌',
//         duration: 4000,
//       });
//     }
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-[#e4e2e1] via-[#d4c4a8] to-[#a67c52] flex items-center justify-center p-4 pt-24">
//         <div className="w-full max-w-md">
//           {/* Main Card */}
//           <div className="bg-white rounded-3xl shadow-2xl border border-[#e4e2e1] p-8 relative overflow-hidden backdrop-blur-sm">
//             {/* Premium Background Elements */}
//             <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#ff9100]/10 to-[#a67c52]/20 rounded-full -translate-y-20 translate-x-20"></div>
//             <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#8B4513]/15 to-[#ff9100]/10 rounded-full translate-y-16 -translate-x-16"></div>
//             <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-[#a67c52]/10 to-[#ff9100]/15 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

//             {/* Header */}
//             <div className="text-center mb-8 relative z-10">
//               <div className="w-20 h-20 bg-gradient-to-br from-[#a67c52] via-[#8B4513] to-[#654321] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl relative">
//                 <Compass className="text-white" size={36} />
//                 <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#ff9100] rounded-full flex items-center justify-center">
//                   <Sparkles className="text-white" size={12} />
//                 </div>
//               </div>
//               <h1 className="text-4xl font-bold text-[#22252c] mb-3">Welcome Back</h1>
//               <p className="text-[#363636] text-lg">Continue your premium journey with us</p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
//               {/* Email Field */}
//               <div className="space-y-3">
//                 <label className="text-sm font-bold text-[#22252c] flex items-center gap-2">
//                   <Mail size={18} className="text-[#a67c52]" />
//                   Email Address
//                 </label>
//                 <div className="relative group">
//                   <input
//                     {...register("email")}
//                     type="email"
//                     placeholder="Enter your email"
//                     className={`w-full rounded-2xl border-2 p-4 pl-12 text-[#363636] placeholder-[#a67c52]/60 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
//                       errors.email
//                         ? "border-[#ff9100] focus:border-[#ff9100] shadow-lg shadow-[#ff9100]/20"
//                         : "border-[#e4e2e1] focus:border-[#a67c52] focus:ring-4 focus:ring-[#a67c52]/20 group-hover:border-[#8B4513]"
//                     }`}
//                   />
//                   <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a67c52] group-focus-within:text-[#8B4513] transition-colors duration-300" size={20} />
//                 </div>
//                 {errors.email && (
//                   <div className="flex items-center gap-2 text-[#ff9100] text-sm font-medium">
//                     <AlertCircle size={16} />
//                     {errors.email.message}
//                   </div>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="space-y-3">
//                 <label className="text-sm font-bold text-[#22252c] flex items-center gap-2">
//                   <Lock size={18} className="text-[#a67c52]" />
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <input
//                     {...register("password")}
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     className={`w-full rounded-2xl border-2 p-4 pl-12 pr-12 text-[#363636] placeholder-[#a67c52]/60 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
//                       errors.password
//                         ? "border-[#ff9100] focus:border-[#ff9100] shadow-lg shadow-[#ff9100]/20"
//                         : "border-[#e4e2e1] focus:border-[#a67c52] focus:ring-4 focus:ring-[#a67c52]/20 group-hover:border-[#8B4513]"
//                     }`}
//                   />
//                   <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a67c52] group-focus-within:text-[#8B4513] transition-colors duration-300" size={20} />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#a67c52] hover:text-[#8B4513] transition-colors duration-300 p-1"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <div className="flex items-center gap-2 text-[#ff9100] text-sm font-medium">
//                     <AlertCircle size={16} />
//                     {errors.password.message}
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-gradient-to-r from-[#a67c52] via-[#8B4513] to-[#654321] hover:from-[#8B4513] hover:via-[#654321] hover:to-[#3d2817] text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#ff9100]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 size={22} className="animate-spin" />
//                     <span className="relative z-10">Authenticating...</span>
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle size={22} />
//                     <span className="relative z-10">Sign In Securely</span>
//                     <ArrowRight size={20} className="relative z-10" />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="mt-8 text-center relative z-10">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e4e2e1] to-transparent"></div>
//                 <span className="text-[#363636] text-sm font-medium px-3 bg-white rounded-full">or</span>
//                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e4e2e1] to-transparent"></div>
//               </div>

//               <p className="text-[#363636] mb-4 font-medium">
//                 New to our premium experience?
//               </p>

//               <Link href="/register">
//                 <button className="w-full bg-gradient-to-r from-[#e4e2e1] to-[#d4c4a8] hover:from-[#d4c4a8] hover:to-[#a67c52] text-[#22252c] hover:text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 border-2 border-[#e4e2e1] hover:border-[#a67c52] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
//                   Create Premium Account
//                   <ArrowRight size={18} />
//                 </button>
//               </Link>
//             </div>

//             {/* Additional Links */}
//             <div className="mt-6 text-center">
//               <Link href="/forgot-password">
//                 <span className="text-[#a67c52] hover:text-[#8B4513] text-sm font-semibold transition-colors duration-200 cursor-pointer">
//                   Forgot your password?
//                 </span>
//               </Link>
//             </div>
//           </div>

//           {/* Premium Features Grid */}
//           <div className="grid grid-cols-3 gap-4 mt-8">
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e4e2e1] text-center shadow-xl hover:shadow-2xl transition-all duration-300 group">
//               <div className="w-10 h-10 bg-gradient-to-br from-[#a67c52] to-[#8B4513] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
//                 <Shield className="text-white" size={20} />
//               </div>
//               <span className="text-xs font-bold text-[#22252c]">Secure Access</span>
//               <p className="text-xs text-[#363636] mt-1">Bank-level security</p>
//             </div>
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e4e2e1] text-center shadow-xl hover:shadow-2xl transition-all duration-300 group">
//               <div className="w-10 h-10 bg-gradient-to-br from-[#ff9100] to-[#a67c52] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
//                 <Award className="text-white" size={20} />
//               </div>
//               <span className="text-xs font-bold text-[#22252c]">Premium Service</span>
//               <p className="text-xs text-[#363636] mt-1">Elite experience</p>
//             </div>
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e4e2e1] text-center shadow-xl hover:shadow-2xl transition-all duration-300 group">
//               <div className="w-10 h-10 bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
//                 <Users className="text-white" size={20} />
//               </div>
//               <span className="text-xs font-bold text-[#22252c]">Expert Guides</span>
//               <p className="text-xs text-[#363636] mt-1">Verified professionals</p>
//             </div>
//           </div>

//           {/* Trust Indicators */}
//           <div className="mt-6 text-center">
//             <p className="text-[#363636] text-sm mb-3">Trusted by premium travelers worldwide</p>
//             <div className="flex items-center justify-center gap-6 opacity-60">
//               <div className="text-[#a67c52] font-bold text-lg">Journiq</div>
//               <div className="w-2 h-2 bg-[#ff9100] rounded-full"></div>
//               <div className="text-[#363636] text-sm">Premium Travel Experience</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;