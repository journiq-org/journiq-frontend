import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { RootState } from "../store";

// Types
export interface Review {
  _id: string;
  tour: string | { _id: string; title?: string };
  user: { _id: string; name: string; profilePic?: string };
  experience: {
    serviceQuality: number;
    punctuality: number;
    satisfactionSurvey: number;
  };
  comment: string;
  createdAt: string;
  isDeleted: boolean;
}

interface ReviewState {
  reviews: Review[];
  review: Review | null; // single review for details/update
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  review: null,
  loading: false,
  error: null,
  successMessage: null,
};

// 🔹 Helper to get cookie token
const getAuthToken = async (): Promise<string> => {
  const cookieRes = await fetch("/api/auth/get-cookie");
  const { token } = await cookieRes.json();
  if (!token) throw new Error("No token found");
  return token;
};

// ✅ Fetch reviews for a specific tour (public)
export const fetchReviewsForTour = createAsyncThunk<
  Review[],
  string,
  { rejectValue: string }
>("reviews/fetchReviewsForTour", async (tourId, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/review/tour/${tourId}`);
    return res.data.reviews as Review[];
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to load reviews"
    );
  }
});

// ✅ Fetch single review by id
export const fetchReviewById = createAsyncThunk<
  Review,
  string,
  { rejectValue: string }
>("reviews/fetchReviewById", async (id, { rejectWithValue }) => {
  try {
    const token = await getAuthToken();
    const res = await api.get(`/api/review/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data.review as Review;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to fetch review"
    );
  }
});

// ✅ Fetch reviews by role (admin/guide)
export const fetchReviewsByRole = createAsyncThunk<
  Review[],
  void,
  { rejectValue: string }
>("reviews/fetchReviewsByRole", async (_, { rejectWithValue }) => {
  try {
    const token = await getAuthToken();
    const res = await api.get("/api/review/get-all-review", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data.reviews as Review[];
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to fetch reviews"
    );
  }
});

// ✅ Fetch all reviews by the logged-in traveller
export const fetchMyReviews = createAsyncThunk<
  Review[],
  void,
  { rejectValue: string }
>("reviews/fetchMyReviews", async (_, { rejectWithValue }) => {
  try {
    const token = await getAuthToken();
    const res = await api.get("/api/review/get-all-review", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data.reviews as Review[];
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to fetch your reviews"
    );
  }
});

// ✅ Add review (requires bookingId)
export const addReview = createAsyncThunk<
  Review,
  {
    tourId: string;
    bookingId: string;
    serviceQuality: number;
    punctuality: number;
    satisfactionSurvey: number;
    comment: string;
  },
  { rejectValue: string }
>("reviews/addReview", async (reviewData, { rejectWithValue }) => {
  try {
    const token = await getAuthToken();
    const { tourId, ...body } = reviewData;

    const res = await api.post(`/api/review/${tourId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data.review as Review;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to add review"
    );
  }
});

// ✅ Update review
export const updateReview = createAsyncThunk<
  Review,
  {
    reviewId: string;
    data: {
      booking: string; // required in payload
      experience: Review["experience"];
      comment: string;
    };
  },
  { rejectValue: string }
>("reviews/updateReview", async ({ reviewId, data }, { rejectWithValue }) => {
  try {
    const token = await getAuthToken();

    const res = await api.patch(`/api/review/update/${reviewId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return res.data.review as Review;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to update review"
    );
  }
});



// ✅ Delete review
export const deleteReview = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("reviews/deleteReview", async (id, { rejectWithValue }) => {
  try {
    const token = await getAuthToken();

    await api.delete(`/api/review/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return id;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to delete review"
    );
  }
});

// ✅ Slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewState: (state) => {
      state.error = null;
      state.successMessage = null;
      state.review = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch reviews for tour
      .addCase(fetchReviewsForTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewsForTour.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsForTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load reviews";
      })
      // fetch single review
      .addCase(fetchReviewById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch review";
      })
      // fetch reviews by role
      .addCase(fetchReviewsByRole.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      // fetch my reviews (traveller)
      .addCase(fetchMyReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchMyReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch your reviews";
      })
      // add review
      .addCase(addReview.fulfilled, (state, action) => {
        state.successMessage = "Review added successfully";
        state.reviews.push(action.payload);
      })
      // update review
      .addCase(updateReview.fulfilled, (state, action) => {
        state.successMessage = "Review updated successfully";
        state.reviews = state.reviews.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
        state.review = action.payload;
      })
      // delete review
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.successMessage = "Review deleted successfully";
        state.reviews = state.reviews.filter((r) => r._id !== action.payload);
        if (state.review?._id === action.payload) {
          state.review = null;
        }
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;

// selectors
export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectReview = (state: RootState) => state.reviews.review;
