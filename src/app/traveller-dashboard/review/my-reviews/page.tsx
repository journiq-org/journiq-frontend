// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import {
//   getReviewsByRole,
//   deleteReview,
//   clearReviewState,
// } from "@/redux/slices/reviewSlice";
// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Box,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Rating,
//   Fade,
// } from "@mui/material";
// import { Edit, Trash2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import TravellerNavbar from "@/components/TravellerNavbar";

// function MyReviewsPage() {   // 👈 use `function` instead of `const`
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const { reviews, loading, error, message } = useSelector(
//     (state: RootState) => state.reviews
//   );

//   const [localReviews, setLocalReviews] = useState(reviews);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

//   useEffect(() => {
//     dispatch(getReviewsByRole());
//     return () => {
//       dispatch(clearReviewState());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     setLocalReviews(reviews);
//   }, [reviews]);

//   const handleDeleteClick = (id: string) => {
//     setSelectedReviewId(id);
//     setOpenDialog(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (selectedReviewId) {
//       await dispatch(deleteReview(selectedReviewId));
//       setLocalReviews((prev) => prev.filter((r) => r._id !== selectedReviewId));
//       setOpenDialog(false);
//       setSelectedReviewId(null);
//     }
//   };

//   const handleCancelDelete = () => {
//     setOpenDialog(false);
//     setSelectedReviewId(null);
//   };

//   const handleEdit = (id: string) => {
//     router.push(`/traveller-dashboard/review/update/${id}`);
//   };

//   if (loading)
//     return (
//       <Box display="flex" justifyContent="center" mt={6}>
//         <CircularProgress size={40} />
//       </Box>
//     );

//   return (
//     <>
//       <TravellerNavbar />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           p: { xs: 2, md: 6 },
//          backgroundColor: "#E2E0DF",
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           gutterBottom
//           sx={{ textAlign: "center", mb: 4 }}
//         >
//           My Reviews
//         </Typography>

//         {error && (
//           <Typography color="error" mb={2} textAlign="center">
//             {error}
//           </Typography>
//         )}
//         {message && (
//           <Typography color="primary" mb={2} textAlign="center">
//             {message}
//           </Typography>
//         )}

//         {localReviews.length === 0 ? (
//           <Typography textAlign="center" mt={6}>
//             No reviews found
//           </Typography>
//         ) : (
//           <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
//             {localReviews.map((review) => (
//               <Fade in timeout={500} key={review._id}>
//                 <Card
//                   sx={{
//                     width: { xs: "100%", md: "45%" },
//                     borderRadius: "16px",
//                     boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                     backdropFilter: "blur(6px)",
//                     background: "rgba(255,255,255,0.9)",
//                     transition: "transform 0.2s ease",
//                     "&:hover": { transform: "translateY(-4px)" },
//                   }}
//                 >
//                   <CardContent>
//                     <Box
//                       display="flex"
//                       justifyContent="space-between"
//                       alignItems="center"
//                       mb={1}
//                     >
//                       <Typography variant="h6" fontWeight="600" color="black">
//                         {typeof review.tour === "string"
//                           ? "Tour"
//                           : review.tour?.title || "Tour"}
//                       </Typography>
//                       <Box>
//                         <IconButton
//                           onClick={() => handleEdit(review._id)}
//                           color="primary"
//                         >
//                           <Edit size={20} />
//                         </IconButton>
//                         <IconButton
//                           onClick={() => handleDeleteClick(review._id)}
//                           color="error"
//                         >
//                           <Trash2 size={20} />
//                         </IconButton>
//                       </Box>
//                     </Box>

//                     <Typography variant="body1" mb={1} color="black">
//                       {review.comment}
//                     </Typography>

//                     <Rating
//                       name="read-only"
//                       value={review.rating}
//                       readOnly
//                       precision={0.5}
//                       size="small"
//                     />

//                     <Typography
//                       variant="caption"
//                       color="textSecondary"
//                       display="block"
//                       mt={1}
//                     >
//                       {new Date(review.createdAt).toLocaleDateString()}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             ))}
//           </Box>
//         )}

//         <Dialog open={openDialog} onClose={handleCancelDelete}>
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             <Typography>
//               Are you sure you want to delete this review?
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCancelDelete} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleConfirmDelete} color="error">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </>
//   );
// }

