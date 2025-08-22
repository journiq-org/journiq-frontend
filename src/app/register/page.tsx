"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
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
    formState: { errors },
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
      {/* Navbar on top */}
      <Navbar />

      <Box className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 pt-20">
        <Paper
          elevation={8}
          className="w-full max-w-lg p-8 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl"
        >
          <Typography
            variant="h4"
            className="font-extrabold text-indigo-700 text-center mb-2"
          >
            Register
          </Typography>
          <Typography className="text-gray-600 text-center mb-6">
            Create your account 👋
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <Box className="flex gap-2">
                <Button
                  variant="contained"
                  color={selectedRole === "traveller" ? "primary" : "inherit"}
                  onClick={() => setValue("role", "traveller")}
                >
                  Traveller
                </Button>
                <Button
                  variant="contained"
                  color={selectedRole === "guide" ? "primary" : "inherit"}
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

            {/* Form Fields */}
            {(
              ["name", "email", "password", "phone", "location", "bio"] as (
                | keyof RegisterFormData
              )[]
            ).map((field) => (
              <Controller
                key={field}
                name={field}
                control={control}
                render={({ field: f }) => (
                  <TextField
                    {...f}
                    type={field === "password" ? "password" : "text"}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    fullWidth
                    multiline={field === "bio"}
                    rows={field === "bio" ? 3 : 1}
                    error={!!errors[field]}
                    helperText={errors[field]?.message}
                  />
                )}
              />
            ))}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              className="mt-4 bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default RegisterPage;
