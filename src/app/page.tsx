


'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TestimonialSlider from "@/components/TestimonialSlider";
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


    // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  
    const heroImages = [
      '/images/slide1.jpg',
      '/images/slide2.jpg',
      '/images/slide3.jpg', // Add more images as needed
      '/images/slide4.jpg'
    ];

    const heroSlides = [
      {
        title: "Discover the World",
        subtitle: "with Journiq",
        description: "Your gateway to extraordinary destinations and unforgettable experiences"
      },
      {
        title: "Explore Hidden Gems",
        subtitle: "Authentic Adventures",
        description: "Connect with local cultures and create memories that last forever"
      },
      {
        title: "Expert Local Guides",
        subtitle: "Personalized Journeys",
        description: "Travel with confidence alongside experienced local experts"
      },
      {
        title: "Seamless Booking",
        subtitle: "Effortless Planning",
        description: "From dream to reality with our hassle-free booking system"
      }
    ];

    // Auto-play carousel
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }, [heroImages.length]);

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    };

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    const goToSlide = (index: number) => {
      setCurrentSlide(index);
    }

  return(

  <div className="min-h-screen bg-white">
      <Header/>
    <div>
  <div className="relative max-w-7xl mx-auto px-4 pt-20 flex flex-col items-center text-center">
    <h6 className="text-xl md:text-2xl text-[#0c0c0c]">Don't just see the world.</h6>
    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mt-4 text-[#0c0c0c] leading-tight">
      Live it with Journiq.
    </h1>
  </div>

  {/* Image with gradient overlay */}
  <div className="relative mt-12 w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden mx-auto ">
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
  
        <h2 id="popular-destination" className="text-2xl font-bold mb-4 px-6 pt-2">
          Popular Destinations
        </h2>


      {/* Loading State */}
      {loading && <p>Loading destinations...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
  {destinations?.length > 0 ? (
    destinations.map((dest: any) => (
      <div 
        key={dest._id} 
        onClick={() => router.push(`/tours/${dest._id}`)}
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
    <p className="col-span-3 text-center text-gray-500">No destinations found.</p>
  )}
</div>

{/* Pagination Controls */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-12">
    <button
      disabled={page === 1}
      onClick={() => setPage((p) => p - 1)}
      className="px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-lg transition-all duration-300 font-medium"
    >
      ← Previous
    </button>
    <div className="flex items-center gap-2">
      <span className="text-slate-600 font-medium">
        Page {page} of {totalPages}
      </span>
    </div>
    <button
      disabled={page === totalPages}
      onClick={() => setPage((p) => p + 1)}
      className="px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-lg transition-all duration-300 font-medium"
    >
      Next →
    </button>
  </div>
)}


{/* gradient between sections */}
      <div className="h-16 bg-gradient-to-b from-[#e2e0df] to-white"></div>

      {/* About Section */}
      <section id='about' className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
                About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journiq</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Journiq isn't just a travel platform – it's your companion in discovering 
                the world. From hidden gems to iconic destinations, we bring together 
                guides, experiences, and journeys that create lasting memories.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you're an adventurer chasing thrills, a wanderer seeking culture, 
                or a traveller longing for relaxation, Journiq makes every trip effortless, 
                authentic, and unforgettable.
              </p>
              <button 
                onClick={() => router.push('/login')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                Explore Journeys
                <span className="ml-2">→</span>
              </button>
            </div>

            {/* Right: Image / Illustration */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/images/swiss.jpg"
                  alt="Journiq Travel"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">200+</p>
                    <p className="text-sm text-slate-600">Destinations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* gradient between sections */}
      <div className="h-16 bg-gradient-to-b from-[#f7fafe] to-[#e2e0df]"></div>

      {/* Testimonial Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#E2E0DF]"></div>
        <div className="relative">
          <TestimonialSlider/>
        </div>
      </section>


      <Footer/>
    </div>
  
  )


}