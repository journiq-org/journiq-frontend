// "use client";

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Avatar,
//   Typography,
//   Paper,
//   TextField,
// } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import api from "@/lib/api";
// import toast from "react-hot-toast";
// import Navbar from "@/components/Navbar";

// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   phone: yup.string().required("Phone number is required"),
//   location: yup.string().required("Location is required"),
//   bio: yup.string().required("Bio is required"),
//   role: yup.string().required("Role is required"),
// });

// type RegisterFormData = yup.InferType<typeof schema>;

// const RegisterPage = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState("");

//   const {
//     handleSubmit,
//     control,
//     watch,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<RegisterFormData>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       phone: "",
//       location: "",
//       bio: "",
//       role: "",
//     },
//   });

//   const selectedRole = watch("role");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = () => {
//     setImage(null);
//     setPreview("");
//   };

//   const onSubmit = async (data: RegisterFormData) => {
//     try {
//       const formData = new FormData();
//       Object.entries(data).forEach(([key, value]) =>
//         formData.append(key, value as string)
//       );
//       if (image) formData.append("profilePic", image);

//       await api.post("/api/users/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Registration successful!");
//       reset();
//       removeImage();
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <Box className="flex min-h-screen items-center justify-center bg-[#d1cfc8] p-4 pt-24">
//         <div className="w-full max-w-md rounded-2xl bg-[#d1cfc8]/95 p-8 shadow-lg backdrop-blur-md">
//           <h1 className="text-4xl font-extrabold text-[#0c0c0c] text-center mb-2">Register</h1>
//           <Typography className="text-[#4E4D45] text-center mb-6">
//             Create your account 👋
//           </Typography>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Avatar + Role */}
//             <Box className="flex flex-col items-center mb-4">
//               <Avatar
//                 src={preview}
//                 sx={{ width: 100, height: 100, mb: 2, cursor: "pointer" }}
//                 onClick={() => document.getElementById("avatarInput")?.click()}
//               />
//               {preview && (
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   size="small"
//                   sx={{ mb: 2 }}
//                   onClick={removeImage}
//                 >
//                   Remove Image
//                 </Button>
//               )}
//               <input
//                 type="file"
//                 id="avatarInput"
//                 hidden
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />

//               <Box className="flex gap-2">
//                 <Button
//                   variant={selectedRole === "traveller" ? "contained" : "outlined"}
//                   sx={{
//                     backgroundColor:
//                       selectedRole === "traveller" ? "#0c0c0c" : "white",
//                     color: selectedRole === "traveller" ? "white" : "#0c0c0c",
//                     "&:hover": {
//                       backgroundColor: selectedRole === "traveller" ? "#4E4D45" : "#d1cfc8",
//                     },
//                   }}
//                   onClick={() => setValue("role", "traveller")}
//                 >
//                   Traveller
//                 </Button>

//                 <Button
//                   variant={selectedRole === "guide" ? "contained" : "outlined"}
//                   sx={{
//                     backgroundColor:
//                       selectedRole === "guide" ? "#0c0c0c" : "white",
//                     color: selectedRole === "guide" ? "white" : "#0c0c0c",
//                     "&:hover": {
//                       backgroundColor: selectedRole === "guide" ? "#4E4D45" : "#d1cfc8",
//                     },
//                   }}
//                   onClick={() => setValue("role", "guide")}
//                 >
//                   Guide
//                 </Button>
//               </Box>

//               {errors.role && (
//                 <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
//                   {errors.role.message}
//                 </Typography>
//               )}
//             </Box>

//             {/* Form Fields */}
//             {(["name", "email", "password", "phone", "location", "bio"] as (keyof RegisterFormData)[]).map(
//               (field) => (
//                 <Controller
//                   key={field}
//                   name={field}
//                   control={control}
//                   render={({ field: f }) => (
//                     <TextField
//                       {...f}
//                       type={field === "password" ? "password" : "text"}
//                       label={field.charAt(0).toUpperCase() + field.slice(1)}
//                       fullWidth
//                       multiline={field === "bio"}
//                       rows={field === "bio" ? 3 : 1}
//                       error={!!errors[field]}
//                       helperText={errors[field]?.message}
//                       sx={{
//                         backgroundColor: "white",
//                         "& .MuiInputBase-input": { color: "#0c0c0c" },
//                         "& .MuiInputLabel-root": { color: "#4E4D45" },
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": {
//                             borderColor: "#4E4D45",
//                           },
//                           "&:hover fieldset": {
//                             borderColor: "#0c0c0c",
//                           },
//                           "&.Mui-focused fieldset": {
//                             borderColor: "#0c0c0c",
//                           },
//                         },
//                       }}
//                     />
//                   )}
//                 />
//               )
//             )}

