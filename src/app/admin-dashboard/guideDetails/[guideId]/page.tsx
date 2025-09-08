// "use client";
// import React, { useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { useParams } from "next/navigation";
// import { viewGuideById } from "@/redux/slices/adminSlice";

// // interface GuideDetailsPageProps {
// //   params: { id: string }; // comes from URL
// // }

// const GuideDetailsPage = () => {

//     const params = useParams(); 
//     const id = params?.id as string; 

//     const dispatch = useDispatch<AppDispatch>()
//     const { singleGuide, loading, error} = useSelector((state:any) => state.admin)

//     useEffect(() => {
//         dispatch(viewGuideById(id))
//     },[id,dispatch])
//   return (
//     <div className="p-6">
//       <Card className="max-w-2xl mx-auto shadow-lg rounded-2xl">
//         <CardHeader className="flex items-center gap-4">
//           <Avatar className="w-16 h-16">
//             {singleGuide.profilePic ? (
//               <AvatarImage src={singleGuide.profilePic} alt={singleGuide.name} />
//             ) : (
//               <AvatarFallback>{singleGuide.name.charAt(0)}</AvatarFallback>
//             )}
//           </Avatar>
//           <div>
//             <CardTitle className="text-xl font-bold">{singleGuide.name}</CardTitle>
//             <p className="text-gray-600">{singleGuide.email}</p>
//             <p className="text-gray-600">{singleGuide.phone}</p>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <span className="font-semibold">Role:</span>{" "}
//             <Badge variant="outline" className="capitalize">
//               {singleGuide.role}
//             </Badge>
//           </div>
//           <div>
//             <span className="font-semibold">Location:</span> {singleGuide.location}
//           </div>
//           <div>
//             <span className="font-semibold">Bio:</span> {singleGuide.bio || "No bio provided"}
//           </div>
//           <div>
//             <span className="font-semibold">Status:</span>{" "}
//             {singleGuide.isVerified ? (
//               <Badge className="bg-green-100 text-green-700">Verified</Badge>
//             ) : (
//               <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
//             )}
//           </div>
//           <div>
//             <span className="font-semibold">Joined:</span>{" "}
//             {new Date(singleGuide.createdAt).toLocaleDateString()}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default GuideDetailsPage;



"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { viewGuideById, getTourByGuide, getGuideTotalReview } from "@/redux/slices/adminSlice";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  ShieldX,
  Search,
  ArrowLeft,
  Star,
  Clock,
  IndianRupee,
  Users,
  Eye,
  Loader2,
  Camera,
  Award,
  TrendingUp,
  MessageSquare,
  Heart
} from "lucide-react";
import toast from "react-hot-toast";
import { Tour } from "@/types/tour";

// interface Tour {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   duration: string;
//   maxParticipants: number;
//   images: string[];
//   location: string;
//   rating?: number;
//   reviewCount?: number;
//   createdAt: string;
//   isActive: boolean;
//   category?: string;
// }

const GuideDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.guideId as string;

  const dispatch = useDispatch<AppDispatch>();
  const { singleGuide, allTours, loading, error , guideReviewCount} = useSelector((state: any) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (id) {
      dispatch(viewGuideById(id));
      dispatch(getTourByGuide(id));
      dispatch(getGuideTotalReview(id))

    }
  }, [id, dispatch]);

  useEffect(() => {
    
    if (allTours) {
      const filtered = allTours.filter((tour: Tour) =>
        tour.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof tour.destination === "object" &&
        "name" in tour.destination &&
        tour.destination.name?.toLowerCase().includes(searchTerm.toLowerCase()))
        
    );
      setFilteredTours(filtered);

    }
  }, [allTours, searchTerm]);

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'G';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAverageRating = () => {
    if (!allTours || allTours.length === 0) return 0;
    const totalRating = allTours.reduce((sum: number, tour: Tour) => sum + (tour.rating || 0), 0);
    return totalRating / allTours.length;
  };

