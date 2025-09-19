
'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectReviews, selectReviewLoading, getTopReview } from '@/redux/slices/reviewSlice';
import { AppDispatch } from '@/redux/store';

const TestimonialSlider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector(selectReviews);
  const loading = useSelector(selectReviewLoading);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  // No need to filter since getTopReview already returns 4+ star reviews
  const highRatedReviews = reviews;

  // Debug logging
  useEffect(() => {
  console.log('TestimonialSlider - Redux state reviews:', reviews);
  console.log('TestimonialSlider - Reviews length:', reviews?.length);
  console.log('TestimonialSlider - Loading state:', loading);
  console.log('TestimonialSlider - Reviews type:', typeof reviews);
  console.log('TestimonialSlider - Is array:', Array.isArray(reviews));
  
  if (reviews && reviews.length > 0) {
    console.log('TestimonialSlider - First review:', reviews[0]);
  }
}, [reviews, loading])

  useEffect(() => {
    // Fetch top reviews directly from backend
    dispatch(getTopReview());
  }, [dispatch]);

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= reviews.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - slidesToShow : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Helper function to get user display name safely
  const getUserDisplayName = (user: string | { name?: string } | undefined) => {
    if (typeof user === 'object' && user?.name) {
      return user.name;
    }
    return 'Anonymous User';
  };

  // Helper function to get user initial safely
  const getUserInitial = (user: string | { name?: string } | undefined) => {
    if (typeof user === 'object' && user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Helper function to get tour title safely
  const getTourTitle = (tour: string | { title?: string } | undefined) => {
    if (typeof tour === 'object' && tour?.title) {
      return tour.title;
    }
    return 'Tour Package';
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No High-Rated Reviews Yet</h3>
              <p className="text-yellow-700 text-sm">
                Total reviews loaded: {reviews.length}<br/>
                High-rated reviews (4-5★): {reviews.length}<br/>
                Waiting for more 4+ star reviews to display.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='review' className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read testimonials from our satisfied travelers who gave us 4+ star ratings
          </p>
          
        </div>

        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
            >
              {reviews.map((review, index) => (
                <div 
                  key={review._id} 
                  className={`w-full flex-shrink-0 px-2`}
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                    {/* Tour Info */}
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {getTourTitle(review.tour)}
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {review.rating}/5
                      </span>
                    </div>

                    {/* Review Comment */}
                    <blockquote className="text-gray-700 mb-4 italic">
                      "{review.comment}"
                    </blockquote>

                    {/* User Info */}
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold">
                          {getUserInitial(review.user)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {getUserDisplayName(review.user)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>
                    </div>



                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {reviews.length > slidesToShow && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous testimonials"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next testimonials"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {reviews.length > slidesToShow && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: reviews.length - slidesToShow + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;