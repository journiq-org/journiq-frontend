import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";

// 🔹 Message type
interface Message {
  _id: string;
  traveller: { _id: string; name: string; email: string };
  subject: string;
  message: string;
  adminReply?: string; // admin reply optional
  repliedAt?: string;  // timestamp of reply
  status: "read" | "unread";
  createdAt: string;
}

interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

// 🔹 Utility to get token from cookie
const getToken = async (): Promise<string> => {
  const cookieRes = await fetch("/api/auth/get-cookie");
  const { token } = await cookieRes.json();
  if (!token) throw new Error("No token found");
  return token;
};

// ✅ Traveller sends message
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (payload: { subject: string; message: string }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const res = await api.post<Message>(
        "/api/messages/send",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Admin fetch all messages
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const res = await api.get("/api/messages/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data as Message[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Admin / Traveller mark message as read
export const markAsRead = createAsyncThunk(
  "messages/markAsRead",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const res = await api.patch<Message>(
        `/api/messages/markAsRead/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Traveller fetch their own messages
export const getTravellerMessages = createAsyncThunk(
  "messages/getTravellerMessages",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const res = await api.get("/api/messages/myMessages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return Array.isArray(res.data.data) ? res.data.data : [];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Admin replies to a message
export const replyToMessage = createAsyncThunk(
  "messages/replyToMessage",
  async ({ id, reply }: { id: string; reply: string }, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const res = await api.patch<Message>(
        `/api/messages/reply/${id}`,
        { reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch all messages (admin)
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.loading = false;
        state.messages = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Traveller fetch own messages
      .addCase(getTravellerMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTravellerMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.loading = false;
        state.messages = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getTravellerMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action: PayloadAction<Message>) => {
        const index = state.messages.findIndex((msg) => msg._id === action.payload._id);
        if (index !== -1) state.messages[index] = action.payload;
      })

      // Reply to message
      .addCase(replyToMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        const index = state.messages.findIndex((msg) => msg._id === action.payload._id);
        if (index !== -1) state.messages[index] = action.payload;
      });
  },
});

export default messageSlice.reducer;
