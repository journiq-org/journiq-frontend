
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

    const res = await api.get('/api/destination/viewAllDestination')
    console.log('Destination list', res.data.data)

    return res.data.data
})

//fetch tour based on destination

export const getTourByDestination = createAsyncThunk('destination/getTourByDestination', async(id: string) => {

  const res = await api.get(`/api/tour/publicView/${id}`)

  return res.data.data
})

//get single destination
export const getSingleDestination = createAsyncThunk('destination/getSingleDestination', async (destinationId: string) => {
  const res = await api.get(`/api/destination/viewDestination/${destinationId}`)
  return res.data.data
})

//create destination
export const createDestination = createAsyncThunk('destination/createDestination', async (formData: FormData) => {
  const res = await api.post('/api/destination/createDestination',formData,  {
    withCredentials: true
  })
  return res.data.data
})


//update destination
export const updateDestination = createAsyncThunk('destination/updateDestination', async({id,formData}: {id:string, formData: FormData}) => {
  const res = await api.patch(`/api/destination/updateDestination/${id}`, formData,{
      withCredentials: true
  })
  return res.data.data
})


//delete destination
export const deleteDestination = createAsyncThunk('destination/deleteDestination', async (id: string) => {
  const res = await api.patch(`/api/destination/deleteDestination/${id}`,{},{
    withCredentials: true
  })
  return {id, destination: res.data.data}
})


//toggle destination status
export const toggleDestinationStatus = createAsyncThunk('destination/toggle', async(id:string) => {
  const res = await api.patch(`/api/destination/${id}/toggle-status`, {},{
    withCredentials: true
  })

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

            //get tours by destination
            .addCase(getTourByDestination.pending, state => {
              state.loading = true
            })
            .addCase(getTourByDestination.fulfilled, ( state, action) => {
              state.loading = false
              state.toursByDestination = action.payload
            })
            .addCase(getTourByDestination.rejected, (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to load Tour of corresponding destination'
            })


            //get single destinations
            .addCase(getSingleDestination.pending, state =>{
              state.loading = true
            })
            .addCase(getSingleDestination.fulfilled, (state, action) => {
              state.loading = false 
              state.selectedDestination = action.payload
            })
            .addCase(getSingleDestination.rejected, (state, action) => {
              state.loading = false
              state.error = action.error.message || 'Failed to load destination'
            })


            //create destination
            .addCase(createDestination.pending, state => {
              state.loading = true
              state.error = null
            })
            .addCase(createDestination.fulfilled, (state,action) => {
              state.loading =false 
              state.destinations.push(action.payload)
            })
            .addCase(createDestination.rejected, (state, action) => {
              state.loading = false 
              state.error = action.error.message || 'Failed to create destination'
            })
            

            //update destination
            .addCase(updateDestination.pending, state => {
              state.loading = true
              state.error = null
            })
            .addCase(updateDestination.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedDestination = action.payload;

            //  update in destinations list 
            const index = state.destinations.findIndex(
              (d) => d._id === action.payload._id
            );
            if (index !== -1) {
              state.destinations[index] = action.payload;
            }
          })
          .addCase(updateDestination.rejected , (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Failed to update destination'
          })

          //delete destination
          .addCase(deleteDestination.pending, state =>{
            state.loading = true
          })
          .addCase(deleteDestination.fulfilled, (state, action) => {
          state.loading = false;

          // Remove from list
          state.destinations = state.destinations.filter(
            (d) => d._id !== action.payload.id
          );

          // If the currently selected destination was deleted, clear it
          if (
            state.selectedDestination &&
            state.selectedDestination._id === action.payload.id
          ) {
            state.selectedDestination = null;
          }

          state.successMessage = "Destination deleted successfully";
        })

        .addCase(deleteDestination.rejected, (state, action) => {
          state.loading = false
          state.error = action.error.message || "Failed to delete destination"
        })

        

        //toggle destination status
        .addCase(toggleDestinationStatus.pending , state => {
          state.loading = true
        })
        .addCase(toggleDestinationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { destinationId, is_active } = action.payload;

        // update in destination list
        const index = state.destinations.findIndex(
          (d) => d._id === destinationId
        );
        if (index !== -1) {
          state.destinations[index].is_active = is_active;
        }

        // update selected destination if same
        if (
          state.selectedDestination &&
          state.selectedDestination._id === destinationId
        ) {
          state.selectedDestination.is_active = is_active;
        }

        state.successMessage = `Destination ${
          is_active ? "activated" : "deactivated"
        } successfully`;
      })
      .addCase(toggleDestinationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to toggle destination";
      });


    }
})




export default destinationSlice.reducer