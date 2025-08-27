// 'use client'

// import React, { useEffect } from "react";
// import { MapPin, Clock, Users, Star } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { guideViewSingleTour } from "@/redux/slices/tourSlice";
// import { useParams, useRouter } from "next/navigation";

// export default function GuideTourDetailsPage() {

//     const params = useParams()
//     const rawId = params?.tourId
//     const id = Array.isArray(rawId) ? rawId[0] : rawId ?? ''

//     const router = useRouter()

//     const dispatch = useDispatch<AppDispatch>()
//     const { isloading, error, selectedTour} = useSelector((state: any) => state.tour)

//     useEffect(() =>{
//         dispatch(guideViewSingleTour(id))
//     })

//     if (!selectedTour) {
//         return <p className="p-6 text-gray-500">Loading tour details...</p>;
//     }


//   return (
//     <div className="p-6 space-y-6 bg-[#E0DDD7] min-h-screen">
//       {/* Title + Rating */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">{selectedTour.title}</h1>
//         <div className="flex items-center gap-1 bg-yellow-400 text-black px-2 py-1 rounded">
//           <Star size={16} /> {selectedTour.rating}
//         </div>
//       </div>

//       {/* Images */}
//       <div className="grid grid-cols-3 gap-4">
//         {selectedTour.images.map((img: string, idx: number) => (
//           <img
//             key={idx}
//             src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
//             alt="tour"
//             className="rounded-xl w-full h-48 object-cover shadow"
//           />
//         ))}
//       </div>

//       {/* Info Cards */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="rounded-xl shadow p-4 flex items-center gap-3 bg-white">
//           <MapPin className="text-blue-600" />
//           <div>
//             <p className="font-semibold">Destination</p>
//             <p className="text-sm text-gray-600">{selectedTour.destination.name}</p>
//           </div>
//         </div>
//         <div className="rounded-xl shadow p-4 flex items-center gap-3 bg-white">
//           <Clock className="text-green-600" />
//           <div>
//             <p className="font-semibold">Duration</p>
//             <p className="text-sm text-gray-600">{selectedTour.duration} Days</p>
//           </div>
//         </div>
//         <div className="rounded-xl shadow p-4 flex items-center gap-3 bg-white">
//           <Users className="text-purple-600" />
//           <div>
//             <p className="font-semibold">Meeting Point</p>
//             <p className="text-sm text-gray-600">{selectedTour.meetingPoint}</p>
//           </div>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="rounded-xl shadow bg-white p-6">
//         <h2 className="text-xl font-semibold mb-2">About the Tour</h2>
//         <p className="text-gray-700">{selectedTour.description}</p>
//       </div>

//       {/* Itinerary & Highlights */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="rounded-xl shadow bg-white p-6">
//           <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
//           <ul className="list-disc list-inside text-gray-700 space-y-1">
//             {selectedTour.itinerary.map((day:string, i:number) => (
//               <li key={i}>{day}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="rounded-xl shadow bg-white p-6">
//           <h2 className="text-xl font-semibold mb-2">Highlights</h2>
//           <div className="flex flex-wrap gap-2">
//             {selectedTour.highlights.map((h:string, i: number) => (
//               <span
//                 key={i}
//                 className="bg-blue-100 text-blue-700 px-2 py-1 rounded"
//               >
//                 {h}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Availability */}
//       <div className="rounded-xl shadow bg-white p-6">
//         <h2 className="text-xl font-semibold mb-2">Availability</h2>
//         <div className="grid md:grid-cols-2 gap-4">
//           {selectedTour.availability.map((slot: { date: string; slots: number }, i: number) => (
//             <div
//               key={i}
//               className="p-3 border rounded-lg flex justify-between items-center"
//             >
//               <p>{new Date(slot.date).toDateString()}</p>
//               <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{slot.slots} Slots</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Included / Excluded */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="rounded-xl shadow bg-white p-6">
//           <h2 className="text-xl font-semibold mb-2">Included</h2>
//           <ul className="list-disc list-inside text-gray-700 space-y-1">
//             {selectedTour.included.map((item: string, i: number) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="rounded-xl shadow bg-white p-6">
//           <h2 className="text-xl font-semibold mb-2">Excluded</h2>
//           <ul className="list-disc list-inside text-gray-700 space-y-1">
//             {selectedTour.excluded.map((item: string, i: number) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Price */}
//       <div className="rounded-xl shadow bg-white p-6 text-center">
//         <h2 className="text-xl font-semibold mb-2">Price</h2>
//         <p className="text-2xl font-bold text-green-600">₹{selectedTour.price}</p>
//         <button onClick={() => {router.push(`/guide/updateTour/${selectedTour._id}`)}} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
//           Edit Tour
//         </button>
//       </div>
//     </div>
//   );
// }



