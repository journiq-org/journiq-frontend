"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationAsRead,
  deleteNotification,
  clearNotifications
} from "@/redux/slices/notificationSlice";
import TravellerNavbar from "@/components/TravellerNavbar";

const NotificationsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, unreadCount, loading } = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
    dispatch(fetchUnreadCount());
  }, [dispatch]);

  const handleMarkAllAsRead = () => {
    notifications.forEach(notif => {
      if (!notif.isRead) dispatch(markNotificationAsRead(notif._id));
    });
  };

  const handleDeleteAll = () => {
    notifications.forEach(notif => dispatch(deleteNotification(notif._id)));
    dispatch(clearNotifications());
  };

  if (loading) return <p className="text-gray-500 text-center mt-10">Loading notifications...</p>;

  return (
    <div>
      <TravellerNavbar />
      <h1 className="text-2xl font-bold text-center mt-6 mb-4">Notifications</h1>

      <div className="max-w-3xl mx-auto flex justify-between mb-4">
        <button
          onClick={handleMarkAllAsRead}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Mark All as Read
        </button>
        <button
          onClick={handleDeleteAll}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete All
        </button>
        <span className="px-3 py-1 bg-amber-600 text-white rounded">
          Unread: {unreadCount}
        </span>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {notifications.length === 0 && (
          <p className="text-center text-gray-500">No notifications found.</p>
        )}

        {notifications.map((notif) => (
          <div
            key={notif._id}
            className={`p-4 rounded-lg shadow ${
              notif.isRead ? "bg-gray-100" : "bg-white border-l-4 border-amber-600"
            }`}
          >
            <p className="font-semibold">{notif.sender?.name || "System"}</p>
            <p>{notif.message}</p>
            {notif.relatedTour && (
              <p className="text-sm text-gray-500">Tour: {notif.relatedTour.title}</p>
            )}
            {notif.relatedBooking && (
              <p className="text-sm text-gray-500">Booking Status: {notif.relatedBooking.status}</p>
            )}

            <div className="flex gap-2 mt-2">
              {!notif.isRead && (
                <button
                  onClick={() => dispatch(markNotificationAsRead(notif._id))}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => dispatch(deleteNotification(notif._id))}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
