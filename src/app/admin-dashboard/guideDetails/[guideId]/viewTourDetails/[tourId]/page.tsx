"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  IndianRupee, 
  User, 
  Clock, 
  Star, 
  CheckCircle, 
  XCircle,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Shield,
  ShieldOff,
  Loader2,
  ArrowLeft,
  Heart,
  Share2,
  BookOpen,
  Users,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react";
import { 
  getSingleTourByGuide, 
  toggleBlockTour, 
  fetchBookingsByTourId, 
  getSingleBooking, 
  getReviewByTour 
} from "@/redux/slices/adminSlice";
import { Tour } from "@/types/tour";

// Enhanced Star Rating Component
const StarRating = ({ rating, size = "md", showNumber = true }: { 
  rating: number; 
  size?: "sm" | "md" | "lg"; 
  showNumber?: boolean;
}) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : star - 0.5 <= rating 
                  ? 'fill-yellow-200 text-yellow-400'
                  : 'text-gray-300'
            } transition-colors`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} font-medium text-gray-700`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

// Simple Image Component with better error handling
const SimpleImage = ({ 
  src, 
  alt, 
  className = "",
  onClick,
  style = {}
}: { 
  src: string; 
  alt: string; 
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const handleImageError = () => {
    if (retryCount < 2) {
      setRetryCount(prev => prev + 1);
      setImageError(false);
      setImageLoading(true);
      setTimeout(() => {
        const img = document.getElementById(`img-${alt}-${retryCount}`) as HTMLImageElement;
        if (img) {
          img.src = `${src}?t=${Date.now()}`;
        }
      }, 100);
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  if (imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 ${className}`}
        style={style}
        onClick={onClick}
      >
        <div className="text-center">
          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-xs text-gray-500">Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        id={`img-${alt}-${retryCount}`}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      />
    </div>
  );
};

// Standard Image Carousel Component
const StandardImageCarousel = ({ 
  images, 
  currentIndex, 
  onImageChange, 
  title 
}: { 
  images: string[]; 
  currentIndex: number; 
  onImageChange: (index: number) => void; 
  title: string;
}) => {
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    onImageChange(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onImageChange(prevIndex);
  };

  return (
    <div className="relative group">
      {/* Main Image Display */}
      <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-lg bg-gray-100">
        <SimpleImage
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${images[currentIndex]}`}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
          </>
        )}
        
        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="mt-4 bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
                  index === currentIndex 
                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                    : 'hover:scale-105'
                }`}
                onClick={() => onImageChange(index)}
              >
                <SimpleImage
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 border-gray-200"
                />
                <div className="text-xs text-gray-600 text-center mt-1">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// Booking Card Component
const BookingCard = ({ booking, onViewDetails }: { booking: any; onViewDetails: (id: string) => void }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">
              {booking.user?.name  || "Customer"}
            </h3>
            <p className="text-sm text-gray-600">
              {booking.user?.email  || "No email"}
            </p>
          </div>
          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
            {booking.status}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(booking.createdAt ).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{booking.numOfPeople } people</span>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            <span className="font-semibold text-gray-900">{booking.totalPrice }</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Review Card Component
const ReviewCard = ({ review, tourId }: { review: any; tourId: string }) => {
  const reviewTourId = typeof review.tour === "string" ? review.tour : review.tour?._id;
  if (String(reviewTourId) !== String(tourId)) return null;



  // Calculate average rating from the three experience ratings
  const calculateAverageRating = () => {
    if (!review.experience) return 0;

    const { rating} = review.rating;
    const ratings = [rating].filter(
      (r) => r != null
    );

    if (ratings.length === 0) return 0;
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  };

  const averageRating = calculateAverageRating();

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {review.user?.name || "Anonymous"}
              </h3>
              <p className="text-sm text-gray-600">{review.user?.email || ""}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Experience Ratings Breakdown */}
        {review.experience && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Experience Ratings:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Service Quality:</span>
                <StarRating
                  rating={review.experience.serviceQuality || 0}
                  size="sm"
                  showNumber={false}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Punctuality:</span>
                <StarRating
                  rating={review.experience.punctuality || 0}
                  size="sm"
                  showNumber={false}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Satisfaction:</span>
                <StarRating
                  rating={review.experience.satisfactionSurvey || 0}
                  size="sm"
                  showNumber={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Review Comment */}
        {review.comment && (
          <div className="mb-3">
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        )}

        {/* Booking Reference */}
        <div className="text-xs text-gray-500 mt-2">
          Booking ID: {review.booking?._id || review.booking}
        </div>
      </CardContent>
    </Card>
  );
};


export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { guideId, tourId } = params as { guideId: string; tourId: string };

  const dispatch = useDispatch<AppDispatch>();
  const { 
    singleTour, 
    loading, 
    error, 
    allBookings, 
    singleBooking,
    allReviews 
  } = useSelector((state: RootState) => state.admin);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTogglingBlock, setIsTogglingBlock] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  useEffect(() => {
    if (guideId && tourId) {
      dispatch(getSingleTourByGuide({ guideId, tourId }));
      dispatch(fetchBookingsByTourId(tourId));
      dispatch(getReviewByTour(tourId));
    }
  }, [guideId, tourId, dispatch]);

  // Reset image index when tour changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [singleTour]);

  const handleToggleBlock = async () => {
    if (!singleTour?._id) return;
    
    setIsTogglingBlock(true);
    try {
      await dispatch(toggleBlockTour(singleTour._id)).unwrap();
    } catch (error) {
      console.error('Failed to toggle block status:', error);
    } finally {
      setIsTogglingBlock(false);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: singleTour?.title,
        text: `Check out this amazing tour: ${singleTour?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleViewBookingDetails = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    dispatch(getSingleBooking(bookingId));
    setActiveTab("bookings");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleGoBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center py-16">
          <Card className="p-8 text-center shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold mb-2">Loading Tour Details</h2>
            <p className="text-gray-600">Please wait while we fetch the information...</p>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleGoBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <span className="text-gray-600">Error</span>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center py-16">
          <Card className="p-8 text-center max-w-md shadow-lg">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-red-600">Error Loading Tour</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => dispatch(getSingleTourByGuide({ guideId, tourId }))}
              variant="outline"
              className="w-full"
            >
              Try Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!singleTour) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleGoBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <span className="text-gray-600">Tour Not Found</span>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center py-16">
          <Card className="p-8 text-center shadow-lg">
            <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Tour Not Found</h2>
            <p className="text-gray-600">The requested tour could not be found.</p>
          </Card>
        </div>
      </div>
    );
  }

  const tour: Tour = singleTour;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleGoBack}
                className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600 truncate max-w-xs font-medium">
                  {tour.destination?.name}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`rounded-lg transition-all duration-200 ${
                  isBookmarked ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200"
              >
                <Share2 className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2">
                {tour.rating && <StarRating rating={tour.rating} size="sm" />}
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  {tour.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Mobile title */}
          <div className="mt-3 sm:hidden">
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {tour.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Tour Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Carousel */}
            <Card className="shadow-lg">
              <CardContent className="p-0">
                {tour.images?.length > 0 ? (
                  <StandardImageCarousel
                    images={tour.images}
                    currentIndex={currentImageIndex}
                    onImageChange={setCurrentImageIndex}
                    title={tour.title}
                  />
                ) : (
                  <div className="h-80 md:h-96 lg:h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <ImageIcon className="mx-auto h-16 w-16 mb-4 opacity-50" />
                      <h3 className="text-lg font-medium">{tour.title}</h3>
                      <p className="text-sm">No images available</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tour Title and Basic Info */}
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {tour.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {tour.destination?.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {tour.duration} days
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" />
                        <span className="font-semibold text-lg">{tour.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {tour.category}
                    </Badge>
                    {tour.rating && (
                      <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-lg">
                        <StarRating rating={tour.rating} size="md" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for different sections */}
            <Card className="shadow-md">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <CardHeader className="pb-3">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="reviews">
                      Reviews
                      {allReviews && allReviews.length > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {allReviews.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="bookings">
                      Bookings
                      {allBookings && allBookings.length > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {allBookings.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  <TabsContent value="overview" className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">About This Tour</h3>
                      <p className="text-gray-700 leading-relaxed">{tour.description}</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">{tour.duration}</div>
                        <div className="text-sm text-gray-600">Days</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <IndianRupee className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">{tour.price}</div>
                        <div className="text-sm text-gray-600">Price</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">
                          {tour.availability?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Dates</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-orange-600">
                          {tour.rating?.toFixed(1) || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-6">
                    {/* Highlights & Itinerary */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Highlights
                        </h3>
                        {tour.highlights?.length > 0 ? (
                          <ul className="space-y-2">
                            {tour.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No highlights available</p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          Itinerary
                        </h3>
                        {tour.itinerary?.length > 0 ? (
                          <ol className="space-y-2">
                            {tour.itinerary.map((step, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                  {index + 1}
                                </div>
                                <span className="text-gray-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-gray-500 italic">No itinerary available</p>
                        )}
                      </div>
                    </div>

                    {/* What's Included/Excluded */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          What's Included
                        </h3>
                        {tour.included?.length > 0 ? (
                          <ul className="space-y-2">
                            {tour.included.map((item, index) => (
                              <li key={index} className="flex items-center gap-3 text-gray-700">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No inclusions specified</p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
                          <XCircle className="h-5 w-5" />
                          What's Excluded
                        </h3>
                        {tour.excluded?.length > 0 ? (
                          <ul className="space-y-2">
                            {tour.excluded.map((item, index) => (
                              <li key={index} className="flex items-center gap-3 text-gray-700">
                                <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No exclusions specified</p>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        Tour Reviews
                      </h3>
                      <Badge variant="outline">
                        {allReviews?.length || 0} reviews
                      </Badge>
                    </div>

                    {allReviews && allReviews.length > 0 ? (
                      <div className="space-y-4">
                        {allReviews.map((review: any) => (
                          <ReviewCard key={review._id} review={review} tourId={tourId} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No Reviews Yet</h3>
                        <p className="text-gray-500">This tour doesn't have any reviews yet.</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="bookings" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Tour Bookings</h3>
                      <Badge variant="outline">
                        {allBookings?.length || 0} total bookings
                      </Badge>
                    </div>

                    {allBookings && allBookings.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {allBookings.map((booking: any) => (
                          <BookingCard 
                            key={booking._id} 
                            booking={booking} 
                            onViewDetails={handleViewBookingDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No Bookings Yet</h3>
                        <p className="text-gray-500">This tour doesn't have any bookings yet.</p>
                      </div>
                    )}
                  </TabsContent>

                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Tour Guide */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Tour Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{tour.guide?.name || 'Not assigned'}</h3>
                  <p className="text-gray-600 text-sm">{tour.guide?.email || 'No email available'}</p>
                  {tour.guide?.phone && (
                    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      {tour.guide.phone}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tour.availability?.length > 0 ? (
                  <div className="space-y-3">
                    {tour.availability.slice(0, 5).map((avail, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            {new Date(avail.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(avail.date).toLocaleDateString('en-US', { year: 'numeric' })}
                          </div>
                        </div>
                        <Badge variant={avail.slots > 0 ? "default" : "secondary"}>
                          {avail.slots} slots
                        </Badge>
                      </div>
                    ))}
                    {tour.availability.length > 5 && (
                      <p className="text-sm text-gray-600 text-center mt-3">
                        +{tour.availability.length - 5} more dates available
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">No availability listed</p>
                )}
              </CardContent>
            </Card>

            {/* Meeting Point */}
            {tour.meetingPoint && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    Meeting Point
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{tour.meetingPoint}</p>
                </CardContent>
              </Card>
            )}

            {/* Admin Actions */}
            <Card className="shadow-md border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Shield className="h-5 w-5" />
                  Admin Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleToggleBlock}
                  disabled={isTogglingBlock}
                  variant={tour.isBlocked ? "default" : "destructive"}
                  className="w-full cursor-pointer"
                  size="sm"
                >
                  {isTogglingBlock ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : tour.isBlocked ? (
                    <>
                      <Shield className="w-3 h-3 mr-2" />
                      Unblock Tour
                    </>
                  ) : (
                    <>
                      <ShieldOff className="w-3 h-3 mr-2" />
                      Block Tour
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Active Status</span>
                    <Badge variant={tour.isActive ? "default" : "destructive"}>
                      {tour.isActive ? (
                        <><CheckCircle className="w-3 h-3 mr-1" /> Active</>
                      ) : (
                        <><XCircle className="w-3 h-3 mr-1" /> Inactive</>
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Admin Status</span>
                    <Badge variant={tour.isBlocked ? "destructive" : "default"}>
                      {tour.isBlocked ? (
                        <><XCircle className="w-3 h-3 mr-1" /> Blocked</>
                      ) : (
                        <><CheckCircle className="w-3 h-3 mr-1" /> Approved</>
                      )}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

