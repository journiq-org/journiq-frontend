// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import api from "@/lib/api";

// interface Guide {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   createdAt: string;
// }

// interface AdminGuideState {
//   guides: Guide[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AdminGuideState = {
//   guides: [],
//   loading: false,
//   error: null,
// };

// // 🔹 Fetch all guides (admin only)
// export const fetchAllGuides = createAsyncThunk<
//   Guide[],
//   void,
//   { rejectValue: string }
// >("adminGuides/fetchAllGuides", async (_, { rejectWithValue }) => {
//   try {
//     const cookieRes = await fetch("/api/auth/get-cookie");
//     const { token } = await cookieRes.json();
//     if (!token) throw new Error("No token found");

//     const res = await api.get("/api/admin/guide", {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//     });

//     return res.data.data as Guide[];
//   } catch (err: any) {
//     return rejectWithValue(
//       err.response?.data?.message || err.message || "Failed to fetch guides"
//     );
//   }
// });

// const adminGuideSlice = createSlice({
//   name: "adminGuides",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllGuides.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllGuides.fulfilled, (state, action: PayloadAction<Guide[]>) => {
//         state.loading = false;
//         state.guides = action.payload;
//       })
//       .addCase(fetchAllGuides.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch guides";
//       });
//   },
// });

// export default adminGuideSlice.reducer;
