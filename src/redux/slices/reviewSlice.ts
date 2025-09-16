import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { RootState } from "../store";
import { Review, ReviewState } from "@/types/review";

//  Initial State
const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
  message: null,
  total: 0
};

// Add Review
export const addReview = createAsyncThunk(
  "review/addReview",
  async ({
    tourId,
    bookingId,
    rating,
    comment,
  }: {
    tourId: string;
    bookingId: string;
    rating: number;
    comment: string;
  }) => {
    const res = await api.post(
      `/api/review/${tourId}`,
      { bookingId, rating, comment },
      { withCredentials: true }
    );
    return {
     review: res.data.review
    }
  }
);

//  Get Reviews for a Tour
export const getReviewsForTour = createAsyncThunk(
  "review/getReviewsForTour",
  async (tourId: string) => {
    const res = await api.get(`/api/review/tour/${tourId}`);
    return res.data.reviews as Review[];
  }
);

//  Get Reviews for admin
export const getReviewsByRole = createAsyncThunk(
  "review/getReviewsByRole",
  async ({page, limit , skip}: {page: number, limit:number, skip: number}) => {
    const res = await api.get(`/api/review/get-all-review?limit=${limit}&skip=${skip}`, {
      withCredentials: true,
    });
    return {
      review:res.data.reviews,
      total: res.data.total 
    }
  }
);

//  Update Review
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({
    reviewId,
    rating,
    comment,
  }: {
    reviewId: string;
    rating?: number;
    comment?: string;
  }) => {
    const res = await api.patch(
      `/api/review/update/${reviewId}`,
      { rating, comment },
      { withCredentials: true }
    );
    return res.data.review as Review;
  }
);

//  Delete Review
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (id: string) => {
    await api.delete(`/api/review/delete/${id}`, {
      withCredentials: true,
    });
    return id;
  }
);

// -------- Slice --------
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload.review);
        state.message = "Review added successfully";
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add review";
      })

      // Get Reviews for Tour
      .addCase(getReviewsForTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsForTour.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviewsForTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load reviews";
      })

      // Get Reviews as admin
      .addCase(getReviewsByRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.review
        state.total = action.payload.total
      })
      .addCase(getReviewsByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reviews";
      })

      // Update Review
      .addCase(updateReview.fulfilled, (state, action) => {
        state.message = "Review updated successfully";
        state.reviews = state.reviews.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
      })

      // Delete Review
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.message = "Review deleted successfully";
        state.reviews = state.reviews.filter((r) => r._id !== action.payload);
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;

//  Selectors
export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectReviewError = (state: RootState) => state.reviews.error;
export const selectReviewMessage = (state: RootState) => state.reviews.message;
export const selectReviewLoading = (state: RootState) => state.reviews.loading;
