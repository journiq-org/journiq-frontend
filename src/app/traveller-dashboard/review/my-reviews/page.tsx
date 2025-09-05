"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getReviewsByRole,
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
  Rating,
  Fade,
} from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import TravellerNavbar from "@/components/TravellerNavbar";

function MyReviewsPage() {   // 👈 use `function` instead of `const`
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { reviews, loading, error, message } = useSelector(
    (state: RootState) => state.reviews
  );

  const [localReviews, setLocalReviews] = useState(reviews);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getReviewsByRole());
    return () => {
      dispatch(clearReviewState());
    };
  }, [dispatch]);

  useEffect(() => {
    setLocalReviews(reviews);
  }, [reviews]);

  const handleDeleteClick = (id: string) => {
    setSelectedReviewId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedReviewId) {
      await dispatch(deleteReview(selectedReviewId));
      setLocalReviews((prev) => prev.filter((r) => r._id !== selectedReviewId));
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
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress size={40} />
      </Box>
    );

  return (
    <>
      <TravellerNavbar />
      <Box
        sx={{
          minHeight: "100vh",
          p: { xs: 2, md: 6 },
         backgroundColor: "#E2E0DF",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ textAlign: "center", mb: 4 }}
        >
          My Reviews
        </Typography>

        {error && (
          <Typography color="error" mb={2} textAlign="center">
            {error}
          </Typography>
        )}
        {message && (
          <Typography color="primary" mb={2} textAlign="center">
            {message}
          </Typography>
        )}

        {localReviews.length === 0 ? (
          <Typography textAlign="center" mt={6}>
            No reviews found
          </Typography>
        ) : (
          <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
            {localReviews.map((review) => (
              <Fade in timeout={500} key={review._id}>
                <Card
                  sx={{
                    width: { xs: "100%", md: "45%" },
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    backdropFilter: "blur(6px)",
                    background: "rgba(255,255,255,0.9)",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography variant="h6" fontWeight="600">
                        {typeof review.tour === "string"
                          ? "Tour"
                          : review.tour?.title || "Tour"}
                      </Typography>
                      <Box>
                        <IconButton
                          onClick={() => handleEdit(review._id)}
                          color="primary"
                        >
                          <Edit size={20} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(review._id)}
                          color="error"
                        >
                          <Trash2 size={20} />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant="body1" mb={1}>
                      {review.comment}
                    </Typography>

                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      precision={0.5}
                      size="small"
                    />

                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      mt={1}
                    >
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </Box>
        )}

        <Dialog open={openDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this review?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default MyReviewsPage;
