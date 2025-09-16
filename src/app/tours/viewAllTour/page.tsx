// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/Header';
// import TravellerNavbar from '@/components/TravellerNavbar';
// import {
//   Search,
//   MapPin,
//   Calendar,
//   Star,
//   Clock,
//   Users,
//   IndianRupee,
//   SlidersHorizontal,
//   X,
//   Loader2,
// } from 'lucide-react';

// interface Tour {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   duration: number;
//   category: string;
//   rating: number;
//   images: string[];
//   destination: {
//     _id: string;
//     name: string;
//   };
//   guide: {
//     _id: string;
//     name: string;
//   };
//   availability: Array<{
//     date: string;
//     slots: number;
//   }>;
//   tags?: string[];
// }

// interface Destination {
//   _id: string;
//   name: string;
// }

// const ToursPage = () => {
//   const router = useRouter();

//   const [tours, setTours] = useState<Tour[]>([]);
//   const [destinations, setDestinations] = useState<Destination[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [destinationsLoading, setDestinationsLoading] = useState(false);
//   const [role, setRole] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     destination: '',
//     category: '',
//     priceMin: '',
//     priceMax: '',
//     durationMin: '',
//     durationMax: '',
//     date: '',
//     ratingMin: '',
//     popular: false,
//   });

//   // Categories for filter dropdown
//   const categories = [
//     'Adventure',
//     'Cultural',
//     'Nature',
//     'Beach',
//     'Mountain',
//     'City',
//     'Wildlife',
//     'Historical',
//     'Food & Wine',
//     'Luxury',
//   ];

//   // Check user role
//   useEffect(() => {
//     const fetchCookie = async () => {
//       try {
//         const res = await fetch('/api/auth/get-cookie', {
//           method: 'GET',
//           credentials: 'include',
//         });
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

//   // Fetch destinations
//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         setDestinationsLoading(true);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destination/viewAll`, {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.status && data.data) {
//             setDestinations(data.data);
//           }
//         }
//       } catch (error) {
//         console.error('Failed to fetch destinations:', error);
//       } finally {
//         setDestinationsLoading(false);
//       }
//     };

//     fetchDestinations();
//   }, []);

//   // Fetch tours with filters
//   const fetchTours = async (searchFilters = filters, searchText = searchQuery) => {
//     try {
//       setLoading(true);

//       // Build query parameters
//       const params = new URLSearchParams();

//       if (searchText.trim()) params.append('title', searchText.trim());
//       if (searchFilters.destination) params.append('destination', searchFilters.destination);
//       if (searchFilters.category) params.append('category', searchFilters.category);
//       if (searchFilters.priceMin) params.append('priceMin', searchFilters.priceMin);
//       if (searchFilters.priceMax) params.append('priceMax', searchFilters.priceMax);
//       if (searchFilters.durationMin) params.append('durationMin', searchFilters.durationMin);
//       if (searchFilters.durationMax) params.append('durationMax', searchFilters.durationMax);
//       if (searchFilters.date) params.append('date', searchFilters.date);
//       if (searchFilters.ratingMin) params.append('ratingMin', searchFilters.ratingMin);
//       if (searchFilters.popular) params.append('popular', 'true');

