'use client'

import React from "react";
import { Star, MapPin, Calendar, Clock, Users, Check, X } from "lucide-react";
import { useParams } from "next/navigation";

const TourDetails = () => {
    const params = useParams()
    const id = params?.id 
    
  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Hero Section */}
        <div className="relative h-96">
          <img
            src="/uploads/santorini1.jpg"
            alt="Tour Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-4xl font-bold">Santorini Sunset Escape</h1>
              <p className="flex items-center mt-2">
                <MapPin className="w-5 h-5 mr-2" />
                Santorini, Greece
              </p>
              <p className="flex items-center mt-1">
                <Star className="w-5 h-5 mr-2 text-yellow-400" /> 4.8 (120 Reviews)
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-10">
          {/* About */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">About this tour</h2>
            <p className="text-gray-700 leading-relaxed">
              Experience the best of Santorini with this 3-day tour covering
              iconic sunsets, ancient ruins, volcanic beaches, and local cuisine.
            </p>
          </section>

          {/* Quick Info */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-gray-100 rounded-xl">
              <Clock className="mx-auto mb-2" />
              <p className="font-semibold">3 Days</p>
              <p className="text-sm text-gray-600">Duration</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-xl">
              <Users className="mx-auto mb-2" />
              <p className="font-semibold">20 Slots</p>
              <p className="text-sm text-gray-600">Availability</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-xl">
              <Calendar className="mx-auto mb-2" />
              <p className="font-semibold">April - Oct</p>
              <p className="text-sm text-gray-600">Best Season</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-xl">
              <MapPin className="mx-auto mb-2" />
              <p className="font-semibold">Oia, Fira</p>
              <p className="text-sm text-gray-600">Meeting Point</p>
            </div>
          </section>

          {/* Highlights */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Highlights</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Witness the world-famous Oia sunset</li>
              <li>Explore Ancient Thera ruins</li>
              <li>Relax on volcanic Red Beach</li>
              <li>Taste authentic Greek cuisine</li>
            </ul>
          </section>

          {/* Itinerary */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Itinerary</h2>
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-blue-500 bg-gray-50">
                <h3 className="font-semibold">Day 1</h3>
                <p>Arrival, sunset in Oia, welcome dinner.</p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-gray-50">
                <h3 className="font-semibold">Day 2</h3>
                <p>Ancient Thera, wine tasting, Red Beach visit.</p>
              </div>
              <div className="p-4 border-l-4 border-blue-500 bg-gray-50">
                <h3 className="font-semibold">Day 3</h3>
                <p>Boat trip to Caldera, departure.</p>
              </div>
            </div>
          </section>

          {/* Included & Excluded */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Included</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="text-green-600 w-5 h-5 mr-2" /> Hotel stay
                </li>
                <li className="flex items-center">
                  <Check className="text-green-600 w-5 h-5 mr-2" /> Local guide
                </li>
                <li className="flex items-center">
                  <Check className="text-green-600 w-5 h-5 mr-2" /> Breakfast & Dinner
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">Excluded</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <X className="text-red-600 w-5 h-5 mr-2" /> Flights
                </li>
                <li className="flex items-center">
                  <X className="text-red-600 w-5 h-5 mr-2" /> Personal expenses
                </li>
              </ul>
            </div>
          </section>

          {/* Price & Booking */}
          <section className="text-center py-6 border-t">
            <p className="text-3xl font-bold text-blue-600 mb-3">$499 / person</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Book Now
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
