"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllUsers } from "@/redux/slices/adminUserSlice";

const AdminUsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {users.length > 0 && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-2 border">User ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Joined At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 border-b">
                  <td className="p-2 border">{u._id}</td>
                  <td className="p-2 border">{u.name}</td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">{u.phone || "-"}</td>
                  <td className="p-2 border">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {users.length === 0 && !loading && <p>No users found.</p>}
    </div>
  );
};

export default AdminUsersPage;
