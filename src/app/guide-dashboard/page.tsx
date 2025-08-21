"use client";
import React from "react";
import { MapPin, Star } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Paris",
    location: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Tokyo",
    location: "Japan",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&q=80",
    rating: 4.7,
  },
  {
    id: 3,
    name: "New York",
    location: "USA",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    rating: 4.6,
  },
];

export default function DestinationListPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Explore Destinations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {dest.rating}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{dest.name}</h2>
              <p className="flex items-center gap-1 text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                {dest.location}
              </p>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
