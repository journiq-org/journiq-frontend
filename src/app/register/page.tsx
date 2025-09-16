"use client";

import React, { useState } from "react";
import { Box, Button, Avatar, Typography, TextField } from "@mui/material";
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
      <Box className="flex min-h-screen items-center justify-center p-4 pt-24 bg-[#d1cfc8]">
        <div className="w-full max-w-3xl rounded-3xl bg-[#1f2937]/90 p-8 shadow-2xl backdrop-blur-md border border-[#3b82f6]/30">
          <h1 className="text-4xl font-extrabold text-[#fdfdfd] text-center mb-2">Register</h1>
          <p className="text-[#93c5fd] text-center mb-6">Create your account 👋</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar + Role */}
            <Box className="flex flex-col items-center mb-4">
              <Avatar
                src={preview}
                sx={{ width: 100, height: 100, mb: 2, cursor: "pointer" }}
                onClick={() => document.getElementById("avatarInput")?.click()}
              />
              {preview && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ mb: 2 }}
                  onClick={removeImage}
                >
                  Remove Image
                </Button>
              )}
              <input
                type="file"
                id="avatarInput"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />

              <Box className="flex gap-2 mt-2">
                <Button
                  variant={selectedRole === "traveller" ? "contained" : "outlined"}
                  sx={{
                    backgroundColor: selectedRole === "traveller" ? "#6b5f30ff" : "#d1cfc8",
                    color: selectedRole === "traveller" ? "white" : "#0c0c0c",
                    "&:hover": {
                      backgroundColor: selectedRole === "traveller" ? "#6b5f30ff" : "#d1cfc8",
                    },
                  }}
                  onClick={() => setValue("role", "traveller")}
                >
                  Traveller
                </Button>

                <Button
                  variant={selectedRole === "guide" ? "contained" : "outlined"}
                  sx={{
                    backgroundColor: selectedRole === "guide" ? "#484b46ff" : "#d1cfc8",
                    color: selectedRole === "guide" ? "white" : "#0c0c0c",
                    "&:hover": {
                      backgroundColor: selectedRole === "guide" ? "#484b46ff" : "#d1cfc8",
                    },
                  }}
                  onClick={() => setValue("role", "guide")}
                >
                  Guide
                </Button>
              </Box>

              {errors.role && (
                <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                  {errors.role.message}
                </Typography>
              )}
            </Box>

            {/* Form Fields in Rows */}
            <Box className="flex flex-col gap-4 md:gap-6">
              <Box className="flex flex-col md:flex-row gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      sx={{
                        backgroundColor: "#22252c",
                        "& .MuiInputBase-input": { color: "#fdfdfd" },
                        "& .MuiInputLabel-root": { color: "#93c5fd" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#3b82f6" },
                          "&:hover fieldset": { borderColor: "#60a5fa" },
                          "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                       sx={{
                        backgroundColor: "#22252c",
                        "& .MuiInputBase-input": { color: "#fdfdfd" },
                        "& .MuiInputLabel-root": { color: "#93c5fd" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#3b82f6" },
                          "&:hover fieldset": { borderColor: "#60a5fa" },
                          "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Box className="flex flex-col md:flex-row gap-4">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Password"
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      sx={{
                        backgroundColor: "#22252c",
                        "& .MuiInputBase-input": { color: "#fdfdfd" },
                        "& .MuiInputLabel-root": { color: "#93c5fd" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#3b82f6" },
                          "&:hover fieldset": { borderColor: "#60a5fa" },
                          "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      sx={{
                        backgroundColor: "#22252c",
                        "& .MuiInputBase-input": { color: "#fdfdfd" },
                        "& .MuiInputLabel-root": { color: "#93c5fd" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#3b82f6" },
                          "&:hover fieldset": { borderColor: "#60a5fa" },
                          "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Box className="flex flex-col md:flex-row gap-4">
                <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Location"
                    fullWidth
                    error={!!errors.location}
                    helperText={errors.location?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#22252c", // container background
                        "& fieldset": { borderColor: "#3b82f6" },
                        "&:hover fieldset": { borderColor: "#60a5fa" },
                        "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                      },
                      "& .MuiInputLabel-root": { color: "#93c5fd" }, // label color
                      "& .MuiInputBase-input": { color: "#fdfdfd" }, // input text color
                    }}
                    InputProps={{
                      sx: {
                        backgroundColor: "#22252c", // input/textarea bg
                        height: "60px", // match other single-line inputs
                        padding: "12px",
                        color: "#fdfdfd",
                      },
                    }}
                  />
                )}
              />

              <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bio"
                  fullWidth
                  multiline // keep multiline if you want users to type longer locations
                  rows={1} // looks like a normal input
                  error={!!errors.bio}
                  helperText={errors.bio?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#22252c", // container background
                      "& fieldset": { borderColor: "#3b82f6" },
                      "&:hover fieldset": { borderColor: "#60a5fa" },
                      "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                    },
                    "& .MuiInputLabel-root": { color: "#93c5fd" }, // label color
                    "& .MuiInputBase-input": { color: "#fdfdfd" }, // input text color
                  }}
                  InputProps={{
                    sx: {
                      backgroundColor: "#22252c", // input/textarea bg
                      height: "60px", // match other single-line inputs
                      padding: "12px",
                      color: "#fdfdfd",
                    },
                  }}
                />
              )}
            />

              </Box>
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              sx={{
                mt: 2,
                backgroundColor: "#bc7a24",
                color: "white",
                py: 1.5,
                borderRadius: "9999px",
                "&:hover": { backgroundColor: "#bc7a24" },
              }}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>

            <p className="mt-4 text-center text-sm text-[#93c5fd]">
              Already have an account?{" "}
              <Link href="/login" className="text-white font-semibold hover:text-blue-200 transition">
                Login
              </Link>
            </p>
          </form>
        </div>
      </Box>
    </>
  );
};

export default RegisterPage;
