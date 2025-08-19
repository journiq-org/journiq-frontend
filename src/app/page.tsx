'use client'

import { listDestinations } from "@/redux/slices/destinationSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter()
  
    //redux
    const dispatch = useDispatch<AppDispatch>()
    const {loading,error, destinations} = useSelector((state:any) => state.destination)  // first destinations is the name of initialstate.. second destination is the name in store registered reducer
  
    useEffect(() => {
      dispatch(listDestinations())
    },[dispatch])
  return (
   
    <div>
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Popular Destinations</h2>

      {/* Loading State */}
      {loading && <p>Loading destinations...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations?.length > 0 ? (
          destinations.map((dest: any) => (
            <div 
              key={dest._id} 
              onClick={() => router.push(`/tours/${dest._id}`) }
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              {dest.images?.length > 0 && (
                <img
                  src={dest.images[0]}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black">{dest.name}</h3>
                <p className="text-sm text-gray-500">
                  {dest.city ? `${dest.city}, ` : ''}{dest.country}
                </p>
                <p className="mt-2 text-gray-600 line-clamp-2">{dest.description}</p>

                {/* Tags */}
                {dest.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {dest.tags.slice(0, 3).map((tag: string, i: number) => (
                      <span 
                        key={i} 
                        className="text-xs text-black bg-gray-200 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No destinations available.</p>
        )}
      </div>
    </div>
    </div>
  );
}
