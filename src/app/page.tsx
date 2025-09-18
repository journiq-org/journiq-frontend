// 'use client'

// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import TestimonialSlider from "@/components/TestimonialSlider";
// import { listDestinations } from "@/redux/slices/destinationSlice";
// import { AppDispatch } from "@/redux/store";
// import Image from "next/image";
// import { useRouter  } from "next/navigation";
// import { useEffect , useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function Home() {
//   const router = useRouter()
  
//     //redux
//     const dispatch = useDispatch<AppDispatch>()
//     const [role, setRole] = useState<string | null>(null);
//     // const {loading,error, destinations} = useSelector((state:any) => state.destination)  // first destinations is the name of initialstate.. second destination is the name in store registered reducer
//     const [page, setPage] = useState(1);
//     const limit = 9;
//     const skip = (page - 1) * limit;
  
//     useEffect(() => {
//       dispatch(listDestinations({ skip, limit }));
//     }, [dispatch, page]);
  
//     const { destinations, loading, error, total } = useSelector(
//       (state: any) => state.destination
//     );
  
//     const totalPages = Math.ceil(total / limit);


//      const features = [
//     {
//       icon: '✈️',
//       title: 'Easy Booking',
//       description: 'Simple and fast booking process with instant confirmation'
//     },
//     {
//       icon: '🧑‍🤝‍🧑',
//       title: 'Local Guides',
//       description: 'Experienced local guides who know the destination inside out'
//     },
//     {
//       icon: '⭐',
//       title: 'Trusted Reviews',
//       description: 'Read authentic reviews from real travelers worldwide'
//     },
//     {
//       icon: '🌍',
//       title: 'Global Reach',
//       description: 'Access to destinations across every continent'
//     }
//   ];
  
//   return (
//     <div >
//       <Header/>


//     {/* hero section */}
//     {/* <div>
//       <div className="relative max-w-7xl mx-auto px-4 pt-20 flex flex-col items-center text-center">
//         <h6 className="text-xl md:text-2xl text-[#0c0c0c]"> Dont't just see the world.</h6>
//         <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mt-4 text-[#0c0c0c] leading-tight">Live it with Journiq.</h1>
//       </div>
//       <div className="relative mt-12 w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden mx-auto bottom-25 ">
//         <Image
//         src={'/images/destination3.jpg'}
//         alt="destination"
//         width={1600}
//         height={800}
//         className="w-full h-[400px] md:h-[500px] object-cover"
//         />
//       </div>

//     </div> */}

// {/* hero section */}
//     <section className="pb-20">
//       <div>
//         <div className="relative max-w-7xl mx-auto px-4 pt-20 flex flex-col items-center text-center">
//           <h6 className="text-xl md:text-2xl text-[#0c0c0c]">Don't just see the world.</h6>
//           <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mt-4 text-[#0c0c0c] leading-tight">
//             Live it with Journiq.
//           </h1>
//         </div>

//       {/* Image with gradient overlay */}
//       <div className="relative mt-12 w-full max-w-6xl rounded-2xl shadow-lg overflow-hidden mx-auto">
//         <Image
//           src={`/images/destination3.jpg`}
//           alt="destination"
//           width={1600}
//           height={800}
//           className="w-full h-[400px] md:h-[500px] object-cover"
//         />

//         {/* Gradient overlay at the top */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
//       </div>
//       </div>
//     </section>


// {/* why choose us */}
//  <section id="why-choose-us" className="py-16 bg-gray-50 ">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Why Choose Us?
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover why thousands of travelers trust us for their journey
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div 
//               key={index} 
//               className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
//             >
//               <div className="text-4xl mb-4">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>


