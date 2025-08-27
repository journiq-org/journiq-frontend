"use client";
import React, { useEffect } from "react";
import { MapPin, Calendar, DollarSign, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { guideViewTours } from "@/redux/slices/tourSlice";
import { AppDispatch } from "@/redux/store";
import { Tour } from "@/types/tour";

const GuideToursPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { guideTours, isloading, error } = useSelector((state: any) => state.tour);

  useEffect(() => {
    dispatch(guideViewTours());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#E0DDD7] p-8">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#5E361D]">My Tours</h1>
        <button
          onClick={() => router.push("/guide/createTour")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
          bg-gradient-to-r from-[#5E361D] to-[#7B4B27] 
          text-white font-semibold shadow-md hover:shadow-lg 
          hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Tour
        </button>
      </div>

      {/* Loading / Error */}
      {isloading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guideTours.map((tour: Tour) => (
          <div
            key={tour._id}
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden bg-[#EFEDE9] cursor-pointer"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
                alt={tour.title}
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-[#0C0C0C]">{tour.title}</h2>
              <p className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                {tour.destination.name}
              </p>
              <p className="flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                {tour.duration} Days
              </p>
              <p className="flex items-center font-semibold text-gray-800">
                <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                ₹{tour.price}
              </p>
              <button
                onClick={() => router.push(`/guide/viewTourDetails/${tour._id}`)}
                className="w-full mt-3 bg-[#5E361D] text-[#EFEDE9] py-2 px-4 rounded-xl hover:bg-[#4E361B] transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideToursPage;
