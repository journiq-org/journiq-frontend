"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchReviewById, updateReview, selectReview } from "@/redux/slices/reviewSlice";
import { publicViewTourDetails } from "@/redux/slices/tourSlice";
import TravellerNavbar from "@/components/TravellerNavbar";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import toast from "react-hot-toast";

const EditReviewPage = () => {
  const params = useParams<{ id: string }>();
  const reviewId = params?.id;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const review = useAppSelector(selectReview);
  const { selectedTour } = useAppSelector((state) => state.tour);
  const loading = useAppSelector((state) => state.reviews.loading);

  // local form state
  const [serviceQuality, setServiceQuality] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [satisfactionSurvey, setSatisfactionSurvey] = useState(5);
  const [comment, setComment] = useState("");

  // fetch review when page loads
  useEffect(() => {
    if (reviewId) {
      dispatch(fetchReviewById(reviewId));
    }
  }, [dispatch, reviewId]);

  // prefill form when review is loaded
  useEffect(() => {
    if (review && review.experience) {
      setServiceQuality(review.experience.serviceQuality ?? 5);
      setPunctuality(review.experience.punctuality ?? 5);
      setSatisfactionSurvey(review.experience.satisfactionSurvey ?? 5);
      setComment(review.comment ?? "");

      if (review.tour) {
        const tourId = typeof review.tour === "string" ? review.tour : review.tour._id;
        if (tourId) dispatch(publicViewTourDetails(tourId));
      }
    }
  }, [review, dispatch]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewId) return toast.error("Missing review ID");

    try {
      await dispatch(
        updateReview({
          reviewId,
          data: {
            booking:
              typeof review?.tour === "string"
                ? review.tour
                : review?.tour?._id || "", // depends on backend schema
            experience: { serviceQuality, punctuality, satisfactionSurvey },
            comment,
          },
        })
      ).unwrap();

      toast.success("Review updated successfully!");
      router.push("/traveller-dashboard/review/my-reviews"); // redirect to my reviews page
    } catch (err: any) {
      toast.error(err || "Failed to update review");
    }
  };

  return (
    <>
      <TravellerNavbar />
      <div className="min-h-screen bg-[#E2E0DF] p-6 md:p-8 flex justify-center">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-2xl w-full space-y-6">
          <Typography variant="h4" className="text-center mb-6">
            Edit Review
          </Typography>

          {selectedTour && (
            <Card className="mb-4">
              <CardContent>
                <Typography variant="h6">{selectedTour.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedTour.description}
                </Typography>
                <Typography variant="body2">
                  Duration: {selectedTour.duration} days | Price: ${selectedTour.price}
                </Typography>
              </CardContent>
            </Card>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
            <TextField
              label="Service Quality (1-5)"
              type="number"
              value={serviceQuality}
              onChange={(e) => setServiceQuality(Number(e.target.value))}
              inputProps={{ min: 1, max: 5 }}
              fullWidth
              required
            />
            <TextField
              label="Punctuality (1-5)"
              type="number"
              value={punctuality}
              onChange={(e) => setPunctuality(Number(e.target.value))}
              inputProps={{ min: 1, max: 5 }}
              fullWidth
              required
            />
            <TextField
              label="Satisfaction Survey (1-5)"
              type="number"
              value={satisfactionSurvey}
              onChange={(e) => setSatisfactionSurvey(Number(e.target.value))}
              inputProps={{ min: 1, max: 5 }}
              fullWidth
              required
            />
            <TextField
              label="Comment"
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Updating..." : "Update Review"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditReviewPage;
