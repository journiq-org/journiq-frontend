


// "use client";
// import React, { useEffect } from "react";
// import { MapPin, Calendar, IndianRupee, Plus } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { guideViewTours } from "@/redux/slices/tourSlice";
// import { AppDispatch } from "@/redux/store";
// import { Tour } from "@/types/tour";

// const GuideToursPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { guideTours, isloading, error } = useSelector((state: any) => state.tour);

//   useEffect(() => {
//     dispatch(guideViewTours());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-[#E0DDD7] p-8">
//       {/* Header with Add Button */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-[#5E361D]">My Tours</h1>
//         <button
//           onClick={() => router.push("/guide/createTour")}
//           className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
//           bg-gradient-to-r from-[#5E361D] to-[#7B4B27] 
//           text-white font-semibold shadow-md hover:shadow-lg 
//           hover:scale-105 active:scale-95 transition-all duration-200"
//         >
//           <Plus className="w-5 h-5" />
//           Add Tour
//         </button>
//       </div>

//       {/* Loading / Error */}
//       {isloading && <p>Loading...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {/* Tours Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {guideTours.map((tour: Tour) => (
//           <div
//             key={tour._id}
//             className="rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden bg-[#EFEDE9] cursor-pointer"
//           >
//             <div className="h-48 w-full overflow-hidden">
//               <img
//                 src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
//                 alt={tour.title}
//                 className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
//               />
//             </div>

//             <div className="p-4 space-y-2">
//               <h2 className="text-xl font-semibold text-[#0C0C0C]">{tour.title}</h2>
//               <p className="flex items-center text-gray-600 text-sm">
//                 <MapPin className="w-4 h-4 mr-2 text-gray-500" />
//                 {tour.destination?.name}
//               </p>
//               <p className="flex items-center text-gray-600 text-sm">
//                 <Calendar className="w-4 h-4 mr-2 text-gray-500" />
//                 {tour.duration} Days
//               </p>
//               <p className="flex items-center font-semibold text-gray-800">
//                 <IndianRupee className="w-4 h-4 mr-1 text-green-600" />
//                 ₹{tour.price}
//               </p>
//               <button
//                 onClick={() => router.push(`/guide/viewTourDetails/${tour._id}`)}
//                 className="w-full mt-3 bg-[#5E361D] text-[#EFEDE9] py-2 px-4 rounded-xl hover:bg-[#4E361B] transition"
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GuideToursPage;



// "use client";
// import React, { useEffect, useState } from "react";
// import { MapPin, Calendar, DollarSign, Plus, Search, Filter, Eye, Edit3, MoreVertical, Star, Users, TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { guideViewTours } from "@/redux/slices/tourSlice";
// import { AppDispatch } from "@/redux/store";
// import { Tour } from "@/types/tour";
// import GuideNavbar from "@/components/GuideNavbar";

// const GuideToursPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { guideTours, isloading, error } = useSelector((state: any) => state.tour);

//   // State for search and filters
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [categoryFilter, setCategoryFilter] = useState("all");

//   useEffect(() => {
//     dispatch(guideViewTours());
//   }, [dispatch]);

//   // Filter tours based on search and filters
//   const filteredTours = guideTours?.filter((tour: Tour) => {
//     const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          tour.destination?.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "all" || 
//                          (statusFilter === "active" && tour.isActive) ||
//                          (statusFilter === "inactive" && !tour.isActive);
//     const matchesCategory = categoryFilter === "all" || tour.category === categoryFilter;

//     return matchesSearch && matchesStatus && matchesCategory;
//   }) || [];

//   // Calculate stats
//   const stats = {
//     total: guideTours?.length || 0,
//     active: guideTours?.filter((tour: Tour) => tour.isActive).length || 0,
//     inactive: guideTours?.filter((tour: Tour) => !tour.isActive).length || 0,
//     totalBookings: 0, // This would come from a separate API call
//   };