//             <Button
//               type="submit"
//               fullWidth
//               sx={{
//                 mt: 2,
//                 backgroundColor: "#0c0c0c",
//                 color: "white",
//                 py: 1.5,
//                 borderRadius: "9999px",
//                 "&:hover": { backgroundColor: "#4E4D45" },
//               }}
//             >
//               Register
//             </Button>
//           </form>
//         </div>
//       </Box>
//     </>
//   );
// };

// export default RegisterPage;




// "use client";

// import React, { useState } from "react";
// import { Box, Button, Avatar, Typography, TextField } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import api from "@/lib/api";
// import toast from "react-hot-toast";
// import Navbar from "@/components/Navbar";
// import Link from "next/link";

// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   phone: yup.string().required("Phone number is required"),
//   location: yup.string().required("Location is required"),
//   bio: yup.string().required("Bio is required"),
//   role: yup.string().required("Role is required"),
// });

// type RegisterFormData = yup.InferType<typeof schema>;

// const RegisterPage = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [preview, setPreview] = useState("");

//   const {
//     handleSubmit,
//     control,
//     watch,
//     setValue,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<RegisterFormData>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       phone: "",
//       location: "",
//       bio: "",
//       role: "",
//     },
//   });

//   const selectedRole = watch("role");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = () => {
//     setImage(null);
//     setPreview("");
//   };

//   const onSubmit = async (data: RegisterFormData) => {
//     try {
//       const formData = new FormData();
//       Object.entries(data).forEach(([key, value]) =>
//         formData.append(key, value as string)
//       );
//       if (image) formData.append("profilePic", image);

//       await api.post("/api/users/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Registration successful!");
//       reset();
//       removeImage();
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Box className="flex min-h-screen items-center justify-center p-4 pt-24 bg-[#d1cfc8]">
//         <div className="w-full max-w-3xl rounded-3xl bg-[#1f2937]/90 p-8 shadow-2xl backdrop-blur-md border border-[#3b82f6]/30">
//           <h1 className="text-4xl font-extrabold text-[#fdfdfd] text-center mb-2">Register</h1>
//           <p className="text-[#93c5fd] text-center mb-6">Create your account 👋</p>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Avatar + Role */}
//             <Box className="flex flex-col items-center mb-4">
//               <Avatar
//                 src={preview}
//                 sx={{ width: 100, height: 100, mb: 2, cursor: "pointer" }}
//                 onClick={() => document.getElementById("avatarInput")?.click()}
//               />
//               {preview && (
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   size="small"
//                   sx={{ mb: 2 }}
//                   onClick={removeImage}
//                 >
//                   Remove Image
//                 </Button>
//               )}
//               <input
//                 type="file"
//                 id="avatarInput"
//                 hidden
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />

//               <Box className="flex gap-2 mt-2">
//                 <Button
//                   variant={selectedRole === "traveller" ? "contained" : "outlined"}
//                   sx={{
//                     backgroundColor: selectedRole === "traveller" ? "#6b5f30ff" : "#d1cfc8",
//                     color: selectedRole === "traveller" ? "white" : "#0c0c0c",
//                     "&:hover": {
//                       backgroundColor: selectedRole === "traveller" ? "#6b5f30ff" : "#d1cfc8",
//                     },
//                   }}
//                   onClick={() => setValue("role", "traveller")}
//                 >
//                   Traveller
//                 </Button>

//                 <Button
//                   variant={selectedRole === "guide" ? "contained" : "outlined"}
//                   sx={{
//                     backgroundColor: selectedRole === "guide" ? "#484b46ff" : "#d1cfc8",
//                     color: selectedRole === "guide" ? "white" : "#0c0c0c",
//                     "&:hover": {
//                       backgroundColor: selectedRole === "guide" ? "#484b46ff" : "#d1cfc8",
//                     },
//                   }}
//                   onClick={() => setValue("role", "guide")}
//                 >
//                   Guide
//                 </Button>
//               </Box>

//               {errors.role && (
//                 <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
//                   {errors.role.message}
//                 </Typography>
//               )}
//             </Box>

