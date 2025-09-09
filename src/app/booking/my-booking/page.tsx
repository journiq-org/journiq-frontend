

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchBookings, cancelBooking } from "@/redux/slices/bookingSlice";
import { deleteReview } from "@/redux/slices/reviewSlice";
import {
  Loader2,
  Calendar,
  Users,
  IndianRupee,
  CheckCircle,
  XCircle,
  Trash2,
  MessageSquarePlus,
  Edit3,
  MapPin,
  Clock,
  Star,
  AlertTriangle,
} from "lucide-react";
import TravellerNavbar from "@/components/TravellerNavbar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MyBookingPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { bookings, loading } = useAppSelector((state) => state.booking);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Fetch bookings on mount
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  // Cancel booking
  const handleCancel = async (bookingId: string) => {
    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      toast.success("Booking cancelled successfully");
      setOpenDialogId(null);
      dispatch(fetchBookings());
    } catch (err: any) {
      toast.error(err || "Failed to cancel booking");
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId: string) => {
    try {
      await dispatch(deleteReview(reviewId)).unwrap();
      toast.success("Review deleted successfully");
      // Refetch bookings to update UI
      dispatch(fetchBookings());
    } catch (err: any) {
      toast.error(typeof err === "string" ? err : "Failed to delete review");
    }
  };

  // Filter bookings based on status
  const filteredBookings = bookings?.filter((booking) => {
    if (filterStatus === "all") return true;
    const status = booking.status?.toLowerCase() || "pending";
    return status === filterStatus;
  }) || [];

  // Calculate stats
  const stats = {
    total: bookings?.length || 0,
    completed: bookings?.filter(b => b.status?.toLowerCase() === "completed").length || 0,
    pending: bookings?.filter(b => b.status?.toLowerCase() === "pending").length || 0,
    cancelled: bookings?.filter(b => b.status?.toLowerCase() === "cancelled").length || 0,
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#e2e0df" }}>
        <TravellerNavbar />
        <div className="flex justify-center items-center h-60 mt-12">
          <div className="text-center">
            <Loader2 className="animate-spin w-8 h-8 mx-auto mb-4" style={{ color: "#3b82f6" }} />
            <span className="text-lg font-medium" style={{ color: "#333333" }}>
              Loading your bookings...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#e2e0df" }}>
      <TravellerNavbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#fdfdfd" }}>
              My Bookings
            </h1>
            <p className="text-xl" style={{ color: "#93c5fd" }}>
              Manage your travel adventures and experiences
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold mb-1" style={{ color: "#fdfdfd" }}>{stats.total}</div>
              <div className="text-sm" style={{ color: "#93c5fd" }}>Total Bookings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold mb-1" style={{ color: "#fdfdfd" }}>{stats.completed}</div>
              <div className="text-sm" style={{ color: "#93c5fd" }}>Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold mb-1" style={{ color: "#fdfdfd" }}>{stats.pending}</div>
              <div className="text-sm" style={{ color: "#93c5fd" }}>Pending</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold mb-1" style={{ color: "#fdfdfd" }}>{stats.cancelled}</div>
              <div className="text-sm" style={{ color: "#93c5fd" }}>Cancelled</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { key: "all", label: "All Bookings", count: stats.total },
            { key: "pending", label: "Pending", count: stats.pending },
            { key: "completed", label: "Completed", count: stats.completed },
            { key: "cancelled", label: "Cancelled", count: stats.cancelled },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                filterStatus === tab.key
                  ? "bg-[#ff9100] text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
              }`}
              style={{
                border: filterStatus !== tab.key ? "1px solid #e4e2e1" : "none",
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* No Bookings State */}
        {filteredBookings.length === 0 && bookings?.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#333333" }}>
              No bookings yet
            </h3>
            <p className="text-lg mb-8" style={{ color: "#363636" }}>
              Start your journey by booking your first adventure
            </p>
            <button
              onClick={() => router.push('/destinations')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Destinations
            </button>
          </div>
        )}

        {/* Filtered Empty State */}
        {filteredBookings.length === 0 && bookings?.length > 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "#333333" }}>
              No {filterStatus} bookings
            </h3>
            <p style={{ color: "#363636" }}>
              Try selecting a different filter to see your bookings
            </p>
          </div>
        )}

        {/* Bookings Grid */}
        {filteredBookings.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {filteredBookings.map((booking) => {
              const tourTitle =
                typeof booking.tour === "object" && booking.tour?.title
                  ? booking.tour.title
                  : "Tour";
              const status = booking.status?.toLowerCase() || "pending";
              const isCancelled = status === "cancelled";

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border h-full flex flex-col"
                  style={{ borderColor: "#e4e2e1" }}
                >
                  {/* Header with Status */}
                  <div className="p-6 pb-4 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-bold flex-1 mr-4" style={{ color: "#22252c" }}>
                        {tourTitle}
                      </h2>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </div>
                    </div>

                    {/* Booking Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#f8f7f5" }}>
                        <Calendar className="w-5 h-5 flex-shrink-0" style={{ color: "#3b82f6" }} />
                        <div>
                          <div className="text-sm font-medium" style={{ color: "#333333" }}>Travel Date</div>
                          <div style={{ color: "#363636" }}>
                            {booking.date
                              ? new Date(booking.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : "Date not available"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#f8f7f5" }}>
                        <Users className="w-5 h-5 flex-shrink-0" style={{ color: "#3b82f6" }} />
                        <div>
                          <div className="text-sm font-medium" style={{ color: "#333333" }}>Travelers</div>
                          <div style={{ color: "#363636" }}>
                            {booking.numOfPeople ?? 0} {(booking.numOfPeople ?? 0) > 1 ? "people" : "person"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#f8f7f5" }}>
                        <IndianRupee className="w-5 h-5 flex-shrink-0" style={{ color: "#ff9100" }} />
                        <div>
                          <div className="text-sm font-medium" style={{ color: "#333333" }}>Total Amount</div>
                          <div className="text-xl font-bold" style={{ color: "#ff9100" }}>
                            ₹{booking.totalPrice?.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6 space-y-3">
                    {/* Cancel Booking */}
                    {!isCancelled && status !== "completed" && (
                      <button
                        onClick={() => setOpenDialogId(booking._id)}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md"
                        style={{ backgroundColor: "#ff9100", color: "#fdfdfd" }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Cancel Booking
                      </button>
                    )}

                    {/* Add Review */}
                    {status === "completed" && !booking.review && (
                      <button
                        onClick={() => {
                          const tourId =
                            typeof booking.tour === "object"
                              ? booking.tour._id
                              : booking.tour;
                          router.push(
                            `/traveller-dashboard/review/?tourId=${tourId}&bookingId=${booking._id}`
                          );
                        }}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md"
                        style={{ backgroundColor: "#3b82f6", color: "#fdfdfd" }}
                      >
                        <MessageSquarePlus className="w-4 h-4" />
                        Write Review
                      </button>
                    )}

                    {/* View Tour Details */}
                    <button
                      onClick={() => {
                        const tourId =
                          typeof booking.tour === "object"
                            ? booking.tour._id
                            : booking.tour;
                        router.push(`/tours/details/${tourId}`);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-200 border-2"
                      style={{
                        borderColor: "#3b82f6",
                        color: "#3b82f6",
                        backgroundColor: "transparent"
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                      View Tour Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      {openDialogId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4" style={{ color: "#ff9100" }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: "#22252c" }}>
                Cancel Booking
              </h3>
              <p style={{ color: "#363636" }}>
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setOpenDialogId(null)}
                className="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2"
                style={{
                  borderColor: "#e4e2e1",
                  color: "#333333",
                  backgroundColor: "transparent"
                }}
              >
                Keep Booking
              </button>
              <button
                onClick={() => {
                  const booking = bookings?.find(b => b._id === openDialogId);
                  if (booking) handleCancel(booking._id);
                }}
                className="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                style={{ backgroundColor: "#ff9100", color: "#fdfdfd" }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;