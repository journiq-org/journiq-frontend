"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { updateReview, selectReviews, selectReviewLoading, selectReviewMessage, selectReviewError } from "@/redux/slices/reviewSlice";
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
  Chip
} from "@mui/material";
import { Star, Edit, ArrowLeft, Save, MessageSquare } from "lucide-react";
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

const EditReviewPage = () => {
  const params = useParams<{ id: string }>();
  const reviewId = params?.id;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(selectReviews);
  const loading = useAppSelector(selectReviewLoading);
  const error = useAppSelector(selectReviewError);
  const message = useAppSelector(selectReviewMessage);

  // find the review in redux store
  const review = reviews.find(r => r._id === reviewId);

  // local form state
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  // prefill form when review is loaded
  useEffect(() => {
    if (review) {
      setRating(review.rating ?? 5);
      setComment(review.comment ?? "");
    }
  }, [review]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewId) return toast.error("Missing review ID");

    try {
      await dispatch(updateReview({ reviewId, rating, comment })).unwrap();
      toast.success(message || "Review updated successfully!");
      router.push("/traveller-dashboard/review/my-reviews"); 
    } catch (err: any) {
      toast.error(error || "Failed to update review");
    }
  };

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue || 5);
  };

  if (loading)
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: themeColors.background }}
      >
        <CircularProgress size={60} sx={{ color: themeColors.primary, mb: 2 }} />
        <Typography variant="h6" sx={{ color: themeColors.textPrimary }}>
          Loading review...
        </Typography>
      </Box>
    );

  if (!review) {
    return (
      <>
        <TravellerNavbar />
        <Box 
          sx={{
            minHeight: "100vh",
            backgroundColor: themeColors.background,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 4
          }}
        >
          <Paper 
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              backgroundColor: themeColors.white,
              border: `1px solid ${themeColors.border}`
            }}
          >
            <Typography variant="h5" sx={{ color: themeColors.textDark, mb: 2 }}>
              Review Not Found
            </Typography>
            <Typography sx={{ color: themeColors.textSecondary, mb: 4 }}>
              The review you're looking for doesn't exist or has been deleted.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/traveller-dashboard/review/my-reviews")}
              sx={{
                backgroundColor: themeColors.primary,
                '&:hover': { backgroundColor: themeColors.secondary },
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Back to My Reviews
            </Button>
          </Paper>
        </Box>
      </>
    );
  }

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
        <Box maxWidth="800px" mx="auto" mb={4}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <IconButton
              onClick={() => router.push("/traveller-dashboard/review/my-reviews")}
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
              Edit Review
            </Typography>
          </Box>
          
          <Typography
            variant="body1"
            sx={{ 
              color: themeColors.textSecondary,
              mb: 4
            }}
          >
            Update your review for {typeof review.tour === "object" ? review.tour.title : "this tour"}
          </Typography>
        </Box>

        {/* Status Messages */}
        {(error || message) && (
          <Box maxWidth="800px" mx="auto" mb={4}>
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

        {/* Main Form Card */}
        <Box maxWidth="800px" mx="auto">
          <Card
            sx={{
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              backgroundColor: themeColors.white,
              border: `1px solid ${themeColors.border}`,
              overflow: 'visible'
            }}
          >
            {/* Decorative top border */}
            <Box 
              sx={{ 
                height: '6px', 
                background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.secondary})`,
                width: '100%',
                borderRadius: '24px 24px 0 0'
              }} 
            />

            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <form onSubmit={handleUpdate}>
                {/* Rating Section */}
                <Box mb={6}>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Star size={24} color={themeColors.secondary} />
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      sx={{ color: themeColors.textDark }}
                    >
                      Your Rating
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
                      sx={{ color: themeColors.textPrimary, mb: 2, fontWeight: 500 }}
                    >
                      How would you rate your experience?
                    </Typography>
                    
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={handleRatingChange}
                      size="large"
                      precision={0.5}
                      sx={{
                        mb: 2,
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
                      sx={{ color: themeColors.textSecondary }}
                    >
                      {rating} out of 5 stars
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
                      Your Review
                    </Typography>
                  </Box>

                  <TextField
                    label="Share your experience..."
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
                    placeholder="Tell others about your experience with this tour..."
                  />
                  
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: themeColors.textSecondary, 
                      mt: 1, 
                      display: 'block',
                      ml: 1
                    }}
                  >
                    Minimum 10 characters required
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => router.push("/traveller-dashboard/review/my-reviews")}
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
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} sx={{ color: themeColors.white, mr: 1 }} />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={20} style={{ marginRight: 8 }} />
                        Update Review
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

export default EditReviewPage;
