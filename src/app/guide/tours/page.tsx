// 'use client'

// import { guideViewTours } from "@/redux/slices/tourSlice"
// import { AppDispatch } from "@/redux/store"
// import { TourType } from "@/types/tour"
// import { MapPin, Calendar, DollarSign } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"

// const GuideToursPage = () => {


// //   const tours = [
// //     {
// //       id: 1,
// //       title: "Backwaters of Kerala",
// //       destination: "Alleppey, Kerala",
// //       duration: "2 Days / 1 Night",
// //       price: "₹4,500",
// //       image: "https://images.unsplash.com/photo-1601197989369-31aef83c7a1d",
// //     },
// //     {
// //       id: 2,
// //       title: "Munnar Tea Garden Experience",
// //       destination: "Munnar, Kerala",
// //       duration: "3 Days / 2 Nights",
// //       price: "₹7,200",
// //       image: "https://images.unsplash.com/photo-1595433562696-b9e7c8a4b0db",
// //     },
// //     {
// //       id: 3,
// //       title: "Heritage Tour of Kochi",
// //       destination: "Fort Kochi, Kerala",
// //       duration: "1 Day",
// //       price: "₹2,000",
// //       image: "https://images.unsplash.com/photo-1600661901433-bd703cc0b47b",
// //     },
// //   ]

//     const router = useRouter()

//     const dispatch = useDispatch<AppDispatch>()
//     const {error, isloading, tours} = useSelector((state: any) => state.tour)

//     useEffect(() => {
//         dispatch(guideViewTours())
//     },[dispatch])

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-bold mb-6">My Tours</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {tours.map((tour: TourType) => (
//           <div
//             key={tour._id}
//             className="rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white"
//           >
//             <div className="h-48 w-full overflow-hidden">
//               <img
//                 src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
//                 alt={tour.title}
//                 className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-4 space-y-2">
//               <h2 className="text-xl font-semibold">{tour.title}</h2>
//               <p className="flex items-center text-gray-600 text-sm">
//                 <MapPin className="w-4 h-4 mr-2 text-gray-500" />
//                 {tour.destination.name}
//               </p>
//               <p className="flex items-center text-gray-600 text-sm">
//                 <Calendar className="w-4 h-4 mr-2 text-gray-500" />
//                 {tour.duration}
//               </p>
//               <p className="flex items-center font-semibold text-gray-800">
//                 <DollarSign className="w-4 h-4 mr-1 text-green-600" />
//                 {tour.price}
//               </p>
//               <button  className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition" >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default GuideToursPage



"use client";
import React, { useEffect } from "react";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { guideViewTours } from "@/redux/slices/tourSlice";
import { AppDispatch } from "@/redux/store";
import { Tour } from "@/types/tour";

const GuideToursPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { guideTours, isloading, error } = useSelector((state: any) => state.tour);

  useEffect(() => {
    dispatch(guideViewTours());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#E0DDD7] p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#5E361D]">My Tours</h1>

      {isloading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guideTours.map((tour: Tour) => (
          <div
            key={tour._id}
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden bg-[#EFEDE9] cursor-pointer"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
                alt={tour.title}
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-[#0C0C0C]">{tour.title}</h2>
              <p className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                {tour.destination.name}
              </p>
              <p className="flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                {tour.duration} Days
              </p>
              <p className="flex items-center font-semibold text-gray-800">
                <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                ₹{tour.price}
              </p>
              <button
                onClick={() => router.push(`/guide/viewTourDetails/${tour._id}`)}
                className="w-full mt-3 bg-[#5E361D] text-[#EFEDE9] py-2 px-4 rounded-xl hover:bg-[#4E361B] transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideToursPage;
