"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchMyReviews,
  deleteReview,
  clearReviewState,
} from "@/redux/slices/reviewSlice";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import TravellerNavbar from "@/components/TravellerNavbar";

const MyReviewsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { reviews: reduxReviews, loading, error, successMessage } = useSelector(
    (state: RootState) => state.reviews
  );

  const [reviews, setReviews] = useState(reduxReviews);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMyReviews());
    return () => {
      dispatch(clearReviewState());
    };
  }, [dispatch]);

  // Keep local reviews updated with redux
  useEffect(() => {
    setReviews(reduxReviews);
  }, [reduxReviews]);

  const handleDeleteClick = (id: string) => {
    setSelectedReviewId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedReviewId) {
      await dispatch(deleteReview(selectedReviewId));
      // Remove the deleted review locally
      setReviews((prev) => prev.filter((r) => r._id !== selectedReviewId));
      setOpenDialog(false);
      setSelectedReviewId(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedReviewId(null);
  };

  const handleEdit = (id: string) => {
    router.push(`/traveller-dashboard/review/update/${id}`);
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
    <TravellerNavbar/>
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        My Reviews
      </Typography>

      {error && <Typography color="error" mb={2}>{error}</Typography>}
      {successMessage && <Typography color="primary" mb={2}>{successMessage}</Typography>}

      {reviews.length === 0 ? (
        <Typography>No reviews found</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {reviews.map((review) => (
            <Card key={review._id} sx={{ width: "100%", md: "48%" }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="h6">
                    {typeof review.tour === "string" ? "Tour Name" : review.tour.title}
                  </Typography>
                  <Box>
                    <IconButton onClick={() => handleEdit(review._id)}>
                      <Edit size={18} />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(review._id)}>
                      <Trash2 size={18} color="red" />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" mb={1}>{review.comment}</Typography>

                <Typography variant="body2" color="textSecondary">
                  Service Quality: {review.experience.serviceQuality} |{" "}
                  Punctuality: {review.experience.punctuality} |{" "}
                  Satisfaction: {review.experience.satisfactionSurvey}
                </Typography>

                <Typography variant="caption" color="textSecondary" display="block" mt={1}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this review?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
};

export default MyReviewsPage;
