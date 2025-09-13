import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";

interface Booking {
  _id: string;
  user: { name: string; email: string }; // traveller
  tour: { title: string; description: string };
  status: string;
  createdAt: string;
}

interface GuideBookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: GuideBookingState = {
  bookings: [],
  loading: false,
  error: null,
};

// 🔹 Fetch Bookings for Guide
export const fetchGuideBookings = createAsyncThunk<
  Booking[],
  void,
  { rejectValue: string }
>("guideBookings/fetchGuideBookings", async (_, { rejectWithValue }) => {
  try {
    // const cookieRes = await fetch("/api/auth/get-cookie");
    // const { token } = await cookieRes.json();

    // if (!token) throw new Error("No token found");

    const res = await api.get("/api/booking/for-guide", {
      // headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data.bookings as Booking[];
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to fetch bookings"
    );
  }
});

// 🔹 Guide Responds to Booking (accept/reject)
export const respondToBooking = createAsyncThunk<
  Booking,
  { bookingId: string; status: string },
  { rejectValue: string }
>(
  "guideBookings/respondToBooking",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `/api/booking/guide/update-status/${bookingId}`,
        { status },
        {
          withCredentials: true,
        }
      );

      return res.data.booking as Booking;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to update booking"
      );
    }
  }
);

// 🔹 Guide/Admin updates booking status later (confirmed, completed, cancelled, etc.)
export const updateBookingStatus = createAsyncThunk<
  Booking,
  { bookingId: string; status: string },
  { rejectValue: string }
>(
  "guideBookings/updateBookingStatus",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      // const cookieRes = await fetch("/api/auth/get-cookie");
      // const { token } = await cookieRes.json();

      // if (!token) throw new Error("No token found");

      const res = await api.patch(
        `/api/booking/update-status/${bookingId}`,
        { status },
        {
          // headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      return res.data.booking as Booking;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Failed to update booking status"
      );
    }
  }
);

const guideBookingSlice = createSlice({
  name: "guideBookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchGuideBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGuideBookings.fulfilled,
        (state, action: PayloadAction<Booking[]>) => {
          state.loading = false;
          state.bookings = action.payload;
        }
      )
      .addCase(fetchGuideBookings.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch bookings";
      })

      // respond
      .addCase(
        respondToBooking.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.bookings = state.bookings.map((b) =>
            b._id === action.payload._id ? action.payload : b
          );
        }
      )
      .addCase(respondToBooking.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "Failed to update booking";
      })

      // update status
      .addCase(
        updateBookingStatus.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.bookings = state.bookings.map((b) =>
            b._id === action.payload._id ? action.payload : b
          );
        }
      )
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "Failed to update booking status";
      });
  },
});

export default guideBookingSlice.reducer;