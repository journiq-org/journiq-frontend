"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllBookings } from "@/redux/slices/adminSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MyBookingPage = () => {
  const dispatch = useAppDispatch();
  const { allBookings, loading, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const getInitials = (name: string) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">All Bookings</h1>

      {loading && <p className="text-center text-gray-600">Loading bookings...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {allBookings?.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Bookings List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-3 text-left font-medium">Booking ID</th>
                    <th className="p-3 text-left font-medium">User</th>
                    <th className="p-3 text-left font-medium">Tour</th>
                    <th className="p-3 text-left font-medium">Status</th>
                    <th className="p-3 text-left font-medium">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {allBookings.map((b: any) => (
                    <tr key={b._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3">{b._id}</td>
                      <td className="p-3 flex items-center space-x-2">
                        {b.user?.profilePic ? (
                          <Avatar>
                            <AvatarImage src={b.user.profilePic} alt={b.user.name} />
                            <AvatarFallback>{getInitials(b.user.name)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarFallback>{getInitials(b.user?.name)}</AvatarFallback>
                          </Avatar>
                        )}
                        <span>{b.user?.name} ({b.user?.email})</span>
                      </td>
                      <td className="p-3">{b.tour?.title}</td>
                      <td className="p-3">{b.status}</td>
                      <td className="p-3">{formatDate(b.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        !loading && <p className="text-center text-gray-500 mt-6">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookingPage;
