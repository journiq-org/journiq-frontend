// 'use client';

// import { useEffect, useState } from 'react';
// import Header from '@/components/Header';
// import TravellerNavbar from '@/components/TravellerNavbar';
// import { getTourByDestination } from '@/redux/slices/destinationSlice';
// import { getReviewsForTour } from '@/redux/slices/reviewSlice';
// import { AppDispatch, RootState } from '@/redux/store';
// import { useParams, useRouter } from 'next/navigation';
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
//   const [role, setRole] = useState<string | null>(null);

//   //  Check cookies for auth role
//   useEffect(() => {
//     const fetchCookie = async () => {
//       try {
//         const res = await fetch('/api/auth/get-cookie');
//         const data = await res.json();
//         if (data?.token && data?.role) {
//           setRole(data.role); // "traveller" or "admin" etc
//         } else {
//           setRole(null);
//         }
//       } catch (err) {
//         setRole(null);
//       }
//     };
//     fetchCookie();
//   }, []);

//   //  Fetch tours by destination
//   useEffect(() => {
//     if (id) {
//       dispatch(getTourByDestination(id));
//     }
//   }, [dispatch, id]);

//   //  Fetch reviews for each tour
//   useEffect(() => {
//     if (toursByDestination?.length > 0) {
//       toursByDestination.forEach((tour: any) => {
//         dispatch(getReviewsForTour(tour._id));
//       });
//     }
//   }, [dispatch, toursByDestination]);

//   //  Map reviews → calculate avg ratings
// useEffect(() => {
//   const newMap: Record<string, number> = {};

//   toursByDestination.forEach((tour: any) => {
//     const tourReviews = reviews.filter((r) =>
//       typeof r.tour === 'string' ? r.tour === tour._id : r.tour._id === tour._id
//     );

//     if (tourReviews.length > 0) {
//       const avg =
//         tourReviews.reduce((sum, r) => sum + r.rating, 0) / tourReviews.length;

//       newMap[tour._id] = parseFloat(avg.toFixed(1));
//     } else {
//       newMap[tour._id] = 0; // no reviews yet
//     }
//   });

//   setReviewMap(newMap);
// }, [toursByDestination, reviews]);

//   //  Sort tours
//   const sortedTours = [...toursByDestination].sort((a: any, b: any) => {
//     const aDemand = a.bookingsCount || 0;
//     const bDemand = b.bookingsCount || 0;

//     if (aDemand !== bDemand) return bDemand - aDemand;
//     if (a.rating !== b.rating) return b.rating - a.rating;
//     return (reviewMap[b._id] || 0) - (reviewMap[a._id] || 0);
//   });

//   if (loading) return <p className="text-gray-500">Loading tours...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div>
//       {/*  Navbar/Header depending on cookie */}
//       {role === 'traveller' ? <TravellerNavbar /> : <Header />}

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
//               {tour.duration} days • ⭐ {reviewMap[tour._id] || tour.rating || 0}
//                {/* ( */}
//               {/* {tour.bookingsCount || 0} booked) */}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PublicViewToursByDestination;


// 'use client';

// import { useEffect, useState } from 'react';
// import Header from '@/components/Header';
// import TravellerNavbar from '@/components/TravellerNavbar';
// import { getTourByDestination, getSingleDestination } from '@/redux/slices/destinationSlice';
// import { getReviewsForTour } from '@/redux/slices/reviewSlice';
// import { AppDispatch, RootState } from '@/redux/store';
// import { useParams, useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';

// const PublicViewToursByDestination = () => {
//   const router = useRouter();
//   const params = useParams();
//   const rawId = params?.destinationId;
//   const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error, toursByDestination, selectedDestination } = useSelector(
//     (state: RootState) => state.destination
//   );
//   const { reviews } = useSelector((state: RootState) => state.reviews);

//   const [reviewMap, setReviewMap] = useState<Record<string, number>>({});
//   const [role, setRole] = useState<string | null>(null);
//   const [destinationError, setDestinationError] = useState<string | null>(null);

//   // Check cookies for auth role
//   useEffect(() => {
//     const fetchCookie = async () => {
//       try {
//         const res = await fetch('/api/auth/get-cookie');
//         const data = await res.json();
//         if (data?.token && data?.role) {
//           setRole(data.role);
//         } else {
//           setRole(null);
//         }
//       } catch (err) {
//         setRole(null);
//       }
//     };
//     fetchCookie();
//   }, []);

//   // Fetch destination details and tours
//   useEffect(() => {
//     if (id) {
//       // Fetch destination with error handling
//       dispatch(getSingleDestination(id)).catch((error) => {
//         console.error('Failed to fetch destination:', error);
//         setDestinationError('Failed to load destination details');
//       });
      
//       // Always fetch tours (this should work)
//       dispatch(getTourByDestination(id));
//     }
//   }, [dispatch, id]);