//             {/* Form Fields in Rows */}
//             <Box className="flex flex-col gap-4 md:gap-6">
//               <Box className="flex flex-col md:flex-row gap-4">
//                 <Controller
//                   name="name"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Name"
//                       fullWidth
//                       error={!!errors.name}
//                       helperText={errors.name?.message}
//                       sx={{
//                         backgroundColor: "#22252c",
//                         "& .MuiInputBase-input": { color: "#fdfdfd" },
//                         "& .MuiInputLabel-root": { color: "#93c5fd" },
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#3b82f6" },
//                           "&:hover fieldset": { borderColor: "#60a5fa" },
//                           "&.Mui-focused fieldset": { borderColor: "#2563eb" },
//                         },
//                       }}
//                     />
//                   )}
//                 />
//                 <Controller
//                   name="email"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Email"
//                       fullWidth
//                       error={!!errors.email}
//                       helperText={errors.email?.message}
//                        sx={{
//                         backgroundColor: "#22252c",
//                         "& .MuiInputBase-input": { color: "#fdfdfd" },
//                         "& .MuiInputLabel-root": { color: "#93c5fd" },
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#3b82f6" },
//                           "&:hover fieldset": { borderColor: "#60a5fa" },
//                           "&.Mui-focused fieldset": { borderColor: "#2563eb" },
//                         },
//                       }}
//                     />
//                   )}
//                 />
//               </Box>

//               <Box className="flex flex-col md:flex-row gap-4">
//                 <Controller
//                   name="password"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       type="password"
//                       label="Password"
//                       fullWidth
//                       error={!!errors.password}
//                       helperText={errors.password?.message}
//                       sx={{
//                         backgroundColor: "#22252c",
//                         "& .MuiInputBase-input": { color: "#fdfdfd" },
//                         "& .MuiInputLabel-root": { color: "#93c5fd" },
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#3b82f6" },
//                           "&:hover fieldset": { borderColor: "#60a5fa" },
//                           "&.Mui-focused fieldset": { borderColor: "#2563eb" },
//                         },
//                       }}
//                     />
//                   )}
//                 />
//                 <Controller
//                   name="phone"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Phone"
//                       fullWidth
//                       error={!!errors.phone}
//                       helperText={errors.phone?.message}
//                       sx={{
//                         backgroundColor: "#22252c",
//                         "& .MuiInputBase-input": { color: "#fdfdfd" },
//                         "& .MuiInputLabel-root": { color: "#93c5fd" },
//                         "& .MuiOutlinedInput-root": {
//                           "& fieldset": { borderColor: "#3b82f6" },
//                           "&:hover fieldset": { borderColor: "#60a5fa" },
//                           "&.Mui-focused fieldset": { borderColor: "#2563eb" },
//                         },
//                       }}
//                     />
//                   )}
//                 />
//               </Box>

//               <Box className="flex flex-col md:flex-row gap-4">
//                 <Controller
//                 name="location"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Location"
//                     fullWidth
//                     error={!!errors.location}
//                     helperText={errors.location?.message}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         backgroundColor: "#22252c", // container background
//                         "& fieldset": { borderColor: "#3b82f6" },
//                         "&:hover fieldset": { borderColor: "#60a5fa" },
//                         "&.Mui-focused fieldset": { borderColor: "#2563eb" },
//                       },
//                       "& .MuiInputLabel-root": { color: "#93c5fd" }, // label color
//                       "& .MuiInputBase-input": { color: "#fdfdfd" }, // input text color
//                     }}
//                     InputProps={{
//                       sx: {
//                         backgroundColor: "#22252c", // input/textarea bg
//                         height: "60px", // match other single-line inputs
//                         padding: "12px",
//                         color: "#fdfdfd",
//                       },
//                     }}
//                   />
//                 )}
//               />

//               <Controller
//               name="bio"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Bio"
//                   fullWidth
//                   multiline // keep multiline if you want users to type longer locations
//                   rows={1} // looks like a normal input
//                   error={!!errors.bio}
//                   helperText={errors.bio?.message}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       backgroundColor: "#22252c", // container background
//                       "& fieldset": { borderColor: "#3b82f6" },
//                       "&:hover fieldset": { borderColor: "#60a5fa" },
//                       "&.Mui-focused fieldset": { borderColor: "#2563eb" },
//                     },
//                     "& .MuiInputLabel-root": { color: "#93c5fd" }, // label color
//                     "& .MuiInputBase-input": { color: "#fdfdfd" }, // input text color
//                   }}
//                   InputProps={{
//                     sx: {
//                       backgroundColor: "#22252c", // input/textarea bg
//                       height: "60px", // match other single-line inputs
//                       padding: "12px",
//                       color: "#fdfdfd",
//                     },
//                   }}
//                 />
//               )}
//             />

