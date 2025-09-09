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
  IndianRupee
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
        return <CheckCircle className="w-5 h-5 text-[#1e3a8a]" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-[#ff9100]" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#3b82f6]" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-[#333333]" />;
      default:
        return <AlertCircle className="w-5 h-5 text-[#ff9100]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
      case 'confirmed':
        return 'bg-[#93c5fd]/20 text-[#1e3a8a] border-[#93c5fd]/40';
      case 'rejected':
        return 'bg-[#ff9100]/20 text-[#ff9100] border-[#ff9100]/40';
      case 'completed':
        return 'bg-[#3b82f6]/20 text-[#1e3a8a] border-[#3b82f6]/40';
      case 'cancelled':
        return 'bg-[#e2e0df] text-[#333333] border-[#e2e0df]';
      default:
        return 'bg-[#ff9100]/15 text-[#ff9100] border-[#ff9100]/30';
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
    <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] to-[#e4e2e1]">
      <GuideNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#93c5fd]/20 rounded-xl flex items-center justify-center border border-[#93c5fd]/30">
              <Calendar className="w-6 h-6 text-[#1e3a8a]" />
            </div>
            <h1 className="text-3xl font-bold text-[#22252c]">Guide Bookings</h1>
          </div>
          <p className="text-[#333333] ml-13">Manage your tour bookings and respond to requests</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-10 h-10 animate-spin text-[#3b82f6] mx-auto mb-4" />
              <p className="text-[#333333] text-lg">Loading your bookings...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-[#ff9100]/10 border border-[#ff9100]/30 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-[#ff9100] flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-[#ff9100] mb-1">Error Loading Bookings</h3>
                <p className="text-[#363636]">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#e4e2e1] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#e2e0df]">
              <Calendar className="w-10 h-10 text-[#333333]" />
            </div>
            <h3 className="text-xl font-bold text-[#22252c] mb-3">No Bookings Yet</h3>
            <p className="text-[#363636] max-w-md mx-auto">
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
                className="bg-[#fdfdfd] rounded-2xl shadow-lg border border-[#e2e0df] hover:shadow-2xl hover:border-[#3b82f6]/50 transition-all duration-500 overflow-hidden group relative transform hover:scale-[1.02]"
              >
                {/* Tour Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getTourImage(booking.tour)}
                    alt={booking.tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(booking.status)}`}>
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(booking.status)}
                        <span className="capitalize">{booking.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-[#fdfdfd]/95 backdrop-blur-sm rounded-xl p-4 border border-[#e2e0df]/50">
                      <h3 className="text-lg font-bold text-[#22252c] mb-2 line-clamp-2">
                        {booking.tour.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#333333] text-sm">
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
                    <div className="flex items-center gap-2 text-[#363636]">
                      <User className="w-4 h-4 text-[#3b82f6]" />
                      <span className="font-semibold">{booking.user.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#333333] text-sm">
                      <Mail className="w-4 h-4 text-[#333333]" />
                      <span>{booking.user.email}</span>
                    </div>
                    {booking.user.phone && (
                      <div className="flex items-center gap-2 text-[#333333] text-sm">
                        <Phone className="w-4 h-4 text-[#333333]" />
                        <span>{booking.user.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[#333333] text-sm">
                      <Clock className="w-4 h-4 text-[#333333]" />
                      <span>Booked on {formatDate(booking.createdAt)}</span>
                    </div>

                    {booking.date && (
                      <div className="flex items-center gap-2 text-[#333333] text-sm">
                        <Calendar className="w-4 h-4 text-[#333333]" />
                        <span>Tour date: {formatDate(booking.date)}</span>
                      </div>
                    )}
                  </div>

                  {/* Tour Details */}
                  <div className="bg-[#e4e2e1] rounded-xl p-4 mb-6 border border-[#e2e0df]">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {booking.numOfPeople && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#1e3a8a]" />
                          <span className="text-[#363636] font-medium">{booking.numOfPeople} people</span>
                        </div>
                      )}
                      {booking.tour.duration && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#1e3a8a]" />
                          <span className="text-[#363636] font-medium">{booking.tour.duration} days</span>
                        </div>
                      )}
                      {booking.tour.rating && (
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-[#ff9100] fill-current" />
                          <span className="text-[#363636] font-medium">{booking.tour.rating.toFixed(1)}/5.0</span>
                        </div>
                      )}
                      {booking.totalPrice && (
                        <div className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-green-600" />
                          <span className="text-slate-600 font-medium">₹{booking.totalPrice}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {booking.status === "pending" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRespond(booking._id, "accepted")}
                          className="flex-1 bg-gradient-to-r from-[#93c5fd] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a] text-[#fdfdfd] px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRespond(booking._id, "rejected")}
                          className="flex-1 bg-gradient-to-r from-[#ff9100] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#ff9100] text-[#fdfdfd] px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {booking.status === "accepted" && (
                      <button
                        onClick={() => handleEditStatus(booking._id)}
                        className="w-full bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#22252c] text-[#fdfdfd] px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Status
                      </button>
                    )}

                    {(
                      // booking.status === "completed" 
                       booking.status === "confirmed"
                    //  || booking.status === "cancelled"
                    ) && (
                      <button
                        onClick={() => handleEditStatus(booking._id)}
                        className="w-full bg-[#e2e0df] hover:bg-[#e4e2e1] text-[#363636] px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 border border-[#e2e0df] hover:border-[#333333]"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Edit status
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#93c5fd]/5 to-[#3b82f6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {!loading && bookings.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#fdfdfd] rounded-xl p-5 border border-[#e2e0df] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-[#ff9100]" />
                <span className="text-sm font-semibold text-[#333333]">Pending</span>
              </div>
              <p className="text-2xl font-bold text-[#22252c]">
                {bookings.filter((b: any) => b.status === 'pending').length}
              </p>
            </div>
            <div className="bg-[#fdfdfd] rounded-xl p-5 border border-[#e2e0df] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-[#1e3a8a]" />
                <span className="text-sm font-semibold text-[#333333]">Accepted</span>
              </div>
              <p className="text-2xl font-bold text-[#22252c]">
                {bookings.filter((b: any) => b.status === 'accepted').length}
              </p>
            </div>
            <div className="bg-[#fdfdfd] rounded-xl p-5 border border-[#e2e0df] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-[#3b82f6]" />
                <span className="text-sm font-semibold text-[#333333]">Completed</span>
              </div>
              <p className="text-2xl font-bold text-[#22252c]">
                {bookings.filter((b: any) => b.status === 'completed').length}
              </p>
            </div>
            <div className="bg-[#fdfdfd] rounded-xl p-5 border border-[#e2e0df] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-[#ff9100]" />
                <span className="text-sm font-semibold text-[#333333]">Rejected</span>
              </div>
              <p className="text-2xl font-bold text-[#22252c]">
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