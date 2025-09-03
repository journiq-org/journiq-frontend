import api from "@/lib/api";
import { Booking, Review } from "@/types/booking";
import { Tour, TourFilters } from "@/types/tour";
import { User } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DestinationType } from "@/types/destination";


export interface AdminState {
  // COMMON
  loading: boolean;
  error: string | null;

  // USERS
  allUsers: User[];
  blockedUsers: User[];
  singleUser: User | null;
  totalUsers: number;

  // GUIDES
  allGuides: User[];
  singleGuide: User | null;
  totalGuides: number;

  // TOURS
  allTours: Tour[];
  singleTour: Tour | null;
  totalTours: number;

  // BOOKINGS
  allBookings: Booking[];
  singleBooking: Booking | null;
  totalBookings: number;

  // REVIEWS
  allReviews: Review[]
  deletedReviews: Review[];

  //DESTINATION
  allDestinations: DestinationType[]
}


export const adminInitialState: AdminState = {
  // COMMON
  loading: false,
  error:  null,

  // USERS (travellers)
  allUsers: [],          // from getAllUser
  blockedUsers: [],      // from getBlockedUsers
  singleUser: null,      // from getUserById
  totalUsers: 0,

  // GUIDES
  allGuides: [],         // from getAllGuide
  singleGuide: null,     // future use (guide details)
  totalGuides: 0,

  // TOURS
  allTours: [],          // from getTourByGuide (admin view all)
  singleTour: null,      // from getSingleTourByGuide
  totalTours: 0,

  // BOOKINGS
  allBookings: [],       // from getBookingsByTour
  singleBooking: null,   // from getSingleBooking
  totalBookings: 0,

  // REVIEWS
  allReviews: [],
  deletedReviews: [],    // track deleted review IDs or objects

  //DESTINATIONS
  allDestinations: []
};



//thunk

//Users

//fetch all users
export const fetchAllUsers = createAsyncThunk("adminUsers/fetchAllUsers", async () => {
    // const cookieRes = await fetch("/api/auth/get-cookie");
    // const { token } = await cookieRes.json();
    // if (!token) throw new Error("No token found");

    const res = await api.get("/api/admin/users", {
      withCredentials: true,
    });

    return  res.data.data        
});

//get users by id
export const getUserById = createAsyncThunk('admin/getUserById', async (id: string) => {
    const res = await api.get(`/api/admin/users/${id}`,{
        withCredentials: true
    })

    return res.data.data
})

//toggle block user 
export const toggleBlockUser = createAsyncThunk('admin/toggleBlockUser', async (id: string) => {
    const res = await api.patch(`/api/admin/users/block/${id}`,{},{
        withCredentials: true
    })
    return res.data.data
})

//get blocked users 
export const getBlockedUsers = createAsyncThunk('admin/blockedUsers', async () =>{
    const res = await api.get('/api/admin/users/blockedUsers',{
        withCredentials: true
    })
    return res.data.data
})

//delete user
export const adminDeleteUser = createAsyncThunk('admin/deleteUser', async (id: string) => {
    const res = await api.patch(`/api/admin/users/deleteUser/${id}`,{},{
        withCredentials: true
    })
    return res.data.data
})


//BOOKING

//fetch booking by tour id
export const fetchBookingsByTourId = createAsyncThunk('admin/fetchBookingsByTourId',async (tourId: string) => {
    const res = await api.get(`/api/booking/get-booking/${tourId}`,{
        withCredentials: true
    })

    return  res.data.data
})

//GET single booking
export const getSingleBooking = createAsyncThunk('admin/viewSingleBooking', async(bookingId: string) => {
    const res = await api.get(`/api/admin/bookings/${bookingId}`,{
        withCredentials: true
    })
    return res.data.data
})


//guide 


//get all guides
export const fetchAllGuides = createAsyncThunk("adminGuides/fetchAllGuides", async () => {

    const res = await api.get("/api/admin/guide", {
      withCredentials: true,
    });

    return res.data.data
});

//verify guide 
export const verifyGuide = createAsyncThunk('admin/verifyGuide', async (id: string) => {
    const res = await api.patch(`/api/admin/guides/verify/${id}`, {},{
        withCredentials: true
    })
    return res.data.data
})

//revoke guide 
export const revokeGuide = createAsyncThunk('admin/revokeGuide', async (id: string) => {
    const res = await api.patch(`/api/admin/guides/revoke/${id}`, {},{
        withCredentials: true
    })
    return res.data.data
})

//view guide by id
export const viewGuideById = createAsyncThunk('admin/viewGuideById', async (id:string) => {
    const res = await api.get(`/api/admin/viewGuide/${id}`,{
        withCredentials: true
    })
    return res.data.data
})


//tours

//get all tour
export const fetchAllTours = createAsyncThunk<
    Tour[],         // return type
    TourFilters     // argument type
    >("adminTours/fetchAllTours", async (filters, { rejectWithValue }) => {
        
      const res = await api.get(`/api/tour/viewAll`, {
         params: filters,          // pass filters as query params
        withCredentials: true,
      });

      return  res.data.data 
    
  });


