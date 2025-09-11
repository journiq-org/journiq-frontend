
"use client";
import React, { useEffect , useState } from "react";
import { Bell, User, LogOut, MapPin, Calendar, Search, Filter, Plus, Star, TrendingUp, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import GuideNavbar from "@/components/GuideNavbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { listDestinations } from "@/redux/slices/destinationSlice";
import Image from "next/image";
import { guideViewTours } from "@/redux/slices/tourSlice";
import { fetchGuideBookings } from "@/redux/slices/guideBookingSlice";


// import { getTourByGuide } from "@/redux/slices/adminSlice";
import { Tour } from "@/types/tour";

export default function GuideDashboard() {
  const router = useRouter();

  const {id} = useParams<{id: string}>()
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const limit = 3;
  const skip = (page - 1) * limit;

  // useEffect(() => {
  //   dispatch(listDestinations({ skip, limit }));
  // }, [dispatch, page]);

//   useEffect(() => {
//   dispatch(listDestinations({ skip, limit }));
//   dispatch(guideViewTours({ page: 1, limit: 100 })); // fetch all or first page of tours
//    dispatch(fetchGuideBookings());
// }, [dispatch, page]);

const [search, setSearch] = useState("");
const [category, setCategory] = useState(""); // example filter

useEffect(() => {
  dispatch(
    listDestinations({
      skip,
      limit,
      search: search || undefined,
      tags: category || undefined, 
    })  
  );  
  dispatch(guideViewTours({ page: 1, limit: 100 }));
  dispatch(fetchGuideBookings());
}, [dispatch, page, search, category]);  



  const { destinations, loading, error, total } = useSelector(
    (state: any) => state.destination
  );  

  const { guideTours, isLoading: toursLoading } = useSelector(
  (state: any) => state.tour  
);  
const { bookings, loading: bookingsLoading } = useSelector(
  (state: any) => state.guideBookings
);  



  const totalPages = Math.ceil(total / limit);
  const stats = {
  active: guideTours?.filter((tour: Tour) => tour.isActive).length || 0,  
  total: guideTours?.length || 0,
  inactive: guideTours?.filter((tour: Tour) => !tour.isActive).length || 0,
};  

const bookingStats = {
  total: bookings?.length || 0,
  pending: bookings?.filter((b: any) => b.status === "pending").length || 0,
  accepted: bookings?.filter((b: any) => b.status === "accepted").length || 0,
  completed: bookings?.filter((b: any) => b.status === "completed").length || 0,
  rejected: bookings?.filter((b: any) => b.status === "rejected").length || 0,
};  



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] to-[#e4e2e1] text-[#363636]">
      {/* Header */}
      <GuideNavbar />

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#22252c] mb-2">
                  Guide Dashboard
                </h1>
                <p className="text-[#333333]">
                  Discover and manage your tour destinations
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/guide/createTour')}
                  className="bg-gradient-to-r from-[#22252c] via-[#1e3a8a] to-[#22252c] shadow-xl text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Plus size={18} />
                  Create Tour
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#fdfdfd] rounded-xl shadow-sm border border-[#e2e0df] p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#333333] text-sm font-medium mb-1">Total Destinations</p>
                  <p className="text-2xl font-bold text-[#22252c]">{destinations?.length || 0}</p>
                </div>
                <div className="bg-[#93c5fd] p-3 rounded-lg">
                  <MapPin className="text-[#1e3a8a]" size={24} />
                </div>
              </div>
            </div>
            
            {/* <div className="bg-[#fdfdfd] rounded-xl shadow-sm border border-[#e2e0df] p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#333333] text-sm font-medium mb-1">Active Tours</p>
                  <p className="text-2xl font-bold text-[#22252c]">--</p>
                </div>
                <div className="bg-[#ff9100] p-3 rounded-lg">
                  <TrendingUp className="text-[#fdfdfd]" size={24} />
                </div>
              </div>
            </div> */}
            <div className="bg-[#fdfdfd] rounded-xl shadow-sm border border-[#e2e0df] p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#333333] text-sm font-medium mb-1">Active Tours</p>
                <p className="text-2xl font-bold text-[#22252c]">
                  {toursLoading ? "Loading..." : stats.active}
                </p>
              </div>
              <div className="bg-[#ff9100] p-3 rounded-lg">
                <TrendingUp className="text-[#fdfdfd]" size={24} />
              </div>
            </div>
          </div>

            
            {/* <div className="bg-[#fdfdfd] rounded-xl shadow-sm border border-[#e2e0df] p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#333333] text-sm font-medium mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-[#22252c]">--</p>
                </div>
                <div className="bg-[#1e3a8a] p-3 rounded-lg">
                  <Users className="text-[#93c5fd]" size={24} />
                </div>
              </div>
            </div> */}
            <div className="bg-[#fdfdfd] rounded-xl shadow-sm border border-[#e2e0df] p-6 hover:shadow-lg transition-shadow duration-300">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-[#333333] text-sm font-medium mb-1">Total Bookings</p>
      <p className="text-2xl font-bold text-[#22252c]">
        {bookingsLoading ? "Loading..." : bookingStats.total}
      </p>
    </div>
    <div className="bg-[#1e3a8a] p-3 rounded-lg">
      <Calendar className="text-[#fdfdfd]" size={24} />
    </div>
  </div>
</div>

          </div>

          {/* Search and Filter Bar */}
          <div className="bg-[#fdfdfd] rounded-xl shadow-sm border border-[#e2e0df] p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333]" size={18} />
                {/* <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2 border border-[#e2e0df] rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none bg-[#fdfdfd] text-[#363636]"
                /> */}
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#e2e0df] rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none bg-[#fdfdfd] text-[#363636]"
                />

              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#e2e0df] rounded-lg hover:bg-[#e4e2e1] transition-colors duration-200 text-[#363636]">
                  <Filter size={18} />
                  Filter
                </button>
                {/* <select className="px-4 py-2 border border-[#e2e0df] rounded-lg bg-[#fdfdfd] hover:bg-[#e4e2e1] transition-colors duration-200 text-[#363636]">
                  <option value="">All Categories</option>
                  <option value="beach">Beach</option>
                  <option value="mountain">Mountain</option>
                  <option value="city">City</option>
                </select> */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 border border-[#e2e0df] rounded-lg bg-[#fdfdfd] hover:bg-[#e4e2e1] transition-colors duration-200 text-[#363636]"
                >
                  <option value="">All Categories</option>
                  <option value="beach">Beach</option>
                  <option value="mountain">Mountain</option>
                  <option value="city">City</option>
                </select>

              </div>
            </div>
          </div>

          {/* Destinations Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#22252c] mb-2">
              Explore Destinations
            </h2>
            <p className="text-[#333333]">
              Choose from {destinations?.length || 0} amazing destinations to create your tours
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b82f6]"></div>
              <span className="ml-3 text-[#333333]">Loading destinations...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm font-bold">!</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error Loading Destinations</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && (!destinations || destinations.length === 0) && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#e4e2e1] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-[#333333]" size={32} />
              </div>
              <h3 className="text-lg font-medium text-[#22252c] mb-2">No destinations found</h3>
              <p className="text-[#333333]">There are no destinations available at the moment.</p>
            </div>
          )}

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations?.map((dest: any) => (
              <div
                key={dest._id}
                className="group bg-[#fdfdfd] rounded-xl shadow-sm border border-[#e2e0df] hover:shadow-lg hover:border-[#3b82f6] transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => router.push(`/guide/destination/${dest._id}`)}
              >
                {/* Destination Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${dest.images?.[0]}` || "/placeholder.jpg"}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Content */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-[#fdfdfd]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#363636]">
                      {dest.category || 'Destination'}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-[#22252c] mb-1 group-hover:text-[#3b82f6] transition-colors duration-200">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[#333333]">
                      <MapPin size={14} />
                      <span className="text-sm">
                        {dest.city ? `${dest.city}, ` : ""}{dest.country}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#363636] text-sm leading-relaxed mb-4 line-clamp-3">
                    {dest.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#e4e2e1]">
                    <div className="flex items-center gap-4">
                      {dest.bestSeason && (
                        <div className="flex items-center gap-1 text-[#333333]">
                          <Calendar size={14} />
                          <span className="text-xs">{dest.bestSeason}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="text-[#ff9100]" size={14} />
                        <span className="text-xs text-[#363636]">4.5</span>
                      </div>

                    </div>
                    
                    {/* <button className="text-[#3b82f6] hover:text-[#1e3a8a] text-sm font-medium transition-colors duration-200">
                      View Details →
                    </button> */}
                    <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering parent card click
                      router.push(`/guide/destination/${dest._id}`);
                    }}
                    className="text-[#3b82f6] hover:text-[#1e3a8a] text-sm font-medium transition-colors duration-200 cursor-pointer"
                  >
                    View Details →
                  </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
            {/* Pagination Controls */}
           {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-100"
              >
                Prev
              </button>
              <span className="text-sm font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#22252c] text-[#e2e0df] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm">
                © 2025 Journiq Guide Dashboard. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-[#fdfdfd] transition-colors duration-200">Help</a>
              <a href="#" className="hover:text-[#fdfdfd] transition-colors duration-200">Support</a>
              <a href="#" className="hover:text-[#fdfdfd] transition-colors duration-200">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}