//   // Get status badge
//   const getStatusBadge = (tour: Tour) => {
//     if (tour.isActive) {
//       return (
//         <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
//           <CheckCircle size={12} />
//           Active
//         </div>
//       );
//     } else {
//       return (
//         <div className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
//           <XCircle size={12} />
//           Inactive
//         </div>
//       );
//     }
//   };

//   // Get category color
//   const getCategoryColor = (category: string) => {
//     const colors: { [key: string]: string } = {
//       "Adventure": "bg-orange-100 text-orange-800",
//       "Cultural": "bg-purple-100 text-purple-800",
//       "Nature": "bg-green-100 text-green-800",
//       "Beach": "bg-blue-100 text-blue-800",
//       "Historical": "bg-amber-100 text-amber-800",
//       "Urban": "bg-slate-100 text-slate-800",
//       "Food & Drink": "bg-pink-100 text-pink-800",
//       "Wildlife": "bg-emerald-100 text-emerald-800",
//       "Religious": "bg-indigo-100 text-indigo-800",
//       "Others": "bg-gray-100 text-gray-800",
//     };
//     return colors[category] || colors["Others"];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       <GuideNavbar/>
//       {/* Header Section */}
//       <div className="bg-white shadow-sm border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-900">My Tours</h1>
//               <p className="text-slate-600 mt-1">Manage and track your tour offerings</p>
//             </div>
            
//             <button
//               onClick={() => router.push("/guide/createTour")}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-sm"
//             >
//               <Plus size={18} />
//               Create New Tour
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-slate-600 text-sm font-medium mb-1">Total Tours</p>
//                 <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <Users className="text-blue-600" size={24} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-slate-600 text-sm font-medium mb-1">Active Tours</p>
//                 <p className="text-2xl font-bold text-green-600">{stats.active}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <CheckCircle className="text-green-600" size={24} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-slate-600 text-sm font-medium mb-1">Inactive Tours</p>
//                 <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
//               </div>
//               <div className="bg-red-100 p-3 rounded-lg">
//                 <XCircle className="text-red-600" size={24} />
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-slate-600 text-sm font-medium mb-1">Total Bookings</p>
//                 <p className="text-2xl font-bold text-slate-900">{stats.totalBookings}</p>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-lg">
//                 <TrendingUp className="text-purple-600" size={24} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search tours by title or destination..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               />
//             </div>
            
//             <div className="flex gap-3">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors duration-200"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
              
//               <select
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//                 className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors duration-200"
//               >
//                 <option value="all">All Categories</option>
//                 <option value="Adventure">Adventure</option>
//                 <option value="Cultural">Cultural</option>
//                 <option value="Nature">Nature</option>
//                 <option value="Food & Drink">Food & Drink</option>
//                 <option value="Wildlife">Wildlife</option>
//                 <option value="Historical">Historical</option>
//                 <option value="Beach">Beach</option>
//                 <option value="Urban">Urban</option>
//                 <option value="Religious">Religious</option>
//                 <option value="Others">Others</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isloading && (
//           <div className="flex items-center justify-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-3 text-slate-600">Loading your tours...</span>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <AlertCircle className="h-5 w-5 text-red-400" />
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-red-800">Error Loading Tours</h3>
//                 <p className="text-sm text-red-700 mt-1">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!isloading && !error && filteredTours.length === 0 && guideTours?.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Plus className="text-slate-400" size={32} />
//             </div>
//             <h3 className="text-lg font-medium text-slate-900 mb-2">No tours found</h3>
//             <p className="text-slate-600 mb-6">You haven't created any tours yet. Start by creating your first tour!</p>
//             <button
//               onClick={() => router.push("/guide/addTour")}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
//             >
//               Create Your First Tour
//             </button>
//           </div>
//         )}

//         {/* Filtered Results Info */}
//         {!isloading && !error && guideTours?.length > 0 && filteredTours.length !== guideTours.length && (
//           <div className="mb-6">
//             <p className="text-slate-600">
//               Showing {filteredTours.length} of {guideTours.length} tours
//             </p>
//           </div>
//         )}