//       // Make API call with query parameters
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tour/viewAll?${params.toString()}`, {
//         method: 'GET',
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.status && data.data) {
//           setTours(data.data);
//         }
//       } else {
//         console.error('Failed to fetch tours:', response.status);
//         setTours([]);
//       }
//     } catch (error) {
//       console.error('Error fetching tours:', error);
//       setTours([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchTours();
//   }, []);

//   // Apply filters
//   const applyFilters = () => {
//     fetchTours(filters, searchQuery);
//   };

//   // Handle search with debouncing
//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       if (searchQuery.trim() || Object.values(filters).some(value => value !== '' && value !== false)) {
//         fetchTours(filters, searchQuery);
//       }
//     }, 500); // 500ms debounce

//     return () => clearTimeout(debounceTimer);
//   }, [searchQuery, filters]);

//   // Reset filters
//   const resetFilters = () => {
//     const emptyFilters = {
//       destination: '',
//       category: '',
//       priceMin: '',
//       priceMax: '',
//       durationMin: '',
//       durationMax: '',
//       date: '',
//       ratingMin: '',
//       popular: false,
//     };
//     setFilters(emptyFilters);
//     setSearchQuery('');
//     fetchTours(emptyFilters, '');
//   };

//   // Handle filter changes
//   const handleFilterChange = (key: string, value: string | boolean) => {
//     const newFilters = {
//       ...filters,
//       [key]: value
//     };
//     setFilters(newFilters);
//   };

//   // Calculate if any filters are active
//   const hasActiveFilters = Object.values(filters).some(value =>
//     value !== '' && value !== false
//   ) || searchQuery.trim() !== '';

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <TravellerNavbar />

//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h1 className="text-4xl lg:text-5xl font-bold mb-4">
//             Discover Amazing Tours
//           </h1>
//           <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
//             Find your perfect adventure from our curated collection of tours
//           </p>

//           {/* Search Bar */}
//           <div className="max-w-2xl mx-auto relative">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search tours by name..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 rounded-2xl text-white-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery('')}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Filter Section */}
//         <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
//                   showFilters
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//                 Filters
//                 {hasActiveFilters && (
//                   <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
//                     !
//                   </span>
//                 )}
//               </button>

//               {hasActiveFilters && (
//                 <button
//                   onClick={resetFilters}
//                   className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                   Clear Filters
//                 </button>
//               )}
//             </div>

//             <button
//               onClick={applyFilters}
//               className="bg-[#ff9100] hover:bg-orange-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Apply Filters
//             </button>
//           </div>

//           {/* Filter Options */}
//           {showFilters && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {/* Destination Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Destination
//                 </label>
//                 <select
//                   value={filters.destination}
//                   onChange={(e) => handleFilterChange('destination', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Destinations</option>
//                   {destinations.map((dest: Destination) => (
//                     <option key={dest._id} value={dest._id}>
//                       {dest.name}
//                     </option>
//                   ))}
//                 </select>

//               </div>

//               {/* Category Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category
//                 </label>
//                 <select
//                   value={filters.category}
//                   onChange={(e) => handleFilterChange('category', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">All Categories</option>
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Price Range */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price Range (₹)
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     value={filters.priceMin}
//                     onChange={(e) => handleFilterChange('priceMin', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     value={filters.priceMax}
//                     onChange={(e) => handleFilterChange('priceMax', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               {/* Duration Range */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Duration (Days)
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     value={filters.durationMin}
//                     onChange={(e) => handleFilterChange('durationMin', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     value={filters.durationMax}
//                     onChange={(e) => handleFilterChange('durationMax', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               {/* Date Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Travel Date
//                 </label>
//                 <input
//                   type="date"
//                   value={filters.date}
//                   onChange={(e) => handleFilterChange('date', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Rating Filter */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Minimum Rating
//                 </label>
//                 <select
//                   value={filters.ratingMin}
//                   onChange={(e) => handleFilterChange('ratingMin', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Any Rating</option>
//                   <option value="4.5">4.5+ Stars</option>
//                   <option value="4">4+ Stars</option>
//                   <option value="3.5">3.5+ Stars</option>
//                   <option value="3">3+ Stars</option>
//                 </select>
//               </div>

//               {/* Popular Filter */}
//               <div className="flex items-center md:col-span-2">
//                 <label className="flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={filters.popular}
//                     onChange={(e) => handleFilterChange('popular', e.target.checked)}
//                     className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="text-sm font-medium text-gray-700">Show popular tours only</span>
//                 </label>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results Count */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="text-gray-600">
//             {loading ? (
//               <div className="flex items-center gap-2">
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Searching tours...
//               </div>
//             ) : (
//               `Found ${tours.length} tour${tours.length !== 1 ? 's' : ''}`
//             )}
//           </div>
//         </div>

//         {/* Tours Grid */}
//         {loading ? (
//           <div className="flex justify-center items-center py-16 ">
//             <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//           </div>
//         ) : tours.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
//             {tours.map((tour: Tour) => (
//               <div
//                 key={tour._id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
//                 onClick={() => router.push(`/tours/details/${tour._id}`)}
//               >
//                 {/* Tour Image */}
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images?.[0] || 'placeholder.jpg'}`}
//                     alt={tour.title}
//                     className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement;
//                       target.src = '/placeholder-tour.jpg';
//                     }}
//                   />

//                   {/* Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                   {/* Price Badge */}
//                   <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
//                     <div className="text-lg font-bold text-green-600">₹{tour.price.toLocaleString()}</div>
//                     <div className="text-xs text-gray-600">per person</div>
//                   </div>

