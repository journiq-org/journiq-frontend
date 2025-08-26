import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { User } from "@/types/user";

interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Fetch profile using token from get-cookies endpoint
export const fetchUserProfile = createAsyncThunk<User>(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const cookieRes = await fetch("/api/auth/get-cookie");
      const { token } = await cookieRes.json();

      if (!token) throw new Error("No token found");

      const res = await api.get("/api/users/view-profile", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      return res.data.data as User;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message || "Failed to load profile");
    }
  }
);

// Edit profile
export const editUserProfile = createAsyncThunk<User, FormData>(
  "user/editUserProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const cookieRes = await fetch("/api/get-cookies");
      const { token } = await cookieRes.json();

      if (!token) throw new Error("No token found");

      const res = await api.patch("/api/users/edit-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return res.data.data as User;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message || "Failed to update profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to load profile";
      })
      .addCase(editUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(editUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = "Profile updated successfully";
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Failed to update profile";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
