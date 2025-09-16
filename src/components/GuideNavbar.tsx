"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, User, LogOut, Menu, X, Compass } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { fetchNotifications, selectUnreadNotifications } from "@/redux/slices/notificationSlice";
import NotificationDrawer from './NotificationDrawer'

export default function GuideNavbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const unreadNotifications = useAppSelector(selectUnreadNotifications);

  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [openDrawer, setOpenDrawer] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  //  Fetch notifications when Navbar mounts
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  //  Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Logout function
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/clear-cookie", { method: "POST" });
      toast.success("Logged out successfully");
    } catch (err) {
      console.warn("Failed to clear cookies", err);
    }
    router.replace("/login");
  };

  const navItems = [
    { href: "/guide-dashboard", label: "Dashboard" },
    { href: "/guide/tours", label: "My Tours" },
    { href: "/booking/guide-booking", label: "Bookings" },
  ];

  const profileItems = [
    { href: "/guide-dashboard/profile/view-profile", label: "View Profile" },
    { href: "/guide-dashboard/profile/change-password", label: "Change Password" },
  ];

  return (
    <>
      <header className="w-full bg-gradient-to-r from-[#22252c] via-[#1e3a8a] to-[#22252c] shadow-xl sticky top-0 z-40 border-b border-[#93c5fd]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand & Logo */}
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="flex items-center justify-center w-10 h-10  backdrop-blur-sm ">
                  <img src={'/images/logo.png'}/>
              </div>

              {/* Brand Name */}
              <div className="flex flex-col">
                <h1
                  className="text-xl font-bold text-[#fdfdfd] cursor-pointer hover:text-[#93c5fd] transition-colors duration-300"
                  onClick={() => router.push('/guide-dashboard')}
                >
                  journiq
                </h1>
                <span className="text-xs text-[#e2e0df] font-medium -mt-1">
                  Guide Portal
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  title={item.label} 
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 border border-transparent
                    ${isActive
                      ? "bg-[#93c5fd]/20 text-white" 
                      : "text-[#e2e0df] hover:text-[#fdfdfd] hover:bg-[#93c5fd]/10 hover:border-[#93c5fd]/30"}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
                <button
                className="relative p-2.5 text-[#e2e0df] hover:text-[#fdfdfd] hover:bg-[#93c5fd]/10 rounded-xl transition-all duration-300 group border border-transparent hover:border-[#93c5fd]/30"
                onClick={() => setOpenDrawer(true)} 
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ff9100] text-[#fdfdfd] text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg animate-pulse">
                    {unreadNotifications.length}
                  </span>
                )}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#93c5fd] rounded-full transition-all duration-300 group-hover:w-3/4"></div>
              </button>

              {/* Profile Dropdown */}
              <div ref={profileRef} className="relative">
                <button
                  className="flex items-center gap-2 p-2.5 text-[#e2e0df] hover:text-[#fdfdfd] hover:bg-[#93c5fd]/10 rounded-xl transition-all duration-300 group border border-transparent hover:border-[#93c5fd]/30"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="w-8 h-8 bg-[#fdfdfd]/20 rounded-full flex items-center justify-center border border-[#fdfdfd]/30">
                    <User className="w-4 h-4 text-[#fdfdfd]" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">Profile</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-[#fdfdfd] rounded-xl shadow-2xl border border-[#e4e2e1] py-3 z-50">
                    <div className="px-4 py-3 border-b border-[#e4e2e1] bg-gradient-to-r from-[#e4e2e1] to-[#fdfdfd]">
                      <p className="text-sm font-semibold text-[#22252c]">Guide Profile</p>
                      <p className="text-xs text-[#333333]">Manage your account</p>
                    </div>
                    {profileItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-[#363636] hover:bg-[#e4e2e1] hover:text-[#3b82f6] transition-all duration-300 flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-[#3b82f6] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                className="flex items-center gap-2 p-2.5 text-[#e2e0df] hover:text-[#fdfdfd] hover:bg-[#ff9100]/20 rounded-xl transition-all duration-300 group border border-transparent hover:border-[#ff9100]/30"
                onClick={() => setLogoutDialogOpen(true)}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block text-sm font-medium">Logout</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2.5 text-[#e2e0df] hover:text-[#fdfdfd] hover:bg-[#93c5fd]/10 rounded-xl transition-all duration-300 border border-transparent hover:border-[#93c5fd]/30"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-[#fdfdfd]/10 bg-gradient-to-b from-[#22252c]/95 to-[#1e3a8a]/95 backdrop-blur-sm">
              <div className="px-4 pt-4 pb-3 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-[#e2e0df] hover:text-[#fdfdfd] hover:bg-[#93c5fd]/10 rounded-xl transition-all duration-300 border border-transparent hover:border-[#93c5fd]/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="border-t border-[#fdfdfd]/10 pt-4 pb-4">
                <div className="px-4 space-y-2">
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-[#e2e0df]">Profile</p>
                  </div>
                  {profileItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => {
                        router.push(item.href);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-[#e2e0df] hover:text-[#fdfdfd] hover:bg-[#93c5fd]/10 rounded-xl transition-all duration-300 border border-transparent hover:border-[#93c5fd]/30"
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setLogoutDialogOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-[#ff9100] hover:text-[#fdfdfd] hover:bg-[#ff9100]/20 rounded-xl transition-all duration-300 border border-transparent hover:border-[#ff9100]/30 mt-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

       {/*  Notification Drawer */}
      <NotificationDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />

      {/* Logout Confirmation Modal */}
      {logoutDialogOpen && (
        <div className="fixed inset-0 bg-[#22252c]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fdfdfd] rounded-2xl shadow-2xl max-w-md w-full border border-[#e4e2e1]">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#ff9100] to-[#3b82f6] rounded-2xl mb-6 mx-auto">
                <LogOut className="w-8 h-8 text-[#fdfdfd]" />
              </div>

              <h3 className="text-xl font-bold text-[#22252c] text-center mb-3">
                Confirm Logout
              </h3>

              <p className="text-[#333333] text-center mb-8 leading-relaxed">
                Are you sure you want to log out from <span className="font-semibold text-[#3b82f6]">journiq</span>?
                You'll need to sign in again to access your guide dashboard.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setLogoutDialogOpen(false)}
                  className="flex-1 px-6 py-3 text-[#363636] bg-[#e4e2e1] hover:bg-[#e2e0df] rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-[#e2e0df] hover:border-[#333333]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff9100] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a] text-[#fdfdfd] rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}