//                   {/* Rating Badge */}
//                   <div className="absolute top-4 left-4 bg-yellow-400 text-black rounded-2xl px-3 py-1 text-sm font-semibold shadow-lg">
//                     ⭐ {tour.rating || 0}
//                   </div>
//                 </div>

//                 {/* Tour Info */}
//                 <div className="p-6 flex flex-col flex-1 ">
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 mr-4">
//                       {tour.title}
//                     </h3>
//                   </div>

//                   <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
//                     {tour.description}
//                   </p>

//                   {/* Tour Meta */}
//                   <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                     <div className="flex items-center gap-4">
//                       <div className="flex items-center gap-1">
//                         <MapPin className="w-4 h-4" />
//                         <span>{tour.destination?.name || 'Unknown'}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-4 h-4" />
//                         <span>{tour.duration} days</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Category Badge */}
//                   {tour.category && (
//                     <div className="mb-4">
//                       <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
//                         {tour.category}
//                       </span>
//                     </div>
//                   )}

//                   {/* Tags */}
//                   {tour.tags && tour.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {tour.tags.slice(0, 2).map((tag, index) => (
//                         <span
//                           key={index}
//                           className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium "
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                       {tour.tags.length > 2 && (
//                         <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
//                           +{tour.tags.length - 2}
//                         </span>
//                       )}
//                     </div>
//                   )}

//                   {/* Action Button */}
//                   <button className="w-full bg-gradient-to-r from-gray-600 to-zinc-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
//                     View Details →
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">No tours found</h3>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               Try adjusting your search criteria or filters to find more tours.
//             </p>
//             <button
//               onClick={resetFilters}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h3 className="text-3xl lg:text-4xl font-bold mb-4">
//             Can't Find What You're Looking For?
//           </h3>
//           <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//             Contact us to create a custom tour package tailored to your preferences
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button
//               onClick={() => router.push('/contact')}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               Request Custom Tour
//             </button>

//             <button
//               onClick={() => router.push('/guides')}
//               className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300"
//             >
//               Find a Guide
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ToursPage;


'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TravellerNavbar from '@/components/TravellerNavbar';
import { Search, MapPin, Clock, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

interface Tour {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  rating: number;
  images: string[];
  destination: { _id: string; name: string };
  tags?: string[];
}

interface Destination {
  _id: string;
  name: string;
}

const categories = [
  'Adventure','Cultural','Nature','Beach','Mountain','City','Wildlife','Historical','Food & Wine','Luxury'
];

const ToursPage = () => {
  const router = useRouter();

  const [tours, setTours] = useState<Tour[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [destinationsLoading, setDestinationsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    destination: '',
    category: '',
    priceMin: '',
    priceMax: '',
    durationMin: '',
    durationMax: '',
    date: '',
    ratingMin: '',
    popular: false,
  });

  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      setDestinationsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destination/viewAll`, {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setDestinations(data?.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setDestinationsLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  // Fetch tours
  const fetchTours = useCallback(async (searchFilters = filters, searchText = searchQuery) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchText.trim()) params.append('title', searchText.trim());
      if (searchFilters.destination) params.append('destination', searchFilters.destination);
      if (searchFilters.category) params.append('category', searchFilters.category);
      if (searchFilters.priceMin) params.append('priceMin', searchFilters.priceMin);
      if (searchFilters.priceMax) params.append('priceMax', searchFilters.priceMax);
      if (searchFilters.durationMin) params.append('durationMin', searchFilters.durationMin);
      if (searchFilters.durationMax) params.append('durationMax', searchFilters.durationMax);
      if (searchFilters.date) params.append('date', searchFilters.date);
      if (searchFilters.ratingMin) params.append('ratingMin', searchFilters.ratingMin);
      if (searchFilters.popular) params.append('popular', 'true');

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tour/viewAll?${params.toString()}`, {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setTours(data?.data || []);
      } else {
        setTours([]);
      }
    } catch (err) {
      console.error(err);
      setTours([]);
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery]);

  // Initial load
  useEffect(() => { fetchTours(); }, [fetchTours]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => fetchTours(filters, searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, filters, fetchTours]);

  // Handle filter change
  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Reset filters
  const resetFilters = () => {
    const emptyFilters = { destination:'', category:'', priceMin:'', priceMax:'', durationMin:'', durationMax:'', date:'', ratingMin:'', popular:false };
    setFilters(emptyFilters);
    setSearchQuery('');
    fetchTours(emptyFilters, '');
  };

  const hasActiveFilters = Object.values(filters).some(val => val !== '' && val !== false) || searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-gray-50">
      <TravellerNavbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Discover Amazing Tours</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Find your perfect adventure from our curated collection of tours
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tours by name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-white-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${showFilters ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <SlidersHorizontal className="w-4 h-4" /> Filters
                {hasActiveFilters && <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">!</span>}
              </button>

              {hasActiveFilters && (
                <button onClick={resetFilters} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <X className="w-4 h-4" /> Clear Filters
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Destination Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <SelectPrimitive.Root value={filters.destination} onValueChange={(val) => handleFilterChange('destination', val)}>
                  <SelectPrimitive.Trigger className="w-full px-3 py-2 border border-gray-300 rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectPrimitive.Value placeholder="Select a destination..." />
                    <SelectPrimitive.Icon><ChevronDown className="w-4 h-4" /></SelectPrimitive.Icon>
                  </SelectPrimitive.Trigger>
                  <SelectPrimitive.Content className="bg-white rounded-lg shadow-lg mt-1 z-50">
                    <SelectPrimitive.Viewport>
                      {destinationsLoading ? (
                        <div className="px-4 py-2 text-gray-500 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Loading...</div>
                      ) : (
                        destinations.map(dest => (
                          <SelectPrimitive.Item key={dest._id} value={dest._id} className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center">
                            <SelectPrimitive.ItemText>{dest.name}</SelectPrimitive.ItemText>
                            <SelectPrimitive.ItemIndicator><Check className="w-4 h-4" /></SelectPrimitive.ItemIndicator>
                          </SelectPrimitive.Item>
                        ))
                      )}
                    </SelectPrimitive.Viewport>
                  </SelectPrimitive.Content>
                </SelectPrimitive.Root>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select value={filters.category} onChange={e => handleFilterChange('category', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Price Min/Max */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={filters.priceMin} onChange={e => handleFilterChange('priceMin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="number" placeholder="Max" value={filters.priceMax} onChange={e => handleFilterChange('priceMax', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Duration Min/Max */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={filters.durationMin} onChange={e => handleFilterChange('durationMin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="number" placeholder="Max" value={filters.durationMax} onChange={e => handleFilterChange('durationMax', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                <input type="date" value={filters.date} onChange={e => handleFilterChange('date', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select value={filters.ratingMin} onChange={e => handleFilterChange('ratingMin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>

              {/* Popular */}
              <div className="flex items-center md:col-span-2">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" checked={filters.popular} onChange={e => handleFilterChange('popular', e.target.checked)} className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <span className="text-sm font-medium text-gray-700">Show popular tours only</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">{loading ? <div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Searching tours...</div> : `Found ${tours.length} tour${tours.length !== 1 ? 's' : ''}`}</div>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16 "><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {tours.map(tour => (
              <div key={tour._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group" onClick={() => router.push(`/tours/details/${tour._id}`)}>
                <div className="relative overflow-hidden">
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${tour.images?.[0] || 'placeholder.jpg'}`} alt={tour.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" onError={(e)=>{(e.target as HTMLImageElement).src='/placeholder-tour.jpg'}} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                    <div className="text-lg font-bold text-green-600">₹{tour.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">per person</div>
                  </div>
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black rounded-2xl px-3 py-1 text-sm font-semibold shadow-lg">⭐ {tour.rating || 0}</div>
                </div>
                <div className="p-6 flex flex-col flex-1 ">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">{tour.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{tour.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {tour.destination?.name || 'Unknown'}</div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {tour.duration} days</div>
                  </div>
                  {tour.category && <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium mb-4">{tour.category}</span>}
                  {tour.tags && tour.tags.length > 0 && <div className="flex flex-wrap gap-2 mb-4">{tour.tags.slice(0,2).map((tag,i)=><span key={i} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{tag}</span>)}{tour.tags.length>2 && <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">+{tour.tags.length-2}</span>}</div>}
                  <button onClick={e => { e.stopPropagation(); router.push(`/tours/details/${tour._id}`); }} className="w-full bg-gradient-to-r from-gray-600 to-zinc-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No tours found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Try adjusting your search criteria or filters to find more tours.</p>
            <button onClick={resetFilters} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300">Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursPage;
