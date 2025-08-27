import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface User { name: string; email: string; }
interface Tour { title: string; }

export interface Booking {
  _id: string;
  tour: Tour;
  user: User;
  numOfPeople: number;
  totalPrice: number;
  date: string;
  status: string;
}

interface BookingState { bookings: Booking[]; loading: boolean; }

const initialState: BookingState = { bookings: [], loading: false };

// Fetch guide's bookings
export const fetchGuideBookings = createAsyncThunk(
  'guideBookings/fetchGuideBookings',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/booking/for-guide', {
        withCredentials: true, // ✅ send cookies automatically
      });
      return res.data.bookings;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

// Update booking status
export const updateBookingStatus = createAsyncThunk(
  'guideBookings/updateBookingStatus',
  async ({ bookingId, status }: { bookingId: string; status: string }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/booking/${bookingId}/status`,
        { status },
        { withCredentials: true } // ✅ send cookies automatically
      );
      toast.success(res.data.message);
      return res.data.booking;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update booking status');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const guideBookingSlice = createSlice({
  name: 'guideBookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuideBookings.pending, (state) => { state.loading = true; })
      .addCase(fetchGuideBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchGuideBookings.rejected, (state) => { state.loading = false; })
      .addCase(updateBookingStatus.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.bookings = state.bookings.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      });
  },
});

export default guideBookingSlice.reducer;
