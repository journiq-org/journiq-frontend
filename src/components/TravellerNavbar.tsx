"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { User, Bell, BookOpen, LogOut, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { selectUnreadNotifications } from "@/redux/slices/notificationSlice";
import { useAppSelector } from "@/redux/hook";


const TravellerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = useAppSelector(selectUnreadNotifications);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch unread notifications count from API
  // useEffect(() => {
  //   const fetchUnreadNotifications = async () => {
  //     try {
  //       const res = await fetch("/api/notifications/unread-count", {
  //         credentials: "include",
  //       });
  //       const data = await res.json();
  //       if (res.ok) setUnreadCount(data.unreadCount || 0);
  //     } catch (err) {
  //       console.error("Failed to fetch unread notifications:", err);
  //     }
  //   };
  //   fetchUnreadNotifications();
  // }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/clear-cookie", {
        method: "POST",
        credentials: "include",
      });
      toast.success("Logged out ✅");
    } catch (err) {
      console.warn("Failed to clear cookies", err);
    }
    router.replace("/login");
  };

  return (
    <>
     <header className="w-full bg-[#E2E0DF] px-6 py-4 flex items-center">
  {/* LEFT: Logo */}
  <div className="flex items-center gap-2 mr-auto">
    <Image src="/images/logo.png" alt="journiq-logo" width={35} height={35} />
    <span className="text-2xl font-bold text-[#0c0c0c]">Journiq</span>
  </div>

  {/* CENTER: Menu Items */}
  <nav className="hidden md:flex gap-8 mx-auto text-[#0c0c0c] font-medium">
    <a href="/traveller-dashboard" className="hover:text-amber-700">Home</a>
    <a href="/booking/my-booking" className="hover:text-amber-700">Booking</a>
    <a href="/tours/destinantion" className="hover:text-amber-700">Tour</a>
    <a href="/message" className="hover:text-amber-700">Message</a>
  </nav>

  {/* RIGHT: Icons */}
  <div className="flex items-center gap-4 ml-auto relative">
    {/* Bookings */}
    <button
      onClick={() => router.push("/booking/my-booking")}
      className="p-2 rounded-full hover:bg-[#d1cfc8] transition"
      aria-label="My Bookings"
    >
      <BookOpen size={26} className="text-[#0c0c0c]" />
    </button>

    {/* Reviews */}
    <button
      onClick={() => router.push("/traveller-dashboard/review/my-reviews")}
      className="p-2 rounded-full hover:bg-[#d1cfc8] transition"
      aria-label="My Reviews"
    >
      <MessageSquare size={26} className="text-[#0c0c0c]" />
    </button>

    {/* Notifications */}
    <button
      onClick={() => router.push("/notifications")}
      className="relative p-2 rounded-full hover:bg-[#d1cfc8] transition"
      aria-label="notifications"
    >
      <Bell size={26} className="text-[#0c0c0c]" />
      {unreadNotifications.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs px-1.5 min-w-[1rem] h-4 flex items-center justify-center rounded-full">
          {unreadNotifications.length > 99 ? "99+" : unreadNotifications.length}
        </span>
      )}
    </button>

    {/* Profile */}
    <div ref={profileRef} className="relative">
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="p-2 rounded-full hover:bg-[#d1cfc8] transition"
        aria-label="Profile Options"
      >
        <User size={28} className="text-[#0c0c0c]" />
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 w-44 z-20">
          <button
            onClick={() => router.push("/traveller-dashboard/profile/view-profile")}
            className="text-left hover:text-amber-700"
          >
            View Profile
          </button>
          <button
            onClick={() => router.push("/traveller-dashboard/profile/edit-profile")}
            className="text-left hover:text-amber-700"
          >
            Edit Profile
          </button>
          <button
            onClick={() => router.push("/traveller-dashboard/profile/change-password")}
            className="text-left hover:text-amber-700"
          >
            Change Password
          </button>
          <button
            onClick={() => setLogoutDialogOpen(true)}
            className="text-left text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  </div>
</header>


      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TravellerNavbar;
