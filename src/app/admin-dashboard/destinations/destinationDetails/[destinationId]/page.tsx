"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { getSingleDestination } from "@/redux/slices/destinationSlice";
import { guideViewTours } from "@/redux/slices/tourSlice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { 
  ArrowLeft, 
  Globe, 
  MapPin, 
  Building2, 
  Camera, 
  Star, 
  ExternalLink,
  CheckCircle,
  XCircle 
} from "lucide-react";

import GuideNavbar from "@/components/GuideNavbar"; // assuming you have a guide navbar component

export default function GuideDestinationPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedDestination, loading } = useSelector(
    (state: RootState) => state.destination
  );
  const { guideTours, isLoading: toursLoading } = useSelector(
    (state: RootState) => state.tour
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleDestination(id as string));
      dispatch(
        guideViewTours({
          page: 1,
          limit: 6,
          destination: id as string,
        })
      );
    }
  }, [id, dispatch]);

  const handleGoBack = () => router.back();

  if (loading || !selectedDestination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <GuideNavbar /> {/* Navbar on top */}

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

            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Globe className="h-8 w-8 text-blue-600" />
              {selectedDestination.name}
            </h1>
          </div>

          <Button
            onClick={() => router.push(`/guide-dashboard/addTour?destination=${id}`)}
            className="flex items-center gap-2"
          >
            <Building2 className="h-4 w-4" /> Add Tour
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              My Tours ({guideTours?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Image Gallery */}
                {selectedDestination.images?.length > 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        Gallery
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedDestination.images.map((img: string, idx: number) => (
                          <div key={idx} className="relative group">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
                              alt={`${selectedDestination.name} image ${idx + 1}`}
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
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle>About this Destination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedDestination.description}</p>
                  </CardContent>
                </Card>

                {/* Popular Attractions */}
                {selectedDestination.popularAttractions?.length > 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Popular Attractions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedDestination.popularAttractions.map((place: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <MapPin className="h-4 w-4 text-blue-600" />
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
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle>Key Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Country</span>
                      <span className="text-sm text-gray-900">{selectedDestination.country}</span>
                    </div>
                    {selectedDestination.city && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">City</span>
                        <span className="text-sm text-gray-900">{selectedDestination.city}</span>
                      </div>
                    )}
                    {selectedDestination.bestSeason && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Best Season</span>
                        <span className="text-sm text-gray-900">{selectedDestination.bestSeason}</span>
                      </div>
                    )}
                    {selectedDestination.is_active !== undefined && (
                      <Badge
                        variant={selectedDestination.is_active ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {selectedDestination.is_active ? (
                          <><CheckCircle className="h-3 w-3 mr-1" /> Active</>
                        ) : (
                          <><XCircle className="h-3 w-3 mr-1" /> Inactive</>
                        )}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  My Tours in {selectedDestination.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {toursLoading ? (
                  <p className="text-center py-12">Loading tours...</p>
                ) : guideTours?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guideTours.map((tour: any) => (
                      <Card key={tour._id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 space-y-3">
                          {tour.images?.[0] && (
                            <div className="relative h-32 rounded-lg overflow-hidden">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
                                alt={tour.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <h3 className="font-semibold text-gray-900">{tour.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{tour.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-green-600">₹{tour.price}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                router.push(`/guide-dashboard/viewTour/${tour._id}`)
                              }
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    No tours added for this destination yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
