"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getReviewsByRole } from "@/redux/slices/reviewSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  _id: string;
  user: { name?: string; profilePic?: string } | string;
  tour: { title?: string } | string;
  rating: number;
  comment: string;
  createdAt: string;
}

const AdminReviewsPage = () => {
  const dispatch = useAppDispatch();
  const { reviews, loading, error } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getReviewsByRole());
  }, [dispatch]);

  const getInitials = (name: string) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Review Moderation</h1>

      {loading && <p className="text-gray-600 text-center">Loading reviews...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {reviews.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>All Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-3 text-left font-medium">User</th>
                    <th className="p-3 text-left font-medium">Tour</th>
                    <th className="p-3 text-left font-medium">Rating</th>
                    <th className="p-3 text-left font-medium">Comment</th>
                    <th className="p-3 text-left font-medium">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r: Review) => (
                    <tr key={r._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 flex items-center space-x-2">
                        {typeof r.user === "string" ? (
                          <Avatar>
                            <AvatarFallback>{getInitials(r.user)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarImage src={r.user.profilePic} alt={r.user.name} />
                            <AvatarFallback>{getInitials(r.user?.name || "Unknown")}</AvatarFallback>
                          </Avatar>
                        )}
                        <span>{typeof r.user === "string" ? r.user : r.user?.name}</span>
                      </td>
                      <td className="p-3">{typeof r.tour === "string" ? r.tour : r.tour?.title}</td>
                      <td className="p-3">{renderStars(r.rating)}</td>
                      <td className="p-3">{r.comment}</td>
                      <td className="p-3">{formatDate(r.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        !loading && <p className="text-center text-gray-500 mt-6">No reviews found.</p>
      )}
    </div>
  );
};

export default AdminReviewsPage;