const getTotalReviews = () => {
  if (!guideReviewCount) return 0;
  return guideReviewCount;
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading guide profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Card className="border-red-200 bg-red-50 max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <ShieldX className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-900 mb-2">Error Loading Guide</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => router.back()}
                className="bg-red-600 hover:bg-red-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!singleGuide) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Guide Not Found</h3>
              <p className="text-gray-600 mb-4">The requested guide could not be found.</p>
              <Button
                onClick={() => router.back()}
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.back()}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Guide Profile</h1>
                <p className="text-gray-600">Manage guide information and tour offerings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Guide Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${singleGuide.profilePic}`} alt={singleGuide.name} />
                <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white text-3xl font-bold">
                  {getInitials(singleGuide.name)}
                </AvatarFallback>
              </Avatar>
              {singleGuide.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{singleGuide.name}</h2>
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={singleGuide.isVerified ? "default" : "secondary"}
                      className={`px-3 py-1 ${
                        singleGuide.isVerified 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                      }`}
                    >
                      {singleGuide.isVerified ? "Verified Guide" : "Pending Verification"}
                    </Badge>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">Joined {formatDate(singleGuide.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{allTours?.length || 0}</p>
                    <p className="text-xs text-gray-600">Total Tours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {allTours?.filter((tour: Tour) => tour.isActive).length || 0}
                    </p>
                    <p className="text-xs text-gray-600">Active Tours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{getAverageRating().toFixed(1)}</p>
                    <p className="text-xs text-gray-600">Avg Rating</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{getTotalReviews()}</p>
                    <p className="text-xs text-gray-600">Total Reviews</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{singleGuide.email}</span>
                </div>
                {singleGuide.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{singleGuide.phone}</span>
                  </div>
                )}
                {singleGuide.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{singleGuide.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {singleGuide.bio && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">{singleGuide.bio}</p>
            </div>
          )}
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Tours ({allTours?.length || 0})</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Details</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Performance Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Active Tours</span>
                    <span className="text-lg font-bold text-green-600">
                      {allTours?.filter((tour: Tour) => tour.isActive).length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Total Tours</span>
                    <span className="text-lg font-bold text-blue-600">
                      {allTours?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">Average Rating</span>
                    <span className="text-lg font-bold text-yellow-600">
                      {getAverageRating().toFixed(1)} ⭐
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Tours Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-blue-600" />
                    <span>Recent Tours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredTours && filteredTours.length > 0 ? (
                    <div className="space-y-3">
                      {filteredTours.slice(0, 3).map((tour: Tour) => (
                        
                        <div key={tour._id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            {tour.images && tour.images.length > 0 ? (
                              <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
                                alt={tour.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Camera className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{tour.title}</p>
                            <p className="text-sm text-gray-600 truncate">
                             {tour.destination.name}
                            </p>
                          </div>
                          <div className="text-right">
                            
                            <p className="font-bold text-green-600">{formatPrice(tour.price)}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600">{tour.rating?.toFixed(1) || '0.0'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No tours available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search tours by title, location, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 text-base"
                  />
                </div>
              </CardHeader>
            </Card>

            {/* Tours Grid */}
            {filteredTours && filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour: Tour) => (
                  <Card key={tour._id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white overflow-hidden">
                    <div className="relative">
                      <div className="aspect-video bg-gray-100">
                        {tour.images && tour.images.length > 0 ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
                            alt={tour.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Camera className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant={tour.isActive ? "default" : "secondary"} className="shadow-lg">
                          {tour.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      {tour.rating && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1 shadow-lg">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{tour.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{tour.description}</p>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{tour.destination.name}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span> {tour.availability.length > 0
                                ? tour.availability.reduce((sum, a) => sum + a.slots, 0)
                                : "N/A"}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{tour.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-1">
                            <IndianRupee className="h-5 w-5 text-green-600" />
                            <span className="text-2xl font-bold text-green-600">
                              {(tour.price)}
                            </span>
                          </div>

                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push(`/admin-dashboard/guideDetails/${id}/viewTourDetails/${tour._id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-16">
                    <Camera className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {searchTerm ? "No tours found" : "No tours available"}
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      {searchTerm
                        ? "Try adjusting your search terms to find tours."
                        : "This guide hasn't created any tours yet."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span>Complete Guide Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Personal Information</label>
                      <div className="mt-3 space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Full Name</span>
                          <span className="font-medium text-gray-900">{singleGuide.name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Email</span>
                          <span className="font-medium text-gray-900">{singleGuide.email}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Phone</span>
                          <span className="font-medium text-gray-900">{singleGuide.phone || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Location</span>
                          <span className="font-medium text-gray-900">{singleGuide.location || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Account Information</label>
                      <div className="mt-3 space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Role</span>
                          <span className="font-medium text-gray-900">{singleGuide.role || 'Tour Guide'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Status</span>
                          <Badge 
                            variant={singleGuide.isVerified ? "default" : "secondary"}
                            className={singleGuide.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                          >
                            {singleGuide.isVerified ? "Verified" : "Pending"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Member Since</span>
                          <span className="font-medium text-gray-900">{formatDate(singleGuide.createdAt)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600">Guide ID</span>
                          <span className="font-medium text-gray-900 font-mono text-sm">{singleGuide._id?.slice(-0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {singleGuide.bio && (
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Biography</label>
                    <div className="mt-3 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
                      <p className="text-gray-800 leading-relaxed text-base">{singleGuide.bio}</p>
                    </div>
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

export default GuideDetailsPage;