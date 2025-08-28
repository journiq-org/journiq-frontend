// 'use client';

// import Header from '@/components/Header';
// import { getTourByDestination } from '@/redux/slices/destinationSlice';
// import { fetchReviewsForTour } from '@/redux/slices/reviewSlice';
// import { AppDispatch, RootState } from '@/redux/store';
// import { useParams, useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// const PublicViewToursByDestination = () => {
//   const router = useRouter();
//   const params = useParams();

//   const rawId = params?.destinationId;
//   const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error, toursByDestination } = useSelector(
//     (state: RootState) => state.destination
//   );
//   const { reviews } = useSelector((state: RootState) => state.reviews);

//   const [reviewMap, setReviewMap] = useState<Record<string, number>>({});

//   // ✅ Fetch tours by destination
//   useEffect(() => {
//     if (id) {
//       dispatch(getTourByDestination(id));
//     }
//   }, [dispatch, id]);

//   // ✅ Fetch reviews for each tour once tours are loaded
//   useEffect(() => {
//     if (toursByDestination?.length > 0) {
//       toursByDestination.forEach((tour: any) => {
//         dispatch(fetchReviewsForTour(tour._id));
//       });
//     }
//   }, [dispatch, toursByDestination]);

//   // ✅ Map reviews to calculate avg ratings
//   useEffect(() => {
//     const newMap: Record<string, number> = {};
//     toursByDestination.forEach((tour: any) => {
//       const tourReviews = reviews.filter(
//         (r) => typeof r.tour === 'string' ? r.tour === tour._id : r.tour._id === tour._id
//       );

//       if (tourReviews.length > 0) {
//         const avg =
//           tourReviews.reduce((sum, r) => {
//             const exp = r.experience;
//             return (
//               sum +
//               (exp.serviceQuality + exp.punctuality + exp.satisfactionSurvey) / 3
//             );
//           }, 0) / tourReviews.length;

//         newMap[tour._id] = parseFloat(avg.toFixed(1));
//       } else {
//         newMap[tour._id] = 0; // no reviews yet
//       }
//     });
//     setReviewMap(newMap);
//   }, [toursByDestination, reviews]);

//   // ✅ Sort tours (High demanded on top: bookingsCount -> rating -> review avg)
//   const sortedTours = [...toursByDestination].sort((a: any, b: any) => {
//     const aDemand = a.bookingsCount || 0;
//     const bDemand = b.bookingsCount || 0;

//     if (aDemand !== bDemand) return bDemand - aDemand; // sort by demand
//     if (a.rating !== b.rating) return b.rating - a.rating; // then by rating
//     return (reviewMap[b._id] || 0) - (reviewMap[a._id] || 0); // then by avg review
//   });

//   if (loading) return <p className="text-gray-500">Loading tours...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div>
//       <Header />
//       <h1 className="text-2xl pt-8 font-bold mb-3 text-center">Tours</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
//         {sortedTours.map((tour: any) => (
//           <div
//             key={tour._id}
//             className="bg-white shadow-lg rounded-2xl p-4 cursor-pointer hover:shadow-xl transition"
//             onClick={() => router.push(`/tours/details/${tour._id}`)}
//           >
//             <img
//               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
//               alt={tour.title}
//               className="w-full h-40 object-cover rounded-xl mb-3"
//             />
//             <h2 className="text-lg font-bold text-black">{tour.title}</h2>
//             <p className="text-gray-600 text-sm line-clamp-2">{tour.description}</p>
//             <p className="mt-2 font-semibold text-black">₹{tour.price}</p>
//             <p className="text-sm text-gray-500">
//               {tour.duration} days • ⭐ {reviewMap[tour._id] || tour.rating || 0} (
//               {tour.bookingsCount || 0} booked)
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PublicViewToursByDestination;



// 'use client'

// import Header from '@/components/Header'
// import { getTourByDestination } from '@/redux/slices/destinationSlice'
// import { AppDispatch } from '@/redux/store'
// import { useParams, useRouter } from 'next/navigation'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// const PublicViewToursByDestination = () => {
// console.log("🚀 ToursByDestination mounted");

//     const router = useRouter()

//     const params = useParams()
//     console.log("Params from useParams:", params);
    
//     const rawId = params?.destinationId // the destination id name is not from backend.. it is the name of folder that we have given in frontend
//     const id = Array.isArray(rawId) ? rawId[0] : rawId ?? ''

//     const dispatch = useDispatch<AppDispatch>()
//     const {loading, error, toursByDestination} = useSelector((state: any) => state.destination)

