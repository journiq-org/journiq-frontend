



"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addReview, clearReviewState } from "@/redux/slices/reviewSlice";
import { fetchBookings } from "@/redux/slices/bookingSlice";
import { publicViewTourDetails } from "@/redux/slices/tourSlice";
import TravellerNavbar from "@/components/TravellerNavbar";
import { 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent,
  Box,
  CircularProgress,
  Rating,
  Alert,
  Paper,
  Divider,
  IconButton,
  Fade,
  Chip,
  Avatar
} from "@mui/material";
import { 
  Star, 
  MessageSquare, 
  Calendar, 
  Users, 
  IndianRupee, 
  MapPin, 
  ArrowLeft, 
  Send,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import toast from "react-hot-toast";

const themeColors = {
  background: '#e2e0df',
  primary: '#3b82f6',
  secondary: '#ff9100',
  white: '#fdfdfd',
  lightBlue: '#93c5fd',
  textPrimary: '#333333',
  textSecondary: '#363636',
  textDark: '#22252c',
  lightGray: '#f8f7f5',
  border: '#e4e2e1',
};

const AddReviewPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { loading, error, message } = useAppSelector((state) => state.reviews);
  const { bookings } = useAppSelector((state) => state.booking);
  const { selectedTour } = useAppSelector((state) => state.tour);

  const bookingId = searchParams.get("bookingId") || "";
  const tourId = searchParams.get("tourId") || "";

const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  // Fetch booking + tour details
  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookings({skip:0, limit:100}));
    }
    if (tourId) {
      dispatch(publicViewTourDetails(tourId));
    }
  }, [dispatch, bookingId, tourId]);

  const bookingDetail = bookings.find((b) => b._id === bookingId);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (!tourId || !bookingId) {
      toast.error("Missing booking or tour ID");
      return;
    }

    if (rating === null) {
      toast.error("Please select a rating before submitting");
      return;
    }

    await dispatch(
      addReview({ 
        tourId, 
        bookingId, 
        comment, 
        rating: Number(rating) 
      })
    ).unwrap();

    toast.success("✅ Review added successfully!");
    dispatch(clearReviewState());
    router.push("/booking/my-booking");

  } catch (err: any) {
    const errorMessage = err?.message || err;
    if (
      typeof errorMessage === "string" &&
      errorMessage.toLowerCase().includes("already")
    ) {
      toast.error("⚠️ Review already exists for this booking!");
    } else {
      toast.error(errorMessage || "Failed to add review");
    }
  }
};


