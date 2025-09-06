// "use client";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { getReviewsByRole } from "@/redux/slices/reviewSlice";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// interface Review {
//   _id: string;
//   user: { name?: string; profilePic?: string } | string;
//   tour: { title?: string } | string;
//   rating: number;
//   comment: string;
//   createdAt: string;
// }

// const AdminReviewsPage = () => {
//   const dispatch = useAppDispatch();
//   const { reviews, loading, error } = useAppSelector((state) => state.reviews);

//   useEffect(() => {
//     dispatch(getReviewsByRole());
//   }, [dispatch]);

//   const getInitials = (name: string) => {
//     return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";
//   };

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric"
//     });
//   };

//   const renderStars = (rating: number) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
//           ★
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-gray-900 text-center">Review Moderation</h1>

//       {loading && <p className="text-gray-600 text-center">Loading reviews...</p>}
//       {error && <p className="text-red-600 text-center">{error}</p>}

//       {reviews.length > 0 ? (
//         <Card>
//           <CardHeader>
//             <CardTitle>All Reviews</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="p-3 text-left font-medium">User</th>
//                     <th className="p-3 text-left font-medium">Tour</th>
//                     <th className="p-3 text-left font-medium">Rating</th>
//                     <th className="p-3 text-left font-medium">Comment</th>
//                     <th className="p-3 text-left font-medium">Created At</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reviews.map((r: Review) => (
//                     <tr key={r._id} className="border-b hover:bg-gray-50 transition-colors">
//                       <td className="p-3 flex items-center space-x-2">
//                         {typeof r.user === "string" ? (
//                           <Avatar>
//                             <AvatarFallback>{getInitials(r.user)}</AvatarFallback>
//                           </Avatar>
//                         ) : (
//                           <Avatar>
//                             <AvatarImage src={r.user.profilePic} alt={r.user.name} />
//                             <AvatarFallback>{getInitials(r.user?.name || "Unknown")}</AvatarFallback>
//                           </Avatar>
//                         )}
//                         <span>{typeof r.user === "string" ? r.user : r.user?.name}</span>
//                       </td>
//                       <td className="p-3">{typeof r.tour === "string" ? r.tour : r.tour?.title}</td>
//                       <td className="p-3">{renderStars(r.rating)}</td>
//                       <td className="p-3">{r.comment}</td>
//                       <td className="p-3">{formatDate(r.createdAt)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         !loading && <p className="text-center text-gray-500 mt-6">No reviews found.</p>
//       )}
//     </div>
//   );
// };

// export default AdminReviewsPage;



"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getReviewsByRole } from "@/redux/slices/reviewSlice";
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
  Star,
  MessageSquare,
  TrendingUp,
  Search,
  X,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

interface Review {
  _id: string;
  user: { name?: string; profilePic?: string } | string;
  tour: { title?: string } | string;
  rating: number;
  comment: string;
  createdAt: string;
}

const AdminReviewsPage = () => {
  const dispatch = useAppDispatch();
  const { reviews, loading, error } = useAppSelector((state) => state.reviews);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getReviewsByRole());
  }, [dispatch]);

  const getInitials = (name: string) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">
          {rating}/5
        </span>
      </div>
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-100 text-green-800';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
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

  // Filter reviews based on search term
  const filteredReviews = reviews?.filter((review: Review) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const userName = typeof review.user === "string" ? review.user : review.user?.name || "";
    const tourTitle = typeof review.tour === "string" ? review.tour : review.tour?.title || "";
    
    return (
      review._id?.toLowerCase().includes(searchLower) ||
      userName.toLowerCase().includes(searchLower) ||
      tourTitle.toLowerCase().includes(searchLower) ||
      review.comment?.toLowerCase().includes(searchLower) ||
      review.rating.toString().includes(searchLower)
    );
  }) || [];

  const totalReviews = filteredReviews.length;
  const averageRating = totalReviews > 0 
    ? (filteredReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : 0;
  const highRatedReviews = filteredReviews.filter((r: Review) => r.rating >= 4).length;
  const lowRatedReviews = filteredReviews.filter((r: Review) => r.rating <= 2).length;

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
              <MessageSquare className="h-8 w-8 text-blue-600" />
              Review Moderation
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage customer reviews and feedback
            </p>
          </div>
          <Button
            onClick={() => dispatch(getReviewsByRole())}
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
                placeholder="Search reviews by user, tour, comment, or rating..."
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
                {filteredReviews.length} result{filteredReviews.length !== 1 ? 's' : ''} found
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
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? '...' : totalReviews}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {loading ? '...' : averageRating} ⭐
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Rated (4-5★)</p>
                  <p className="text-2xl font-bold text-green-600">
                    {loading ? '...' : highRatedReviews}
                  </p>
                </div>
                <ThumbsUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Rated (1-2★)</p>
                  <p className="text-2xl font-bold text-red-600">
                    {loading ? '...' : lowRatedReviews}
                  </p>
                </div>
                <ThumbsDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              {searchTerm ? `Search Results (${filteredReviews.length})` : 'All Reviews'}
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
                    onClick={() => dispatch(getReviewsByRole())}
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
            {!loading && !error && filteredReviews.length === 0 && (
              <div className="p-12 text-center">
                {searchTerm ? (
                  <>
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No search results found</h3>
                    <p className="text-gray-500 mb-4">
                      No reviews match your search criteria: "{searchTerm}"
                    </p>
                    <Button onClick={clearSearch} variant="outline">
                      Clear Search
                    </Button>
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                    <p className="text-gray-500">
                      There are no reviews in the system yet.
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Data Table */}
            {!loading && !error && filteredReviews.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Reviewer</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Tour</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Rating</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Comment</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReviews.map((review: Review) => (
                      <tr key={review._id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage 
                                src={typeof review.user === "string" ? undefined : review.user?.profilePic} 
                                alt={typeof review.user === "string" ? review.user : review.user?.name} 
                              />
                              <AvatarFallback className="bg-blue-100 text-blue-700">
                                {getInitials(typeof review.user === "string" ? review.user : review.user?.name || "Unknown")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">
                                {typeof review.user === "string" ? review.user : review.user?.name || "Unknown User"}
                              </p>
                              <p className="text-sm text-gray-500">ID: {review._id.slice(-8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {typeof review.tour === "string" ? review.tour : review.tour?.title || "Unknown Tour"}
                            </p>
                            <p className="text-sm text-gray-500">Tour Package</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {renderStars(review.rating)}
                            <Badge className={`w-fit ${getRatingColor(review.rating)}`}>
                              {review.rating >= 4 ? 'Excellent' : review.rating >= 3 ? 'Good' : 'Poor'}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="relative">
                            <p className="text-gray-700 line-clamp-3" title={review.comment}>
                              {review.comment}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            {formatDate(review.createdAt)}
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

export default AdminReviewsPage;