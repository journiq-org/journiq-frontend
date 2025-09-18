"use client";

import React from "react";
import { ShieldAlert, Compass, MapPin, Home } from "lucide-react";

const PendingVerification = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4 pt-24">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-16 opacity-20">
            <Compass className="w-12 h-12 text-orange-300" />
          </div>
          <div className="absolute top-32 right-20 opacity-15">
            <MapPin className="w-10 h-10 text-amber-400" />
          </div>
          <div className="absolute bottom-40 left-24 opacity-20">
            <Compass className="w-8 h-8 text-orange-400" />
          </div>
          <div className="absolute bottom-32 right-32 opacity-15">
            <MapPin className="w-11 h-11 text-amber-300" />
          </div>
        </div>

        {/* Main Verification Card */}
        <div className="relative z-10 w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg mb-6">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Verification Pending
            </h1>
            <p className="text-gray-600">
              Your guide account is under review
            </p>
          </div>

          {/* Verification Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 text-center">
            <div className="space-y-6">
              {/* Status Message */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-center justify-center space-x-3 text-amber-800 mb-3">
                  <ShieldAlert className="w-6 h-6" />
                  <span className="font-semibold">Account Verification Required</span>
                </div>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Your guide account is pending admin approval. 
                  This process typically takes 1-2 business days. 
                  Once verified, you'll be able to create and manage tours.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="w-8 h-0.5 bg-orange-300"></div>
                  <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                  <div className="w-8 h-0.5 bg-gray-200"></div>
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>Application</span>
                  <span>Review</span>
                  <span>Approved</span>
                </div>
              </div>

              {/* Return Home Button */}
              <a
                href="/"
                className="inline-flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg shadow-md"
              >
                <Home className="w-5 h-5" />
                <span>Return to Home</span>
              </a>
            </div>

            {/* Footer Text */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Your trusted companion for extraordinary travel experiences
              </p>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-white/50">
              <div className="text-2xl mb-2">🌍</div>
              <p className="text-sm font-medium text-gray-700">200+ Destinations</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-white/50">
              <div className="text-2xl mb-2">👥</div>
              <p className="text-sm font-medium text-gray-700">Expert Guides</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingVerification;