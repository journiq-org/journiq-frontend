"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addReview, clearReviewState } from "@/redux/slices/reviewSlice";
import { fetchBookings } from "@/redux/slices/bookingSlice";
import { publicViewTourDetails } from "@/redux/slices/tourSlice";
import TravellerNavbar from "@/components/TravellerNavbar";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import toast from "react-hot-toast";

const AddReviewPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { loading, error, successMessage } = useAppSelector((state) => state.reviews);
  const { bookings } = useAppSelector((state) => state.booking);
  const { selectedTour } = useAppSelector((state) => state.tour);

  const bookingId = searchParams.get("bookingId") || "";
  const tourId = searchParams.get("tourId") || "";

  const [serviceQuality, setServiceQuality] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [satisfactionSurvey, setSatisfactionSurvey] = useState(5);
  const [comment, setComment] = useState("");

  // ✅ Fetch booking + tour details when page loads
  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookings());
    }
    if (tourId) {
      dispatch(publicViewTourDetails(tourId));
    }
  }, [dispatch, bookingId, tourId]);

  const bookingDetail = bookings.find((b) => b._id === bookingId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourId || !bookingId) return toast.error("Missing booking or tour ID");

    try {
      await dispatch(
        addReview({ tourId, bookingId, serviceQuality, punctuality, satisfactionSurvey, comment })
      ).unwrap();

      toast.success("Review added successfully!");
      dispatch(clearReviewState());
      router.push("/booking/my-booking");
    } catch (err: any) {
      toast.error(err || "Failed to add review");
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (successMessage) toast.success(successMessage);
  }, [error, successMessage]);

  return (
    <>
      <TravellerNavbar />
      <div className="min-h-screen bg-[#E2E0DF] p-6 md:p-8 flex justify-center">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-2xl w-full space-y-6">
          <Typography variant="h4" className="mb-6 text-center">
            Add Review
          </Typography>

          {/* ✅ Show Tour Details */}
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

          {/* ✅ Show Booking Details */}
          {bookingDetail && (
            <Card className="mb-4">
              <CardContent>
                <Typography variant="h6">Booking Details</Typography>
                <Typography variant="body2">Date: {bookingDetail.date}</Typography>
                <Typography variant="body2">
                  Number of People: {bookingDetail.numOfPeople}
                </Typography>
                <Typography variant="body2">Status: {bookingDetail.status}</Typography>
              </CardContent>
            </Card>
          )}

          {/* Review Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              label="Comments"
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              required
            />

            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddReviewPage;
