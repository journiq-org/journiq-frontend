'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import TravellerNavbar from '@/components/TravellerNavbar';
import { getTourByDestination } from '@/redux/slices/destinationSlice';
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
  const { loading, error, toursByDestination } = useSelector(
    (state: RootState) => state.destination
  );
  const { reviews } = useSelector((state: RootState) => state.reviews);

  const [reviewMap, setReviewMap] = useState<Record<string, number>>({});
  const [role, setRole] = useState<string | null>(null);

  //  Check cookies for auth role
  useEffect(() => {
    const fetchCookie = async () => {
      try {
        const res = await fetch('/api/auth/get-cookie');
        const data = await res.json();
        if (data?.token && data?.role) {
          setRole(data.role); // "traveller" or "admin" etc
        } else {
          setRole(null);
        }
      } catch (err) {
        setRole(null);
      }
    };
    fetchCookie();
  }, []);

  //  Fetch tours by destination
  useEffect(() => {
    if (id) {
      dispatch(getTourByDestination(id));
    }
  }, [dispatch, id]);

  //  Fetch reviews for each tour
  useEffect(() => {
    if (toursByDestination?.length > 0) {
      toursByDestination.forEach((tour: any) => {
        dispatch(getReviewsForTour(tour._id));
      });
    }
  }, [dispatch, toursByDestination]);

  //  Map reviews → calculate avg ratings
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
      newMap[tour._id] = 0; // no reviews yet
    }
  });

  setReviewMap(newMap);
}, [toursByDestination, reviews]);

  //  Sort tours
  const sortedTours = [...toursByDestination].sort((a: any, b: any) => {
    const aDemand = a.bookingsCount || 0;
    const bDemand = b.bookingsCount || 0;

    if (aDemand !== bDemand) return bDemand - aDemand;
    if (a.rating !== b.rating) return b.rating - a.rating;
    return (reviewMap[b._id] || 0) - (reviewMap[a._id] || 0);
  });

  if (loading) return <p className="text-gray-500">Loading tours...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {/*  Navbar/Header depending on cookie */}
      {role === 'traveller' ? <TravellerNavbar /> : <Header />}

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
              {tour.duration} days • ⭐ {reviewMap[tour._id] || tour.rating || 0}
               {/* ( */}
              {/* {tour.bookingsCount || 0} booked) */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicViewToursByDestination;
