import { configureStore } from "@reduxjs/toolkit";
import DestinationReducer from "@/redux/slices/destinationSlice"
import TourReducer from "@/redux/slices/tourSlice"
import userReducer from "./slices/userSlice";
import bookingReducer from "./slices/bookingSlice";
import guideBookingsReducer from "@/redux/slices/guideBookingSlice";
import notificationsReducer from "@/redux/slices/notificationSlice"
import adminBookingsReducer from "@/redux/slices/adminBookingSlice"
import adminToursReducer from "@/redux/slices/adminTourSlice"
import reviewsReducer from "@/redux/slices/reviewSlice"
import adminGuidesReducer from "@/redux/slices/adminGuideSlice"
import adminUsersReducer from "@/redux/slices/adminUserSlice"

export const store = configureStore({
    reducer:{
        destination : DestinationReducer,
        tour: TourReducer,
        user: userReducer, 
        booking: bookingReducer,
        guideBookings: guideBookingsReducer,
        notifications: notificationsReducer,
        adminBookings: adminBookingsReducer,
        adminTours: adminToursReducer,
        reviews: reviewsReducer,
        adminGuides: adminGuidesReducer,
        adminUsers: adminUsersReducer
    }
})

//  Export AppDispatch and RootState for proper typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
