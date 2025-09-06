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
  Calendar,
  MapPin,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit3,
  Mail,
  Phone,
  Users,
  ArrowRight,
  Loader2,
  Star,
  DollarSign
} from "lucide-react";
import GuideNavbar from "@/components/GuideNavbar";

// More flexible TypeScript interfaces that match actual API response
interface Destination {
  _id: string;
  name: string;
  city?: string;
  country?: string;
}

interface Tour {
  _id: string;
  title: string;
  description?: string;
  destination?: Destination;
  duration?: number;
  price?: number;
  images?: string[];
  category?: string;
  rating?: number;
  isActive?: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

interface Booking {
  _id: string;
  tour: Tour;
  user: User;
  date?: string;
  numOfPeople?: number;
  totalPrice?: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

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
    router.push(`/booking/edit-status/${bookingId}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTourImage = (tour: Tour) => {
    if (tour.images && tour.images.length > 0) {
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`;
    }
    return '/placeholder-tour.jpg'; // fallback image
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <GuideNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Guide Bookings</h1>
          </div>
          <p className="text-slate-600 ml-11">Manage your tour bookings and respond to requests</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-slate-600">Loading your bookings...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-1">Error Loading Bookings</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Bookings Yet</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              You don't have any bookings at the moment. New booking requests will appear here.
            </p>
          </div>
        )}

        {/* Bookings Grid */}
        {!loading && bookings.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking: any) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200 overflow-hidden group relative"
              >
                {/* Tour Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getTourImage(booking.tour)}
                    alt={booking.tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)} backdrop-blur-sm`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(booking.status)}
                        <span className="capitalize">{booking.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1 line-clamp-2">
                        {booking.tour.title}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.tour.destination?.name || 'Destination'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Booking Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{booking.user.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>{booking.user.email}</span>
                    </div>
                    {booking.user.phone && (
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Phone className="w-4 h-4" />
                        <span>{booking.user.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Booked on {formatDate(booking.createdAt)}</span>
                    </div>

                    {booking.date && (
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Tour date: {formatDate(booking.date)}</span>
                      </div>
                    )}
                  </div>

                  {/* Tour Details */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {booking.numOfPeople && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-600" />
                          <span className="text-slate-600">{booking.numOfPeople} people</span>
                        </div>
                      )}
                      {booking.tour.duration && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-600" />
                          <span className="text-slate-600">{booking.tour.duration} days</span>
                        </div>
                      )}
                      {booking.tour.rating && (
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-slate-600">{booking.tour.rating.toFixed(1)}/5.0</span>
                        </div>
                      )}
                      {booking.totalPrice && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-slate-600 font-medium">₹{booking.totalPrice}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {booking.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRespond(booking._id, "accepted")}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRespond(booking._id, "rejected")}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {booking.status === "accepted" && (
                      <button
                        onClick={() => handleEditStatus(booking._id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group-hover:shadow-md"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Status
                      </button>
                    )}

<<<<<<< Updated upstream
                    {(
                      // booking.status === "completed" 
                       booking.status === "confirmed"
                    //  || booking.status === "cancelled"
                    ) && (
=======
                    {(booking.status === "completed" || booking.status === "confirmed" || booking.status === "cancelled") && (
>>>>>>> Stashed changes
                      <button
                        onClick={() => handleEditStatus(booking._id)}
                        className="w-full bg-slate-600 hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Edit status
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {!loading && bookings.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-slate-600">Pending</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {bookings.filter((b: any) => b.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-slate-600">Accepted</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {bookings.filter((b: any) => b.status === 'accepted').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-600">Completed</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {bookings.filter((b: any) => b.status === 'completed').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-slate-600">Rejected</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {bookings.filter((b: any) => b.status === 'rejected').length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideBookingsPage;