
// "use client";

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { getAllDestinationsAdmin } from "@/redux/slices/adminSlice";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { 
//   MapPin, 
//   Calendar, 
//   Eye, 
//   RefreshCw, 
//   AlertCircle,
//   Globe,
//   Building2
// } from "lucide-react";

// const AdminDestinationsPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { allDestinations, loading, error } = useSelector(
//     (state: RootState) => state.admin
//   );

//   useEffect(() => {
//     dispatch(getAllDestinationsAdmin());
//   }, [dispatch]);

//   const handleRefresh = () => {
//     dispatch(getAllDestinationsAdmin());
//   };

//   const handleRowClick = (destinationId: string) => {
//     router.push(`/admin-dashboard/destinations/destinationDetails/${destinationId}`);
//   };

//   const LoadingSkeleton = () => (
//     <div className="space-y-4">
//       {[...Array(5)].map((_, i) => (
//         <div key={i} className="flex items-center space-x-4 p-4">
//           <Skeleton className="h-12 w-16 rounded-md" />
//           <div className="space-y-2 flex-1">
//             <Skeleton className="h-4 w-32" />
//             <Skeleton className="h-3 w-24" />
//           </div>
//           <Skeleton className="h-6 w-16" />
//           <Skeleton className="h-6 w-20" />
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//               <Globe className="h-8 w-8 text-blue-600" />
//               Destination Management
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Manage and monitor all destinations in your system
//             </p>
//           </div>
//           <Button
//             onClick={handleRefresh}
//             variant="outline"
//             className="flex items-center gap-2"
//             disabled={loading}
//           >
//             <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Destinations</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {loading ? '...' : allDestinations.length}
//                   </p>
//                 </div>
//                 <Globe className="h-8 w-8 text-blue-600" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Active Destinations</p>
//                   <p className="text-2xl font-bold text-green-600">
//                     {loading ? '...' : allDestinations.filter(d => d.is_active).length}
//                   </p>
//                 </div>
//                 <Building2 className="h-8 w-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Inactive Destinations</p>
//                   <p className="text-2xl font-bold text-red-600">
//                     {loading ? '...' : allDestinations.filter(d => !d.is_active).length}
//                   </p>
//                 </div>
//                 <AlertCircle className="h-8 w-8 text-red-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content Card */}
//         <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//             <CardTitle className="text-xl font-semibold flex items-center gap-2">
//               <MapPin className="h-5 w-5" />
//               All Destinations
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             {/* Error State */}
//             {error && (
//               <Alert className="m-6 mb-0 rounded-none border-x-0 border-t-0">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription className="flex items-center justify-between">
//                   <span>{error}</span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={handleRefresh}
//                     className="ml-4"
//                   >
//                     Retry
//                   </Button>
//                 </AlertDescription>
//               </Alert>
//             )}

//             {/* Loading State */}
//             {loading && !error && (
//               <div className="p-6">
//                 <LoadingSkeleton />
//               </div>
//             )}

//             {/* Empty State */}
//             {!loading && !error && allDestinations.length === 0 && (
//               <div className="p-12 text-center">
//                 <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
//                 <p className="text-gray-500">
//                   There are no destinations in your system yet.
//                 </p>
//               </div>
//             )}

//             {/* Data Table */}
//             {!loading && !error && allDestinations.length > 0 && (
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b border-gray-200">
//                       <TableHead className="font-semibold text-gray-700">Image</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Destination</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Location</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Tags</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Status</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Created</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {allDestinations.map((destination) => (
//                       <TableRow
//                         key={destination._id}
//                         className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
//                         onClick={() => handleRowClick(destination._id)}
//                       >
//                         <TableCell className="py-4">
//                           <Avatar className="h-14 w-16 rounded-lg">
//                             <AvatarImage
//                               src={destination.images?.length > 0 
//                                 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${destination.images[0]}`
//                                 : undefined
//                               }
//                               alt={destination.name}
//                               className="object-cover"
//                             />
//                             <AvatarFallback className="rounded-lg bg-gray-100">
//                               <MapPin className="h-6 w-6 text-gray-400" />
//                             </AvatarFallback>
//                           </Avatar>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <div>
//                             <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
//                               {destination.name}
//                             </p>
//                             <p className="text-sm text-gray-500 mt-1">
//                               ID: {destination._id.slice(-8)}
//                             </p>
//                           </div>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <div className="flex items-center gap-1 text-sm text-gray-600">
//                             <MapPin className="h-3 w-3" />
//                             {destination.city && destination.country
//                               ? `${destination.city}, ${destination.country}`
//                               : destination.country || destination.city || "—"
//                             }
//                           </div>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <div className="flex flex-wrap gap-1">
//                             {destination.tags?.slice(0, 3).map((tag, i) => (
//                               <Badge
//                                 key={i}
//                                 variant="secondary"
//                                 className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
//                               >
//                                 {tag}
//                               </Badge>
//                             ))}
//                             {destination.tags && destination.tags.length > 3 && (
//                               <Badge variant="outline" className="text-xs">
//                                 +{destination.tags.length - 3}
//                               </Badge>
//                             )}
//                           </div>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <Badge
//                             variant={destination.is_active ? "default" : "destructive"}
//                             className={destination.is_active
//                               ? "bg-green-100 text-green-800 hover:bg-green-200"
//                               : "bg-red-100 text-red-800 hover:bg-red-200"
//                             }
//                           >
//                             {destination.is_active ? "Active" : "Inactive"}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <div className="flex items-center gap-1 text-sm text-gray-600">
//                             <Calendar className="h-3 w-3" />
//                             {destination.createdAt
//                               ? new Date(destination.createdAt).toLocaleDateString("en-IN")
//                               : "—"
//                             }
//                           </div>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="opacity-0 group-hover:opacity-100 transition-opacity"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleRowClick(destination._id);
//                             }}
//                           >
//                             <Eye className="h-4 w-4 mr-1" />
//                             View Details
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminDestinationsPage;



// "use client";

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { getAllDestinationsAdmin } from "@/redux/slices/adminSlice";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { 
//   MapPin, 
//   Calendar, 
//   Eye, 
//   RefreshCw, 
//   AlertCircle,
//   Globe,
//   Building2,
//   Plus
// } from "lucide-react";

// const AdminDestinationsPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { allDestinations, loading, error } = useSelector(
//     (state: RootState) => state.admin
//   );

//   useEffect(() => {
//     dispatch(getAllDestinationsAdmin());
//   }, [dispatch]);

//   const handleRefresh = () => {
//     dispatch(getAllDestinationsAdmin());
//   };

//   const handleRowClick = (destinationId: string) => {
//     router.push(`/admin-dashboard/destinations/destinationDetails/${destinationId}`);
//   };

//   const handleAddDestination = () => {
//     router.push('/admin-dashboard/destinations/createDestination');
//   };

//   const LoadingSkeleton = () => (
//     <div className="space-y-4">
//       {[...Array(5)].map((_, i) => (
//         <div key={i} className="flex items-center space-x-4 p-4">
//           <Skeleton className="h-12 w-16 rounded-md" />
//           <div className="space-y-2 flex-1">
//             <Skeleton className="h-4 w-32" />
//             <Skeleton className="h-3 w-24" />
//           </div>
//           <Skeleton className="h-6 w-16" />
//           <Skeleton className="h-6 w-20" />
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//               <Globe className="h-8 w-8 text-blue-600" />
//               Destination Management
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Manage and monitor all destinations in your system
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             <Button
//               onClick={handleAddDestination}
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               <Plus className="h-4 w-4" />
//               Add Destination
//             </Button>
//             <Button
//               onClick={handleRefresh}
//               variant="outline"
//               className="flex items-center gap-2"
//               disabled={loading}
//             >
//               <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
//               Refresh
//             </Button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Destinations</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {loading ? '...' : allDestinations.length}
//                   </p>
//                 </div>
//                 <Globe className="h-8 w-8 text-blue-600" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Active Destinations</p>
//                   <p className="text-2xl font-bold text-green-600">
//                     {loading ? '...' : allDestinations.filter(d => d.is_active).length}
//                   </p>
//                 </div>
//                 <Building2 className="h-8 w-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Inactive Destinations</p>
//                   <p className="text-2xl font-bold text-red-600">
//                     {loading ? '...' : allDestinations.filter(d => !d.is_active).length}
//                   </p>
//                 </div>
//                 <AlertCircle className="h-8 w-8 text-red-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content Card */}
//         <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//             <CardTitle className="text-xl font-semibold flex items-center gap-2">
//               <MapPin className="h-5 w-5" />
//               All Destinations
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             {/* Error State */}
//             {error && (
//               <Alert className="m-6 mb-0 rounded-none border-x-0 border-t-0">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription className="flex items-center justify-between">
//                   <span>{error}</span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={handleRefresh}
//                     className="ml-4"
//                   >
//                     Retry
//                   </Button>
//                 </AlertDescription>
//               </Alert>
//             )}

//             {/* Loading State */}
//             {loading && !error && (
//               <div className="p-6">
//                 <LoadingSkeleton />
//               </div>
//             )}

//             {/* Empty State */}
//             {!loading && !error && allDestinations.length === 0 && (
//               <div className="p-12 text-center">
//                 <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
//                 <p className="text-gray-500">
//                   There are no destinations in your system yet. Click "Add Destination" to create your first destination.
//                 </p>
//                 <Button
//                   onClick={handleAddDestination}
//                   className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Add Your First Destination
//                 </Button>
//               </div>
//             )}

//             {/* Data Table */}
//             {!loading && !error && allDestinations.length > 0 && (
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b border-gray-200">
//                       <TableHead className="font-semibold text-gray-700">Image</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Destination</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Location</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Tags</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Status</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Created</TableHead>
//                       <TableHead className="font-semibold text-gray-700">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {allDestinations.map((destination) => (
//                       <TableRow
//                         key={destination._id}
//                         className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
//                         onClick={() => handleRowClick(destination._id)}
//                       >
//                         <TableCell className="py-4">
//                           <Avatar className="h-14 w-16 rounded-lg">
//                             <AvatarImage
//                               src={destination.images?.length > 0 
//                                 ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${destination.images[0]}`
//                                 : undefined
//                               }
//                               alt={destination.name}
//                               className="object-cover"
//                             />
//                             <AvatarFallback className="rounded-lg bg-gray-100">
//                               <MapPin className="h-6 w-6 text-gray-400" />
//                             </AvatarFallback>
//                           </Avatar>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <div>
//                             <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
//                               {destination.name}
//                             </p>
//                             <p className="text-sm text-gray-500 mt-1">
//                               ID: {destination._id.slice(-8)}
//                             </p>
//                           </div>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <div className="flex items-center gap-1 text-sm text-gray-600">
//                             <MapPin className="h-3 w-3" />
//                             {destination.city && destination.country
//                               ? `${destination.city}, ${destination.country}`
//                               : destination.country || destination.city || "—"
//                             }
//                           </div>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <div className="flex flex-wrap gap-1">
//                             {destination.tags?.slice(0, 3).map((tag, i) => (
//                               <Badge
//                                 key={i}
//                                 variant="secondary"
//                                 className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
//                               >
//                                 {tag}
//                               </Badge>
//                             ))}
//                             {destination.tags && destination.tags.length > 3 && (
//                               <Badge variant="outline" className="text-xs">
//                                 +{destination.tags.length - 3}
//                               </Badge>
//                             )}
//                           </div>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <Badge
//                             variant={destination.is_active ? "default" : "destructive"}
//                             className={destination.is_active
//                               ? "bg-green-100 text-green-800 hover:bg-green-200"
//                               : "bg-red-100 text-red-800 hover:bg-red-200"
//                             }
//                           >
//                             {destination.is_active ? "Active" : "Inactive"}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <div className="flex items-center gap-1 text-sm text-gray-600">
//                             <Calendar className="h-3 w-3" />
//                             {destination.createdAt
//                               ? new Date(destination.createdAt).toLocaleDateString("en-IN")
//                               : "—"
//                             }
//                           </div>
//                         </TableCell>
//                         <TableCell className="py-4">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="opacity-0 group-hover:opacity-100 transition-opacity"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleRowClick(destination._id);
//                             }}
//                           >
//                             <Eye className="h-4 w-4 mr-1" />
//                             View Details
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminDestinationsPage;


"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllDestinationsAdmin } from "@/redux/slices/adminSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  Calendar, 
  Eye, 
  RefreshCw, 
  AlertCircle,
  Globe,
  Building2,
  Plus
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { toggleDestinationStatus } from "@/redux/slices/destinationSlice";

interface Destination {
  _id: string;
  name: string;
  city?: string;
  country?: string;
  tags?: string[];
  is_active: boolean;
  images?: string[];
  createdAt?: string;
}

const AdminDestinationsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { allDestinations, loading, error } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    dispatch(getAllDestinationsAdmin());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getAllDestinationsAdmin());
  };

  const handleRowClick = (destinationId: string) => {
    router.push(`/admin-dashboard/destinations/destinationDetails/${destinationId}`);
  };

  const handleAddDestination = () => {
    router.push('/admin-dashboard/destinations/createDestination');
  };

  const handleToggleDestination = (destination: Destination) => {
    dispatch(toggleDestinationStatus(destination._id))
      .then(() => {
        toast.success(`Destination ${destination.is_active ? 'deactivated' : 'activated'} successfully`);
      })
      .catch(() => {
        toast.error('Failed to toggle destination status');
      });
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-12 w-16 rounded-md" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Globe className="h-8 w-8 text-blue-600" />
                Destination Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor all destinations in your system
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleAddDestination}
                className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-[#22252c] via-[#1e3a8a] to-[#22252c] shadow-xl text-white"
              >
                <Plus className="h-4 w-4" />
                Add Destination
              </Button>
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
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Destinations</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : allDestinations.length}
                    </p>
                  </div>
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Destinations</p>
                    <p className="text-2xl font-bold text-green-600">
                      {loading ? '...' : allDestinations.filter((d: Destination) => d.is_active).length}
                    </p>
                  </div>
                  <Building2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Inactive Destinations</p>
                    <p className="text-2xl font-bold text-red-600">
                      {loading ? '...' : allDestinations.filter((d: Destination) => !d.is_active).length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Card */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#22252c] via-[#1e3a8a] to-[#22252c] shadow-xl text-white">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                All Destinations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Error State */}
              {error && (
                <Alert className="m-6 mb-0 rounded-none border-x-0 border-t-0">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <span>{error}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefresh}
                      className="ml-4"
                    >
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {/* Loading State */}
              {loading && !error && (
                <div className="p-6">
                  <LoadingSkeleton />
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && allDestinations.length === 0 && (
                <div className="p-12 text-center">
                  <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
                  <p className="text-gray-500">
                    There are no destinations in your system yet. Click "Add Destination" to create your first destination.
                  </p>
                  <Button
                    onClick={handleAddDestination}
                    className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Add Your First Destination
                  </Button>
                </div>
              )}

              {/* Data Table */}
              {!loading && !error && allDestinations.length > 0 && (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b border-gray-200">
                        <TableHead className="font-semibold text-gray-700">Image</TableHead>
                        <TableHead className="font-semibold text-gray-700">Destination</TableHead>
                        <TableHead className="font-semibold text-gray-700">Location</TableHead>
                        <TableHead className="font-semibold text-gray-700">Tags</TableHead>
                        <TableHead className="font-semibold text-gray-700">Status</TableHead>
                        <TableHead className="font-semibold text-gray-700">Created</TableHead>
                        <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allDestinations.map((destination: Destination) => (
                        <TableRow
                          key={destination._id}
                          className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                          onClick={() => handleRowClick(destination._id)}
                        >
                          <TableCell className="py-4">
                            <Avatar className="h-14 w-16 rounded-lg">
                            <AvatarImage
                              src={destination.images && destination.images.length > 0 
                                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${destination.images[0]}`
                                : undefined
                              }
                              alt={destination.name}
                              className="object-cover"
                            />
                              <AvatarFallback className="rounded-lg bg-gray-100">
                                <MapPin className="h-6 w-6 text-gray-400" />
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="py-4">
                            <div>
                              <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                {destination.name}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                ID: {destination._id.slice(-8)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="h-3 w-3" />
                              {destination.city && destination.country
                                ? `${destination.city}, ${destination.country}`
                                : destination.country || destination.city || "—"
                              }
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex flex-wrap gap-1">
                              {destination.tags?.slice(0, 3).map((tag, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {destination.tags && destination.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{destination.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <Badge
                                variant={destination.is_active ? "default" : "destructive"}
                                className={destination.is_active
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                                }
                              >
                                {destination.is_active ? "Active" : "Inactive"}
                              </Badge>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleDestination(destination);
                                }}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                  destination.is_active ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                                title={`Click to ${destination.is_active ? 'deactivate' : 'activate'} destination`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    destination.is_active ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Calendar className="h-3 w-3" />
                              {destination.createdAt
                                ? new Date(destination.createdAt).toLocaleDateString("en-IN")
                                : "—"
                              }
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(destination._id);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* React Hot Toast Container */}
      <Toaster position="top-right" />
    </>
  );
};

export default AdminDestinationsPage;