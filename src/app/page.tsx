'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { listDestinations } from "@/redux/slices/destinationSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useRouter  } from "next/navigation";
import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter()
  
    //redux
    const dispatch = useDispatch<AppDispatch>()
    const [role, setRole] = useState<string | null>(null);
    // const {loading,error, destinations} = useSelector((state:any) => state.destination)  // first destinations is the name of initialstate.. second destination is the name in store registered reducer
    const [page, setPage] = useState(1);
    const limit = 9;
    const skip = (page - 1) * limit;
  
    useEffect(() => {
      dispatch(listDestinations({ skip, limit }));
    }, [dispatch, page]);
  
    const { destinations, loading, error, total } = useSelector(
      (state: any) => state.destination
    );
  
    const totalPages = Math.ceil(total / limit);
  
  return (
    <div >
      <Header/>


    {/* hero section */}
    {/* <div>
      <div className="relative max-w-7xl mx-auto px-4 pt-20 flex flex-col items-center text-center">
        <h6 className="text-xl md:text-2xl text-[#0c0c0c]"> Dont't just see the world.</h6>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mt-4 text-[#0c0c0c] leading-tight">Live it with Journiq.</h1>
      </div>
      <div className="relative mt-12 w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden mx-auto bottom-25 ">
        <Image
        src={'/images/destination3.jpg'}
        alt="destination"
        width={1600}
        height={800}
        className="w-full h-[400px] md:h-[500px] object-cover"
        />
      </div>

    </div> */}

    <div>
  <div className="relative max-w-7xl mx-auto px-4 pt-20 flex flex-col items-center text-center">
    <h6 className="text-xl md:text-2xl text-[#0c0c0c]">Don't just see the world.</h6>
    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mt-4 text-[#0c0c0c] leading-tight">
      Live it with Journiq.
    </h1>
  </div>

  {/* Image with gradient overlay */}
  <div className="relative mt-12 w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden mx-auto">
    <Image
      src={`/images/destination3.jpg`}
      alt="destination"
      width={1600}
      height={800}
      className="w-full h-[400px] md:h-[500px] object-cover"
    />

    {/* Gradient overlay at the top */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
    </div>
  </div>





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
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
            >
              {/* Image */}
              {dest.images?.length > 0 && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${dest.images[0]}`}
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
     {/* Pagination Controls */}
           {totalPages > 1 && (
  <div className="flex justify-center items-center gap-3 mt-8">
    <button
      disabled={page === 1}
      onClick={() => setPage((p) => p - 1)}
      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-100"
    >
      Prev
    </button>
    <span className="text-sm font-medium">
      Page {page} of {totalPages}
    </span>
    <button
      disabled={page === totalPages}
      onClick={() => setPage((p) => p + 1)}
      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-100"
    >
      Next
    </button>
  </div>
)}
  {/* Call to Action Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready for Your Next Adventure?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your dream tour today and create memories that will last a lifetime
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              Explore
            </button>
            
            {role === 'traveller' && (
              <button
                onClick={() => router.push('/booking/my-booking')}
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                My Bookings
              </button>
            )}
          </div>
          
          <div className="mt-8 text-blue-100">
            <p className="text-sm">🎯 Expert Guides • 📞 24/7 Support • 🔄 Flexible Cancellation</p>
          </div>
        </div>
      </div>
    </div>
  );
}