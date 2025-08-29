import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

// Thunk to create a tour
export const createTour = createAsyncThunk(
  "tour/createTour",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      // 1. Get token from cookie API
      const cookieRes = await fetch("/api/auth/get-cookie", {
        method: "GET",
        credentials: "include", // ensures cookies are sent
      });
      if (!cookieRes.ok) {
        throw new Error("Failed to fetch auth cookie");
      }
      const { token } = await cookieRes.json();

      // 2. Send tour creation request
      const res = await fetch("/api/tour/createtour", {
        method: "POST",
        credentials: "include", // include cookies
        headers: {
          Authorization: `Bearer ${token}`, // attach token
        },
        body: formData, // FormData (multipart/form-data auto handled by browser)
      });

      const data = await res.json();

      if (!res.ok || !data.status) {
        throw new Error(data.message || "Failed to create tour");
      }

      return data.data; // return the created tour
    } catch (err: any) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

interface TourState {
  tours: any[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TourState = {
  tours: [],
  loading: false,
  error: null,
  success: false,
};

const createtourSlice = createSlice({
  name: "createtour",
  initialState,
  reducers: {
    resetTourState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTour.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTour.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.tours.push(action.payload);
      })
      .addCase(createTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetTourState } = createtourSlice.actions;

export const selectTours = (state: RootState) => state.createtour.tours;
export const selectTourLoading = (state: RootState) => state.createtour.loading;
export const selectTourError = (state: RootState) => state.createtour.error;
export const selectTourSuccess = (state: RootState) => state.createtour.success;

export default createtourSlice.reducer;
