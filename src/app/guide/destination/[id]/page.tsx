// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { useParams, useRouter } from "next/navigation";
// import { getSingleDestination } from "@/redux/slices/destinationSlice";
// import { guideViewTours } from "@/redux/slices/tourSlice";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Image from "next/image";
// import { Plus, Building2, ExternalLink, Eye, Edit3, Star, Calendar, MapPin } from "lucide-react";
// import GuideNavbar from "@/components/GuideNavbar";

// export default function GuideDestinationPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();

//   // Redux state
//   const { selectedDestination, loading } = useSelector(
//     (state: RootState) => state.destination
//   );

//   const { guideTours, isLoading: toursLoading,guideToursTotal } = useSelector(
//     (state: RootState) => state.tour
//   );

//   const [page , setPage] = useState(1)
//   const limit = 6
//   const skip = (page - 1) * limit
//   const totalPages = (guideToursTotal / limit)

//   // Fetch destination and tours
//   useEffect(() => {
//     if (id) {
//       dispatch(getSingleDestination(id as string));
//       dispatch(
//         guideViewTours({limit, skip})
//       );
//     }
//   }, [id, dispatch]);

//   // Loading state
//  if (loading || !selectedDestination) {
//   return <p className="text-center py-12">Loading...</p>;
// }

//   return (
//     <>
//     <GuideNavbar/>
//     <div className="p-6 space-y-8">

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">{selectedDestination.name}</h1>
//         <Button
//           onClick={() =>
//             router.push(`/guide/createTour`)
//           }
//           className="bg-gradient-to-r from-[#22252c] via-[#1e3a8a] to-[#22252c] shadow-xl text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
//         >
//           <Plus className="h-4 w-4" /> Add Tour
//         </Button>
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="overview">
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="tours">
//             My Tours ({guideTours.length || 0})
//           </TabsTrigger>
//         </TabsList>

//         {/* Overview Tab */}
//         <TabsContent value="overview">
//           <Card>
//             <CardHeader>
//               <CardTitle>Destination Overview</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {selectedDestination.images?.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {selectedDestination.images.map((img: string, idx: number) => (
//                     <div
//                       key={idx}
//                       className="relative w-full h-100 rounded-lg overflow-hidden"
//                     >
//                       <Image
//                         src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
//                         alt={selectedDestination.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <p className="text-gray-700 text-l">{selectedDestination.description}</p>

