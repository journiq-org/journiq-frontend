
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { Booking } from "@/types/booking";
import { Tour } from "@/types/tour";

//  Local state type
interface BookingState {
  bookings: Booking[];
  publicTours: Tour[];
  availability: { available: boolean; slots: number; message?: string } | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

//  Initial state
const initialState: BookingState = {
  bookings: [],
  publicTours: [],
  availability: null,
  loading: false,
  error: null,
  successMessage: null,
};

//  Check Availability
export const checkAvailability = createAsyncThunk<
  { available: boolean; slots: number; message?: string },
  { tourId: string; date: string; numOfPeople: number },
  { rejectValue: string }
>(
  "booking/checkAvailability",
  async ({ tourId, date, numOfPeople }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/booking/checkAvailability`, {
        withCredentials: true,
        params: { tourId, date, numOfPeople },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to check availability");
    }
  }
);

//  Fetch Bookings
export const fetchBookings = createAsyncThunk<Booking[]>(
  "booking/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/booking/my-booking", {
        withCredentials: true,
      });
      return res.data.bookings as Booking[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch bookings");
    }
  }
);

//  Create Booking
export const createBooking = createAsyncThunk<
  Booking,
  { tourId: string; date: string; numOfPeople: number }
>(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/booking/create-booking", bookingData, {
        withCredentials: true,
      });
      return res.data.booking as Booking;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to create booking");
    }
  }
);

//  Cancel Booking
export const cancelBooking = createAsyncThunk<Booking, string>(
  "booking/cancelBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/api/booking/cancel/${bookingId}`, {
        withCredentials: true,
      });
      return res.data.booking as Booking;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to cancel booking");
    }
  }
);

//  Fetch Public Tours
export const fetchPublicTours = createAsyncThunk<Tour[]>(
  "booking/fetchPublicTours",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/tours/public");
      return res.data.data as Tour[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch public tours");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBookingState: (state) => {
      state.error = null;
      state.successMessage = null;
      state.availability = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch bookings";
      })

      // create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.successMessage = "Booking created successfully";
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create booking";
      })

      // cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.bookings = state.bookings.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
        state.successMessage = "Booking cancelled successfully";
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to cancel booking";
      })

      // fetch public tours
      .addCase(fetchPublicTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicTours.fulfilled, (state, action: PayloadAction<Tour[]>) => {
        state.loading = false;
        state.publicTours = action.payload;
      })
      .addCase(fetchPublicTours.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch tours";
      })

      // check availability
      .addCase(checkAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = action.payload;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to check availability";
      });
  },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;