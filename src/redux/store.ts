import { configureStore } from "@reduxjs/toolkit";
import DestinationReducer from "@/redux/slices/destinationSlice"
import TourReducer from "@/redux/slices/tourSlice"
<<<<<<< Updated upstream
import userReducer from "@/redux/slices/userSlice"; 
=======


>>>>>>> Stashed changes
export const store = configureStore({
    reducer:{
        destination : DestinationReducer,
        tour: TourReducer,
<<<<<<< Updated upstream
        user: userReducer, 
=======
>>>>>>> Stashed changes
       
    }
})

//  Export AppDispatch and RootState for proper typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
