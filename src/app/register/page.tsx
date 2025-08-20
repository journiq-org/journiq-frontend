"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/api";
import toast from "react-hot-toast";

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

const RegisterPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

const { handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm({
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

// Watch the role value
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

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (image) formData.append("profilePic", image);

      await api.post("/users/register", formData, {
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
    <Container maxWidth="sm">
      <Box
        sx={{
          background: "#f9f9f9",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          mt: 5,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Avatar + Role */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
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

        <Box sx={{ display: "flex", gap: 2 }}>
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

          {/* Name */}
          <Box sx={{ mb: 2 }}>
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
                />
              )}
            />
          </Box>

          {/* Email */}
          <Box sx={{ mb: 2 }}>
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
                />
              )}
            />
          </Box>

          {/* Password */}
          <Box sx={{ mb: 2 }}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Box>

          {/* Phone */}
          <Box sx={{ mb: 2 }}>
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
                />
              )}
            />
          </Box>

          {/* Location */}
          <Box sx={{ mb: 2 }}>
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
                />
              )}
            />
          </Box>

          {/* Bio */}
          <Box sx={{ mb: 2 }}>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bio"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.bio}
                  helperText={errors.bio?.message}
                />
              )}
            />
          </Box>

          {/* Submit */}
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
