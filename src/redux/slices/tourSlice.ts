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
  isLoading: boolean;
  error: string | null;
  filters: FiltersState;
  successMessage: string | null;
  guideToursTotal: number; 
  guideCurrentPage: number;
  guideLimit: number;
}

const initialState: TourState= {
  tours: [],             
  publicTours: [],       
  guideTours: [],       
  selectedTour: null,    
  guideToursTotal: 0,
  guideCurrentPage: 1,
  guideLimit: 6,
  isLoading:false,
  error:null,

// support search + filters
  filters: {           
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
  successMessage: null,  
};


//thunk

//public view tour details
export const publicViewTourDetails = createAsyncThunk('tour/details', 
  async(id :string) => {
    const res = await api.get(`/api/tour/publicViewTourDetails/${id}`)
    console.log("public view tour details", res.data.data)

    return res.data.data
})

// view tours of a guide with pagination
export const guideViewTours = createAsyncThunk( "/tours",async ({limit,skip}:{limit:number,skip:number}) => {

    const res = await api.get(`api/tour/viewAll?skip=${skip}&limit=${limit}`, {  
      withCredentials: true,
    });

    return {
      tours: res.data.data,
      total: res.data.total,
    };
  }
);

//guide view single tour
export const guideViewSingleTour = createAsyncThunk('guide/viewSingleTour', 
  async(id:string) => {
  const res = await api.get(`/api/tour/viewTour/${id}`,{
    withCredentials: true,
  })

  console.log('guideViewTour', res.data.data)
  return res.data.data
})

//update booking
export const guideUpdateTour = createAsyncThunk('guide/updatetour', 
  async({id, formData}: {id:string, formData: FormData}) => {
  const res = await api.patch(`/api/tour/update/${id}`, formData,{
    withCredentials:true
  })

  return res.data.data
})



//create tour
export const createTour = createAsyncThunk('guide/addTour', 
  async(formData:FormData) =>{
  const res = await api.post('/api/tour/createtour',formData,{
    withCredentials: true,
    headers:{
      "Content-Type": "multipart/form-data"
    }
  })

  return res.data.data
})


//get all tour

export const getAllTour = createAsyncThunk('traveller/getAllTour', async() =>{
  const res = await api.get('/api/tour/viewAll',{
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
                state.isLoading = true;
                })
                .addCase(guideViewTours.fulfilled, (state, action) => {
                state.isLoading = false;
                state.guideTours = action.payload.tours;
                state.guideToursTotal = action.payload.total;
                })
                .addCase(guideViewTours.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to load tours';
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

            //guide update 
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

            //create tour
            .addCase(createTour.pending, state => {
              state.isLoading = true
            })
            .addCase(createTour.fulfilled, (state,action) => {
              state.isLoading = false
              const newTour = action.payload;

              // add new tour to guide tours list
              state.guideTours.push(newTour);

              state.successMessage = 'Tour Created Successfully'
            })
            .addCase(createTour.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error.message || "Failed to create tour";
            })


            //get all tour
            .addCase(getAllTour.pending, state => {
              state.isLoading = true
            })
            .addCase(getAllTour.fulfilled, (state, action) =>{
              state.isLoading = false
              state.tours = action.payload
            })
            .addCase(getAllTour.rejected, (state, action) =>{
              state.isLoading = false
              state.error = action.error.message ||  'Failed to load tours'
            })
    }
})


export default tourSlice.reducer