//get tour of corresponding guide
  export const getTourByGuide = createAsyncThunk('admin/geTallTourbyguide', async (id: string) => {
    const res = await api.get(`/api/admin/tours/guide/${id}`,{
        withCredentials:true
    })
    return res.data.data
  })

  //get single tour by guide
  export const getSingleTourByGuide = createAsyncThunk('admin/viewSingleTourByGuide', async({guideId, tourId}:{guideId:string, tourId: string}) => {
    const res = await api.get(`/api/admin/tours/guide/${guideId}/tour/${tourId}`,{
        withCredentials:true
    })
    return res.data.data
  })

  //toggle block tour
  export const toggleBlockTour = createAsyncThunk('admin/toggleBlockTour', async(id: string) => {
    const res = await api.patch(`/api/admin/tours/toggleBlock/${id}`,{},{
        withCredentials: true
    })
    return res.data.data
  })


  //review

  //get review by tour
  export const getReviewByTour = createAsyncThunk('admin/getReviewByTour', async (id: string) => {
    const res = await api.get(`/api/review/tour/${id}`,{
        withCredentials: true
    })
    return res.data.data
  })


  //destination

  //get all destination
  export const getAllDestinationsAdmin =createAsyncThunk('admin/getAllDestinations', async () => {
    const res = await api.get(`/api/admin/allDestinations`, {
        withCredentials: true
    })
    return res.data.data
  })

  //get dashboard statistics
  export const fetchDashboardStats = createAsyncThunk('admin/fetchDashboardStats', async() => {
    const res = await api.get('/api/admin/dashboard-stats',{
        withCredentials: true
    })

     console.log('Dashboard response:', res);
    console.log('Dashboard data:', res.data);
    return res.data.data
  })


//slice

