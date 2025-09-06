


// "use client";
// import React, { useEffect } from "react";
// import { Bell, User, LogOut, MapPin, Calendar } from "lucide-react";
// import { useRouter } from "next/navigation";
// import GuideNavbar from "@/components/GuideNavbar";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { listDestinations } from "@/redux/slices/destinationSlice";
// import Image from "next/image";

// export default function Page() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { destinations, loading , error } = useSelector(
//     (state: any) => state.destination
//   );

//   const handleLogout = async () => {
//     try {
//       await fetch("/api/auth/clear-cookie", {
//         method: "POST",
//       });
//       toast.success("Logged out ✅");
//     } catch (err) {
//       console.warn("Failed to clear cookies", err);
//     }
//     router.replace("/");
//   };

//   useEffect(() => {
//     dispatch(listDestinations()).unwrap();
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-[#E2E0DF] text-[#0C0C0C] flex flex-col">
//       {/* Header */}
//       <GuideNavbar />

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-[#E0DDD7]">
//         <h2 className="text-2xl font-bold mb-6 text-[#5E361D]">
//           Explore Destinations 🌍
//         </h2>

//         {loading && (
//           <p className="text-center text-gray-600">Loading destinations...</p>
//         )}
//         {error && (
//           <p className="text-center text-red-500">⚠ {error}</p>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {destinations?.map((dest: any) => (
//             <div
//               key={dest._id}
//               className="bg-[#EFEDE9] rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
//               onClick={() => router.push(`/guide/destinations/${dest._id}`)}
//             >
//               {/* Destination Image */}
//               <div className="relative w-full h-48">
//                 <Image
//                   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${dest.images?.[0]} `|| "/placeholder.jpg"}
//                   alt={dest.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-5">
//                 <h3 className="text-lg font-bold text-[#5E361D]">
//                   {dest.name}
//                 </h3>
//                 <p className="text-sm text-[#4E4D45] mb-2">
//                   {dest.city ? `${dest.city}, ` : ""}{dest.country}
//                 </p>

//                 <p className="text-sm text-gray-700 line-clamp-3 mb-3">
//                   {dest.description}
//                 </p>

//                 {/* Meta info */}
//                 <div className="flex items-center justify-between text-sm text-[#4E4D45]">
//                   <div className="flex items-center gap-1">
//                     <MapPin size={16} />
//                     <span>{dest.tags?.[0] || "Destination"}</span>
//                   </div>
//                   {dest.bestSeason && (
//                     <div className="flex items-center gap-1">
//                       <Calendar size={16} />
//                       <span>{dest.bestSeason}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-[#5E361D] text-[#EFEDE9] py-4 text-center text-sm">
//         © 2025 Journiq Guide Dashboard. All rights reserved.
//       </footer>
//     </div>
//   );
// }




"use client";
import React, { useEffect } from "react";
import { Bell, User, LogOut, MapPin, Calendar, Search, Filter, Plus, Star, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import GuideNavbar from "@/components/GuideNavbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { listDestinations } from "@/redux/slices/destinationSlice";
import Image from "next/image";

export default function GuideDashboard() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { destinations, loading, error } = useSelector(
    (state: any) => state.destination
  );

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/clear-cookie", {
        method: "POST",
      });
      toast.success("Logged out successfully");
    } catch (err) {
      console.warn("Failed to clear cookies", err);
    }
    router.replace("/");
  };

  useEffect(() => {
    dispatch(listDestinations()).unwrap();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      {/* Header */}
      <GuideNavbar />

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Guide Dashboard
                </h1>
                <p className="text-slate-600">
                  Discover and manage your tour destinations
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/guide/createTour')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Plus size={18} />
                  Create Tour
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">Total Destinations</p>
                  <p className="text-2xl font-bold text-slate-900">{destinations?.length || 0}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">Active Tours</p>
                  <p className="text-2xl font-bold text-slate-900">--</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-slate-900">--</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  <Filter size={18} />
                  Filter
                </button>
                <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors duration-200">
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
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Explore Destinations
            </h2>
            <p className="text-slate-600">
              Choose from {destinations?.length || 0} amazing destinations to create your tours
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-slate-600">Loading destinations...</span>
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
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-slate-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No destinations found</h3>
              <p className="text-slate-600">There are no destinations available at the moment.</p>
            </div>
          )}

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations?.map((dest: any) => (
              <div
                key={dest._id}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => router.push(`/guide/destinations/${dest._id}`)}
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
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                      {dest.category || 'Destination'}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-600">
                      <MapPin size={14} />
                      <span className="text-sm">
                        {dest.city ? `${dest.city}, ` : ""}{dest.country}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    {dest.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      {dest.bestSeason && (
                        <div className="flex items-center gap-1 text-slate-500">
                          <Calendar size={14} />
                          <span className="text-xs">{dest.bestSeason}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400" size={14} />
                        <span className="text-xs text-slate-600">4.5</span>
                      </div>
                    </div>
                    
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm">
                © 2025 Journiq Guide Dashboard. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors duration-200">Help</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Support</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}