//               </Box>
//             </Box>

//             <Button
//               type="submit"
//               fullWidth
//               disabled={isSubmitting}
//               sx={{
//                 mt: 2,
//                 backgroundColor: "#bc7a24",
//                 color: "white",
//                 py: 1.5,
//                 borderRadius: "9999px",
//                 "&:hover": { backgroundColor: "#bc7a24" },
//               }}
//             >
//               {isSubmitting ? "Registering..." : "Register"}
//             </Button>

//             <p className="mt-4 text-center text-sm text-[#93c5fd]">
//               Already have an account?{" "}
//               <Link href="/login" className="text-white font-semibold hover:text-blue-200 transition">
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </Box>
//     </>
//   );
// };

// export default RegisterPage;






"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, FileText, Compass, Camera } from 'lucide-react';

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  phone: yup.string().required("Phone number is required"),
  location: yup.string().required("Location is required"),
  bio: yup.string().required("Bio is required"),
  role: yup.string().required("Role is required"),
});

type RegisterFormData = yup.InferType<typeof schema>;

const RegisterPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      location: "",
      bio: "",
      role: "",
    },
  });

  const selectedRole = watch("role");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
      if (image) formData.append("profilePic", image);

      await api.post("/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Registration successful!");
      reset();
      removeImage();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
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

        {/* Main Registration Card */}
        <div className="relative z-10 w-full max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg mb-6">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join Journiq
            </h1>
            <p className="text-gray-600">
              Start your extraordinary travel journey today
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div 
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 border-4 border-orange-200 flex items-center justify-center cursor-pointer hover:border-orange-300 transition-colors duration-200 overflow-hidden"
                    onClick={() => document.getElementById("avatarInput")?.click()}
                  >
                    {preview ? (
                      <img 
                        src={preview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-orange-500" />
                    )}
                  </div>
                  {preview && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                    >
                      ×
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  {preview ? "Click to change photo" : "Click to add profile photo"}
                </p>
                <input
                  type="file"
                  id="avatarInput"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I am a:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setValue("role", "traveller")}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === "traveller"
                        ? "border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-orange-300"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`text-2xl ${selectedRole === "traveller" ? "text-orange-500" : "text-gray-400"}`}>
                        ✈️
                      </div>
                      <span className={`font-medium ${selectedRole === "traveller" ? "text-orange-700" : "text-gray-700"}`}>
                        Traveller
                      </span>
                      <span className="text-xs text-gray-500 text-center">
                        Explore destinations
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue("role", "guide")}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === "guide"
                        ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`text-2xl ${selectedRole === "guide" ? "text-amber-500" : "text-gray-400"}`}>
                        🗺️
                      </div>
                      <span className={`font-medium ${selectedRole === "guide" ? "text-amber-700" : "text-gray-700"}`}>
                        Guide
                      </span>
                      <span className="text-xs text-gray-500 text-center">
                        Share local expertise
                      </span>
                    </div>
                  </button>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-2 text-center">{errors.role.message}</p>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...field}
                          placeholder="Enter your full name"
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-200 ${
                            errors.name
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                          }`}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-200 ${
                            errors.email
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
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
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...field}
                          placeholder="Enter your phone number"
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-200 ${
                            errors.phone
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                              : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  )}
                />
              </div>

              {/* Location */}
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...field}
                        placeholder="Where are you located?"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-200 ${
                          errors.location
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        }`}
                      />
                    </div>
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                  </div>
                )}
              />

              {/* Bio */}
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        {...field}
                        placeholder="Tell us about your travel experiences and interests..."
                        rows={4}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-200 resize-none ${
                          errors.bio
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        }`}
                      />
                    </div>
                    {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
                  </div>
                )}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none shadow-md"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
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

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Footer Text */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Join thousands of travelers and guides in creating unforgettable experiences
              </p>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-white/50">
              <div className="text-2xl mb-2">🌍</div>
              <p className="text-sm font-medium text-gray-700">Global Network</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-white/50">
              <div className="text-2xl mb-2">🛡️</div>
              <p className="text-sm font-medium text-gray-700">Secure Platform</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-white/50">
              <div className="text-2xl mb-2">⭐</div>
              <p className="text-sm font-medium text-gray-700">Verified Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;