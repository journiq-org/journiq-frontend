"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchBookingsByTourId } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";

const MyBookingPage = () => {
  const dispatch = useAppDispatch();
  const { allBookings, loading, error } = useAppSelector((state) => state.admin);

  const [tourId, setTourId] = useState(""); // Optional: filter by tour

  // Example: fetch bookings for a selected tour
  const handleFetch = () => {
    if (!tourId) return alert("Enter tour ID");
    dispatch(fetchBookingsByTourId(tourId));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Booking Moderation</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter Tour ID"
          value={tourId}
          onChange={(e) => setTourId(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Fetch Bookings
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 border">Booking ID</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Tour</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50 border-b">
                <td className="p-2 border">{b._id}</td>
                <td className="p-2 border">{b.user.name} ({b.user.email})</td>
                <td className="p-2 border">{b.tour.title}</td>
                <td className="p-2 border">{b.status}</td>
                <td className="p-2 border">{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingPage;