const adminSlice = createSlice({
    name: 'admin',
    initialState: adminInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //users

            //fetch all users
            .addCase(fetchAllUsers.pending, state => {
                state.loading = true
                state.error = null
            })
             .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to fetch users";
            })


            //get users by id
            .addCase(getUserById.pending, state => {
                state.loading = true
            })
            .addCase(getUserById.fulfilled, (state, action) =>{
                state.loading = false
                state.singleUser = action.payload
            })
            .addCase(getUserById.rejected, (state,action) => {
                state.loading = false
                state.error = action.error.message || 'failed to load user'
            })

            //toggle block user
            .addCase(toggleBlockUser.pending, state =>{
                state.loading = true
            })
            .addCase(toggleBlockUser.fulfilled, (state, action) => {
                state.loading = false
                 const updatedUser = action.payload;

                // update in allUsers
                state.allUsers = state.allUsers.map(user =>
                    user._id === updatedUser._id ? updatedUser : user
                );

                // update in blockedUsers list
                if (updatedUser.isBlocked) {
                    // add if not already present
                    if (!state.blockedUsers.find(u => u._id === updatedUser._id)) {
                    state.blockedUsers.push(updatedUser);
                    }
                } else {
                    // remove from blockedUsers if unblocked
                    state.blockedUsers = state.blockedUsers.filter(u => u._id !== updatedUser._id);
                }

                // update singleUser if open
                if (state.singleUser && state.singleUser._id === updatedUser._id) {
                    state.singleUser = updatedUser;
                }
            })
            .addCase(toggleBlockUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to toggle block'
            })


            //get blocked users 
            .addCase(getBlockedUsers.pending, state =>{
                state.loading = true
            })
            .addCase(getBlockedUsers.fulfilled, (state, action) => {
                state.loading = false
                state.blockedUsers = action.payload
            })
            .addCase(getBlockedUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to load blocked users'
            })

            //delete user
            .addCase(adminDeleteUser.pending, state => {
                state.loading = false
            })
            .addCase(adminDeleteUser.fulfilled, (state, action) => {
                state.loading = true
                const deletedUser = action.payload;

                // remove from allUsers
                state.allUsers = state.allUsers.filter(u => u._id !== deletedUser._id);

                // also remove from blockedUsers if present
                state.blockedUsers = state.blockedUsers.filter(u => u._id !== deletedUser._id);

                // clear singleUser if it was the deleted one
                if (state.singleUser && state.singleUser._id === deletedUser._id) {
                    state.singleUser = null;
                }

                // decrease count
                if (state.totalUsers > 0) {
                    state.totalUsers -= 1;
                }
            })
            .addCase(adminDeleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to delete user'
            })


            //booking

            //fetch bookings by id
            .addCase(fetchBookingsByTourId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase( fetchBookingsByTourId.fulfilled,( state, action) => {
                    state.loading = false;
                    state.allBookings = action.payload
                })
            .addCase(fetchBookingsByTourId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch bookings";
            })

            //get single booking
            .addCase(getSingleBooking.pending, state => {
                state.loading = true
            })
            .addCase(getSingleBooking.fulfilled, (state, action) => {
                state.loading = false
                state.singleBooking = action.payload
            })
            .addCase(getSingleBooking.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || ' Failed to fetch booking details'
            })


            //guides 

            //fetch all guide
            .addCase(fetchAllGuides.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllGuides.fulfilled, (state, action) => {
                state.loading = false;
                state.allGuides = action.payload
            })
            .addCase(fetchAllGuides.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch guides";
            })


            //verify guide
            .addCase(verifyGuide.pending, state =>{
                state.loading = true
            })
            .addCase(verifyGuide.fulfilled, (state, action) => {
                state.loading = false
               const updatedGuide = action.payload;

                // update in allGuides
                state.allGuides = state.allGuides.map(g =>
                    g._id === updatedGuide._id ? updatedGuide : g
                );

                // update singleGuide if open
                if (state.singleGuide && state.singleGuide._id === updatedGuide._id) {
                    state.singleGuide = updatedGuide;
                }
            })
            .addCase(verifyGuide.rejected, (state, action) => {
                state.loading = false 
                state.error = action.error.message || 'Failed to verify guide'
            })


            //revoke guide
            .addCase(revokeGuide.pending, state => {
                state.loading = true
            })
            .addCase(revokeGuide.fulfilled, (state,action) => {
                state.loading = false
                 const updatedGuide = action.payload;

                // update in allGuides
                state.allGuides = state.allGuides.map(g =>
                    g._id === updatedGuide._id ? updatedGuide : g
                );

                // update singleGuide if open
                if (state.singleGuide && state.singleGuide._id === updatedGuide._id) {
                    state.singleGuide = updatedGuide;
                }
            })
            .addCase(revokeGuide.rejected,(state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed to revoke guide'
            })

            //view guide by id
            .addCase(viewGuideById.pending, (state) => {
                state.loading = true;
            })
            .addCase(viewGuideById.fulfilled, (state, action) => {
                state.loading = false;
                state.singleGuide = action.payload;
            })
            .addCase(viewGuideById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch guide details";
            })



            //tours

            //fetch all tours
            .addCase(fetchAllTours.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTours.fulfilled, (state, action) => {
                state.loading = false;
                state.allTours = action.payload
            })
            .addCase(fetchAllTours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tours";
            })


            // get tours by guide
            .addCase(getTourByGuide.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getTourByGuide.fulfilled, (state, action) => {
            state.loading = false;
            state.allTours = action.payload;
            })
            .addCase(getTourByGuide.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            })


            // get single tour by guide
            .addCase(getSingleTourByGuide.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getSingleTourByGuide.fulfilled, (state, action) => {
            state.loading = false;
            state.singleTour = action.payload;
            })
            .addCase(getSingleTourByGuide.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            })


            //toggle block tour
            .addCase(toggleBlockTour.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(toggleBlockTour.fulfilled, (state, action) => {
            state.loading = false;

            const updatedTour = action.payload;

            // update in allTours
            state.allTours = state.allTours.map((t) =>
                t._id === updatedTour.tourId ? { ...t, isBlocked: updatedTour.isBlocked } : t
            );

            // update singleTour if open
            if (state.singleTour && state.singleTour._id === updatedTour.tourId) {
                state.singleTour = { ...state.singleTour, isBlocked: updatedTour.isBlocked };
            }
            })
            .addCase(toggleBlockTour.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'failed to block tour'
            })


            //review

            //get review by tour
            .addCase(getReviewByTour.pending, state => {
                state.loading = true
            })
            .addCase(getReviewByTour.fulfilled, (state, action) => {
                state.loading = false
                state.allReviews = action.payload
            })
            .addCase(getReviewByTour.rejected, (state,action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to load reviews'
            })


            //destinations

            //get all destinations
            .addCase(getAllDestinationsAdmin.pending, state =>{
                state.loading = true
            })
            .addCase(getAllDestinationsAdmin.fulfilled, (state, action) =>{
                state.loading = false
                state.allDestinations = action.payload
            })
            .addCase(getAllDestinationsAdmin.rejected, (state, action) =>{
                state.loading = false
                state.error = action.error.message || ' Failed to load destinations'
            })


            //get dashboard stats
            .addCase(fetchDashboardStats.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchDashboardStats.fulfilled, (state,action) => {
                state.loading = false;
                state.totalBookings = action.payload.totalBookings || 0; // value of bookings from backend
                state.totalGuides = action.payload.totalGuides || 0;
                state.totalTours = action.payload.totalTours || 0;
                state.totalUsers = action.payload.totalUsers || 0;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to load Statistics'
            })
            
    },
})


// Selectors
export const selectTotalUsers = (state: RootState) => state.admin.totalUsers;
export const selectTotalGuides = (state: RootState) => state.admin.totalGuides;
export const selectTotalTours = (state: RootState) => state.admin.totalTours;
export const selectTotalBookings = (state: RootState) => state.admin.totalBookings;
export const selectAdminLoading = (state: RootState) => state.admin.loading;
export const selectAdminError = (state: RootState) => state.admin.error;


export default adminSlice.reducer