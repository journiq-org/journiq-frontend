// "use client";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { fetchAllBookings } from "@/redux/slices/adminSlice";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const MyBookingPage = () => {
//   const dispatch = useAppDispatch();
//   const { allBookings, loading, error } = useAppSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchAllBookings());
//   }, [dispatch]);

//   const getInitials = (name: string) => {
//     return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";
//   };

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit"
//     });
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-gray-900 text-center">All Bookings</h1>

//       {loading && <p className="text-center text-gray-600">Loading bookings...</p>}
//       {error && <p className="text-center text-red-600">{error}</p>}

//       {allBookings?.length > 0 ? (
//         <Card>
//           <CardHeader>
//             <CardTitle>Bookings List</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="p-3 text-left font-medium">Booking ID</th>
//                     <th className="p-3 text-left font-medium">User</th>
//                     <th className="p-3 text-left font-medium">Tour</th>
//                     <th className="p-3 text-left font-medium">Status</th>
//                     <th className="p-3 text-left font-medium">Created At</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {allBookings.map((b: any) => (
//                     <tr key={b._id} className="border-b hover:bg-gray-50 transition-colors">
//                       <td className="p-3">{b._id}</td>
//                       <td className="p-3 flex items-center space-x-2">
//                         {b.user?.profilePic ? (
//                           <Avatar>
//                             <AvatarImage src={b.user.profilePic} alt={b.user.name} />
//                             <AvatarFallback>{getInitials(b.user.name)}</AvatarFallback>
//                           </Avatar>
//                         ) : (
//                           <Avatar>
//                             <AvatarFallback>{getInitials(b.user?.name)}</AvatarFallback>
//                           </Avatar>
//                         )}
//                         <span>{b.user?.name} ({b.user?.email})</span>
//                       </td>
//                       <td className="p-3">{b.tour?.title}</td>
//                       <td className="p-3">{b.status}</td>
//                       <td className="p-3">{formatDate(b.createdAt)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         !loading && <p className="text-center text-gray-500 mt-6">No bookings found.</p>
//       )}
//     </div>
//   );
// };

// export default MyBookingPage;


"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllBookings } from "@/redux/slices/adminSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  RefreshCw, 
  AlertCircle,
  Users,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Search,
  X
} from "lucide-react";

const MyBookingPage = () => {
  const dispatch = useAppDispatch();
  const { allBookings, loading, error } = useAppSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const getInitials = (name: string) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'cancelled':
        return <XCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
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

  // Filter bookings based on search term
  const filteredBookings = allBookings?.filter((booking: any) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      booking._id?.toLowerCase().includes(searchLower) ||
      booking.user?.name?.toLowerCase().includes(searchLower) ||
      booking.user?.email?.toLowerCase().includes(searchLower) ||
      booking.tour?.title?.toLowerCase().includes(searchLower) ||
      booking.status?.toLowerCase().includes(searchLower)
    );
  }) || [];

  const totalBookings = filteredBookings.length;
  const confirmedBookings = filteredBookings.filter((b: any) => b.status?.toLowerCase() === 'confirmed').length;
  const pendingBookings = filteredBookings.filter((b: any) => b.status?.toLowerCase() === 'pending').length;
  const cancelledBookings = filteredBookings.filter((b: any) => b.status?.toLowerCase() === 'cancelled').length;

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              Booking Management
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage all customer bookings
            </p>
          </div>
          <Button
            onClick={() => dispatch(fetchAllBookings())}
            variant="outline"
            className="flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Search Section */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search bookings by ID, name, email, tour, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-600 mt-2">
                {filteredBookings.length} result{filteredBookings.length !== 1 ? 's' : ''} found
              </p>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? '...' : totalBookings}
                  </p>
                  {searchTerm && allBookings && (
                    <p className="text-xs text-gray-500 mt-1">
                      {allBookings.length} total
                    </p>
                  )}
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {loading ? '...' : confirmedBookings}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {loading ? '...' : pendingBookings}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">
                    {loading ? '...' : cancelledBookings}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              {searchTerm ? `Search Results (${filteredBookings.length})` : 'All Bookings'}
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
                    onClick={() => dispatch(fetchAllBookings())}
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
            {!loading && !error && filteredBookings.length === 0 && (
              <div className="p-12 text-center">
                {searchTerm ? (
                  <>
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No search results found</h3>
                    <p className="text-gray-500 mb-4">
                      No bookings match your search criteria: "{searchTerm}"
                    </p>
                    <Button onClick={clearSearch} variant="outline">
                      Clear Search
                    </Button>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-500">
                      There are no bookings in the system yet.
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Data Table */}
            {!loading && !error && filteredBookings.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Booking ID</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Customer</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Tour</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking: any) => (
                      <tr key={booking._id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">#{booking._id.slice(-8)}</p>
                            <p className="text-sm text-gray-500">Full ID: {booking._id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage 
                                src={booking.user?.profilePic} 
                                alt={booking.user?.name} 
                              />
                              <AvatarFallback className="bg-blue-100 text-blue-700">
                                {getInitials(booking.user?.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{booking.user?.name}</p>
                              <p className="text-sm text-gray-500">{booking.user?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{booking.tour?.title}</p>
                            <p className="text-sm text-gray-500">Tour Package</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            {formatDate(booking.createdAt)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyBookingPage;