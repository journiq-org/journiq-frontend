"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { updateBookingStatus } from "@/redux/slices/guideBookingSlice";
import {
  ArrowLeft,
  Save,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Loader2
} from "lucide-react";
import GuideNavbar from "@/components/GuideNavbar";

const EditStatusPage = () => {
  const { id } = useParams(); // bookingId from URL
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("confirmed");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    if (!id) return;
    
    setIsUpdating(true);
    try {
      await dispatch(updateBookingStatus({ bookingId: id as string, status })).unwrap();
      router.push("/booking/guide-booking"); // navigate back after update
    } catch (error) {
      console.error("Failed to update booking status:", error);
      setIsUpdating(false);
    }
    
  };

  const statusOptions = [
    {
      value: "confirmed",
      label: "Confirmed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      value: "completed",
      label: "Completed",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      value: "cancelled",
      label: "Cancelled",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      value: "pending",
      label: "Pending",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    }
  ];

  const selectedStatusOption = statusOptions.find(option => option.value === status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <GuideNavbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/booking/guide-booking")}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bookings
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Update Booking Status</h1>
              <p className="text-slate-600 text-sm">Modify the status of this booking</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">Booking Status Update</h2>
            <p className="text-slate-600 text-sm mt-1">
              Select the new status for this booking from the options below.
            </p>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6">
            {/* Status Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-900">
                Booking Status
              </label>

              {/* Custom Select Dropdown */}
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none cursor-pointer"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Custom Arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Selected Status Preview */}
              {selectedStatusOption && (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${selectedStatusOption.bgColor} ${selectedStatusOption.borderColor}`}>
                  <selectedStatusOption.icon className={`w-4 h-4 ${selectedStatusOption.color}`} />
                  <span className={`text-sm font-medium ${selectedStatusOption.color}`}>
                    {selectedStatusOption.label}
                  </span>
                </div>
              )}
            </div>

            {/* Status Options Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-900">Available Status Options</h3>
              <div className="grid grid-cols-2 gap-3">
                {statusOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = status === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => setStatus(option.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? `${option.bgColor} ${option.borderColor} border-opacity-100 shadow-sm`
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${option.bgColor}`}>
                          <IconComponent className={`w-4 h-4 ${option.color}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isSelected ? option.color : 'text-slate-900'}`}>
                            {option.label}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Make sure to review the booking details before updating the status.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/booking/guide-booking")}
                  disabled={isUpdating}
                  className="px-6 py-2.5 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  disabled={isUpdating }
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">Status Update Information</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Confirmed:</strong> Booking has been accepted and confirmed</li>
                <li>• <strong>Completed:</strong> Tour has been successfully finished</li>
                <li>• <strong>Cancelled:</strong> Booking has been cancelled</li>
                <li>• <strong>Pending:</strong> Booking is waiting for confirmation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStatusPage;
