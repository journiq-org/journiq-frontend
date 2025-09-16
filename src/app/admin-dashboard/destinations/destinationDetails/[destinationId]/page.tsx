// "use client";

// import { useEffect } from "react";
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
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Image from "next/image";
// import { 
//   ArrowLeft, 
//   Globe, 
//   MapPin, 
//   Building2, 
//   Camera, 
//   Star, 
//   ExternalLink,
//   CheckCircle,
//   XCircle 
// } from "lucide-react";


// export default function GuideDestinationPage() {
//   const { destinationId } = useParams();
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();

//   const { selectedDestination, loading } = useSelector(
//     (state: RootState) => state.destination
//   );

//   console.log("Destination State:", { selectedDestination, loading, });
//   const { guideTours, isLoading: toursLoading } = useSelector(
//     (state: RootState) => state.tour
//   );

//   useEffect(() => {
//     if (destinationId) {
//       dispatch(getSingleDestination(destinationId as string));
//       dispatch(
//         guideViewTours({
//           page: 1,
//           limit: 6,
//           destination: destinationId as string,
//         })
//       );
//     }
//   }, [destinationId, dispatch]);

//   const handleGoBack = () => router.back();

//   if (loading || !selectedDestination) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">

//       <div className="max-w-7xl mx-auto p-6 space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div className="flex items-center gap-4">
//             {/* Back Button */}
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={handleGoBack}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back
//             </Button>

//             <h1 className="text-3xl font-bold flex items-center gap-2">
//               <Globe className="h-8 w-8 text-blue-600" />
//               {selectedDestination.name}
//             </h1>
//           </div>

//           <Button
//             onClick={() => router.push(`/guide-dashboard/addTour?destination=${destinationId}`)}
//             className="flex items-center gap-2"
//           >
//             <Building2 className="h-4 w-4" /> Add Tour
//           </Button>
//         </div>

//         {/* Tabs */}
//         <Tabs defaultValue="overview" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm">
//             <TabsTrigger value="overview" className="flex items-center gap-2">
//               <Globe className="h-4 w-4" />
//               Overview
//             </TabsTrigger>
//             <TabsTrigger value="tours" className="flex items-center gap-2">
//               <Building2 className="h-4 w-4" />
//               My Tours ({guideTours?.length || 0})
//             </TabsTrigger>
//           </TabsList>

