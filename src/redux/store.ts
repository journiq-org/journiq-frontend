import { configureStore } from "@reduxjs/toolkit";
import DestinationReducer from "@/redux/slices/destinationSlice"
import TourReducer from "@/redux/slices/tourSlice"
import userReducer from "./slices/userSlice";
import bookingReducer from "./slices/bookingSlice";
import guideBookingsReducer from "@/redux/slices/guideBookingSlice";
import notificationsReducer from "@/redux/slices/notificationSlice"
import reviewsReducer from "@/redux/slices/reviewSlice"
import messageReducer from "./slices/messageSlice";
import AdminReducer from './slices/adminSlice'

export const store = configureStore({
    reducer:{
        destination : DestinationReducer,
        tour: TourReducer,
        user: userReducer, 
        booking: bookingReducer,
        guideBookings: guideBookingsReducer,
        notifications: notificationsReducer,
        reviews: reviewsReducer,
        messages: messageReducer, 
        admin: AdminReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;