//     useEffect(() => {
//           console.log("useEffect triggered with id:", id);
//         if(id){
//             dispatch(getTourByDestination(id))
//         }
//     },[dispatch, id])

//     if(loading) return <p className="text-gray-500">Loading tours...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div>
//       <Header/>
//         <h1 className='text-2xl pt-8 text-bold mb-3 text-center'>Tours</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4" >
//       {toursByDestination.map((tour: any) => (
//         <div key={tour._id} className="bg-white shadow-lg rounded-2xl p-4" onClick={() => router.push(/tours/details/${tour._id})}>
//           <img
//             src={${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]} }
//             alt={tour.title}
//             className="text-black w-full h-40 object-cover rounded-xl mb-3"
//           />
//           <h2 className="text-lg font-bold text-black">{tour.title}</h2>
//           <p className="text-gray-600 text-sm line-clamp-2">{tour.description}</p>
//           <p className="mt-2 font-semibold text-black">₹{tour.price}</p>
//           <p className="text-sm text-gray-500">
//             {tour.duration} days • ⭐ {tour.rating}
//           </p>
//         </div>
//       ))}
//     </div>
//     </div>
//   )
// }

// export default PublicViewToursByDestination




'use client';

import Header from '@/components/Header';
import { getTourByDestination } from '@/redux/slices/destinationSlice';
import { fetchReviewsForTour } from '@/redux/slices/reviewSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PublicViewToursByDestination = () => {
  const router = useRouter();
  const params = useParams();

  // ✅ Extract destinationId from params (works with folder name in frontend)
  const rawId = params?.destinationId;
  const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, toursByDestination } = useSelector(
    (state: RootState) => state.destination
  );
  const { reviews } = useSelector((state: RootState) => state.reviews);

  const [reviewMap, setReviewMap] = useState<Record<string, number>>({});

  // ✅ Fetch tours by destination
  useEffect(() => {
    if (id) {
      dispatch(getTourByDestination(id));
    }
  }, [dispatch, id]);

  // ✅ Fetch reviews for each tour once tours are loaded
  useEffect(() => {
    if (toursByDestination?.length > 0) {
      toursByDestination.forEach((tour: any) => {
        dispatch(fetchReviewsForTour(tour._id));
      });
    }
  }, [dispatch, toursByDestination]);

  // ✅ Map reviews → calculate avg ratings
  useEffect(() => {
    const newMap: Record<string, number> = {};
    toursByDestination.forEach((tour: any) => {
      const tourReviews = reviews.filter((r) =>
        typeof r.tour === 'string' ? r.tour === tour._id : r.tour._id === tour._id
      );

      if (tourReviews.length > 0) {
        const avg =
          tourReviews.reduce((sum, r) => {
            const exp = r.experience;
            return (
              sum +
              (exp.serviceQuality + exp.punctuality + exp.satisfactionSurvey) / 3
            );
          }, 0) / tourReviews.length;

        newMap[tour._id] = parseFloat(avg.toFixed(1));
      } else {
        newMap[tour._id] = 0; // no reviews yet
      }
    });
    setReviewMap(newMap);
  }, [toursByDestination, reviews]);

  // ✅ Sort tours → High demand first (bookingsCount → rating → avg review)
  const sortedTours = [...toursByDestination].sort((a: any, b: any) => {
    const aDemand = a.bookingsCount || 0;
    const bDemand = b.bookingsCount || 0;

    if (aDemand !== bDemand) return bDemand - aDemand; // sort by demand
    if (a.rating !== b.rating) return b.rating - a.rating; // then by base rating
    return (reviewMap[b._id] || 0) - (reviewMap[a._id] || 0); // then by avg review
  });

  if (loading) return <p className="text-gray-500">Loading tours...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <Header />
      <h1 className="text-2xl pt-8 font-bold mb-3 text-center">Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {sortedTours.map((tour: any) => (
          <div
            key={tour._id}
            className="bg-white shadow-lg rounded-2xl p-4 cursor-pointer hover:shadow-xl transition"
            onClick={() => router.push(`/tours/details/${tour._id}`)}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images[0]}`}
              alt={tour.title}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h2 className="text-lg font-bold text-black">{tour.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">{tour.description}</p>
            <p className="mt-2 font-semibold text-black">₹{tour.price}</p>
            <p className="text-sm text-gray-500">
              {tour.duration} days • ⭐ {reviewMap[tour._id] || tour.rating || 0} (
              {tour.bookingsCount || 0} booked)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicViewToursByDestination;
