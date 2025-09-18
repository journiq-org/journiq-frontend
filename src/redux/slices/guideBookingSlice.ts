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
  total:number
}

const initialState: GuideBookingState = {
  bookings: [],
  loading: false,
  error: null,
  total:0
};

// Fetch Bookings for Guide
export const fetchGuideBookings = createAsyncThunk
("guideBookings/fetchGuideBookings", async ({skip,limit}:{skip:number,limit:number}) => {
  {
    const res = await api.get(`/api/booking/for-guide?limit=${limit}&skip=${skip}`, {
      withCredentials: true,
    })

    

    return {
          bookings: res.data.bookings ,
          total : res.data.total
        };
  }}
);

// Guide Responds to Booking (accept/reject)
export const respondToBooking = createAsyncThunk<
  Booking,
  { bookingId: string; status: string },
  { rejectValue: string }
>(
  "guideBookings/respondToBooking",
  async ({ bookingId, status }) => {
   
      const res = await api.patch(
        `/api/booking/guide/update-status/${bookingId}`,
        { status },
        {
          withCredentials: true,
        }
      );

      return res.data.booking as Booking;
   
  }
);

// Guide/Admin updates booking status later (confirmed, completed, cancelled, etc.)
export const updateBookingStatus = createAsyncThunk<
  Booking,
  { bookingId: string; status: string },
  { rejectValue: string }
>(
  "guideBookings/updateBookingStatus",
  async ({ bookingId, status }) => {
   
      const res = await api.patch(
        `/api/booking/update-status/${bookingId}`,
        { status },
        {
          withCredentials: true,
        }
      );

      return res.data.booking as Booking;
   
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
        (state, action) => {
          state.loading = false;
          state.bookings = action.payload.bookings
          state.total = action.payload.total
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