// {/* destination */}
// <section id="destination" className="px-30 py-20 bg-stone-300">
//   <h2 className="font-bold text-6xl pb-10 leading-tight text-gray-700 drop-shadow-lg">Discover exclusive destinations<br/> <span className="text-gray-500">tailored for unforgettable journeys.</span></h2>
//   <hr className="border-gray-800 pb-20 mr-100 "/>
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     {destinations.map((dest: any) => (
//       <div
//         key={dest._id}
//         onClick={() => router.push(`/tours/${dest._id}`)}
//         className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
//       >
//         {/* Destination Image */}
//         {dest.images?.length > 0 && (
//           <img
//             src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${dest.images[0]}`}
//             alt={dest.name}
//             className="w-full h-64 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
//           />
//         )}

//         {/* Overlay Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70"></div>

//         {/* Destination Text */}
//         <div className="absolute bottom-4 left-4 text-white transform transition-all duration-300 group-hover:translate-y-[-8px]">
//           <h3 className="text-lg font-semibold transition-all duration-300 group-hover:text-xl">{dest.name}</h3>
//           <p className="text-sm flex items-center gap-1 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
//             <span>📍</span> {dest.country}
//           </p>
//         </div>

//         {/* Hover Shine Effect */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
//       </div>
//     ))}
//   </div>
// </section>


// {/* About Section */}
// <section id='about' className="relative bg-gradient-to-b from-white to-blue-50 py-20 px-6 md:px-20" >
//   <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
//     {/* Left: Text Content */}
//     <div>
//       <h2 className="text-4xl font-bold text-gray-900 mb-6">
//         About <span className="text-orange-500">Journiq</span>
//       </h2>
//       <p className="text-lg text-gray-700 leading-relaxed mb-6">
//         Journiq isn’t just a travel platform – it’s your companion in discovering 
//         the world. From hidden gems to iconic destinations, we bring together 
//         guides, experiences, and journeys that create lasting memories.
//       </p>
//       <p className="text-lg text-gray-700 leading-relaxed mb-6">
//         Whether you’re an adventurer chasing thrills, a wanderer seeking culture, 
//         or a traveller longing for relaxation, Journiq makes every trip effortless, 
//         authentic, and unforgettable.
//       </p>
//       <button 
//       onClick={() => router.push('/login')}
//       className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-700 transition-all" >
//         Explore Journeys
//       </button>
//     </div>

//     {/* Right: Image / Illustration */}
//     <div className="relative">
//       <img
//         src="/images/swiss.jpg" // replace with your own image
//         alt="Journiq Travel"
//         className="rounded-2xl shadow-lg object-cover"
//       />
//       <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-md">
//         <p className="text-gray-800 font-semibold">🌍 200+ Destinations</p>
//       </div>
//     </div>

//   </div>
// </section>


// <TestimonialSlider/>

//      {/* Pagination Controls */}
//            {totalPages > 1 && (
//             <div className="flex justify-center items-center gap-3 mt-8">
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage((p) => p - 1)}
//                 className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-100"
//               >
//                 Prev
//               </button>
//               <span className="text-sm font-medium">
//                 Page {page} of {totalPages}
//               </span>
//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage((p) => p + 1)}
//                 className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-100"
//               >
//                 Next
//               </button>
//             </div>
// )}


//   {/* Call to Action Section */}
//       {/* <div className="bg-gray-900 py-16">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
//             Ready for Your Next Adventure?
//           </h3>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Book your dream tour today and create memories that will last a lifetime
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button
//               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//               className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
//             >
//               Explore
//             </button>
            
//             {role === 'traveller' && (
//               <button
//                 onClick={() => router.push('/booking/my-booking')}
//                 className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300"
//               >
//                 My Bookings
//               </button>
//             )}
//           </div>
          
//           <div className="mt-8 text-blue-100">
//             <p className="text-sm">🎯 Expert Guides • 📞 24/7 Support • 🔄 Flexible Cancellation</p>
//           </div>
//         </div>
//       </div> */}

//       <Footer/>
//     </div>
//   );
// }



'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TestimonialSlider from "@/components/TestimonialSlider";
import { listDestinations } from "@/redux/slices/destinationSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useRouter  } from "next/navigation";
import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const router = useRouter()
  
    //redux
    const dispatch = useDispatch<AppDispatch>()
    const [role, setRole] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const limit = 9;
    const skip = (page - 1) * limit;
  
    useEffect(() => {
      dispatch(listDestinations({ skip, limit }));
    }, [dispatch, page]);
  
    const { destinations, loading, error, total } = useSelector(
      (state: any) => state.destination
    );
  
    const totalPages = Math.ceil(total / limit);


    // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  
    const heroImages = [
      '/images/slide1.jpg',
      '/images/slide2.jpg',
      '/images/slide3.jpg', // Add more images as needed
      '/images/slide4.jpg'
    ];

    const heroSlides = [
      {
        title: "Discover the World",
        subtitle: "with Journiq",
        description: "Your gateway to extraordinary destinations and unforgettable experiences"
      },
      {
        title: "Explore Hidden Gems",
        subtitle: "Authentic Adventures",
        description: "Connect with local cultures and create memories that last forever"
      },
      {
        title: "Expert Local Guides",
        subtitle: "Personalized Journeys",
        description: "Travel with confidence alongside experienced local experts"
      },
      {
        title: "Seamless Booking",
        subtitle: "Effortless Planning",
        description: "From dream to reality with our hassle-free booking system"
      }
    ];

    // Auto-play carousel
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }, [heroImages.length]);

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    };

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    const goToSlide = (index: number) => {
      setCurrentSlide(index);
    }



  //    const features = [
  //   {
  //     icon: '✈️',
  //     title: 'Easy Booking',
  //     description: 'Simple and fast booking process with instant confirmation'
  //   },
  //   {
  //     icon: '🧑‍🤝‍🧑',
  //     title: 'Local Guides',
  //     description: 'Experienced local guides who know the destination inside out'
  //   },
  //   {
  //     icon: '⭐',
  //     title: 'Trusted Reviews',
  //     description: 'Read authentic reviews from real travelers worldwide'
  //   },
  //   {
  //     icon: '🌍',
  //     title: 'Global Reach',
  //     description: 'Access to destinations across every continent'
  //   }
  // ];
  
  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
  //     <Header/>

  //     {/* Hero Section */}
  //     <section className="relative overflow-hidden">
  //       <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-indigo-600/10"></div>
  //       <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-16">
  //         <div className="flex flex-col items-center text-center">
  //           <h6 className="text-xl md:text-2xl text-slate-600 mb-4 animate-fade-in">
  //             Don't just see the world.
  //           </h6>
  //           <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 text-slate-800 leading-tight animate-fade-in-up">
  //             Live it with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journiq</span>.
  //           </h1>
  //         </div>

  //         {/* Image with enhanced gradient overlay */}
  //         <div className="relative mt-12 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden mx-auto transform hover:scale-[1.02] transition-transform duration-700">
  //           <Image
  //             src={`/images/destination3.jpg`}
  //             alt="destination"
  //             width={1600}
  //             height={800}
  //             className="w-full h-[400px] md:h-[500px] object-cover"
  //           />
  //           {/* Multi-layer gradient overlay */}
  //           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
  //           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Why Choose Us Section */}
  //     <section id="why-choose-us" className="py-20 relative">
  //       <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/50"></div>
  //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="text-center mb-16">
  //           <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
  //             Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Us</span>?
  //           </h2>
  //           <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
  //             Discover why thousands of travelers trust us for their journey
  //           </p>
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  //           {features.map((feature, index) => (
  //             <div 
  //               key={index} 
  //               className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-2 border border-white/50"
  //             >
  //               <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
  //                 {feature.icon}
  //               </div>
  //               <h3 className="text-xl font-bold text-slate-800 mb-3">
  //                 {feature.title}
  //               </h3>
  //               <p className="text-slate-600 leading-relaxed">
  //                 {feature.description}
  //               </p>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>

  //     {/* Destination Section */}
  //     <section id="destination" className="py-20 relative ">
  //       <div className="absolute inset-0 bg-[#E2E0DF]"></div>
  //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="text-center mb-16">
  //           <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
  //             Discover exclusive destinations<br/> 
  //             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">tailored for unforgettable journeys</span>.
  //           </h2>
  //         </div>
          
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  //           {destinations.map((dest: any) => (
  //             <div
  //               key={dest._id}
  //               onClick={() => router.push(`/tours/${dest._id}`)}
  //               className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 border border-white/50"
  //             >
  //               {/* Destination Image */}
  //               {dest.images?.length > 0 && (
  //                 <img
  //                   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${dest.images[0]}`}
  //                   alt={dest.name}
  //                   className="w-full h-64 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
  //                 />
  //               )}

  //               {/* Multi-layer Overlay */}
  //               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300"></div>
  //               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>

  //               {/* Destination Text */}
  //               <div className="absolute bottom-6 left-6 text-white transform transition-all duration-300 group-hover:translate-y-[-8px]">
  //                 <h3 className="text-2xl font-bold transition-all duration-300 group-hover:text-3xl mb-2">{dest.name}</h3>
  //                 <p className="text-lg flex items-center gap-2 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
  //                   <span>📍</span> {dest.country}
  //                 </p>
  //               </div>

  //               {/* Hover Shine Effect */}
  //               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
  //             </div>
  //           ))}
  //         </div>

  //         {/* Pagination Controls */}
  //         {totalPages > 1 && (
  //           <div className="flex justify-center items-center gap-4 mt-12">
  //             <button
  //               disabled={page === 1}
  //               onClick={() => setPage((p) => p - 1)}
  //               className="px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-lg transition-all duration-300 font-medium"
  //             >
  //               ← Previous
  //             </button>
  //             <div className="flex items-center gap-2">
  //               <span className="text-slate-600 font-medium">
  //                 Page {page} of {totalPages}
  //               </span>
  //             </div>
  //             <button
  //               disabled={page === totalPages}
  //               onClick={() => setPage((p) => p + 1)}
  //               className="px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-lg transition-all duration-300 font-medium"
  //             >
  //               Next →
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     </section>

  //     {/* About Section */}
  //     <section id='about' className="py-20 relative">
  //       <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30"></div>
  //       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
  //           {/* Left: Text Content */}
  //           <div className="space-y-6">
  //             <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
  //               About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journiq</span>
  //             </h2>
  //             <p className="text-lg text-slate-600 leading-relaxed">
  //               Journiq isn't just a travel platform – it's your companion in discovering 
  //               the world. From hidden gems to iconic destinations, we bring together 
  //               guides, experiences, and journeys that create lasting memories.
  //             </p>
  //             <p className="text-lg text-slate-600 leading-relaxed">
  //               Whether you're an adventurer chasing thrills, a wanderer seeking culture, 
  //               or a traveller longing for relaxation, Journiq makes every trip effortless, 
  //               authentic, and unforgettable.
  //             </p>
  //             <button 
  //               onClick={() => router.push('/login')}
  //               className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
  //             >
  //               Explore Journeys
  //               <span className="ml-2">→</span>
  //             </button>
  //           </div>

  //           {/* Right: Image / Illustration */}
  //           <div className="relative">
  //             <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
  //               <img
  //                 src="/images/swiss.jpg"
  //                 alt="Journiq Travel"
  //                 className="w-full h-96 object-cover"
  //               />
  //               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
  //             </div>
              
  //             {/* Floating Stats Card */}
  //             <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 transform hover:scale-105 transition-transform duration-300">
  //               <div className="flex items-center gap-3">
  //                 <span className="text-2xl">🌍</span>
  //                 <div>
  //                   <p className="text-2xl font-bold text-slate-800">200+</p>
  //                   <p className="text-sm text-slate-600">Destinations</p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Testimonial Section */}
  //     <section className="py-20 relative">
  //       <div className="absolute inset-0 bg-[#E2E0DF]"></div>
  //       <div className="relative">
  //         <TestimonialSlider/>
  //       </div>
  //     </section>

  //     <Footer/>
  //   </div>
  // );


  return(

  <div className="min-h-screen bg-white">
      <Header/>
  {/* Full-Screen Hero Carousel */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Carousel Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/30 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border border-white/30 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Hero Content - Left Aligned */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {/* Status Badge */}
              {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Your Journey Starts Here
              </div> */}

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {heroSlides[currentSlide].title}
                <span className="block bg-gradient-to-r from-orange-500 via-amber-700 to-orange-700 bg-clip-text text-transparent">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => router.push('/login')}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Start Your Journey
                </button>
                <button 
                  onClick={() => router.push('#destination')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  Explore Destinations
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

   
      {/* Navigation Links Section - Fixed */}
    <section className="bg-white/45 backdrop-blur-md border border-white/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center py-4">
          <div className="flex space-x-12">
            {[
              { href: '#why-choose-us', label: 'Why Choose Us' },
              { href: '#destination', label: 'Destinations' },
              { href: '#about', label: 'About Us' },
              { href: '#review', label: 'Reviews' }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 px-4 py-3 hover:text-orange-600 font-medium transition-colors duration-300 relative group "
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Journiq</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why thousands of travelers trust us for their journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🗺️',
                title: 'Curated Destinations',
                description: 'Handpicked locations for authentic travel experiences'
              },
              {
                icon: '👥',
                title: 'Expert Local Guides',
                description: 'Professional guides with deep knowledge of their regions'
              },
              {
                icon: '⭐',
                title: 'Verified Reviews',
                description: 'Real traveler feedback to help you choose wisely'
              },
              {
                icon: '🛡️',
                title: 'Secure Booking',
                description: 'Safe and secure payment processing with instant confirmation'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* gradient between sections */}
      <div className="h-16 bg-gradient-to-b from-gray-50 to-[#e2e0df]"></div>


      {/* Destinations Section */}
      <section id="destination" className="py-20 bg-[#E2E0DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover handpicked destinations that offer unique experiences and unforgettable memories
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {destinations.map((dest: any) => (
                  <div
                    key={dest._id}
                    onClick={() => router.push(`/tours/${dest._id}`)}
                    className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 border border-white/50"
                  >
                    {/* Destination Image */}
                    {dest.images?.length > 0 && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${dest.images[0]}`}
                        alt={dest.name}
                        className="w-full h-64 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                      />
                    )}

                    {/* Multi-layer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>

                    {/* Destination Text */}
                    <div className="absolute bottom-6 left-6 text-white transform transition-all duration-300 group-hover:translate-y-[-8px]">
                      <h3 className="text-2xl font-bold transition-all duration-300 group-hover:text-3xl mb-2">{dest.name}</h3>
                      <p className="text-lg flex items-center gap-2 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                        <span>📍</span> {dest.country}
                      </p>
                    </div>

                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    ← Previous
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium">
                      Page {page} of {totalPages}
                    </span>
                  </div>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

{/* gradient between sections */}
      <div className="h-16 bg-gradient-to-b from-[#e2e0df] to-white"></div>

      {/* About Section */}
      <section id='about' className="py-20 relative scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
                About <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Journiq</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Journiq isn't just a travel platform – it's your companion in discovering 
                the world. From hidden gems to iconic destinations, we bring together 
                guides, experiences, and journeys that create lasting memories.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you're an adventurer chasing thrills, a wanderer seeking culture, 
                or a traveller longing for relaxation, Journiq makes every trip effortless, 
                authentic, and unforgettable.
              </p>
              <button 
                onClick={() => router.push('/login')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                Explore Journeys
                <span className="ml-2">→</span>
              </button>
            </div>

            {/* Right: Image / Illustration */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/images/swiss.jpg"
                  alt="Journiq Travel"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">200+</p>
                    <p className="text-sm text-slate-600">Destinations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* gradient between sections */}
      <div className="h-16 bg-gradient-to-b from-[#f7fafe] to-[#e2e0df]"></div>

      {/* Testimonial Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#E2E0DF]"></div>
        <div className="relative">
          <TestimonialSlider/>
        </div>
      </section>


      <Footer/>
    </div>
  )


}