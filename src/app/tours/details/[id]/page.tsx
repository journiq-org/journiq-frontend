// 'use client'

// import React, { useEffect, useState } from 'react'
// import Header from '@/components/Header'
// import TravellerNavbar from '@/components/TravellerNavbar' // ✅ import your traveller navbar
// import { publicViewTourDetails } from '@/redux/slices/tourSlice'
// import { getReviewsForTour } from '@/redux/slices/reviewSlice'
// import { AppDispatch, RootState } from '@/redux/store'
// import { useParams, useRouter } from 'next/navigation'
// import { useDispatch, useSelector } from 'react-redux'

// const TourDetails = () => {
//   const router = useRouter()
//   const params = useParams()

//   const dispatch = useDispatch<AppDispatch>()
//   const { selectedTour } = useSelector((state: RootState) => state.tour)
//   const { reviews } = useSelector((state: RootState) => state.reviews)

//   const rawId = params?.id
//   const id = Array.isArray(rawId) ? rawId[0] : rawId ?? ''

//   const [avgRating, setAvgRating] = useState<number>(0)
//   const [role, setRole] = useState<string | null>(null)
//   const [token, setToken] = useState<string | null>(null)

//   // ✅ Fetch tour + reviews
//   useEffect(() => {
//     if (id) {
//       dispatch(publicViewTourDetails(id))
//       dispatch(getReviewsForTour(id))
//     }
//   }, [dispatch, id])

//   // ✅ Calculate avg rating
//   useEffect(() => {
//     if (reviews && reviews.length > 0) {
//       const tourReviews = reviews.filter((r) =>
//         typeof r.tour === 'string' ? r.tour === id : r.tour._id === id
//       )

     
//     if (tourReviews.length > 0) {
//       const avg =
//         tourReviews.reduce((sum, r) => sum + r.rating, 0) / tourReviews.length;

//         setAvgRating(parseFloat(avg.toFixed(1)))
//       }
//     }
//   }, [reviews, id])

//   // ✅ Check cookies for token & role
//   useEffect(() => {
//     const fetchCookies = async () => {
//       try {
//         const res = await fetch('/api/auth/get-cookie', {
//           method: 'GET',
//           credentials: 'include',
//         })

//         if (!res.ok) throw new Error('Failed to fetch cookies')

//         const data = await res.json()
//         setToken(data.token || null)
//         setRole(data.role || null)
//       } catch (error) {
//         console.error('Error fetching cookies:', error)
//         setToken(null)
//         setRole(null)
//       }
//     }

//     fetchCookies()
//   }, [])

//   // ✅ Booking
//   const handleBooking = async () => {
//     if (token && role) {
//       router.push(`/booking?tourId=${id}`)
//     } else {
//       router.push('/login')
//     }
//   }

//   if (!selectedTour)
//     return (
//       <p className="text-gray-500 text-center mt-10">Loading tour details...</p>
//     )

//   return (
//     <div className="bg-[#E2E0DF] min-h-screen">
//       {/* ✅ Conditionally render navbar */}
//       {token && role === 'traveller' ? <TravellerNavbar /> : <Header />}

//       <div className="max-w-7xl mx-auto p-6 space-y-12">
//         {/* Hero Image */}
//         <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-300">
//           {selectedTour.images.length > 0 ? (
//             <img
//               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedTour.images[0]}`}
//               alt={selectedTour.title}
//               className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xl font-medium">
//               No Image
//             </div>
//           )}
//         </div>

//         {/* Title & Category */}
//         <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
//           <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">{selectedTour.title}</h1>
//           <span className="mt-2 md:mt-0 text-sm bg-blue-100 text-blue-800 px-5 py-2 rounded-full font-semibold shadow-md">
//             {selectedTour.category}
//           </span>
//         </div>

