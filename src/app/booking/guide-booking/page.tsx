// "use client";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import {
//   fetchGuideBookings,
//   respondToBooking,
// } from "@/redux/slices/guideBookingSlice";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import GuideNavbar from "@/components/GuideNavbar";

// const GuideBookingsPage = () => {
//   const dispatch = useAppDispatch();
//   const { bookings, loading, error } = useAppSelector(
//     (state) => state.guideBookings
//   );

//   useEffect(() => {
//     dispatch(fetchGuideBookings());
//   }, [dispatch]);

//   const handleRespond = (bookingId: string, status: string) => {
//     dispatch(respondToBooking({ bookingId, status }));
//   };

//   return (
//     <>
//     <GuideNavbar/>
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom>
//         Guide Bookings
//       </Typography>

//       {loading && (
//         <Box display="flex" justifyContent="center" mt={5}>
//           <CircularProgress />
//         </Box>
//       )}

//       {error && (
//         <Typography color="error" align="center" mt={3}>
//           {error}
//         </Typography>
//       )}

//       {!loading && bookings.length === 0 && (
//         <Typography align="center" mt={3}>
//           No bookings found.
//         </Typography>
//       )}

//       <Box display="flex" flexDirection="column" gap={3} mt={3}>
//         {bookings.map((booking) => (
//           <Card key={booking._id} sx={{ borderRadius: 3, boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6">{booking.tour.title}</Typography>
//               <Typography color="text.secondary">
//                 Traveller: {booking.user.name} ({booking.user.email})
//               </Typography>
//               <Typography>Status: {booking.status}</Typography>
//               <Typography variant="caption" color="text.secondary">
//                 Created: {new Date(booking.createdAt).toLocaleString()}
//               </Typography>
//             </CardContent>

//             <CardActions>
//               {booking.status === "pending" && (
//                 <>
//                   <Button
//                     variant="contained"
//                     color="success"
//                     onClick={() => handleRespond(booking._id, "accepted")}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => handleRespond(booking._id, "rejected")}
//                   >
//                     Reject
//                   </Button>
//                 </>
//               )}
//             </CardActions>
//           </Card>
//         ))}
//       </Box>
//     </Box>
//     </>
//   );
// };

// export default GuideBookingsPage;


"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  fetchGuideBookings,
  respondToBooking,
} from "@/redux/slices/guideBookingSlice";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import GuideNavbar from "@/components/GuideNavbar";

const GuideBookingsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { bookings, loading, error } = useAppSelector(
    (state) => state.guideBookings
  );

  useEffect(() => {
    dispatch(fetchGuideBookings());
  }, [dispatch]);

  const handleRespond = (bookingId: string, status: string) => {
    dispatch(respondToBooking({ bookingId, status }));
  };

  const handleEditStatus = (bookingId: string) => {
    router.push(`/booking/edit-status/${bookingId}`); // 👈 navigate to edit page
  };

  return (
    <>
      <GuideNavbar />
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Guide Bookings
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" align="center" mt={3}>
            {error}
          </Typography>
        )}

        {!loading && bookings.length === 0 && (
          <Typography align="center" mt={3}>
            No bookings found.
          </Typography>
        )}

        <Box display="flex" flexDirection="column" gap={3} mt={3}>
          {bookings.map((booking) => (
            <Card key={booking._id} sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent
                onClick={() => handleEditStatus(booking._id)} // 👈 navigate when card clicked
                style={{ cursor: "pointer" }}
              >
                <Typography variant="h6">{booking.tour.title}</Typography>
                <Typography color="text.secondary">
                  Traveller: {booking.user.name} ({booking.user.email})
                </Typography>
                <Typography>Status: {booking.status}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(booking.createdAt).toLocaleString()}
                </Typography>
              </CardContent>

              <CardActions>
                {booking.status === "pending" && (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleRespond(booking._id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRespond(booking._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </>
                )}

                {booking.status === "accepted" && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditStatus(booking._id)}
                  >
                    Edit Status
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default GuideBookingsPage;
