import { configureStore } from "@reduxjs/toolkit";
import DestinationReducer from "@/redux/slices/destinationSlice"

export const store = configureStore({
    reducer:{
        destination : DestinationReducer,
    }
})

//  Export AppDispatch and RootState for proper typing
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch