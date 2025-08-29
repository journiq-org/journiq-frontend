"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function GuideNavbar() {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/clear-cookie", { method: "POST" });
      toast.success("Logged out ✅");
    } catch (err) {
      console.warn("Failed to clear cookies", err);
    }
    router.replace("/login");
  };

  return (
    <>
      <header className="w-full bg-[#EFEDE9] shadow-md px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-2xl font-bold text-[#5E361D]">Guide Dashboard</h1>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-8 font-medium">
          <a href="/guide-dashboard" className="hover:text-[#FF9100] transition">Dashboard</a>
          <a href="/guide/tours" className="hover:text-[#FF9100] transition cursor-pointer">My Tours</a>
          <a href="/booking/guide-booking" className="hover:text-[#FF9100] transition">Bookings</a>
          <a href="/settings" className="hover:text-[#FF9100] transition">Settings</a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#FF9100] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              className="flex items-center gap-2 hover:text-[#FF9100]"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <User className="w-6 h-6" />
              <span className="hidden md:block">Profile</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 w-48 z-20">
                <button
                  onClick={() => router.push("/guide-dashboard/profile/view-profile")}
                  className="text-left hover:text-amber-700"
                >
                  View Profile
                </button>
                <button
                  onClick={() => router.push("/guide-dashboard/profile/edit-profile")}
                  className="text-left hover:text-amber-700"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => router.push("/guide-dashboard/profile/change-password")}
                  className="text-left hover:text-amber-700"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            className="flex items-center gap-2 hover:text-[#FF9100]"
            onClick={() => setLogoutDialogOpen(true)}
          >
            <LogOut className="w-6 h-6" />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </header>

      {/* 🔹 Logout Confirmation Dialog */}
      {logoutDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to log out?</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setLogoutDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
