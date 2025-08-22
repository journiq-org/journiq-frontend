import { configureStore } from "@reduxjs/toolkit";
import DestinationReducer from "@/redux/slices/destinationSlice";
import userReducer from "@/redux/slices/userSlice"; // ✅ default import

export const store = configureStore({
  reducer: {
    destination: DestinationReducer,
    user: userReducer, 
  },
});

//  Export AppDispatch and RootState for proper typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