//           {/* Overview Tab */}
//           <TabsContent value="overview" className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Main Content */}
//               <div className="lg:col-span-2 space-y-6">
//                 {/* Image Gallery */}
//                 {selectedDestination.images?.length > 0 && (
//                   <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
//                     <CardHeader>
//                       <CardTitle className="flex items-center gap-2">
//                         <Camera className="h-5 w-5" />
//                         Gallery
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {selectedDestination.images.map((img: string, idx: number) => (
//                           <div key={idx} className="relative group">
//                             <Image
//                               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
//                               alt={`${selectedDestination.name} image ${idx + 1}`}
//                               width={400}
//                               height={250}
//                               className="rounded-lg object-cover w-full h-48 transition-transform group-hover:scale-105"
//                             />
//                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}

//                 {/* Description */}
//                 <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
//                   <CardHeader>
//                     <CardTitle>About this Destination</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-gray-700">{selectedDestination.description}</p>
//                   </CardContent>
//                 </Card>

//                 {/* Popular Attractions */}
//                 {selectedDestination.popularAttractions?.length > 0 && (
//                   <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
//                     <CardHeader>
//                       <CardTitle className="flex items-center gap-2">
//                         <Star className="h-5 w-5" />
//                         Popular Attractions
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         {selectedDestination.popularAttractions.map((place: string, i: number) => (
//                           <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
//                             <MapPin className="h-4 w-4 text-blue-600" />
//                             <span className="text-sm text-gray-700">{place}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>

//               {/* Sidebar */}
//               <div className="space-y-6">
//                 {/* Key Information */}
//                 <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
//                   <CardHeader>
//                     <CardTitle>Key Information</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm font-medium text-gray-600">Country</span>
//                       <span className="text-sm text-gray-900">{selectedDestination.country}</span>
//                     </div>
//                     {selectedDestination.city && (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-gray-600">City</span>
//                         <span className="text-sm text-gray-900">{selectedDestination.city}</span>
//                       </div>
//                     )}
//                     {selectedDestination.bestSeason && (
//                       <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-gray-600">Best Season</span>
//                         <span className="text-sm text-gray-900">{selectedDestination.bestSeason}</span>
//                       </div>
//                     )}
//                     {selectedDestination.is_active !== undefined && (
//                       <Badge
//                         variant={selectedDestination.is_active ? "default" : "destructive"}
//                         className="text-xs"
//                       >
//                         {selectedDestination.is_active ? (
//                           <><CheckCircle className="h-3 w-3 mr-1" /> Active</>
//                         ) : (
//                           <><XCircle className="h-3 w-3 mr-1" /> Inactive</>
//                         )}
//                       </Badge>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </TabsContent>

//           {/* Tours Tab */}
//           <TabsContent value="tours" className="space-y-6">
//             <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Building2 className="h-5 w-5" />
//                   My Tours in {selectedDestination.name}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {toursLoading ? (
//                   <p className="text-center py-12">Loading tours...</p>
//                 ) : guideTours?.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {guideTours.map((tour: any) => (
//                       <Card key={tour._id} className="hover:shadow-lg transition-shadow">
//                         <CardContent className="p-4 space-y-3">
//                           {tour.images?.[0] && (
//                             <div className="relative h-32 rounded-lg overflow-hidden">
//                               <Image
//                                 src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
//                                 alt={tour.title}
//                                 fill
//                                 className="object-cover"
//                               />
//                             </div>
//                           )}
//                           <h3 className="font-semibold text-gray-900">{tour.title}</h3>
//                           <p className="text-sm text-gray-600 line-clamp-2">{tour.description}</p>
//                           <div className="flex justify-between items-center">
//                             <span className="font-bold text-green-600">₹{tour.price}</span>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() =>
//                                 router.push(`/guide-dashboard/viewTour/${tour._id}`)
//                               }
//                             >
//                               <ExternalLink className="h-4 w-4 mr-1" />
//                               View
//                             </Button>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 text-gray-500">
//                     No tours added for this destination yet.
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }






"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getSingleDestination, getTourByDestination } from "@/redux/slices/destinationSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { 
  MapPin, 
  Calendar, 
  Eye, 
  RefreshCw, 
  AlertCircle,
  Globe,
  Building2,
  Clock,
  Star,
  Users,
  Camera,
  Tag,
  CheckCircle,
  XCircle,
  ExternalLink,
  ArrowLeft
} from "lucide-react";
import { getDestinationByIdAdmin } from "@/redux/slices/adminSlice";

const SingleDestinationPage = () => {
  const { destinationId } = useParams<{ destinationId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()    

  const {  
    toursByDestination,
    loading, 
    error 
  } = useSelector((state: RootState) => state.destination);

  const { singleDestination} = useSelector((state: any) => state.admin)

  useEffect(() => {
    if (destinationId) {
      dispatch(getDestinationByIdAdmin(destinationId));
      dispatch(getTourByDestination(destinationId));
    }
  }, [dispatch, destinationId]);

  const handleRefresh = () => {
    if (destinationId) {
      dispatch(getSingleDestination(destinationId));
      dispatch(getTourByDestination(destinationId));
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-96 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="ml-4"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!singleDestination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Destination not found</h3>
            <p className="text-gray-500">
              The destination you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Globe className="h-8 w-8 text-blue-600" />
                {singleDestination.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {singleDestination.city && singleDestination.country
                    ? `${singleDestination.city}, ${singleDestination.country}`
                    : singleDestination.country || singleDestination.city || "Location not specified"
                  }
                </div>
                <Badge
                  variant={singleDestination.is_active ? "default" : "destructive"}
                  className={singleDestination.is_active
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                >
                  {singleDestination.is_active ? (
                    <><CheckCircle className="h-3 w-3 mr-1" /> Active</>
                  ) : (
                    <><XCircle className="h-3 w-3 mr-1" /> Inactive</>
                  )}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Tours ({toursByDestination?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Image Gallery */}
                {singleDestination.images?.length > 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        Gallery
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {singleDestination.images.map((img: string, idx: number) => (
                          <div key={idx} className="relative group">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
                              alt={`${singleDestination.name} ${idx + 1}` || 'Destination Image'}
                              width={400}
                              height={250}
                              className="rounded-lg object-cover w-full h-48 transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Description */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>About this Destination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {singleDestination.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Popular Attractions */}
                {singleDestination.popularAttractions?.length > 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Popular Attractions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {singleDestination.popularAttractions.map((place: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{place}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Key Information */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Key Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Country</span>
                      <span className="text-sm text-gray-900">{singleDestination.country}</span>
                    </div>
                    {singleDestination.city && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">City</span>
                        <span className="text-sm text-gray-900">{singleDestination.city}</span>
                      </div>
                    )}
                    {singleDestination.bestSeason && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Best Season</span>
                        <span className="text-sm text-gray-900">{singleDestination.bestSeason}</span>
                      </div>
                    )}
                    {singleDestination.location?.lat && singleDestination.location?.lng && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Coordinates</span>
                        <span className="text-sm text-gray-900 font-mono">
                          {singleDestination.location.lat.toFixed(4)}, {singleDestination.location.lng.toFixed(4)}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tags */}
                {singleDestination.tags?.length > 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5" />
                        Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {singleDestination.tags.map((tag: string, i: number) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Tours in {singleDestination.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {toursByDestination && toursByDestination.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {toursByDestination.map((tour: any) => (
                      <Card key={tour._id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Tour Image */}
                            {tour.images?.length > 0 && (
                              <div className="relative h-32 rounded-lg overflow-hidden">
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
                                  alt={tour.name || 'Tour Image'}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}

                            {/* Tour Info */}
                            <div>
                              <h3 className="font-semibold text-gray-900 line-clamp-2">
                                {tour.name}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {tour.description}
                              </p>
                            </div>

                            {/* Tour Details */}
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>{tour.duration} days</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span>Max {tour.maxGroupSize} people</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-lg text-green-600">
                                  ${tour.price}
                                </span>
                                <Badge
                                  variant={tour.isActive ? "default" : "destructive"}
                                  className="text-xs"
                                >
                                  {tour.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                            </div>

                            {/* Action Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full cursor-pointer flex items-center gap-2"
                              onClick={() => {
                                // Add navigation to tour details if needed
                                router.push(`/admin-dashboard/guideDetails/${tour.guide._id}/viewTourDetails/${tour._id}`)
                                console.log('View tour:', tour._id);
                              }}
                            >
                              <ExternalLink className="h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tours available</h3>
                    <p className="text-gray-500">
                      There are currently no tours associated with this destination.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SingleDestinationPage;