//               {selectedDestination.popularAttractions?.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold text-[#22252c] mb-2">Popular Attractions</h3>
//                 <ul className="list-disc list-inside text-sm text-[#363636]">
//                   {selectedDestination.popularAttractions.map((a: string, idx: number) => (
//                     <li key={idx}>{a}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Tours Tab */}
//         {/* <TabsContent value="tours">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Building2 className="h-5 w-5" />
//                 My Tours in {selectedDestination.name}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {toursLoading ? (
//                 <p className="text-center py-12">Loading tours...</p>
//               ) : guideTours && guideTours.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {guideTours.map((tour: any) => (
//                     <Card
//                       key={tour._id}
//                       className="hover:shadow-lg transition-shadow"
//                     >
//                       <CardContent className="p-4 space-y-3">
//                         {tour.images?.length > 0 && (
//                           <div className="relative h-32 rounded-lg overflow-hidden">
//                             <Image
//                               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
//                               alt={tour.title}
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                         )}
//                         <h3 className="font-semibold text-gray-900">{tour.title}</h3>
//                         <p className="text-sm text-gray-600 line-clamp-2">
//                           {tour.description}
//                         </p>
//                         <div className="flex justify-between items-center">
//                           <span className="font-bold text-green-600">₹{tour.price}</span>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() =>
//                               router.push(`/guide/viewTourDetails/${tour._id}`)
//                             }
//                           >
//                             <ExternalLink className="h-4 w-4 mr-1" />
//                             View
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-center py-12 text-gray-500">
//                   No tours added for this destination yet.
//                 </p>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent> */}
//         {/* Tours Tab */}
// <TabsContent value="tours">
//   {toursLoading ? (
//     <p className="text-center py-12">Loading tours...</p>
//   ) : guideTours && guideTours.length > 0 ? (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {guideTours.map((tour: any) => (
//         <div
//           key={tour._id}
//           className="group bg-[#fdfdfd] rounded-xl shadow-lg border border-[#e2e0df] hover:shadow-2xl hover:border-[#3b82f6]/50 transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-[1.02]"
//         >
//           {/* Tour Image */}
//           <div className="relative h-48 overflow-hidden">
//             <Image
//               src={
//                 tour.images?.[0]
//                   ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`
//                   : "/placeholder.jpg"
//               }
//               alt={tour.title}
//               fill
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//             />

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-[#22252c]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
//               <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     router.push(`/guide/viewTourDetails/${tour._id}`);
//                   }}
//                   className="bg-[#fdfdfd]/90 hover:bg-[#fdfdfd] text-[#363636] p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
//                   title="View Details"
//                 >
//                   <Eye size={18} />
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     router.push(`/guide/updateTour/${tour._id}`);
//                   }}
//                   className="bg-[#3b82f6] hover:bg-[#1e3a8a] text-[#fdfdfd] p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
//                   title="Edit Tour"
//                 >
//                   <Edit3 size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tour Content */}
//           <div className="p-6">
//             <h3 className="text-xl font-bold text-[#22252c] mb-2 line-clamp-2 group-hover:text-[#3b82f6] transition-colors duration-300">
//               {tour.title}
//             </h3>
//             <div className="flex items-center gap-4 text-sm text-[#333333] mb-2">
//               <div className="flex items-center gap-1.5">
//                 <MapPin size={14} />
//                 <span>{selectedDestination.name}</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <Calendar size={14} />
//                 <span>{tour.duration} days</span>
//               </div>
//             </div>

//             {/* Rating & Price */}
//             <div className="flex items-center gap-2 mb-4">
//               <div className="flex items-center gap-1.5">
//                 <Star className="text-[#ff9100] fill-current" size={14} />
//                 <span className="text-sm text-[#363636] font-medium">
//                   {tour.rating?.toFixed(1) || "0.0"}
//                 </span>
//               </div>
//               <span className="text-[#333333]">•</span>
//               <span className="text-sm text-[#363636] font-semibold">
//                 ₹{tour.price?.toLocaleString()}
//               </span>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => router.push(`/guide/viewTourDetails/${tour._id}`)}
//                 className="flex-1 bg-[#e4e2e1] hover:bg-[#e2e0df] text-[#363636] py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-[#e2e0df] hover:border-[#333333]"
//               >
//                 <Eye size={14} /> View
//               </button>
//               <button
//                 onClick={() => router.push(`/guide/updateTour/${tour._id}`)}
//                 className="flex-1 bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#22252c] text-[#fdfdfd] py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
//               >
//                 <Edit3 size={14} /> Edit
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <p className="text-center py-12 text-gray-500">
//       No tours added for this destination yet.
//     </p>
//   )}
// </TabsContent>

//       </Tabs>
//     </div>
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { getSingleDestination, getTourByDestination } from "@/redux/slices/destinationSlice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Plus, Building2, ExternalLink, Eye, Edit3, Star, Calendar, MapPin } from "lucide-react";
import GuideNavbar from "@/components/GuideNavbar";

export default function GuideDestinationPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Redux state - now using toursByDestination from destination slice
  const { selectedDestination, toursByDestination, loading, total } = useSelector(
    (state: RootState) => state.destination
  );

  const [page, setPage] = useState(1);
  const limit = 6;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  // Fetch destination and tours for this destination
  useEffect(() => {
    if (id) {
      dispatch(getSingleDestination(id as string));
      dispatch(
        getTourByDestination({
          destinationId: id as string,
          skip,
          limit
        })
      );
    }
  }, [id, dispatch, skip, limit]);

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Loading state
  if (loading || !selectedDestination) {
    return <p className="text-center py-12">Loading...</p>;
  }

  return (
    <>
      <GuideNavbar />
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{selectedDestination.name}</h1>
          <Button
            onClick={() =>
              router.push(`/guide/createTour`)
            }
            className="bg-gradient-to-r from-[#22252c] via-[#1e3a8a] to-[#22252c] shadow-xl text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg"
          >
            <Plus className="h-4 w-4" /> Add Tour
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tours">
              My Tours ({toursByDestination?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Destination Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDestination.images?.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedDestination.images.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="relative w-full h-100 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
                          alt={selectedDestination.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-gray-700 text-l">{selectedDestination.description}</p>

                {selectedDestination.popularAttractions?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-[#22252c] mb-2">Popular Attractions</h3>
                    <ul className="list-disc list-inside text-sm text-[#363636]">
                      {selectedDestination.popularAttractions.map((a: string, idx: number) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours">
            {loading ? (
              <p className="text-center py-12">Loading tours...</p>
            ) : toursByDestination && toursByDestination.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {toursByDestination.map((tour: any) => (
                    <div
                      key={tour._id}
                      className="group bg-[#fdfdfd] rounded-xl shadow-lg border border-[#e2e0df] hover:shadow-2xl hover:border-[#3b82f6]/50 transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-[1.02]"
                    >
                      {/* Tour Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={
                            tour.images?.[0]
                              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`
                              : "/placeholder.jpg"
                          }
                          alt={tour.title}
                          fill
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

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
                        <h3 className="text-xl font-bold text-[#22252c] mb-2 line-clamp-2 group-hover:text-[#3b82f6] transition-colors duration-300">
                          {tour.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-[#333333] mb-2">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            <span>{selectedDestination.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{tour.duration} days</span>
                          </div>
                        </div>

                        {/* Rating & Price */}
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
                            <Eye size={14} /> View
                          </button>
                          <button
                            onClick={() => router.push(`/guide/updateTour/${tour._id}`)}
                            className="flex-1 bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#22252c] text-[#fdfdfd] py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                          >
                            <Edit3 size={14} /> Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page <= 1}
                      className="px-4 py-2"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Button
                          key={pageNum}
                          variant={pageNum === page ? "default" : "outline"}
                          onClick={() => handlePageChange(pageNum)}
                          className="px-3 py-2 min-w-[40px]"
                        >
                          {pageNum}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page >= totalPages}
                      className="px-4 py-2"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center py-12 text-gray-500">
                No tours added for this destination yet.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}