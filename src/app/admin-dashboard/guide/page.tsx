"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllGuides } from "@/redux/slices/adminGuideSlice";

const AdminGuidesPage = () => {
  const dispatch = useAppDispatch();
  const { guides, loading, error } = useAppSelector((state) => state.adminGuides);

  useEffect(() => {
    dispatch(fetchAllGuides());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Guides</h1>

      {loading && <p>Loading guides...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {guides.length > 0 && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-2 border">Guide ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Joined At</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((g) => (
                <tr key={g._id} className="hover:bg-gray-50 border-b">
                  <td className="p-2 border">{g._id}</td>
                  <td className="p-2 border">{g.name}</td>
                  <td className="p-2 border">{g.email}</td>
                  <td className="p-2 border">{g.phone || "-"}</td>
                  <td className="p-2 border">{new Date(g.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {guides.length === 0 && !loading && <p>No guides found.</p>}
    </div>
  );
};

export default AdminGuidesPage;
