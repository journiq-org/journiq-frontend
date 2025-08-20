import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api"; 
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: string;
  phone?: string;
  bio?: string;
  location?: string;
  isVerified?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,
};

// ✅ Login Thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/users/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Login successful");
      return res.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid credentials");
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Register Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Registration successful");
      return res.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);

// ✅ Get Profile Thunk
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const res = await api.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.data;
        localStorage.setItem("token", action.payload.access_token);
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.data;
        localStorage.setItem("token", action.payload.access_token);
        localStorage.setItem("user", JSON.stringify(action.payload.data));
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Profile
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload.data;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