//   // Fetch reviews for each tour
//   useEffect(() => {
//     if (toursByDestination?.length > 0) {
//       toursByDestination.forEach((tour: any) => {
//         dispatch(getReviewsForTour(tour._id));
//       });
//     }
//   }, [dispatch, toursByDestination]);

//   // Map reviews → calculate avg ratings
//   useEffect(() => {
//     const newMap: Record<string, number> = {};

//     toursByDestination.forEach((tour: any) => {
//       const tourReviews = reviews.filter((r) =>
//         typeof r.tour === 'string' ? r.tour === tour._id : r.tour._id === tour._id
//       );

//       if (tourReviews.length > 0) {
//         const avg =
//           tourReviews.reduce((sum, r) => sum + r.rating, 0) / tourReviews.length;
//         newMap[tour._id] = parseFloat(avg.toFixed(1));
//       } else {
//         newMap[tour._id] = 0;
//       }
//     });

//     setReviewMap(newMap);
//   }, [toursByDestination, reviews]);

//   // Sort tours by popularity and rating
//   const sortedTours = [...toursByDestination].sort((a: any, b: any) => {
//     const aDemand = a.bookingsCount || 0;
//     const bDemand = b.bookingsCount || 0;

//     if (aDemand !== bDemand) return bDemand - aDemand;
//     if (a.rating !== b.rating) return b.rating - a.rating;
//     return (reviewMap[b._id] || 0) - (reviewMap[a._id] || 0);
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading destination...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show tours even if destination fetch failed
//   if (error && !toursByDestination?.length) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">⚠️</div>
//           <p className="text-red-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar/Header depending on cookie */}
//       {role === 'traveller' ? <TravellerNavbar /> : <Header />}

//       {/* Destination Hero Section - only show if destination loaded successfully */}
//       {selectedDestination && !destinationError && (
//         <div className="relative h-[60vh] overflow-hidden">
//           <div className="relative w-full h-full">
//             {selectedDestination.images && selectedDestination.images.length > 0 ? (
//               <div className="relative w-full h-full">
//                 <img
//                   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedDestination.images[0]}`}
//                   alt={selectedDestination.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
//               </div>
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <div className="text-6xl mb-4">🏔️</div>
//                   <h1 className="text-4xl font-bold mb-2">{selectedDestination.name}</h1>
//                   <p className="text-xl opacity-90">Explore this amazing destination</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//             <div className="max-w-7xl mx-auto">
//               <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//                 <div className="flex-1">
//                   <h1 className="text-4xl md:text-5xl font-bold mb-3">
//                     {selectedDestination.name}
//                   </h1>
//                   <p className="text-lg md:text-xl opacity-90 mb-2 max-w-2xl">
//                     {selectedDestination.description}
//                   </p>
//                   {selectedDestination.country && (
//                     <div className="flex items-center gap-2 text-sm opacity-75">
//                       <span>📍</span>
//                       <span>
//                         {selectedDestination.city && `${selectedDestination.city}, `}
//                         {selectedDestination.country}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-6 text-sm">
//                   {selectedDestination.bestSeason && (
//                     <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
//                       <div className="font-semibold">Best Season</div>
//                       <div className="opacity-90">{selectedDestination.bestSeason}</div>
//                     </div>
//                   )}
//                   {selectedDestination.popularAttractions?.length > 0 && (
//                     <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
//                       <div className="font-semibold">Attractions</div>
//                       <div className="opacity-90">{selectedDestination.popularAttractions.length} spots</div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Show destination name even if fetch failed */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             {selectedDestination?.name ? `Tours in ${selectedDestination.name}` : 'Available Tours'}
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover incredible experiences and adventures
//           </p>
//           <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
//         </div>

