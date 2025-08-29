import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { RootState } from "../store";

// 🔹 Notification type
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

interface NotificationState {
  notifications: Notification[];
  unread: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unread: [],
  loading: false,
  error: null,
};

// 🔹 Helper: Get auth token
const getToken = async () => {
  const cookieRes = await fetch("/api/auth/get-cookie");
  const { token } = await cookieRes.json();
  if (!token) throw new Error("No token found");
  return token;
};

// ✅ List all notifications
export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  { rejectValue: string }
>("notifications/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = await getToken();
    const res = await api.get("/api/notification/allNotification", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to load notifications");
  }
});

// ✅ List unread notifications
export const fetchUnreadNotifications = createAsyncThunk<
  Notification[],
  void,
  { rejectValue: string }
>("notifications/fetchUnread", async (_, { rejectWithValue }) => {
  try {
    const token = await getToken();
    const res = await api.get("/api/notifications/unread", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to load unread notifications");
  }
});

// ✅ Mark notification as read
export const markNotificationAsRead = createAsyncThunk<
  Notification,
  string,
  { rejectValue: string }
>("notifications/markAsRead", async (id, { rejectWithValue }) => {
  try {
    const token = await getToken();
    const res = await api.patch(`/api/notifications/markAsRead/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to mark as read");
  }
});

// ✅ Mark all as read
export const markAllNotificationsAsRead = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("notifications/markAllAsRead", async (_, { rejectWithValue }) => {
  try {
    const token = await getToken();
    await api.patch("/api/notifications/read-all", {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to mark all as read");
  }
});

// ✅ Delete single notification
export const deleteNotification = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("notifications/delete", async (id, { rejectWithValue }) => {
  try {
    const token = await getToken();
    await api.delete(`/api/notifications/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to delete notification");
  }
});

// ✅ Delete all notifications
export const deleteAllNotifications = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("notifications/deleteAll", async (_, { rejectWithValue }) => {
  try {
    const token = await getToken();
    await api.delete("/api/notifications/delete-all", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to delete all notifications");
  }
});

// 🔹 Slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
 
  reducers: {
  markAsReadLocally: (state, action: PayloadAction<string>) => {
    state.notifications = state.notifications.map((n) =>
      n._id === action.payload ? { ...n, isRead: true } : n
    );
  },
},

  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching notifications";
      })

      // Fetch unread
      .addCase(fetchUnreadNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.unread = action.payload;
      })

      // Mark as read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((n) =>
          n._id === action.payload._id ? action.payload : n
        );
      })

      // Mark all as read
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({ ...n, isRead: true }));
      })

      // Delete one
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter((n) => n._id !== action.payload);
      })

      // Delete all
      .addCase(deleteAllNotifications.fulfilled, (state) => {
        state.notifications = [];
      });
  },
});

export const { markAsReadLocally } = notificationSlice.actions;

export default notificationSlice.reducer;

// selectors
export const selectNotifications = (state: RootState) => state.notifications.notifications;
export const selectUnreadNotifications = (state: RootState) => state.notifications.unread;
