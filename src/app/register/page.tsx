"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";

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
      <Navbar />

      <Box className="flex min-h-screen items-center justify-center bg-[#E2E0DF] p-4 pt-24">
        <Paper className="w-full max-w-lg p-8 rounded-3xl bg-[#d1cfc8]/95 shadow-lg backdrop-blur-md">
          <Typography className="text-4xl font-extrabold text-[#0c0c0c] text-center mb-2">
            Register
          </Typography>
          <Typography className="text-[#4E4D45] text-center mb-6">
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
                  variant={selectedRole === "traveller" ? "contained" : "outlined"}
                  sx={{
                    backgroundColor:
                      selectedRole === "traveller" ? "#0c0c0c" : "white",
                    color: selectedRole === "traveller" ? "white" : "#0c0c0c",
                    "&:hover": {
                      backgroundColor: selectedRole === "traveller" ? "#4E4D45" : "#d1cfc8",
                    },
                  }}
                  onClick={() => setValue("role", "traveller")}
                >
                  Traveller
                </Button>

                <Button
                  variant={selectedRole === "guide" ? "contained" : "outlined"}
                  sx={{
                    backgroundColor:
                      selectedRole === "guide" ? "#0c0c0c" : "white",
                    color: selectedRole === "guide" ? "white" : "#0c0c0c",
                    "&:hover": {
                      backgroundColor: selectedRole === "guide" ? "#4E4D45" : "#d1cfc8",
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

            {/* Form Fields */}
            {(["name", "email", "password", "phone", "location", "bio"] as (keyof RegisterFormData)[]).map(
              (field) => (
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
                      sx={{
                        backgroundColor: "white",
                        "& .MuiInputBase-input": { color: "#0c0c0c" },
                        "& .MuiInputLabel-root": { color: "#4E4D45" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#4E4D45",
                          },
                          "&:hover fieldset": {
                            borderColor: "#0c0c0c",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#0c0c0c",
                          },
                        },
                      }}
                    />
                  )}
                />
              )
            )}

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#0c0c0c",
                color: "white",
                py: 1.5,
                borderRadius: "9999px",
                "&:hover": { backgroundColor: "#4E4D45" },
              }}
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