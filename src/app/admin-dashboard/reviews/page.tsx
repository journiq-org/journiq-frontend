"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchReviewsByRole } from "@/redux/slices/reviewSlice";

const AdminReviewsPage = () => {
  const dispatch = useAppDispatch();
  const { reviews, loading, error } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviewsByRole());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Review Moderation</h1>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {reviews.length > 0 && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-2 border">Review ID</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Tour</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Comment</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50 border-b">
                  <td className="p-2 border">{r._id}</td>
                  <td className="p-2 border">{r.user?.name || "Unknown"}</td>
                  <td className="p-2 border">
                    {typeof r.tour === "string" ? r.tour : r.tour?.title || "-"}
                  </td>
                  <td className="p-2 border">
                    {r.experience
                      ? (
                          (r.experience.serviceQuality +
                            r.experience.punctuality +
                            r.experience.satisfactionSurvey) /
                          3
                        ).toFixed(1)
                      : "-"}
                  </td>
                  <td className="p-2 border">{r.comment}</td>
                  <td className="p-2 border">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {reviews.length === 0 && !loading && <p>No reviews found.</p>}
    </div>
  );
};

export default AdminReviewsPage;
