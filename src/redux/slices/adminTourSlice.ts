// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import api from "@/lib/api";

// interface Tour {
//   _id: string;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   duration: number;
//   rating: number;
//   popularity?: number;
//   guide: { name: string; email: string };
//   destination: { name: string };
//   availability?: { date: string; slots: number }[];
//   createdAt: string;
// }

// interface AdminTourState {
//   tours: Tour[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AdminTourState = {
//   tours: [],
//   loading: false,
//   error: null,
// };

// // 🔹 Fetch all tours with optional filters
// export const fetchAllTours = createAsyncThunk<
//   Tour[],
//   Record<string, string | number | undefined>,
//   { rejectValue: string }
// >(
//   "adminTours/fetchAllTours",
//   async (filters = {}, { rejectWithValue }) => {
//     try {
//       const cookieRes = await fetch("/api/auth/get-cookie");
//       const { token } = await cookieRes.json();
//       if (!token) throw new Error("No token found");

//       // Build query params
//       const params = new URLSearchParams();
//       Object.entries(filters).forEach(([key, value]) => {
//         if (value !== undefined && value !== "") params.append(key, String(value));
//       });

//       const res = await api.get(`/api/tour/viewAll`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       return res.data.data as Tour[];
//     } catch (err: any) {
//       return rejectWithValue(
//         err.response?.data?.message || err.message || "Failed to fetch tours"
//       );
//     }
//   }
// );

// const adminTourSlice = createSlice({
//   name: "adminTours",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllTours.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllTours.fulfilled, (state, action: PayloadAction<Tour[]>) => {
//         state.loading = false;
//         state.tours = action.payload;
//       })
//       .addCase(fetchAllTours.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch tours";
//       });
//   },
// });

// export default adminTourSlice.reducer;
