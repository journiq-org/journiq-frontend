import api from "@/lib/api";
import { DestinationType } from "@/types/destination";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Filters {
  search: string;
  country: string;
  bestSeason: string;
  tags: string[];
  popularAttractions: string[];
  sort: "latest" | "oldest" | "name" | "name-desc";
}

interface DestinationState {
  destinations: DestinationType[];
  popular: DestinationType[];
  selectedDestination: DestinationType | null;
  toursByDestination: any[]; // refine later with TourType
  filters: Filters;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: DestinationState = {
  destinations: [],      // list of all destinations
  popular: [],           // popular destinations
  selectedDestination: null, // details of a single destination
  toursByDestination: [], // tours for a specific destination
  filters: {
    search: "",
    country: "",
    bestSeason: "",
    tags: [],
    popularAttractions: [],
    sort: "latest",
  },
  loading: false,        // API call loader
  error: null,           // store error messages
  successMessage: null,  // success messages after create/update/delete
};


//thunk

//list destination

export const listDestinations = createAsyncThunk('/destinations', async() => {

    const res = await api.get('/viewAllDestination')
    console.log('Destination list', res.data.data)

    return res.data.data
})




//slice

const destinationSlice = createSlice({
    name: 'destination',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            //list destination
            .addCase(listDestinations.pending, state => {
                state.loading = true
            })
            .addCase(listDestinations.fulfilled, (state, action) => {
                state.loading = false
                state.destinations = action.payload
            })
            .addCase(listDestinations.rejected, (state,action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to list Destinations'
            })
    }
})




export default destinationSlice.reducer