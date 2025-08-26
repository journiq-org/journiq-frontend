import api from "@/lib/api";
import { Tour } from "@/types/tour";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface FiltersState {
  destination: string | null;
  title: string;
  category: string;
  priceMin: number | null;
  priceMax: number | null;
  durationMin: number | null;
  durationMax: number | null;
  date: string | null;
  ratingMin: number | null;
  popular: boolean;
}

interface TourState {
  tours: Tour[];
  publicTours: Tour[];
  guideTours: Tour[];
  selectedTour: Tour | null;
  filters: FiltersState;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: TourState= {
  tours: [],              // list of tours (for admin/guide/traveller)
  publicTours: [],        // tours visible to public without login
  guideTours: [],         // tours belonging to a guide (for profile page)
  selectedTour: null,     // single tour details (from viewTour)
  
  filters: {              // support search + filters
    destination: null,
    title: "",
    category: "",
    priceMin: null,
    priceMax: null,
    durationMin: null,
    durationMax: null,
    date: null,
    ratingMin: null,
    popular: false,
  },
  
  isLoading: false,       // generic loading state
  error: null,            // to capture errors
  successMessage: null,   // for showing toast/alerts after create/update/delete
};


//thunk

//public view tour details
export const publicViewTourDetails = createAsyncThunk('tour/details', async(id :string) => {
    const res = await api.get(`/api/tour/publicViewTourDetails/${id}`)
    console.log("public view tour details", res.data.data)

    return res.data.data
})

//view tours of a guide
export const guideViewTours = createAsyncThunk('/tours', async() => {

  // const cookieRes = await fetch('/api/auth/get-cookie',{
  //    credentials: "include", 
  // })
  // const {token , role} = await cookieRes.json()


  const res = await api.get('api/tour/viewAll', {
    // headers:{
    //   'Authorization': `Bearer ${token}`
    // }
    withCredentials: true,
  })

  console.log(res.data.data, "view all tour of guide")
  return res.data.data
})

//guide view single tour

export const guideViewSingleTour = createAsyncThunk('guide/viewSingleTour', async(id:string) => {
  const res = await api.get(`/api/tour/viewTour/${id}`,{
    withCredentials: true,
  })

  console.log('guideViewTour', res.data.data)
  return res.data.data
})

//update booking
export const guideUpdateTour = createAsyncThunk('guide/updatetour', async(id , formData) => {
  const res = await api.patch(`/api/tour/update/${id}`, formData,{
    withCredentials:true
  })

  return res.data.data
})


//slice
const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            //public view tour details
            .addCase(publicViewTourDetails.pending, state => {
                state.isLoading = true
            })
            .addCase(publicViewTourDetails.fulfilled, (state, action) => {
                state.isLoading = false,
                state.selectedTour = action.payload
            })
            .addCase(publicViewTourDetails.rejected, (state, action) => {
                state.isLoading = false,
                state.error = action.error.message || 'Failed to load tour details'
            })


            //guide view all tours
            .addCase(guideViewTours.pending, state => {
              state.isLoading = true
            })
            .addCase(guideViewTours.fulfilled, ( state, action) => {
              state.isLoading = false,
              state.guideTours = action.payload
            })
            .addCase(guideViewTours.rejected, (state, action) => {
              state.isLoading = false,
              state.error = action.error.message || 'Failed to load tours'
            })

            //guide view single tour
            .addCase(guideViewSingleTour.pending, state => {
              state.isLoading = true
            })
            .addCase(guideViewSingleTour.fulfilled, (state, action) => {
              state.isLoading = false 
              state.selectedTour = action.payload
            })
            .addCase(guideViewSingleTour.rejected, (state, action) => {
              state.isLoading = false
              state.error = action.error.message || ' Failed to load tour details'
            })

            //guide update product
            .addCase(guideUpdateTour.pending, state =>{
              state.isLoading = true
            })
            .addCase(guideUpdateTour.fulfilled, (state, action) => {
              state.isLoading = false
              const updatedTour = action.payload;

              // Update the currently viewed tour
              state.selectedTour = updatedTour;

              // Update the tour in the guide's list
              state.guideTours = state.guideTours.map(t =>
                  t._id === updatedTour._id ? updatedTour : t
              );
            })
            .addCase(guideUpdateTour.rejected, (state, action) => {
              state.isLoading = false
              state.error = action.error.message || 'Failed to update tour'
            })
    }
})


export default tourSlice.reducer