//         {/* Tours Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTours.map((tour: Tour) => (
//             <div
//               key={tour._id}
//               className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden"
//             >
//               {/* Tour Image */}
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images?.[0]}` || "/placeholder.jpg"}
//                   alt={tour.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
                
//                 {/* Status Badge */}
//                 <div className="absolute top-3 left-3">
//                   {getStatusBadge(tour)}
//                 </div>
                
//                 {/* Category Badge */}
//                 <div className="absolute top-3 right-3">
//                   <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tour.category)}`}>
//                     {tour.category}
//                   </div>
//                 </div>
                
//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                   <div className="flex gap-2">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         router.push(`/guide/viewTourDetails/${tour._id}`);
//                       }}
//                       className="bg-white/90 hover:bg-white text-slate-900 p-2 rounded-lg transition-colors duration-200"
//                       title="View Details"
//                     >
//                       <Eye size={16} />
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         router.push(`/guide/updateTour/${tour._id}`);
//                       }}
//                       className="bg-white/90 hover:bg-white text-slate-900 p-2 rounded-lg transition-colors duration-200"
//                       title="Edit Tour"
//                     >
//                       <Edit3 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Tour Content */}
//               <div className="p-6">
//                 <div className="mb-4">
//                   <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
//                     {tour.title}
//                   </h3>
                  
//                   <div className="flex items-center gap-4 text-sm text-slate-600">
//                     <div className="flex items-center gap-1">
//                       <MapPin size={14} />
//                       <span>{tour.destination?.name}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Calendar size={14} />
//                       <span>{tour.duration} days</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Rating */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="flex items-center gap-1">
//                     <Star className="text-yellow-400 fill-current" size={14} />
//                     <span className="text-sm text-slate-600">
//                       {tour.rating?.toFixed(1) || "0.0"}
//                     </span>
//                   </div>
//                   <span className="text-slate-400">•</span>
//                   <span className="text-sm text-slate-600">
//                     ₹{tour.price?.toLocaleString()}
//                   </span>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => router.push(`/guide/viewTourDetails/${tour._id}`)}
//                     className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
//                   >
//                     <Eye size={14} />
//                     View
//                   </button>
//                   <button
//                     onClick={() => router.push(`/guide/updateTour/${tour._id}`)}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
//                   >
//                     <Edit3 size={14} />
//                     Edit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
    
//   );
// };

// export default GuideToursPage;