//         {sortedTours.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {sortedTours.map((tour: any, index: number) => (
//               <div
//                 key={tour._id}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2"
//                 onClick={() => router.push(`/tours/details/${tour._id}`)}
//               >
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images?.[0] || 'default-tour.jpg'}`}
//                     alt={tour.title}
//                     className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement;
//                       target.src = '/images/default-tour.jpg';
//                     }}
//                   />

//                   <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
//                     <div className="flex items-center gap-1">
//                       <span className="text-yellow-500">⭐</span>
//                       <span className="text-sm font-semibold text-gray-800">
//                         {reviewMap[tour._id] || tour.rating || 0}
//                       </span>
//                     </div>
//                   </div>

//                   {tour.bookingsCount > 0 && (
//                     <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold shadow-lg">
//                       🔥 Popular
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 mr-4">
//                       {tour.title}
//                     </h3>
//                     <div className="text-right flex-shrink-0">
//                       <div className="text-2xl font-bold text-green-600">₹{tour.price}</div>
//                       <div className="text-sm text-gray-500">per person</div>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
//                     {tour.description}
//                   </p>

//                   <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                     <div className="flex items-center gap-4">
//                       <div className="flex items-center gap-1">
//                         <span>📅</span>
//                         <span>{tour.duration} days</span>
//                       </div>
//                       {tour.bookingsCount > 0 && (
//                         <div className="flex items-center gap-1">
//                           <span>👥</span>
//                           <span>{tour.bookingsCount} booked</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       {tour.tags?.slice(0, 2).map((tag: string, tagIndex: number) => (
//                         <span
//                           key={tagIndex}
//                           className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 group-hover:bg-blue-700">
//                       View Details →
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🏖️</div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No tours available yet</h3>
//             <p className="text-gray-600 max-w-md mx-auto">
//               We're working on bringing you amazing tours for this destination. Check back soon!
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Popular Attractions Section - only show if destination loaded */}
//       {selectedDestination && !destinationError && selectedDestination.popularAttractions?.length > 0 && (
//         <div className="bg-white py-12">
//           <div className="max-w-7xl mx-auto px-4">
//             <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
//               Popular Attractions in {selectedDestination.name}
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {selectedDestination.popularAttractions.map((attraction: string, index: number) => (
//                 <div
//                   key={index}
//                   className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
//                 >
//                   <div className="text-2xl mb-2">🏛️</div>
//                   <p className="text-sm font-medium text-gray-800">{attraction}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PublicViewToursByDestination;



'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import TravellerNavbar from '@/components/TravellerNavbar';
import { getTourByDestination, getSingleDestination } from '@/redux/slices/destinationSlice';
import { getReviewsForTour } from '@/redux/slices/reviewSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const PublicViewToursByDestination = () => {
  const router = useRouter();
  const params = useParams();
  const rawId = params?.destinationId;
  const id = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, toursByDestination, selectedDestination } = useSelector(
    (state: RootState) => state.destination
  );
  const { reviews } = useSelector((state: RootState) => state.reviews);

  const [reviewMap, setReviewMap] = useState<Record<string, number>>({});
  const [role, setRole] = useState<string | null>(null);
  const [destinationError, setDestinationError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Check cookies for auth role
  useEffect(() => {
    const fetchCookie = async () => {
      try {
        const res = await fetch('/api/auth/get-cookie', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (data?.token && data?.role) {
          setRole(data.role);
        } else {
          setRole(null);
        }
      } catch (err) {
        setRole(null);
      }
    };
    fetchCookie();
  }, []);

  // Fetch destination details and tours
  useEffect(() => {
    if (id) {
      // Fetch destination with error handling
      dispatch(getSingleDestination(id)).catch((error) => {
        console.error('Failed to fetch destination:', error);
        setDestinationError('Failed to load destination details');
      });
      
      // Always fetch tours (this should work)
      dispatch(getTourByDestination(id));
    }
  }, [dispatch, id]);

  // Fetch reviews for each tour
  useEffect(() => {
    if (toursByDestination?.length > 0) {
      toursByDestination.forEach((tour: any) => {
        dispatch(getReviewsForTour(tour._id));
      });
    }
  }, [dispatch, toursByDestination]);

  // Map reviews → calculate avg ratings
  useEffect(() => {
    const newMap: Record<string, number> = {};

    toursByDestination.forEach((tour: any) => {
      const tourReviews = reviews.filter((r) =>
        typeof r.tour === 'string' ? r.tour === tour._id : r.tour._id === tour._id
      );

      if (tourReviews.length > 0) {
        const avg =
          tourReviews.reduce((sum, r) => sum + r.rating, 0) / tourReviews.length;
        newMap[tour._id] = parseFloat(avg.toFixed(1));
      } else {
        newMap[tour._id] = 0;
      }
    });

    setReviewMap(newMap);
  }, [toursByDestination, reviews]);

  // Auto-advance carousel
  useEffect(() => {
    if (selectedDestination?.images && selectedDestination.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % selectedDestination.images.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [selectedDestination?.images]);

  // Carousel navigation functions
  const nextImage = () => {
    if (selectedDestination?.images) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedDestination.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedDestination?.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedDestination.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Sort tours by popularity and rating
  const sortedTours = [...toursByDestination].sort((a: any, b: any) => {
    const aDemand = a.bookingsCount || 0;
    const bDemand = b.bookingsCount || 0;

    if (aDemand !== bDemand) return bDemand - aDemand;
    if (a.rating !== b.rating) return b.rating - a.rating;
    return (reviewMap[b._id] || 0) - (reviewMap[a._id] || 0);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading destination...</p>
        </div>
      </div>
    );
  }

  // Show tours even if destination fetch failed
  if (error && !toursByDestination?.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Navbar/Header depending on cookie */}
      {role === 'traveller' ? <TravellerNavbar /> : <Header />}

      {/* Destination Hero Carousel */}
      {selectedDestination && !destinationError && (
        <div className="relative h-[70vh] overflow-hidden bg-gray-900">
          <div className="relative w-full h-full">
            {selectedDestination.images && selectedDestination.images.length > 0 ? (
              <>
                {/* Main Carousel Image */}
                <div className="relative w-full h-full">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${selectedDestination.images[currentImageIndex]}`}
                    alt={`${selectedDestination.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (selectedDestination.images.length > 1) {
                        setCurrentImageIndex((prev) => 
                          (prev + 1) % selectedDestination.images.length
                        );
                      }
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Navigation Arrows */}
                {selectedDestination.images.length > 1 && (
                  <>
                    {/* <button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button> */}
                  </>
                )}

                {/* Image Dots Indicator */}
                {selectedDestination.images.length > 1 && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                    {selectedDestination.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white shadow-lg scale-125' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Fallback when no images
              <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl mb-6">🏔️</div>
                  <h1 className="text-5xl font-bold mb-4">{selectedDestination.name}</h1>
                  <p className="text-2xl opacity-90">Discover Amazing Adventures</p>
                </div>
              </div>
            )}
          </div>

          {/* Destination Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                      🌍 Destination
                    </span>
                    {selectedDestination.country && (
                      <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                        📍 {selectedDestination.city && `${selectedDestination.city}, `}{selectedDestination.country}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg">
                    {selectedDestination.name}
                  </h1>
                  
                  <p className="text-xl lg:text-2xl opacity-90 mb-6 max-w-3xl leading-relaxed">
                    {selectedDestination.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-lg">
                    {selectedDestination.bestSeason && (
                      <div className="flex items-center gap-2">
                        <span>🌤️</span>
                        <span>Best Season: {selectedDestination.bestSeason}</span>
                      </div>
                    )}
                    {selectedDestination.popularAttractions?.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span>🏛️</span>
                        <span>{selectedDestination.popularAttractions.length} Attractions</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span>🎯</span>
                      <span>{sortedTours.length} Available Tours</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-bold mb-1">{sortedTours.length}</div>
                    <div className="text-white/80">Available Tours</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-bold mb-1">
                      {sortedTours.length > 0 ? Math.max(...sortedTours.map(t => t.duration || 0)) : 0}
                    </div>
                    <div className="text-white/80">Max Duration</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-bold mb-1">
                      {sortedTours.length > 0 ? Math.min(...sortedTours.map(t => t.price || Infinity)) : 0}
                    </div>
                    <div className="text-white/80">Starting From</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tours Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {selectedDestination?.name ? `Explore Tours in ${selectedDestination.name}` : 'Available Tours'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover incredible experiences and create unforgettable memories with our curated selection of adventures
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {sortedTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTours.map((tour: any, index: number) => (
              <div
                key={tour._id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-3 border border-gray-100"
                onClick={() => router.push(`/tours/details/${tour._id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images?.[0] || 'default-tour.jpg'}`}
                    alt={tour.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/default-tour.jpg';
                    }}
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                    <div className="text-lg font-bold text-green-600">₹{tour.price}</div>
                    <div className="text-xs text-gray-600">per person</div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black rounded-2xl px-3 py-1 text-sm font-semibold shadow-lg">
                    ⭐ {reviewMap[tour._id] || tour.rating || 0}
                  </div>

                  {/* Popular Badge */}
                  {tour.bookingsCount > 0 && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white rounded-full px-3 py-1 text-xs font-semibold shadow-lg animate-pulse">
                      🔥 Popular
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 mr-4">
                      {tour.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {tour.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>{tour.duration} days</span>
                      </div>
                      {tour.bookingsCount > 0 && (
                        <div className="flex items-center gap-1">
                          <span>👥</span>
                          <span>{tour.bookingsCount} booked</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {tour.tags?.slice(0, 2).map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="bg-gray-900 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🏖️</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No tours available yet</h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg">
              We're working on bringing you amazing tours for this destination. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Popular Attractions Section */}
{selectedDestination && !destinationError && selectedDestination.popularAttractions?.length > 0 && (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-16">
    <div className="max-w-7xl w-full px-4">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Popular Attractions in {selectedDestination.name}
        </h3>
        <p className="text-lg text-gray-600">
          Explore the must-visit places that make this destination special
        </p>
      </div>
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6">
        {selectedDestination.popularAttractions.map((attraction: string, index: number) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">
                {['🏛️', '🏰', '⛰️', '🏞️', '🌉', '🏛️'][index % 6]}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{attraction}</h4>
              <p className="text-sm text-gray-600">Popular attraction</p>
            </div>
          </div>
        ))}
      </div>
    </div>
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
              Explore All Tours
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
};

export default PublicViewToursByDestination;