// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import api from "@/lib/api";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   createdAt: string;
// }

// interface AdminUserState {
//   users: User[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AdminUserState = {
//   users: [],
//   loading: false,
//   error: null,
// };

// // 🔹 Fetch all users (travellers) - admin only
// export const fetchAllUsers = createAsyncThunk<
//   User[],
//   void,
//   { rejectValue: string }
// >("adminUsers/fetchAllUsers", async (_, { rejectWithValue }) => {
//   try {
//     const cookieRes = await fetch("/api/auth/get-cookie");
//     const { token } = await cookieRes.json();
//     if (!token) throw new Error("No token found");

//     const res = await api.get("/api/admin/users", {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//     });

//     return res.data.data as User[];
//   } catch (err: any) {
//     return rejectWithValue(
//       err.response?.data?.message || err.message || "Failed to fetch users"
//     );
//   }
// });

// const adminUserSlice = createSlice({
//   name: "adminUsers",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchAllUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch users";
//       });
//   },
// });

// export default adminUserSlice.reducer;
