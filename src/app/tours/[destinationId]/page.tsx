'use client'

import Header from '@/components/Header'
import { getTourByDestination } from '@/redux/slices/destinationSlice'
import { AppDispatch } from '@/redux/store'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ToursByDestination = () => {
console.log("🚀 ToursByDestination mounted");

    const router = useRouter()

    const params = useParams()
    console.log("Params from useParams:", params);
    const rawId = params?.destinationId // the destination id name is not from backend.. it is the name of folder that we have given in frontend
    const id = Array.isArray(rawId) ? rawId[0] : rawId ?? ''

    const dispatch = useDispatch<AppDispatch>()
    const {loading, error, toursByDestination} = useSelector((state: any) => state.destination)

    useEffect(() => {
          console.log("useEffect triggered with id:", id);
        if(id){
            dispatch(getTourByDestination(id))
        }
    },[dispatch, id])

    if(loading) return <p className="text-gray-500">Loading tours...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <Header/>
        <h1 className='text-2xl pt-8 text-bold mb-3 text-center'>Tours</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4" onClick={() => router.push('/login')}>
      {toursByDestination.map((tour: any) => (
        <div key={tour._id} className="bg-white shadow-lg rounded-2xl p-4">
          <img
            src={tour.images[0] || "/placeholder.jpg"}
            alt={tour.title}
            className="text-black w-full h-40 object-cover rounded-xl mb-3"
          />
          <h2 className="text-lg font-bold text-black">{tour.title}</h2>
          <p className="text-gray-600 text-sm line-clamp-2">{tour.description}</p>
          <p className="mt-2 font-semibold text-black">₹{tour.price}</p>
          <p className="text-sm text-gray-500">
            {tour.duration} days • ⭐ {tour.rating}
          </p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default ToursByDestination