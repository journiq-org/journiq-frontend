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

// 🔹 Fetch profile
export const fetchUserProfile = createAsyncThunk<User>(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/users/view-profile", {
        withCredentials: true,
      });
      return res.data.data as User;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to load profile");
    }
  }
);

// 🔹 Edit profile
export const editUserProfile = createAsyncThunk<User, FormData>(
  "user/editUserProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.patch("/api/users/edit-profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data as User;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to update profile");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
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
        state.error = (action.payload as string) || "Failed to load profile";
      })

      // edit
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
        state.error = (action.payload as string) || "Failed to update profile";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
