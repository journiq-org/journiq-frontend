"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Footerr = () => {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Call-to-action section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse through our amazing destinations and find your perfect getaway
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToTop}
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 cursor-pointer"
            >
              View All Destination
            </button>
          </div>

          <div className="mt-8 text-gray-400">
            <p className="text-sm">✈️ Plan • 🗺️ Explore • 📸 Experience • 🏠 Return Home</p>
          </div>
        </div>
      </div>

    
    </footer>
  );
};

export default Footerr;
