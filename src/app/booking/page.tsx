'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { publicViewTourDetails } from '@/redux/slices/tourSlice'
import { createBooking, clearBookingState, checkAvailability } from '@/redux/slices/bookingSlice'
import toast from 'react-hot-toast'
import TravellerNavbar from '@/components/TravellerNavbar'

const BookingPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tourId = searchParams.get('tourId') || ''

  const { selectedTour, isLoading } = useAppSelector((state) => state.tour)
  const { successMessage, error: bookingError, availability } = useAppSelector((state) => state.booking)

  const [selectedDate, setSelectedDate] = useState('')
  const [numOfPeople, setNumOfPeople] = useState(1)

  // Fetch tour details on mount
  useEffect(() => {
    if (tourId) dispatch(publicViewTourDetails(tourId))
  }, [dispatch, tourId])

  // Handle toast notifications for success/error
  useEffect(() => {
    if (bookingError) {
      toast.error(bookingError)
      dispatch(clearBookingState())
    }
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearBookingState())
      router.push('/booking/my-booking')
    }
  }, [bookingError, successMessage, dispatch, router])

  // Check availability
  const handleCheckAvailability = async () => {
    if (!selectedDate || numOfPeople < 1) {
      toast.error('Please select a date and number of people')
      return
    }
    await dispatch(checkAvailability({ tourId, date: selectedDate, numOfPeople }))
  }

  // Confirm booking
  const handleBooking = () => {
    if (!availability || !availability.available) {
      toast.error(availability?.message || 'No slots available for this date')
      return
    }
    dispatch(createBooking({ tourId, date: selectedDate, numOfPeople }))
  }

  if (isLoading || !selectedTour)
    return (
      <p className="text-gray-500 text-center mt-10 text-lg">
        Loading tour details...
      </p>
    )

  return (
    <>
      <TravellerNavbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-3xl space-y-8">
          <h1 className="text-4xl font-bold text-center text-black">Book Your Tour</h1>

          {/* Tour Details */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 text-black">
            <h2 className="text-2xl font-semibold">{selectedTour.title}</h2>
            <p className="text-gray-800">{selectedTour.description}</p>
            <div className="flex flex-wrap gap-6 mt-2">
              <span className="font-semibold text-black">Price per person: ₹{selectedTour.price}</span>
              <span className="font-semibold text-black">Duration: {selectedTour.duration} days</span>
              <span className="font-semibold text-black">Rating: {selectedTour.rating} / 5</span>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 text-black">
            <h3 className="text-xl font-semibold">Select Date & Slots</h3>

            {/* Select Date */}
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Date</option>
              {selectedTour.availability.map((slot) => (
                <option key={slot.date} value={slot.date} disabled={slot.slots === 0}>
                  {new Date(slot.date).toLocaleDateString()} {slot.slots === 0 ? '(Full)' : ''}
                </option>
              ))}
            </select>

            {/* Number of People */}
            <input
              type="number"
              min={1}
              value={numOfPeople}
              onChange={(e) => setNumOfPeople(Number(e.target.value))}
              placeholder="Number of People"
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Check Availability Button */}
            <button
              onClick={handleCheckAvailability}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Check Availability
            </button>

            {/* Availability Info */}
            {availability && (
              <p
                className={`text-lg font-semibold ${
                  availability.available ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {availability.available
                  ? `✅ Slots available: ${availability.slots}`
                  : availability.message || 'No slots available'}
              </p>
            )}

            {/* Total Price */}
            <p className="text-lg font-semibold text-black">
              Total Price: ₹{selectedTour.price * numOfPeople}
            </p>

            {/* Confirm Booking Button */}
            <button
              onClick={handleBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingPage
