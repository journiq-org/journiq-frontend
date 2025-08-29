
// 'use client'

// import React, { useEffect } from "react";
// import { MapPin, Clock, Users, Star } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { guideViewSingleTour } from "@/redux/slices/tourSlice";
// import { useParams, useRouter } from "next/navigation";
// import api from "@/lib/api";
// import toast from "react-hot-toast";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";

// export default function GuideTourDetailsPage() {
//   const params = useParams();
//   const rawId = params?.tourId;
//   const id = Array.isArray(rawId) ? rawId[0] : rawId ?? "";

//   const router = useRouter();

//   const dispatch = useDispatch<AppDispatch>();
//   const { isloading, error, selectedTour } = useSelector(  (state: any) => state.tour );
  

//   useEffect(() => {
//     if (id) dispatch(guideViewSingleTour(id));
//   }, [id, dispatch]);

//   if (!selectedTour) {
//     return <p className="p-6 text-gray-500">Loading tour details...</p>;
//   }

//   const handleToggleActivity = async() =>{
//     const res = await api.patch(`/api/tour/toggleStatus/${selectedTour._id}`)
//     .then((res) => {
//       toast.success(res.data.message)
//     }).catch((err) => {
//       toast.error(err.response?.data?.message || 'Failed to update tour status')
//     })
//   }

//   const handleDeleteTour = async() => {
//     const res = await api.patch(`/api/tour/deleteTour/${selectedTour._id}`)
//     .then((res) => {
//       toast.success(res.data.message || 'Tour deleted Successfully')
//       router.push('/guide/tours')
//     })
//     .catch((err) => {
//       toast.error(err.response?.data?.message || "Failed to delete tour")
//     })
//   }

//   // const handleDeleteTour = () => {
//   //   if (confirm("Are you sure you want to delete this tour?")) {
//   //     dispatch(guideDeleteTour(selectedTour._id)).then(() => {
//   //       router.push("/guide/tours"); // redirect back after delete
//   //     });
//   //   }
//   // };

//   return (
//     <div className="p-6 space-y-6 bg-[#E0DDD7] min-h-screen">
//       {/* Title + Rating */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">{selectedTour.title}</h1>
//         <div className="flex items-center gap-1 bg-yellow-400 text-black px-2 py-1 rounded">
//           <Star size={16} /> {selectedTour.rating}
//         </div>
//       </div>

//       {/* Images */}
//       <div className="grid grid-cols-3 gap-4">
//         {selectedTour.images.map((img: string, idx: number) => (
//           <img
//             key={idx}
//             src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
//             alt="tour"
//             className="rounded-xl w-full h-48 object-cover shadow"
//           />
//         ))}
//       </div>

//       {/* Info Cards */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="rounded-xl shadow p-4 flex items-center gap-3 bg-white">
//           <MapPin className="text-blue-600" />
//           <div>
//             <p className="font-semibold">Destination</p>
//             <p className="text-sm text-gray-600">
//               {selectedTour.destination.name}
//             </p>
//           </div>
//         </div>
//         <div className="rounded-xl shadow p-4 flex items-center gap-3 bg-white">
//           <Clock className="text-green-600" />
//           <div>
//             <p className="font-semibold">Duration</p>
//             <p className="text-sm text-gray-600">{selectedTour.duration} Days</p>
//           </div>
//         </div>
//         <div className="rounded-xl shadow p-4 flex items-center gap-3 bg-white">
//           <Users className="text-purple-600" />
//           <div>
//             <p className="font-semibold">Meeting Point</p>
//             <p className="text-sm text-gray-600">
//               {selectedTour.meetingPoint}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="rounded-xl shadow bg-white p-6">
//         <h2 className="text-xl font-semibold mb-2">About the Tour</h2>
//         <p className="text-gray-700">{selectedTour.description}</p>
//       </div>

//       {/* Itinerary & Highlights */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="rounded-xl shadow bg-white p-6">
//           <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
//           <ul className="list-disc list-inside text-gray-700 space-y-1">
//             {selectedTour.itinerary.map((day: string, i: number) => (
//               <li key={i}>{day}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="rounded-xl shadow bg-white p-6">
//           <h2 className="text-xl font-semibold mb-2">Highlights</h2>
//           <div className="flex flex-wrap gap-2">
//             {selectedTour.highlights.map((h: string, i: number) => (
//               <span
//                 key={i}
//                 className="bg-blue-100 text-blue-700 px-2 py-1 rounded"
//               >
//                 {h}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Availability */}
//       <div className="rounded-xl shadow bg-white p-6">
//         <h2 className="text-xl font-semibold mb-2">Availability</h2>
//         <div className="grid md:grid-cols-2 gap-4">
//           {selectedTour.availability.map(
//             (slot: { date: string; slots: number }, i: number) => (
//               <div
//                 key={i}
//                 className="p-3 border rounded-lg flex justify-between items-center"
//               >
//                 <p>{new Date(slot.date).toDateString()}</p>
//                 <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
//                   {slot.slots} Slots
//                 </span>
//               </div>
//             )
//           )}
//         </div>
//       </div>

