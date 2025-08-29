"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { fetchNotifications, selectUnreadNotifications } from "@/redux/slices/notificationSlice";

export default function GuideNavbar() {
  const router = useRouter();
  const dispatch = useAppDispatch(); // ✅ dispatch for fetching notifications
  const unreadNotifications = useAppSelector(selectUnreadNotifications);

  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch notifications when Navbar mounts
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

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
    <header className="w-full bg-[#EFEDE9] shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-[#5E361D]">Guide Dashboard</h1>

      <nav className="hidden md:flex gap-8 font-medium">
        <a href="/guide-dashboard" className="hover:text-[#FF9100] transition">Dashboard</a>
        <a href="/guide/tours" className="hover:text-[#FF9100] transition cursor-pointer">My Tours</a>
        <a href="/booking/guide-booking" className="hover:text-[#FF9100] transition">Bookings</a>
      </nav>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-full hover:bg-[#d1cfc8] transition"
          onClick={() => router.push("/notifications")}
        >
          <Bell className="w-6 h-6 text-[#0c0c0c]" />
          {unreadNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {unreadNotifications.length}
            </span>
          )}
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
              <button onClick={() => router.push("/guide-dashboard/profile/view-profile")} className="text-left hover:text-amber-700">View Profile</button>
              <button onClick={() => router.push("/guide-dashboard/profile/edit-profile")} className="text-left hover:text-amber-700">Edit Profile</button>
              <button onClick={() => router.push("/guide-dashboard/profile/change-password")} className="text-left hover:text-amber-700">Change Password</button>
            </div>
          )}
        </div>

        {/* Logout */}
        <button className="flex items-center gap-2 hover:text-[#FF9100]" onClick={() => setLogoutDialogOpen(true)}>
          <LogOut className="w-6 h-6" />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </header>
  );
}
