"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { User, Bell, BookOpen, LogOut } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

const TravellerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

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
  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const res = await fetch("/api/notifications/unread-count", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUnreadCount(data.unreadCount || 0);
      } catch (err) {
        console.error("Failed to fetch unread notifications:", err);
      }
    };
    fetchUnreadNotifications();
  }, []);

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
      <header className="w-full bg-[#E2E0DF] px-6 py-4 flex justify-between items-center relative">
        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-[#d1cfc8] px-7 py-3 rounded-3xl hover:bg-[#4E4D45] text-[#0c0c0c] hover:text-white transition"
          >
            Menu
          </button>

          {menuOpen && (
            <div className="absolute z-10 text-[#5E361D] right-0 left-5 mt-2 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 w-40">
              <a href="/traveller-dashboard" className="hover:text-amber-700">Home</a>
              <a href="/booking/my-booking" className="hover:text-amber-700">Booking</a>
              <a href="/tour" className="hover:text-amber-700">Tour</a>
              <a href="/contact" className="hover:text-amber-700">Contact</a>
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="text-2xl font-bold text-[#0c0c0c] flex items-center gap-2">
          <Image src="/images/logo.png" alt="journiq-logo" width={35} height={35} />
          Journiq
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          {/* Bookings */}
          <button
            onClick={() => router.push("/booking/my-booking")}
            className="p-2 rounded-full hover:bg-[#d1cfc8] transition"
            aria-label="My Bookings"
          >
            <BookOpen size={26} className="text-[#0c0c0c]" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#FF9100] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                4
              </span>
            </button>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

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