//       {/* Included / Excluded */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="rounded-xl shadow bg-white p-6">
//           <h2 className="text-xl font-semibold mb-2">Included</h2>
//           <ul className="list-disc list-inside text-gray-700 space-y-1">
//             {selectedTour.included.map((item: string, i: number) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="rounded-xl shadow bg-white p-6">
//           <h2 className="text-xl font-semibold mb-2">Excluded</h2>
//           <ul className="list-disc list-inside text-gray-700 space-y-1">
//             {selectedTour.excluded.map((item: string, i: number) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Price + Actions */}
//       <div className="rounded-xl shadow bg-white p-6 text-center space-y-4">
//         <h2 className="text-xl font-semibold">Price</h2>
//         <p className="text-2xl font-bold text-green-600">
//           ₹{selectedTour.price}
//         </p>

//         <div className="flex flex-wrap justify-center gap-3">
//           <button
//             onClick={() => {
//               router.push(`/guide/updateTour/${selectedTour._id}`);
//             }}
//             className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
//           >
//             Edit Tour
//           </button>

//           <button
//             onClick={handleToggleActivity}
//             className={`px-6 py-2 rounded-xl transition ${
//               selectedTour.isActive
//                 ? "bg-yellow-600 hover:bg-yellow-700 text-white"
//                 : "bg-green-600 hover:bg-green-700 text-white"
//             }`}
//           >
//             {selectedTour.isActive ? "Deactivate" : "Activate"}
//           </button>

//           {/* 🚨 Delete with Confirmation */}
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition">
//                   Delete Tour
//                 </button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     This action cannot be undone. This will permanently delete the tour
//                     and notify all travellers with active bookings.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction
//                     className="bg-red-600 hover:bg-red-700 text-white"
//                     onClick={handleDeleteTour}
//                   >
//                     Yes, Delete
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>

//           {/* <button
//             onClick={handleDeleteTour}
//             className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition"
//           >
//             Delete Tour
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// }



'use client'

