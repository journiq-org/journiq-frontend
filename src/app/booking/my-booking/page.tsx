'use client'

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchBookings, cancelBooking } from "@/redux/slices/bookingSlice";
import {
  Loader2,
  Calendar,
  Users,
  IndianRupee,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import TravellerNavbar from "@/components/TravellerNavbar";
import toast from "react-hot-toast";

const MyBookingPage = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading, error } = useAppSelector((state) => state.booking);

  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleCancel = async (bookingId: string) => {
    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      toast.success("Booking cancelled successfully");
      setOpenDialogId(null);
      dispatch(fetchBookings()); // refresh list
    } catch (err: any) {
      toast.error(err || "Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <>
        <TravellerNavbar />
        <div className="flex justify-center items-center h-60 mt-12">
          <Loader2 className="animate-spin w-6 h-6 text-[#4E4D45]" />
          <span className="ml-2 text-lg font-medium text-[#4E4D45]">
            Loading bookings...
          </span>
        </div>
      </>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <>
        <TravellerNavbar />
        <p className="text-[#5E361D] text-center mt-12 text-lg">
          You have no bookings yet.
        </p>
      </>
    );
  }

  return (
    <>
      <TravellerNavbar />
      <div className="min-h-screen bg-[#E2E0DF] p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#0c0c0c]">
          My Bookings
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => {
            const tourTitle =
              typeof booking.tour === "object" && booking.tour?.title
                ? booking.tour.title
                : "Tour";
            const status = booking.status?.toLowerCase() || "pending";
            const isCancelled = status === "cancelled";

            return (
              <div
                key={booking._id}
                className="bg-[#F8F7F5] rounded-2xl shadow-md border border-[#d1cfc8] p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-2xl font-semibold text-[#0c0c0c] mb-4">
                  {tourTitle}
                </h2>

                <div className="space-y-3 text-[#4E4D45] mb-4">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">
                      {new Date(booking.date).toLocaleDateString()}
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium">
                      {booking.numOfPeople}{" "}
                      {booking.numOfPeople > 1 ? "people" : "person"}
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    {isCancelled ? (
                      <XCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    <span
                      className={`font-medium ${
                        isCancelled ? "text-red-700" : "text-green-700"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-yellow-700" />
                    <span className="font-medium text-[#0c0c0c]">
                      ₹{booking.totalPrice?.toLocaleString()}
                    </span>
                  </p>
                </div>

                {/* Cancel Button */}
                {!isCancelled && (
                  <button
                    onClick={() => setOpenDialogId(booking._id)}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-all w-full"
                  >
                    <Trash2 className="w-4 h-4" />
                    Cancel Booking
                  </button>
                )}

                {/* Confirmation Dialog */}
                {openDialogId === booking._id && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Confirm Cancellation
                      </h3>
                      <p className="text-gray-700 mb-6">
                        Are you sure you want to cancel this booking?
                      </p>
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setOpenDialogId(null)}
                          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
                        >
                          No
                        </button>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all"
                        >
                          Yes, Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyBookingPage;
