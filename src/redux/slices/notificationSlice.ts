import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { RootState } from "../store";

// Notification type
export interface Notification {
  _id: string;
  recipient: string;
  sender?: { _id: string; name: string };
  relatedTour?: { _id: string; title: string };
  relatedBooking?: { _id: string; status: string };
  message: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface NotificationState {
  loading: boolean;
  error: string | null;
  allNotifications: Notification[];
  unreadNotifications: Notification[];
}

export const notificationInitialState: NotificationState = {
  loading: false,
  error: null,
  allNotifications: [],
  unreadNotifications: [],
};

// ===================
// Thunks
// ===================

// Fetch all notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async () => {
    const res = await api.get("/api/notification/allNotification", {
      withCredentials: true,
    });
    return res.data.data as Notification[];
  }
);

// Fetch unread notifications
export const fetchUnreadNotifications = createAsyncThunk(
  "notifications/fetchUnread",
  async () => {
    const res = await api.get("/api/notifications/unread", {
      withCredentials: true,
    });
    return res.data.data as Notification[];
  }
);

// Mark single notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string) => {
    const res = await api.patch(
      `/api/notification/markAsRead/${id}`,
      
      { withCredentials: true }
    );
    return res.data.data as Notification;
  }
);

// Mark all notifications as read
export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async () => {
    const res = await api.patch(
      "/api/notification/markAllAsRead",
    
      { withCredentials: true }
    );
    return res.data.data as Notification[];
  }
);

// delete single notification
export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (id: string) => {
    await api.patch(`/api/notification/deleteNotification/${id}`, { withCredentials: true });
    return id;
  }
);

// Delete all notifications
export const deleteAllNotifications = createAsyncThunk(
  "notifications/deleteAll",
  async () => {
    await api.patch("/api/notifications/delete-all", { withCredentials: true });
    return [] as Notification[];
  }
);

// ===================
// Slice
// ===================
const notificationSlice = createSlice({
  name: "notifications",
  initialState: notificationInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.allNotifications = action.payload;
        state.unreadNotifications = action.payload.filter((n) => !n.isRead);
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notifications";
      })

      // Fetch unread
      .addCase(fetchUnreadNotifications.fulfilled, (state, action) => {
        state.unreadNotifications = action.payload;
      })

      // Mark single as read
       .addCase(markNotificationAsRead.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(markNotificationAsRead.fulfilled, (state, action) => {
          state.loading = false;
          state.allNotifications = state.allNotifications.map((n) =>
            n._id === action.payload._id ? action.payload : n
          );
          state.unreadNotifications = state.unreadNotifications.filter(
            (n) => n._id !== action.payload._id
          );
        })
        .addCase(markNotificationAsRead.rejected, (state, action) => {
          state.loading = false;
          state.error =
            action.error.message || "Failed to mark notification as read";
        })
      // Mark all as read
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.allNotifications = action.payload;
        state.unreadNotifications = [];
      })

      // Delete single
        .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.allNotifications = state.allNotifications.filter(
          (n) => n._id !== action.payload
        );
        state.unreadNotifications = state.unreadNotifications.filter(
          (n) => n._id !== action.payload
        );
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to delete notification";
      })

      // Delete all
      .addCase(deleteAllNotifications.fulfilled, (state) => {
        state.allNotifications = [];
        state.unreadNotifications = [];
      });
  },
});

export default notificationSlice.reducer;

// Selectors
export const selectNotifications = (state: RootState) =>
  state.notifications.allNotifications;
export const selectUnreadNotifications = (state: RootState) =>
  state.notifications.unreadNotifications;