import React, { useEffect, useState } from "react";
import { MapPin, Clock, Users, Star, ArrowLeft, Edit3, Trash2, Eye, Calendar, DollarSign, CheckCircle, XCircle, Upload, ImageIcon, Tag, Heart, MoreHorizontal, Settings, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { guideViewSingleTour } from "@/redux/slices/tourSlice";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AvailabilitySlot {
  date: string;
  slots: number;
}

interface Tour {
  _id: string;
  title: string;
  description: string;
  destination: {
    name: string;
    country: string;
  };
  duration: number;
  category: string;
  price: number;
  rating: number;
  isActive: boolean;
  images: string[];
  itinerary: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  availability: AvailabilitySlot[];
  meetingPoint: string;
}

export default function GuideTourDetailsPage() {
  const params = useParams();
  const rawId = params?.tourId;
  const id = Array.isArray(rawId) ? rawId[0] : rawId ?? "";

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isloading, error, selectedTour } = useSelector((state: any) => state.tour);

  // State for image gallery
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [showFullGallery, setShowFullGallery] = useState<boolean>(false);

  useEffect(() => {
    if (id) dispatch(guideViewSingleTour(id));
  }, [id, dispatch]);

  if (isloading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Loading tour details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="text-red-600" size={32} />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Error Loading Tour</h3>
          <p className="text-slate-600">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!selectedTour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="text-slate-400" size={32} />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Tour Not Found</h3>
          <p className="text-slate-600">The tour you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/guide/tours')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Tours
          </button>
        </div>
      </div>
    );
  }

  const handleToggleActivity = async (): Promise<void> => {
    try {
      const res = await api.patch(`/api/tour/toggleStatus/${selectedTour._id}`);
      toast.success(res.data.message);
      // Refresh tour data
      dispatch(guideViewSingleTour(id));
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'response' in err
        ? (err as any).response?.data?.message || 'Failed to update tour status'
        : 'Failed to update tour status';
      toast.error(errorMessage);
    }
  };

  const handleDeleteTour = async (): Promise<void> => {
    try {
      const res = await api.patch(`/api/tour/deleteTour/${selectedTour._id}`);
      toast.success(res.data.message || 'Tour deleted successfully');
      router.push('/guide/tours');
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'response' in err
        ? (err as any).response?.data?.message || "Failed to delete tour"
        : "Failed to delete tour";
      toast.error(errorMessage);
    }
  };

  // Get status badge - removed return type annotation to fix JSX namespace error
  const getStatusBadge = () => {
    if (selectedTour.isActive) {
      return (
        <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          <CheckCircle size={14} />
          Active
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
          <XCircle size={14} />
          Inactive
        </div>
      );
    }
  };

  // Get category color
  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      "Adventure": "bg-orange-100 text-orange-800 border-orange-200",
      "Cultural": "bg-purple-100 text-purple-800 border-purple-200",
      "Nature": "bg-green-100 text-green-800 border-green-200",
      "Beach": "bg-blue-100 text-blue-800 border-blue-200",
      "Historical": "bg-amber-100 text-amber-800 border-amber-200",
      "Urban": "bg-slate-100 text-slate-800 border-slate-200",
      "Food & Drink": "bg-pink-100 text-pink-800 border-pink-200",
      "Wildlife": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Religious": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Others": "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[category] || colors["Others"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 group"
              >
                <ArrowLeft size={20} className="text-slate-600 group-hover:text-slate-900" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Tour Details</h1>
                <p className="text-slate-600 text-sm">Manage and view your tour information</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge()}
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(selectedTour.category)}`}>
                {selectedTour.category}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tour Header with Enhanced Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          {/* Main Content */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedTour.title}</h1>
                    <div className="flex items-center gap-2 text-slate-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400 fill-current" size={18} />
                        <span className="font-medium">{selectedTour.rating?.toFixed(1) || "0.0"}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-2xl font-bold text-green-600">₹{selectedTour.price?.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Primary Actions */}
                    <button
                      onClick={() => router.push(`/guide/updateTour/${selectedTour._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>

                    <button
                      onClick={handleToggleActivity}
                      className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md ${
                        selectedTour.isActive
                          ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {selectedTour.isActive ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      {selectedTour.isActive ? "Deactivate" : "Activate"}
                    </button>

                    {/* More Actions Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all duration-200">
                          <MoreHorizontal size={16} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => router.push(`/guide/tours`)}
                          className="cursor-pointer"
                        >
                          <Eye size={16} className="mr-2" />
                          View All Tours
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push(`/guide/addTour`)}
                          className="cursor-pointer"
                        >
                          <Plus size={16} className="mr-2" />
                          Create New Tour
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="cursor-pointer text-red-600 focus:text-red-600"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete Tour
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Tour</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this tour? This action cannot be undone and will affect all bookings associated with this tour.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleDeleteTour}
                              >
                                Delete Tour
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Tour Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="text-sm">{selectedTour.destination?.name}, {selectedTour.destination?.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-sm">{selectedTour.duration} days</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={16} className="text-slate-400" />
                    <span className="text-sm">{selectedTour.availability?.reduce((total: number, slot: AvailabilitySlot) => total + slot.slots, 0) || 0} total slots</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="bg-slate-50 border-t border-slate-200 px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-900">{selectedTour.availability?.length || 0}</div>
                <div className="text-sm text-slate-600">Available Dates</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{selectedTour.highlights?.length || 0}</div>
                <div className="text-sm text-slate-600">Highlights</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{selectedTour.images?.length || 0}</div>
                <div className="text-sm text-slate-600">Photos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{selectedTour.rating?.toFixed(1) || "0.0"}</div>
                <div className="text-sm text-slate-600">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Images Gallery */}
        {selectedTour.images && selectedTour.images.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon size={20} />
                Tour Gallery
              </h2>
              <span className="text-slate-600 text-sm">{selectedTour.images.length} images</span>
            </div>

            {selectedTour.images.length === 1 ? (
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedTour.images[0]}`}
                  alt="Tour main image"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedTour.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setShowFullGallery(true);
                    }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
                        alt={`Tour image ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    {idx === 0 && selectedTour.images.length > 1 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white text-center">
                          <Eye size={24} className="mx-auto mb-2" />
                          <p className="text-sm font-medium">View Gallery</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Key Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Destination</h3>
                <p className="text-slate-600">{selectedTour.destination?.name}</p>
                <p className="text-sm text-slate-500">{selectedTour.destination?.country}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Duration</h3>
                <p className="text-slate-600">{selectedTour.duration} Days</p>
                <p className="text-sm text-slate-500">Full experience</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Meeting Point</h3>
                <p className="text-slate-600">{selectedTour.meetingPoint}</p>
                <p className="text-sm text-slate-500">Starting location</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tour Description */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Tag size={20} />
            About This Tour
          </h2>
          <p className="text-slate-700 leading-relaxed">{selectedTour.description}</p>
        </div>

        {/* Itinerary and Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Itinerary
            </h2>
            <div className="space-y-3">
              {selectedTour.itinerary.map((day: string, i: number) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">{i + 1}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-1">{day}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Star size={20} />
              Highlights
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectedTour.highlights.map((highlight: string, i: number) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Available Dates & Slots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedTour.availability.map((slot: AvailabilitySlot, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {new Date(slot.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {new Date(slot.date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    {slot.slots} slots available
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Included & Excluded */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              What's Included
            </h2>
            <ul className="space-y-2">
              {selectedTour.included.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <XCircle size={20} className="text-red-600" />
              What's Not Included
            </h2>
            <ul className="space-y-2">
              {selectedTour.excluded.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3">
                  <XCircle size={16} className="text-red-600 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Full Gallery Modal */}
      {showFullGallery && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowFullGallery(false)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-900 rounded-full p-2 transition-colors"
            >
              <XCircle size={24} />
            </button>
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedTour.images[selectedImageIndex]}`}
              alt={`Tour image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            {selectedTour.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {selectedTour.images.map((_: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}