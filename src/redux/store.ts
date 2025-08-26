import { configureStore } from "@reduxjs/toolkit";
import DestinationReducer from "@/redux/slices/destinationSlice"
import TourReducer from "@/redux/slices/tourSlice"
import userReducer from "./slices/userSlice";
import bookingReducer from "./slices/bookingSlice";


export const store = configureStore({
    reducer:{
        destination : DestinationReducer,
        tour: TourReducer,
        user: userReducer, 
        booking: bookingReducer,
       
    }
})

//  Export AppDispatch and RootState for proper typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