const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
  setRating(newValue); 
};

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [error, message]);

  return (
    <>
      <TravellerNavbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: themeColors.background,
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Header Section */}
        <Box maxWidth="900px" mx="auto" mb={4}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <IconButton
              onClick={() => router.push("/booking/my-booking")}
              sx={{
                color: themeColors.primary,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                '&:hover': { backgroundColor: themeColors.primary, color: themeColors.white }
              }}
            >
              <ArrowLeft size={20} />
            </IconButton>
            <Typography
              variant="h4"
              fontWeight="700"
              sx={{ color: themeColors.textDark }}
            >
              Write a Review
            </Typography>
          </Box>
          
          <Typography
            variant="body1"
            sx={{ 
              color: themeColors.textSecondary,
              mb: 4
            }}
          >
            Share your experience and help others discover great tours
          </Typography>
        </Box>

        {/* Status Messages */}
        {(error || message) && (
          <Box maxWidth="900px" mx="auto" mb={4}>
            <Fade in timeout={600}>
              <Alert 
                severity={error ? "error" : "success"}
                sx={{
                  borderRadius: '12px',
                  '& .MuiAlert-icon': {
                    color: error ? '#D32F2F' : '#2E7D32'
                  }
                }}
              >
                {error || message}
              </Alert>
            </Fade>
          </Box>
        )}

        {/* Main Content */}
        <Box maxWidth="900px" mx="auto">
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={4} mb={6}>
            {/* Tour Details Card */}
            {selectedTour && (
              <Card
                sx={{
                  borderRadius: '20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  backgroundColor: themeColors.white,
                  border: `1px solid ${themeColors.border}`,
                  height: 'fit-content'
                }}
              >
                <Box 
                  sx={{ 
                    height: '6px', 
                    background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.secondary})`,
                    width: '100%',
                    borderRadius: '20px 20px 0 0'
                  }} 
                />

                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Avatar sx={{ backgroundColor: themeColors.primary, color: themeColors.white }}>
                      <MapPin size={20} />
                    </Avatar>
                    <Typography variant="h6" fontWeight="600" sx={{ color: themeColors.textDark }}>
                      Tour Details
                    </Typography>
                  </Box>

                  <Typography variant="h5" fontWeight="700" sx={{ color: themeColors.textDark, mb: 2 }}>
                    {selectedTour.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: themeColors.textSecondary, mb: 3, lineHeight: 1.6 }}>
                    {selectedTour.description}
                  </Typography>

                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <Chip
                      icon={<Calendar size={16} />}
                      label={`${selectedTour.duration} days`}
                      sx={{
                        backgroundColor: themeColors.lightGray,
                        color: themeColors.textPrimary,
                        '& .MuiChip-icon': { color: themeColors.primary }
                      }}
                    />
                    <Chip
                      icon={<IndianRupee size={16} />}
                      label={`₹${selectedTour.price?.toLocaleString()}`}
                      sx={{
                        backgroundColor: themeColors.secondary,
                        color: themeColors.white,
                        '& .MuiChip-icon': { color: themeColors.white }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Booking Details Card */}
            {bookingDetail && (
              <Card
                sx={{
                  borderRadius: '20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  backgroundColor: themeColors.white,
                  border: `1px solid ${themeColors.border}`,
                  height: 'fit-content'
                }}
              >
                <Box 
                  sx={{ 
                    height: '6px', 
                    background: `linear-gradient(90deg, ${themeColors.secondary}, ${themeColors.primary})`,
                    width: '100%',
                    borderRadius: '20px 20px 0 0'
                  }} 
                />

                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Avatar sx={{ backgroundColor: themeColors.secondary, color: themeColors.white }}>
                      <CheckCircle size={20} />
                    </Avatar>
                    <Typography variant="h6" fontWeight="600" sx={{ color: themeColors.textDark }}>
                      Booking Details
                    </Typography>
                  </Box>

                  <Box sx={{ backgroundColor: themeColors.lightGray, p: 3, borderRadius: '12px', mb: 2 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Calendar size={18} color={themeColors.primary} />
                      <Box>
                        <Typography variant="body2" sx={{ color: themeColors.textSecondary, fontWeight: 500 }}>
                          Travel Date
                        </Typography>
                        <Typography variant="body1" sx={{ color: themeColors.textPrimary }}>
                          {bookingDetail.date
                            ? new Date(bookingDetail.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })
                            : "Date not available"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Users size={18} color={themeColors.primary} />
                      <Box>
                        <Typography variant="body2" sx={{ color: themeColors.textSecondary, fontWeight: 500 }}>
                          Travelers
                        </Typography>
                        <Typography variant="body1" sx={{ color: themeColors.textPrimary }}>
                          {bookingDetail.numOfPeople ?? 0} {bookingDetail.numOfPeople === 1 ? 'person' : 'people'}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                      <IndianRupee size={18} color={themeColors.secondary} />
                      <Box>
                        <Typography variant="body2" sx={{ color: themeColors.textSecondary, fontWeight: 500 }}>
                          Total Amount
                        </Typography>
                        <Typography variant="h6" sx={{ color: themeColors.secondary, fontWeight: 600 }}>
                          ₹{bookingDetail.totalPrice?.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Chip
                    label={bookingDetail.status?.charAt(0).toUpperCase() + bookingDetail.status?.slice(1)}
                    sx={{
                      backgroundColor: bookingDetail.status?.toLowerCase() === 'completed' 
                        ? '#E8F5E8' 
                        : '#FFF3E0',
                      color: bookingDetail.status?.toLowerCase() === 'completed' 
                        ? '#2E7D32' 
                        : '#E65100',
                      fontWeight: 600
                    }}
                  />
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Review Form Card */}
          <Card
            sx={{
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              backgroundColor: themeColors.white,
              border: `1px solid ${themeColors.border}`,
              overflow: 'visible'
            }}
          >
            <Box 
              sx={{ 
                height: '6px', 
                background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.secondary})`,
                width: '100%',
                borderRadius: '24px 24px 0 0'
              }} 
            />

            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <form onSubmit={handleSubmit}>
                {/* Rating Section */}
                <Box mb={6}>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Star size={24} color={themeColors.secondary} />
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      sx={{ color: themeColors.textDark }}
                    >
                      Rate Your Experience
                    </Typography>
                  </Box>
                  
                  <Paper 
                    elevation={0}
                    sx={{
                      p: 4,
                      backgroundColor: themeColors.lightGray,
                      borderRadius: '16px',
                      border: `1px solid ${themeColors.border}`,
                      textAlign: 'center'
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ color: themeColors.textPrimary, mb: 3, fontWeight: 500 }}
                    >
                      How would you rate your overall experience?
                    </Typography>
                    
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={handleRatingChange}
                      size="large"
                      precision={0.5}
                      sx={{
                        mb: 3,
                        '& .MuiRating-iconFilled': {
                          color: themeColors.secondary
                        },
                        '& .MuiRating-iconHover': {
                          color: themeColors.secondary
                        }
                      }}
                    />
                    
                    <Typography 
                      variant="body2" 
                      sx={{ color: themeColors.textSecondary, fontWeight: 500 }}
                    >
                      {rating ?? 0} out of 5 stars
                    </Typography>
                  </Paper>
                </Box>

                <Divider sx={{ mb: 6, borderColor: themeColors.border }} />

                {/* Comment Section */}
                <Box mb={6}>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <MessageSquare size={24} color={themeColors.primary} />
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      sx={{ color: themeColors.textDark }}
                    >
                      Share Your Thoughts
                    </Typography>
                  </Box>

                  <TextField
                    label="Tell others about your experience..."
                    multiline
                    rows={6}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        backgroundColor: themeColors.lightGray,
                        '& fieldset': {
                          borderColor: themeColors.border,
                        },
                        '&:hover fieldset': {
                          borderColor: themeColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: themeColors.primary,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: themeColors.textSecondary,
                        '&.Mui-focused': {
                          color: themeColors.primary,
                        }
                      }
                    }}
                    placeholder="What did you enjoy most? Any tips for other travelers? Share your detailed experience..."
                  />
                  
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: themeColors.textSecondary, 
                      mt: 1, 
                      display: 'block',
                      ml: 1,
                      fontWeight: 500
                    }}
                  >
                    Minimum 10 characters required • Be specific and helpful
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box display="flex" gap={2} justifyContent="flex-end" flexWrap="wrap">
                  <Button
                    variant="outlined"
                    onClick={() => router.push("/booking/my-booking")}
                    sx={{
                      borderColor: themeColors.border,
                      color: themeColors.textPrimary,
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: themeColors.primary,
                        color: themeColors.primary,
                        backgroundColor: 'rgba(59, 130, 246, 0.05)'
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || comment.length < 10}
                    sx={{
                      backgroundColor: themeColors.primary,
                      '&:hover': { 
                        backgroundColor: themeColors.secondary,
                        transform: 'translateY(-2px)'
                      },
                      '&:disabled': {
                        backgroundColor: themeColors.border,
                        color: themeColors.textSecondary
                      },
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(241, 242, 245, 0.87)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} sx={{ color: themeColors.white, mr: 1 }} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={20} style={{ marginRight: 8 }} />
                        Submit Review
                      </>
                    )}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
      
    </>
  );
};

export default AddReviewPage;