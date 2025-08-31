// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import api from "@/lib/api";

// interface Booking {
//   _id: string;
//   user: { name: string; email: string };
//   tour: { title: string; description: string };
//   status: string;
//   createdAt: string;
// }

// interface AdminBookingState {
//   bookings: Booking[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AdminBookingState = {
//   bookings: [],
//   loading: false,
//   error: null,
// };

// // 🔹 Fetch bookings by tour ID (admin only)
// export const fetchBookingsByTourId = createAsyncThunk<
//   Booking[],
//   string, // tourId
//   { rejectValue: string }
// >(
//   "adminBookings/fetchBookingsByTourId",
//   async (tourId, { rejectWithValue }) => {
//     try {
//       const cookieRes = await fetch("/api/auth/get-cookie");
//       const { token } = await cookieRes.json();

//       if (!token) throw new Error("No token found");

//       const res = await api.get(`/api/booking/get-booking/${tourId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       return res.data.bookings as Booking[];
//     } catch (err: any) {
//       return rejectWithValue(
//         err.response?.data?.message || err.message || "Failed to fetch bookings"
//       );
//     }
//   }
// );

// const adminBookingSlice = createSlice({
//   name: "adminBookings",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBookingsByTourId.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchBookingsByTourId.fulfilled,
//         (state, action: PayloadAction<Booking[]>) => {
//           state.loading = false;
//           state.bookings = action.payload;
//         }
//       )
//       .addCase(fetchBookingsByTourId.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch bookings";
//       });
//   },
// });

// export default adminBookingSlice.reducer;