"use client";
import React, { useEffect, useState } from "react";
import { MapPin, Calendar, IndianRupee, Plus, Search, Filter, Eye, Edit3, MoreVertical, Star, Users, TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { guideViewTours } from "@/redux/slices/tourSlice";
import { AppDispatch } from "@/redux/store";
import { Tour } from "@/types/tour";
import GuideNavbar from "@/components/GuideNavbar";

const GuideToursPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { guideTours, isLoading, error, guideCurrentPage, guideLimit, guideToursTotal } = useSelector((state: any) => state.tour);


  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
const limit = 6; // tours per page


useEffect(() => {
  dispatch(guideViewTours({ page: currentPage, limit }));
}, [dispatch, currentPage]);

  // Filter tours based on search and filters
  const filteredTours = guideTours?.filter((tour: Tour) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.destination?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && tour.isActive) ||
                         (statusFilter === "inactive" && !tour.isActive);
    const matchesCategory = categoryFilter === "all" || tour.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  }) || [];

  // Calculate stats
  const stats = {
    total: guideTours?.length || 0,
    active: guideTours?.filter((tour: Tour) => tour.isActive).length || 0,
    inactive: guideTours?.filter((tour: Tour) => !tour.isActive).length || 0,
    totalBookings: 0, // This would come from a separate API call
  };

  // Get status badge
  const getStatusBadge = (tour: Tour) => {
    if (tour.isActive) {
      return (
        <div className="flex items-center gap-1.5 bg-[#93c5fd]/20 text-[#1e3a8a] px-3 py-1.5 rounded-full text-xs font-semibold border border-[#93c5fd]/30">
          <CheckCircle size={12} />
          Active
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5 bg-[#e2e0df] text-[#333333] px-3 py-1.5 rounded-full text-xs font-semibold border border-[#e2e0df]">
          <XCircle size={12} />
          Inactive
        </div>
      );
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Adventure": "bg-[#ff9100]/20 text-[#ff9100] border-[#ff9100]/30",
      "Cultural": "bg-[#3b82f6]/20 text-[#1e3a8a] border-[#3b82f6]/30",
      "Nature": "bg-[#93c5fd]/20 text-[#1e3a8a] border-[#93c5fd]/30",
      "Beach": "bg-[#e4e2e1] text-[#363636] border-[#e2e0df]",
      "Historical": "bg-[#ff9100]/15 text-[#ff9100] border-[#ff9100]/25",
      "Urban": "bg-[#333333]/20 text-[#22252c] border-[#333333]/30",
      "Food & Drink": "bg-[#93c5fd]/15 text-[#3b82f6] border-[#93c5fd]/25",
      "Wildlife": "bg-[#1e3a8a]/20 text-[#fdfdfd] border-[#1e3a8a]/30",
      "Religious": "bg-[#ff9100]/20 text-[#ff9100] border-[#ff9100]/30",
      "Others": "bg-[#e2e0df] text-[#363636] border-[#e2e0df]",
    };
    return colors[category] || colors["Others"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] to-[#e4e2e1]">
      <GuideNavbar/>
      {/* Header Section */}
      <div className="bg-[#fdfdfd] shadow-lg border-b border-[#e2e0df]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#22252c]">My Tours</h1>
              <p className="text-[#333333] mt-1">Manage and track your tour offerings</p>
            </div>
            
            <button
              onClick={() => router.push("/guide/createTour")}
              className="bg-gradient-to-r from-[#22252c] via-[#1e3a8a] to-[#22252c] shadow-xl text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <Plus size={18} />
              Create New Tour
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#fdfdfd] rounded-xl shadow-lg border border-[#e2e0df] p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#333333] text-sm font-semibold mb-1">Total Tours</p>
                <p className="text-2xl font-bold text-[#22252c]">{stats.total}</p>
              </div>
              <div className="bg-[#93c5fd]/20 p-3 rounded-xl border border-[#93c5fd]/30">
                <Users className="text-[#1e3a8a]" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-[#fdfdfd] rounded-xl shadow-lg border border-[#e2e0df] p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#333333] text-sm font-semibold mb-1">Active Tours</p>
                <p className="text-2xl font-bold text-[#1e3a8a]">{stats.active}</p>
              </div>
              <div className="bg-[#93c5fd]/20 p-3 rounded-xl border border-[#93c5fd]/30">
                <CheckCircle className="text-[#1e3a8a]" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-[#fdfdfd] rounded-xl shadow-lg border border-[#e2e0df] p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#333333] text-sm font-semibold mb-1">Inactive Tours</p>
                <p className="text-2xl font-bold text-[#ff9100]">{stats.inactive}</p>
              </div>
              <div className="bg-[#ff9100]/20 p-3 rounded-xl border border-[#ff9100]/30">
                <XCircle className="text-[#ff9100]" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-[#fdfdfd] rounded-xl shadow-lg border border-[#e2e0df] p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#333333] text-sm font-semibold mb-1">Total Bookings</p>
                <p className="text-2xl font-bold text-[#22252c]">{stats.totalBookings}</p>
              </div>
              <div className="bg-[#3b82f6]/20 p-3 rounded-xl border border-[#3b82f6]/30">
                <TrendingUp className="text-[#1e3a8a]" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#fdfdfd] rounded-xl shadow-lg border border-[#e2e0df] p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333]" size={18} />
              <input
                type="text"
                placeholder="Search tours by title or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#e2e0df] rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none bg-[#fdfdfd] text-[#363636] placeholder-[#333333]"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-[#e2e0df] rounded-xl bg-[#fdfdfd] hover:bg-[#e4e2e1] transition-all duration-300 text-[#363636] focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-[#e2e0df] rounded-xl bg-[#fdfdfd] hover:bg-[#e4e2e1] transition-all duration-300 text-[#363636] focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
                <option value="Nature">Nature</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Historical">Historical</option>
                <option value="Beach">Beach</option>
                <option value="Urban">Urban</option>
                <option value="Religious">Religious</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3b82f6]"></div>
            <span className="ml-3 text-[#333333] text-lg">Loading your tours...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-[#ff9100]/10 border border-[#ff9100]/30 rounded-xl p-6 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-[#ff9100]" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-[#ff9100]">Error Loading Tours</h3>
                <p className="text-sm text-[#363636] mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredTours.length === 0 && guideTours?.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#e4e2e1] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#e2e0df]">
              <Plus className="text-[#333333]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#22252c] mb-3">No tours found</h3>
            <p className="text-[#363636] mb-8 max-w-md mx-auto">You haven't created any tours yet. Start by creating your first tour!</p>
            <button
              onClick={() => router.push("/guide/addTour")}
              className="bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#22252c] text-[#fdfdfd] px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Create Your First Tour
            </button>
          </div>
        )}

        {/* Filtered Results Info */}
        {!isLoading && !error && guideTours?.length > 0 && filteredTours.length !== guideTours.length && (
          <div className="mb-6">
            <p className="text-[#333333] bg-[#e4e2e1] px-4 py-2 rounded-lg inline-block">
              Showing {filteredTours.length} of {guideTours.length} tours
            </p>
          </div>
        )}

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour: Tour) => (
            <div
              key={tour._id}
              className="group bg-[#fdfdfd] rounded-xl shadow-lg border border-[#e2e0df] hover:shadow-2xl hover:border-[#3b82f6]/50 transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-[1.02]"
            >
              {/* Tour Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images?.[0]}` || "/placeholder.jpg"}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {getStatusBadge(tour)}
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(tour.category)}`}>
                    {tour.category}
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#22252c]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/guide/viewTourDetails/${tour._id}`);
                      }}
                      className="bg-[#fdfdfd]/90 hover:bg-[#fdfdfd] text-[#363636] p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/guide/updateTour/${tour._id}`);
                      }}
                      className="bg-[#3b82f6] hover:bg-[#1e3a8a] text-[#fdfdfd] p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                      title="Edit Tour"
                    >
                      <Edit3 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tour Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#22252c] mb-3 line-clamp-2 group-hover:text-[#3b82f6] transition-colors duration-300">
                    {tour.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-[#333333]">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      <span>{tour.destination?.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{tour.duration} days</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="text-[#ff9100] fill-current" size={14} />
                    <span className="text-sm text-[#363636] font-medium">
                      {tour.rating?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                  <span className="text-[#333333]">•</span>
                  <span className="text-sm text-[#363636] font-semibold">
                    ₹{tour.price?.toLocaleString()}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(`/guide/viewTourDetails/${tour._id}`)}
                    className="flex-1 bg-[#e4e2e1] hover:bg-[#e2e0df] text-[#363636] py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-[#e2e0df] hover:border-[#333333]"
                  >
                    <Eye size={14} />
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/guide/updateTour/${tour._id}`)}
                    className="flex-1 bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#22252c] text-[#fdfdfd] py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                </div>
              </div>

              

            </div>
          ))}
        </div>

        {/* Pagination */}
        {guideToursTotal > limit && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#fdfdfd] border border-[#e2e0df] rounded-xl hover:bg-[#e2e0df] disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-[#333333]">
              Page {currentPage} of {Math.ceil(guideToursTotal / limit)}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(guideToursTotal / limit)))}
              disabled={currentPage === Math.ceil(guideToursTotal / limit)}
              className="px-4 py-2 bg-[#fdfdfd] border border-[#e2e0df] rounded-xl hover:bg-[#e2e0df] disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
    
  );
};

export default GuideToursPage;