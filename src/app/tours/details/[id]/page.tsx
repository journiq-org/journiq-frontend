'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import TravellerNavbar from '@/components/TravellerNavbar' // ✅ import your traveller navbar
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

  // ✅ Fetch tour + reviews
  useEffect(() => {
    if (id) {
      dispatch(publicViewTourDetails(id))
      dispatch(getReviewsForTour(id))
    }
  }, [dispatch, id])

  // ✅ Calculate avg rating
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

  // ✅ Check cookies for token & role
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

  // ✅ Booking
  const handleBooking = async () => {
    if (token && role) {
      router.push(`/booking?tourId=${id}`)
    } else {
      router.push('/login')
    }
  }

  if (!selectedTour)
    return (
      <p className="text-gray-500 text-center mt-10">Loading tour details...</p>
    )

  return (
    <div className="bg-[#E2E0DF] min-h-screen">
      {/* ✅ Conditionally render navbar */}
      {token && role === 'traveller' ? <TravellerNavbar /> : <Header />}

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Hero Image */}
        <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-300">
          {selectedTour.images.length > 0 ? (
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedTour.images[0]}`}
              alt={selectedTour.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xl font-medium">
              No Image
            </div>
          )}
        </div>

        {/* Title & Category */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">{selectedTour.title}</h1>
          <span className="mt-2 md:mt-0 text-sm bg-blue-100 text-blue-800 px-5 py-2 rounded-full font-semibold shadow-md">
            {selectedTour.category}
          </span>
        </div>

        {/* Key Info */}
        <div className="flex flex-col md:flex-row gap-8 text-lg md:text-xl font-semibold text-gray-800">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">Price: ₹{selectedTour.price}</div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">Duration: {selectedTour.duration} days</div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">Rating: ⭐ {avgRating || selectedTour.rating || 0} / 5</div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-semibold mb-4">About this tour</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{selectedTour.description}</p>
        </div>

        {/* Itinerary */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-semibold mb-4">Itinerary</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            {selectedTour.itinerary.map((item: string, idx: number) => (
              <li key={idx} className="text-lg">{item}</li>
            ))}
          </ol>
        </div>

        {/* Highlights */}
        {selectedTour.highlights.length > 0 && (
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-semibold mb-4">Highlights</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {selectedTour.highlights.map((item: string, idx: number) => (
                <li key={idx} className="text-lg">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Availability */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-semibold mb-4">Availability</h2>
          <ul className="space-y-2 text-gray-700">
            {selectedTour.availability.map((slot: { date: string | Date; slots: number }, idx: number) => (
              <li key={idx} className="text-lg">
                {new Date(slot.date).toLocaleDateString()} — {slot.slots} slots available
              </li>
            ))}
          </ul>
        </div>

        {/* Included & Excluded */}
        <div className="grid md:grid-cols-2 gap-6">
          {selectedTour.included.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
              <h2 className="text-3xl font-semibold mb-4 text-green-700">Included</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {selectedTour.included.map((item: string, idx: number) => <li key={idx} className="text-lg">{item}</li>)}
              </ul>
            </div>
          )}
          {selectedTour.excluded.length > 0 && (
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
              <h2 className="text-3xl font-semibold mb-4 text-red-600">Excluded</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {selectedTour.excluded.map((item: string, idx: number) => <li key={idx} className="text-lg">{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Meeting Point */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-semibold mb-4">Meeting Point</h2>
          <p className="text-gray-700 text-lg">{selectedTour.meetingPoint}</p>
        </div>

        {/* Guide Info */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200 flex items-center gap-6">
          {/* {selectedTour.guide?.profilePic && (
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedTour.guide.profilePic}`}
              alt={selectedTour.guide.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          )} */}
          <div>
            <p className="text-2xl font-semibold">{selectedTour.guide?.name}</p>
            <p className="text-gray-500 text-sm">Guide</p>
          </div>
        </div>

        {/* ✅ Reviews Section */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-semibold mb-4">Reviews</h2>
          {reviews && reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews
                .filter((r) =>
                  typeof r.tour === 'string' ? r.tour === id : r.tour._id === id
                )
                .map((review, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-4 last:border-none">
                    <p className="text-gray-800 font-medium">
                      {/* {review.user?.name || 'Anonymous'} */}
                    </p>
                    <p className="text-sm text-gray-500">
                      rating: {review.rating} 
                    </p>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>

        {/* Book Now Button */}
        <div className="text-center">
          <button
            onClick={handleBooking}
            className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl shadow-2xl hover:bg-blue-700 transition transform hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default TourDetails
