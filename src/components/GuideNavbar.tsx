// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { Bell, User, LogOut } from "lucide-react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function GuideNavbar() {
//   const router = useRouter();
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
//   const profileRef = useRef<HTMLDivElement>(null);

//   // ✅ Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ✅ Logout function
//   const handleLogout = async () => {
//     try {
//       await fetch("/api/auth/clear-cookie", { method: "POST" });
//       toast.success("Logged out ✅");
//     } catch (err) {
//       console.warn("Failed to clear cookies", err);
//     }
//     router.replace("/login");
//   };

//   return (
//     <>
//       <header className="w-full bg-[#EFEDE9] shadow-md px-6 py-4 flex justify-between items-center">
//         {/* Brand */}
//         <h1 className="text-2xl font-bold text-[#5E361D]">Guide Dashboard</h1>

//         {/* Nav Links */}
//         <nav className="hidden md:flex gap-8 font-medium">
//           <a href="/guide-dashboard" className="hover:text-[#FF9100] transition">Dashboard</a>
//           <a href="/guide/tours" className="hover:text-[#FF9100] transition cursor-pointer">My Tours</a>
//           <a href="/booking/guide-booking" className="hover:text-[#FF9100] transition">Bookings</a>
//           <a href="/guide-dashboard/settings" className="hover:text-[#FF9100] transition">Settings</a>
//         </nav>

//         {/* Right Section */}
//         <div className="flex items-center gap-6">
//           {/* Notifications */}
//           <button className="relative">
//             <Bell className="w-6 h-6" />
//             <span className="absolute -top-2 -right-2 bg-[#FF9100] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//               3
//             </span>
//           </button>

//           {/* Profile Dropdown */}
//           <div ref={profileRef} className="relative">
//             <button
//               className="flex items-center gap-2 hover:text-[#FF9100]"
//               onClick={() => setProfileOpen(!profileOpen)}
//             >
//               <User className="w-6 h-6" />
//               <span className="hidden md:block">Profile</span>
//             </button>

//             {profileOpen && (
//               <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 w-48 z-20">
//                 <button
//                   onClick={() => router.push("/guide-dashboard/profile/view-profile")}
//                   className="text-left hover:text-amber-700"
//                 >
//                   View Profile
//                 </button>
//                 <button
//                   onClick={() => router.push("/guide-dashboard/profile/edit-profile")}
//                   className="text-left hover:text-amber-700"
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   onClick={() => router.push("/guide-dashboard/profile/change-password")}
//                   className="text-left hover:text-amber-700"
//                 >
//                   Change Password
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Logout */}
//           <button
//             className="flex items-center gap-2 hover:text-[#FF9100]"
//             onClick={() => setLogoutDialogOpen(true)}
//           >
//             <LogOut className="w-6 h-6" />
//             <span className="hidden md:block">Logout</span>
//           </button>
//         </div>
//       </header>

//       {/* 🔹 Logout Confirmation Dialog */}
//       {logoutDialogOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-96">
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Logout</h2>
//             <p className="text-sm text-gray-600 mb-6">Are you sure you want to log out?</p>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setLogoutDialogOpen(false)}
//                 className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, User, LogOut, Menu, X, Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { fetchNotifications, selectUnreadNotifications } from "@/redux/slices/notificationSlice";

export default function GuideNavbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const unreadNotifications = useAppSelector(selectUnreadNotifications);

  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { href: "/guide-dashboard/settings", label: "Settings" },
  ];

  const profileItems = [
    { href: "/guide-dashboard/profile/view-profile", label: "View Profile" },
    { href: "/guide-dashboard/profile/edit-profile", label: "Edit Profile" },
    { href: "/guide-dashboard/profile/change-password", label: "Change Password" },
  ];

  return (
    <>
      <header className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand & Logo */}
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Compass className="w-6 h-6 text-white" />
              </div>

              {/* Brand Name */}
              <div className="flex flex-col">
                <h1
                  className="text-xl font-bold text-white cursor-pointer hover:text-blue-100 transition-colors duration-200"
                  onClick={() => router.push('/guide-dashboard')}
                >
                  journiq
                </h1>
                <span className="text-xs text-blue-100 font-medium -mt-1">
                  Guide Portal
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-blue-100 hover:text-white hover:bg-white/10 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button
                className="relative p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
                onClick={() => router.push("/notifications")}
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium shadow-lg">
                    {unreadNotifications.length}
                  </span>
                )}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-200 group-hover:w-3/4"></div>
              </button>

              {/* Profile Dropdown */}
              <div ref={profileRef} className="relative">
                <button
                  className="flex items-center gap-2 p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">Profile</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">Guide Profile</p>
                      <p className="text-xs text-slate-500">Manage your account</p>
                    </div>
                    {profileItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                className="flex items-center gap-2 p-2 text-blue-100 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200 group"
                onClick={() => setLogoutDialogOpen(true)}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block text-sm font-medium">Logout</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-gradient-to-r from-blue-600/95 to-indigo-700/95 backdrop-blur-sm">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-3 text-base font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 pb-3">
                <div className="px-2 space-y-1">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-blue-100">Profile</p>
                  </div>
                  {profileItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => {
                        router.push(item.href);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setLogoutDialogOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {logoutDialogOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-6 mx-auto">
                <LogOut className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 text-center mb-3">
                Confirm Logout
              </h3>

              <p className="text-slate-600 text-center mb-8 leading-relaxed">
                Are you sure you want to log out from <span className="font-semibold text-blue-600">journiq</span>?
                You'll need to sign in again to access your guide dashboard.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setLogoutDialogOpen(false)}
                  className="flex-1 px-6 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
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