// export default MyReviewsPage;


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
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import { Edit, Trash2, Star, Calendar, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import TravellerNavbar from "@/components/TravellerNavbar";

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

function MyReviewsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { reviews, loading, error, message,total } = useSelector(
    (state: RootState) => state.reviews
  );

  const [localReviews, setLocalReviews] = useState(reviews);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
   //pagination
        const [page , setPage] = useState(1)
        const limit = 10
        const skip = (page - 1) * limit
        const totalPages = Math.ceil(total/limit)

  useEffect(() => {
    dispatch(getReviewsByRole({page,limit,skip}));
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
          Loading your reviews...
        </Typography>
      </Box>
    );

  return (
    <>
      <TravellerNavbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: themeColors.background,
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 6 },
        }}
      >
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight="700"
            sx={{ 
              color: themeColors.textDark,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            My Reviews
          </Typography>
          <Typography
            variant="h6"
            sx={{ 
              color: themeColors.textSecondary,
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400
            }}
          >
            Manage and view all your travel experiences and feedback
          </Typography>
        </Box>

        {/* Status Messages */}
        {(error || message) && (
          <Box mb={4} display="flex" justifyContent="center">
            <Fade in timeout={600}>
              <Box
                sx={{
                  backgroundColor: error ? '#FFE8E8' : '#E8F5E8',
                  border: `1px solid ${error ? '#FF6B6B' : '#4CAF50'}`,
                  borderRadius: '12px',
                  px: 4,
                  py: 2,
                  maxWidth: '500px',
                  textAlign: 'center'
                }}
              >
                <Typography 
                  sx={{ 
                    color: error ? '#D32F2F' : '#2E7D32',
                    fontWeight: 500
                  }}
                >
                  {error || message}
                </Typography>
              </Box>
            </Fade>
          </Box>
        )}

        {/* Reviews Grid */}
        {localReviews.length === 0 ? (
          <Box 
            textAlign="center" 
            mt={8}
            sx={{
              backgroundColor: themeColors.white,
              borderRadius: '20px',
              py: 8,
              px: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              border: `1px solid ${themeColors.border}`
            }}
          >
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 3,
                backgroundColor: themeColors.primary,
                color: themeColors.white
              }}
            >
              <MessageCircle size={40} />
            </Avatar>
            <Typography 
              variant="h5" 
              sx={{ color: themeColors.textDark, mb: 2, fontWeight: 600 }}
            >
              No Reviews Yet
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ color: themeColors.textSecondary, mb: 4 }}
            >
              Share your travel experiences by leaving reviews for the tours you've enjoyed!
            </Typography>
            <Button
              variant="contained"
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
              Explore Tours
            </Button>
          </Box>
        ) : (
          <Box 
            display="grid" 
            gridTemplateColumns={{ xs: '1fr', md: 'repeat(auto-fit, minmax(400px, 1fr))' }}
            gap={4}
            maxWidth="1200px"
            mx="auto"
          >
            {localReviews.map((review, index) => (
              <Fade in timeout={500 + index * 100} key={review._id}>
                <Card
                  sx={{
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    backgroundColor: themeColors.white,
                    border: `1px solid ${themeColors.border}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    },
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {/* Decorative top border */}
                  <Box 
                    sx={{ 
                      height: '4px', 
                      background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.secondary})`,
                      width: '100%'
                    }} 
                  />
                  
                  <CardContent sx={{ p: 3 }}>
                    {/* Header with title and actions */}
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box flex={1}>
                        <Typography 
                          variant="h6" 
                          fontWeight="600" 
                          sx={{ 
                            color: themeColors.textDark,
                            mb: 1,
                            lineHeight: 1.3
                          }}
                        >
                          {typeof review.tour === "string"
                            ? "Tour Experience"
                            : review.tour?.title || "Tour Experience"}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Calendar size={16} color={themeColors.textSecondary} />
                          <Typography 
                            variant="caption" 
                            sx={{ color: themeColors.textSecondary, fontWeight: 500 }}
                          >
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box display="flex" gap={1}>
                        <IconButton
                          onClick={() => handleEdit(review._id)}
                          sx={{
                            color: themeColors.primary,
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            '&:hover': { 
                              backgroundColor: themeColors.primary,
                              color: themeColors.white
                            },
                            transition: 'all 0.2s ease'
                          }}
                          size="small"
                        >
                          <Edit size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(review._id)}
                          sx={{
                            color: '#D32F2F',
                            backgroundColor: 'rgba(211, 47, 47, 0.1)',
                            '&:hover': { 
                              backgroundColor: '#D32F2F',
                              color: themeColors.white
                            },
                            transition: 'all 0.2s ease'
                          }}
                          size="small"
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 2, borderColor: themeColors.border }} />

                    {/* Review content */}
                    <Box sx={{ backgroundColor: themeColors.lightGray, p: 3, borderRadius: '12px', mb: 3 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: themeColors.textPrimary,
                          lineHeight: 1.6,
                          fontSize: '0.95rem'
                        }}
                      >
                        {review.comment}
                      </Typography>
                    </Box>

                    {/* Rating */}
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Star size={20} color={themeColors.secondary} fill={themeColors.secondary} />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: themeColors.textPrimary,
                            fontWeight: 'bold'
                          }}
                        >
                          {review.rating}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ color: themeColors.textSecondary }}
                        >
                          / 5
                        </Typography>
                      </Box>
                      <Rating
                        name="read-only"
                        value={review.rating}
                        readOnly
                        precision={0.5}
                        size="small"
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: themeColors.secondary
                          }
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </Box>
        )}

        {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="normal-case font-semibold px-6 text-[#4b2e2e] border-[#4b2e2e] hover:bg-[#f1e5d1] hover:border-[#4b2e2e]"
            >
              Previous
            </Button>

            <p className="text-base font-semibold">
              Page {page} of {totalPages || 1}
            </p>

            <Button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((prev) => prev + 1)}
              className="normal-case font-semibold px-6 text-[#4b2e2e] border-[#4b2e2e] hover:bg-[#f1e5d1] hover:border-[#4b2e2e]"
            >
              Next
            </Button>
          </div>
          
        {/* Delete Confirmation Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={handleCancelDelete}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
              minWidth: '400px'
            }
          }}
        >
          <DialogTitle 
            sx={{ 
              color: themeColors.textDark,
              fontWeight: 600,
              pb: 1
            }}
          >
            Confirm Delete
          </DialogTitle>
          <DialogContent sx={{ pb: 2 }}>
            <Typography sx={{ color: themeColors.textSecondary }}>
              Are you sure you want to delete this review? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
            <Button 
              onClick={handleCancelDelete} 
              variant="outlined"
              sx={{
                borderColor: themeColors.border,
                color: themeColors.textPrimary,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: themeColors.primary,
                  color: themeColors.primary
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmDelete} 
              variant="contained"
              sx={{
                backgroundColor: themeColors.secondary,
                '&:hover': { backgroundColor: '#e65100' },
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Delete Review
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default MyReviewsPage;