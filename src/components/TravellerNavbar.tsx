


"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { User, Bell, BookOpen, LogOut, MessageSquare } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hook";
import { selectUnreadNotifications } from "@/redux/slices/notificationSlice";
import NotificationDrawer from "./NotificationDrawer";
// import MessageNotificationDrawer from "./MessageNotificationDrawer";

const TravellerNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  // const [openMessageDrawer, setOpenMessageDrawer] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/clear-cookie", { method: "POST", credentials: "include" });
      toast.success("Logged out ✅");
    } catch (err) {
      console.warn("Failed to clear cookies", err);
    }
    router.replace("/login");
  };

  return (
    <>
      <header className="w-full bg-gray-900 px-6 py-4 flex items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 mr-auto cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src="/images/logo.png" alt="journiq-logo" width={35} height={35} />
          <span className="text-2xl font-bold text-white">Journiq</span>
        </div>


        {/* Menu */}
        <nav className="hidden md:flex gap-8 mx-auto text-white font-medium">
        <a
          href="/traveller-dashboard"
          className={`px-2 py-1 rounded transition-all ${
            pathname === "/traveller-dashboard" ? "bg-amber-700 text-white" : "hover:text-amber-700"
          }`}
        >
          Home
        </a>
        <a
          href="/booking/my-booking"
          className={`px-2 py-1 rounded transition-all ${
            pathname.startsWith("/booking/my-booking") ? "bg-amber-700 text-white" : "hover:text-amber-700"
          }`}
        >
          Booking
        </a>
        <a
          href="/tours/viewAllTour"
          className={`px-2 py-1 rounded transition-all ${
            pathname.startsWith("/tours/viewAllTour") ? "bg-amber-700 text-white" : "hover:text-amber-700"
          }`}
        >
          Tour
        </a>
        <a
          href="/contact"
          className={`px-2 py-1 rounded transition-all ${
            pathname === "/contact" ? "bg-amber-700 text-white" : "hover:text-amber-700"
          }`}
        >
          Contact
        </a>
      </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 ml-auto relative">
          {/* <button onClick={() => router.push("/booking/my-booking")} className="p-2 rounded-full hover:bg-black transition">
            <BookOpen size={26} className="text-white" />
          </button> */}

          <button onClick={() => router.push("/traveller-dashboard/review/my-reviews")} className="p-2 rounded-full hover:bg-black transition">
            <MessageSquare size={26} className="text-white" />
          </button>

          <button
            className="relative p-2.5 text-[#e2e0df] hover:text-[#fdfdfd] hover:bg-[#93c5fd]/10 transition-all duration-300 rounded-full"
            onClick={() => setOpenNotificationDrawer(true)}
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff9100] text-[#fdfdfd] text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg animate-pulse">
                {unreadNotifications.length}
              </span>
            )}
          </button>

          <div ref={profileRef} className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="p-2 rounded-full hover:bg-black transition">
              <User size={28} className="text-white" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 w-44 z-20">
                <button onClick={() => router.push("/traveller-dashboard/profile/view-profile")} className="text-left hover:text-amber-700">View Profile</button>
                <button onClick={() => router.push("/traveller-dashboard/profile/edit-profile")} className="text-left hover:text-amber-700">Edit Profile</button>
                <button onClick={() => router.push("/traveller-dashboard/profile/change-password")} className="text-left hover:text-amber-700">Change Password</button>
                <button onClick={() => setLogoutDialogOpen(true)} className="text-left text-red-600 hover:text-red-800 flex items-center gap-1">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Notification Drawer */}
      <NotificationDrawer open={openNotificationDrawer} onClose={() => setOpenNotificationDrawer(false)} />

     

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleLogout} variant="contained" color="error">Logout</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TravellerNavbar;