//         {/* Key Info */}
//         <div className="flex flex-col md:flex-row gap-8 text-lg md:text-xl font-semibold text-gray-800">
//           <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">Price: ₹{selectedTour.price}</div>
//           <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">Duration: {selectedTour.duration} days</div>
//           <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">Rating: ⭐ {avgRating || selectedTour.rating || 0} / 5</div>
//         </div>

//         {/* Description */}
//         <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
//           <h2 className="text-3xl font-semibold mb-4">About this tour</h2>
//           <p className="text-gray-700 text-lg leading-relaxed">{selectedTour.description}</p>
//         </div>

//         {/* Itinerary */}
//         <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
//           <h2 className="text-3xl font-semibold mb-4">Itinerary</h2>
//           <ol className="list-decimal list-inside space-y-3 text-gray-700">
//             {selectedTour.itinerary.map((item: string, idx: number) => (
//               <li key={idx} className="text-lg">{item}</li>
//             ))}
//           </ol>
//         </div>

//         {/* Highlights */}
//         {selectedTour.highlights.length > 0 && (
//           <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
//             <h2 className="text-3xl font-semibold mb-4">Highlights</h2>
//             <ul className="list-disc list-inside space-y-2 text-gray-700">
//               {selectedTour.highlights.map((item: string, idx: number) => (
//                 <li key={idx} className="text-lg">{item}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Availability */}
//         <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
//           <h2 className="text-3xl font-semibold mb-4">Availability</h2>
//           <ul className="space-y-2 text-gray-700">
//             {selectedTour.availability.map((slot: { date: string | Date; slots: number }, idx: number) => (
//               <li key={idx} className="text-lg">
//                 {new Date(slot.date).toLocaleDateString()} — {slot.slots} slots available
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Included & Excluded */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {selectedTour.included.length > 0 && (
//             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
//               <h2 className="text-3xl font-semibold mb-4 text-green-700">Included</h2>
//               <ul className="list-disc list-inside space-y-2 text-gray-700">
//                 {selectedTour.included.map((item: string, idx: number) => <li key={idx} className="text-lg">{item}</li>)}
//               </ul>
//             </div>
//           )}
//           {selectedTour.excluded.length > 0 && (
//             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
//               <h2 className="text-3xl font-semibold mb-4 text-red-600">Excluded</h2>
//               <ul className="list-disc list-inside space-y-2 text-gray-700">
//                 {selectedTour.excluded.map((item: string, idx: number) => <li key={idx} className="text-lg">{item}</li>)}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Meeting Point */}
//         <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
//           <h2 className="text-3xl font-semibold mb-4">Meeting Point</h2>
//           <p className="text-gray-700 text-lg">{selectedTour.meetingPoint}</p>
//         </div>

//         {/* Guide Info */}
//         <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200 flex items-center gap-6">
//           {/* {selectedTour.guide?.profilePic && (
//             <img
//               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedTour.guide.profilePic}`}
//               alt={selectedTour.guide.name}
//               className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
//             />
//           )} */}
//           <div>
//             <p className="text-2xl font-semibold">{selectedTour.guide?.name}</p>
//             <p className="text-gray-500 text-sm">Guide</p>
//           </div>
//         </div>

//         {/* ✅ Reviews Section */}
//         <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
//           <h2 className="text-3xl font-semibold mb-4">Reviews</h2>
//           {reviews && reviews.length > 0 ? (
//             <div className="space-y-4">
//               {reviews
//                 .filter((r) =>
//                   typeof r.tour === 'string' ? r.tour === id : r.tour._id === id
//                 )
//                 .map((review, idx) => (
//                   <div key={idx} className="border-b border-gray-200 pb-4 last:border-none">
//                     <p className="text-gray-800 font-medium">
//                       {/* {review.user?.name || 'Anonymous'} */}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       rating: {review.rating} 
//                     </p>
//                     <p className="mt-2 text-gray-700">{review.comment}</p>
//                   </div>
//                 ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No reviews yet.</p>
//           )}
//         </div>

//         {/* Book Now Button */}
//         <div className="text-center">
//           <button
//             onClick={handleBooking}
//             className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl shadow-2xl hover:bg-blue-700 transition transform hover:scale-105"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TourDetails

'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import TravellerNavbar from '@/components/TravellerNavbar'
import { publicViewTourDetails } from '@/redux/slices/tourSlice'
import { getReviewsForTour } from '@/redux/slices/reviewSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

const TourDetails = () => {
  const router = useRouter()
  const params = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const { selectedTour } = useSelector((state: RootState) => state.tour)
  const { reviews } = useSelector((state: RootState) => state.reviews)

  const rawId = params?.id
  const id = Array.isArray(rawId) ? rawId[0] : rawId ?? ''

  const [avgRating, setAvgRating] = useState<number>(0)
  const [role, setRole] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Fetch tour + reviews
  useEffect(() => {
    if (id) {
      dispatch(publicViewTourDetails(id))
      dispatch(getReviewsForTour(id))
    }
  }, [dispatch, id])

  // Calculate avg rating
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const tourReviews = reviews.filter((r) =>
        typeof r.tour === 'string' ? r.tour === id : r.tour._id === id
      )

      if (tourReviews.length > 0) {
        const avg =
          tourReviews.reduce((sum, r) => sum + r.rating, 0) / tourReviews.length;
        setAvgRating(parseFloat(avg.toFixed(1)))
      }
    }
  }, [reviews, id])

  // Check cookies for token & role
  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const res = await fetch('/api/auth/get-cookie', {
          method: 'GET',
          credentials: 'include',
        })

        if (!res.ok) throw new Error('Failed to fetch cookies')

        const data = await res.json()
        setToken(data.token || null)
        setRole(data.role || null)
      } catch (error) {
        console.error('Error fetching cookies:', error)
        setToken(null)
        setRole(null)
      }
    }

    fetchCookies()
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (selectedTour?.images && selectedTour.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % selectedTour.images.length
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [selectedTour?.images]);

  // Carousel navigation functions
  const nextImage = () => {
    if (selectedTour?.images) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedTour.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedTour?.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedTour.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Booking
  const handleBooking = async () => {
    if (token && role) {
      router.push(`/booking?tourId=${id}`)
    } else {
      router.push('/login')
    }
  }

  if (!selectedTour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conditionally render navbar */}
      {token && role === 'traveller' ? <TravellerNavbar /> : <Header />}

      {/* Hero Section with Compact Image Display */}
      <div className="relative bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Image Section - More Compact */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-gray-100">
                {selectedTour.images && selectedTour.images.length > 0 ? (
                  <>
                    {/* Main Image */}
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedTour.images[currentImageIndex]}`}
                      alt={`${selectedTour.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (selectedTour.images.length > 1) {
                          setCurrentImageIndex((prev) => 
                            (prev + 1) % selectedTour.images.length
                          );
                        } else {
                          target.style.display = 'none';
                        }
                      }}
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                    {/* Navigation Arrows */}
                    {selectedTour.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 z-10"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 z-10"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Image Dots Indicator */}
                    {selectedTour.images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                        {selectedTour.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentImageIndex 
                                ? 'bg-white shadow-md' 
                                : 'bg-white/60 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Fallback when no images
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl mb-3">🏔️</div>
                      <h3 className="text-xl font-bold mb-1">{selectedTour.title}</h3>
                      <p className="text-sm opacity-90">Experience this amazing tour</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tour Info Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedTour.category}
                  </span>
                  <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                    <span className="text-yellow-600">⭐</span>
                    <span className="text-sm font-medium text-yellow-800">
                      {avgRating || selectedTour.rating || 0}
                    </span>
                  </div>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {selectedTour.title}
                </h1>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {selectedTour.description}
                </p>
                
                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span className="font-medium">{selectedTour.duration} days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span className="font-medium">₹{selectedTour.price} per person</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg px-4 py-3 text-center border">
                  <div className="font-bold text-xl text-blue-600">{selectedTour.duration}</div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div className="bg-gray-50 rounded-lg px-4 py-3 text-center border">
                  <div className="font-bold text-xl text-green-600">{reviews?.length || 0}</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
                <div className="bg-gray-50 rounded-lg px-4 py-3 text-center border">
                  <div className="font-bold text-xl text-purple-600">
                    {selectedTour.availability?.reduce((sum, slot) => sum + slot.slots, 0) || 0}
                  </div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBooking}
                className="w-full bg-gray-800 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
              >
                {token && role ? 'Book This Tour' : 'Login to Book'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        
        {/* Key Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow border">
            <div className="text-3xl mb-3">💰</div>
            <div className="text-2xl font-bold text-green-600 mb-1">₹{selectedTour.price}</div>
            <div className="text-gray-600">Per Person</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow border">
            <div className="text-3xl mb-3">📅</div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{selectedTour.duration}</div>
            <div className="text-gray-600">Days</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow border">
            <div className="text-3xl mb-3">⭐</div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">{avgRating || selectedTour.rating || 0}</div>
            <div className="text-gray-600">Rating</div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-md p-8 border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <span className="text-xl">📖</span>
            About This Tour
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {selectedTour.description}
          </p>
        </div>

        {/* Itinerary Section */}
        <div className="bg-white rounded-xl shadow-md p-8 border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-xl">🗺️</span>
            Tour Itinerary
          </h2>
          <div className="space-y-4">
            {selectedTour.itinerary.map((item: string, idx: number) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-base leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Section */}
        {selectedTour.highlights && selectedTour.highlights.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-xl">✨</span>
              Tour Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTour.highlights.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's Included/Excluded */}
        <div className="grid md:grid-cols-2 gap-8">
          {selectedTour.included && selectedTour.included.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-8 border">
              <h2 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-3">
                <span className="text-lg">✅</span>
                What's Included
              </h2>
              <div className="space-y-3">
                {selectedTour.included.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedTour.excluded && selectedTour.excluded.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-8 border">
              <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-3">
                <span className="text-lg">❌</span>
                What's Excluded
              </h2>
              <div className="space-y-3">
                {selectedTour.excluded.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Meeting Point & Guide Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 border">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-lg">📍</span>
              Meeting Point
            </h2>
            <p className="text-gray-700">{selectedTour.meetingPoint}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-lg">👨‍💼</span>
              Your Guide
            </h2>
            <div className="flex items-center gap-4">
              {selectedTour.guide?.profilePic && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedTour.guide.profilePic}`}
                  alt={selectedTour.guide.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
              )}
              <div>
                <p className="text-lg font-semibold text-gray-900">{selectedTour.guide?.name}</p>
                <p className="text-gray-600 text-sm">Professional Tour Guide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Section */}
        <div className="bg-white rounded-xl shadow-md p-8 border">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-lg">📅</span>
            Available Dates & Slots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedTour.availability?.map((slot: { date: string | Date; slots: number }, idx: number) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 border">
                <div className="text-base font-semibold text-gray-900 mb-2">
                  {new Date(slot.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-medium text-sm">{slot.slots} slots available</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-md p-8 border">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-lg">💬</span>
            Reviews & Ratings
          </h2>
          
          {reviews && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews
                .filter((r) =>
                  typeof r.tour === 'string' ? r.tour === id : r.tour._id === id
                )
                .map((review, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-6 last:border-none">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {typeof review.user !== "string" && "name" in review.user
                          ? review.user.name.charAt(0).toUpperCase()
                          : "A"}
                      </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {typeof review.user !== "string" && "name" in review.user
                              ? review.user.name
                              : "Anonymous"}
                          </p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, starIdx) => (
                              <span 
                                key={starIdx} 
                                className={`text-sm ${starIdx < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                ⭐
                              </span>
                            ))}
                            <span className="text-sm text-gray-600 ml-2">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TourDetails