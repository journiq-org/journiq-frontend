"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { User, Bell } from "lucide-react";

const TravellerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="w-full bg-[#E2E0DF] px-6 py-4 flex justify-between items-center relative">
      {/* Menu Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#d1cfc8] px-7 py-3 rounded-3xl hover:bg-[#4E4D45] text-[#0c0c0c] hover:text-white"
        >
          Menu
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 text-[#5E361D] right-0 mt-2 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 w-44">
            <button
              onClick={() => router.push("/traveller/dashboard")}
              className="text-left hover:text-amber-700"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push("/traveller/bookings")}
              className="text-left hover:text-amber-700"
            >
              My Bookings
            </button>
            <button
              onClick={() =>
                router.push("/traveller-dashboard/profile/view-profile")
              }
              className="text-left hover:text-amber-700"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-left text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-[#0c0c0c] flex items-center gap-2">
        <Image src="/images/logo.png" alt="journiq-logo" width={35} height={35} />
        Journiq
      </div>

      {/* Right Section: Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          onClick={() => router.push("/traveller/notifications")}
          className="p-2 rounded-full hover:bg-[#d1cfc8] transition"
          aria-label="Notifications"
        >
          <Bell size={26} className="text-[#0c0c0c]" />
        </button>

        {/* Profile */}
        <button
          onClick={() => router.push("/traveller-dashboard/profile/view-profile")}
          className="p-2 rounded-full hover:bg-[#d1cfc8] transition"
          aria-label="View Profile"
        >
          <User size={28} className="text-[#0c0c0c]" />
        </button>
      </div>
    </header>
  );
};

export default TravellerNavbar;
