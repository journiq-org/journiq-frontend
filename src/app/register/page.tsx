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
import { Box, Button, Avatar, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Link from "next/link";

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

          {/* Additional polaroids for registration page */}
          <div className="absolute top-1/2 left-8 transform rotate-15 opacity-70">
            <div className="bg-white p-2 shadow-lg border-4 border-white">
              <div className="w-20 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute bottom-20 left-1/3 transform -rotate-8 opacity-50">
            <div className="bg-white p-2 shadow-lg border-4 border-white">
              <div className="w-24 h-18 bg-gradient-to-br from-teal-200 to-teal-300 rounded-sm flex items-center justify-center">
                <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Postcard-style registration form */}
        <div className="relative z-10 w-full max-w-2xl transform transition-transform duration-300 hover:rotate-1 hover:scale-105 cursor-pointer">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg shadow-2xl border-4 border-white relative">
            {/* Stamp corners */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-2 border-red-600 transform rotate-12"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500 rounded-full border-2 border-green-600 transform -rotate-12"></div>
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full border border-yellow-500"></div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border border-purple-600 transform rotate-45"></div>

            {/* Postcard content */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">Welcome to</h1>
              <h2 className="text-xl text-blue-600 font-semibold">Your Travel Community</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mt-2 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-4">
                <Avatar
                  src={preview}
                  sx={{ width: 80, height: 80, mb: 2, cursor: "pointer", border: '3px solid #3B82F6' }}
                  onClick={() => document.getElementById("avatarInput")?.click()}
                />
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  Profile Picture
                </Typography>
                {preview && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={removeImage}
                  >
                    Remove
                  </Button>
                )}
                <input
                  type="file"
                  id="avatarInput"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {/* Role Selection */}
              <div className="flex gap-4 justify-center mb-6">
                <Button
                  variant={selectedRole === "traveller" ? "contained" : "outlined"}
                  sx={{
                    backgroundColor: selectedRole === "traveller" ? "#10B981" : "transparent",
                    color: selectedRole === "traveller" ? "white" : "#065F46",
                    border: "2px solid #10B981",
                    borderRadius: "12px",
                    px: 4,
                    py: 2,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: selectedRole === "traveller" ? "#059669" : "#10B981",
                      color: "white",
                    },
                  }}
                  onClick={() => setValue("role", "traveller")}
                >
                  ✈️ Traveller
                </Button>

                <Button
                  variant={selectedRole === "guide" ? "contained" : "outlined"}
                  sx={{
                    backgroundColor: selectedRole === "guide" ? "#F59E0B" : "transparent",
                    color: selectedRole === "guide" ? "white" : "#92400E",
                    border: "2px solid #F59E0B",
                    borderRadius: "12px",
                    px: 4,
                    py: 2,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: selectedRole === "guide" ? "#D97706" : "#F59E0B",
                      color: "white",
                    },
                  }}
                  onClick={() => setValue("role", "guide")}
                >
                  🗺️ Guide
                </Button>
              </div>

              {errors.role && (
                <Typography color="error" variant="caption" sx={{ display: 'block', textAlign: 'center' }}>
                  {errors.role.message}
                </Typography>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        placeholder="Full Name"
                        className={`w-full px-4 py-3 border-2 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none transition-all ${
                          errors.name
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="email"
                        placeholder="Email Address"
                        className={`w-full px-4 py-3 border-2 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none transition-all ${
                          errors.email
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className={`w-full px-4 py-3 border-2 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none transition-all ${
                          errors.password
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                      />
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        placeholder="Phone Number"
                        className={`w-full px-4 py-3 border-2 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none transition-all ${
                          errors.phone
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  )}
                />

                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <div className="md:col-span-2">
                      <input
                        {...field}
                        placeholder="Home Location"
                        className={`w-full px-4 py-3 border-2 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none transition-all ${
                          errors.location
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                      />
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                    </div>
                  )}
                />

                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <div className="md:col-span-2">
                      <textarea
                        {...field}
                        placeholder="Tell us about your travel experiences..."
                        rows={3}
                        className={`w-full px-4 py-3 border-2 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none transition-all resize-none ${
                          errors.bio
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        }`}
                      />
                      {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
                    </div>
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-gray-900 hover:from-blue-600 hover:to-gray-600 text-white font-bold py-3 px-6 rounded-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isSubmitting ? "Creating Account..." : "✈️ Join the Adventure"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-wavy">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Postcard address section styling */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-xs text-gray-500 italic text-center">Begin your travel story today</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;