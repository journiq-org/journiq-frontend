
'use client'

import TravellerNavbar from '@/components/TravellerNavbar';
import { listDestinations } from '@/redux/slices/destinationSlice';
import { AppDispatch } from '@/redux/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Bold } from 'lucide-react';

export default function TravellerDashboard() {
  const router = useRouter();

  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, destinations } = useSelector((state: any) => state.destination);

  useEffect(() => {
    dispatch(listDestinations());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar on top */}
      <TravellerNavbar />

      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Journey Starts Here
            </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover amazing destinations with 
            <span className="text-[#ff9100] font-semibold"> Journiq </span> 
            and plan your next unforgettable journey.
          </p>
            <div className="w-24 h-1 bg-gray-800 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
            <p className="text-gray-600">Explore the world's most amazing places</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{destinations?.length || 0}</div>
              <div className="text-sm text-gray-600">Destinations</div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading destinations...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <div className="text-red-500 text-xl mr-3">⚠️</div>
              <div>
                <h3 className="text-lg font-semibold text-red-900">Error Loading Destinations</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Destinations Grid */}
        {destinations?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest: any) => (
              <div
                key={dest._id}
                onClick={() => router.push(`/tours/${dest._id}`)}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  {dest.images?.length > 0 ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${dest.images[0]}`}
                      alt={dest.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-destination.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">🏔️</div>
                        <div className="text-sm">No image available</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Location badge */}
                  {(dest.city || dest.country) && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="flex items-center gap-1 text-sm text-gray-800">
                        <span>📍</span>
                        <span className="font-medium">
                          {dest.city && dest.country ? `${dest.city}, ${dest.country}` : dest.city || dest.country}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 flex-1 mr-4">
                      {dest.name}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm text-gray-500">Destination</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Tags */}
                  {dest.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dest.tags.slice(0, 3).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full font-medium hover:bg-gray-200 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {dest.tags.length > 3 && (
                        <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                          +{dest.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Click to explore tours
                    </div>
                    <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 group-hover:bg-gray-800">
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations available</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're working on adding amazing destinations for you to explore. Check back soon!
              </p>
            </div>
          )
        )}

        {/* Stats Section */}
        {destinations?.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Explore the World</h3>
              <p className="text-gray-600">Your next adventure awaits</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{destinations.length}</div>
                <div className="text-gray-600">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {destinations.reduce((acc: number, dest: any) => acc + (dest.tags?.length || 0), 0)}
                </div>
                <div className="text-gray-600">Experience Types</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {new Set(destinations.map((dest: any) => dest.country).filter(Boolean)).size}
                </div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse through our amazing destinations and find your perfect getaway
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* <button
              onClick={() => router.push('/traveller-dashboard')}
              className="bg-white text-gray-900 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              View All Destination
            </button> */}
            
            <button
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              View All Destination
            </button>
          </div>
          
          <div className="mt-8 text-gray-400">
            <p className="text-sm">✈️ Plan • 🗺️ Explore • 📸 Experience • 🏠 Return Home</p>
          </div>
        </div>
      </div>
    </div>
  );
}