'use client'

import React, { useEffect } from "react";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { guideViewSingleTour } from "@/redux/slices/tourSlice";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function GuideTourDetailsPage() {
  const params = useParams();
  const rawId = params?.tourId;
  const id = Array.isArray(rawId) ? rawId[0] : rawId ?? "";

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { isloading, error, selectedTour } = useSelector(  (state: any) => state.tour );
  

  useEffect(() => {
    if (id) dispatch(guideViewSingleTour(id));
  }, [id, dispatch]);

  if (!selectedTour) {
    return <p className="p-6 text-gray-500">Loading tour details...</p>;
  }

  const handleToggleActivity = async() =>{
    const res = await api.patch(`/api/tour/toggleStatus/${selectedTour._id}`)
    .then((res) => {
      toast.success(res.data.message)
    }).catch((err) => {
      toast.error(err.response?.data?.message || 'Failed to update tour status')
    })
  }

  const handleDeleteTour = async() => {
    const res = await api.patch(`/api/tour/deleteTour/${selectedTour._id}`)
    .then((res) => {
      toast.success(res.data.message || 'Tour deleted Successfully')
      router.push('/guide/tour')
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || "Failed to delete tour")
    })
  }

  // const handleDeleteTour = () => {
  //   if (confirm("Are you sure you want to delete this tour?")) {
  //     dispatch(guideDeleteTour(selectedTour._id)).then(() => {
  //       router.push("/guide/tours"); // redirect back after delete
  //     });
  //   }
  // };

  return (
    <div className="p-6 space-y-6 bg-[#E0DDD7] min-h-screen">
      {/* Title + Rating */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{selectedTour.title}</h1>
        <div className="flex items-center gap-1 bg-yellow-400 text-black px-2 py-1 rounded">
          <Star size={16} /> {selectedTour.rating}
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-3 gap-4">
        {selectedTour.images.map((img: string, idx: number) => (
          <img
            key={idx}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`}
            alt="tour"
            className="rounded-xl w-full h-48 object-cover shadow"
          />
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl shadow p-4 flex items-center gap-3 bg-white">
          <MapPin className="text-blue-600" />
          <div>
            <p className="font-semibold">Destination</p>
            <p className="text-sm text-gray-600">
              {selectedTour.destination.name}
            </p>
          </div>
        </div>
        <div className="rounded-xl shadow p-4 flex items-center gap-3 bg-white">
          <Clock className="text-green-600" />
          <div>
            <p className="font-semibold">Duration</p>
            <p className="text-sm text-gray-600">{selectedTour.duration} Days</p>
          </div>
        </div>
        <div className="rounded-xl shadow p-4 flex items-center gap-3 bg-white">
          <Users className="text-purple-600" />
          <div>
            <p className="font-semibold">Meeting Point</p>
            <p className="text-sm text-gray-600">
              {selectedTour.meetingPoint}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl shadow bg-white p-6">
        <h2 className="text-xl font-semibold mb-2">About the Tour</h2>
        <p className="text-gray-700">{selectedTour.description}</p>
      </div>

      {/* Itinerary & Highlights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl shadow bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {selectedTour.itinerary.map((day: string, i: number) => (
              <li key={i}>{day}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl shadow bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {selectedTour.highlights.map((h: string, i: number) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="rounded-xl shadow bg-white p-6">
        <h2 className="text-xl font-semibold mb-2">Availability</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {selectedTour.availability.map(
            (slot: { date: string; slots: number }, i: number) => (
              <div
                key={i}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <p>{new Date(slot.date).toDateString()}</p>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                  {slot.slots} Slots
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Included / Excluded */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl shadow bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">Included</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {selectedTour.included.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl shadow bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">Excluded</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {selectedTour.excluded.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price + Actions */}
      <div className="rounded-xl shadow bg-white p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold">Price</h2>
        <p className="text-2xl font-bold text-green-600">
          ₹{selectedTour.price}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.push(`/guide/updateTour/${selectedTour._id}`);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Edit Tour
          </button>

          <button
            onClick={handleToggleActivity}
            className={`px-6 py-2 rounded-xl transition ${
              selectedTour.isActive
                ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {selectedTour.isActive ? "Deactivate" : "Activate"}
          </button>

          {/* 🚨 Delete with Confirmation */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition">
                  Delete Tour
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the tour
                    and notify all travellers with active bookings.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleDeleteTour}
                  >
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          {/* <button
            onClick={handleDeleteTour}
            className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition"
          >
            Delete Tour
          </button> */}
        </div>
      </div>
    </div>
  );
}

