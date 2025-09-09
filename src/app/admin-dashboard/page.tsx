"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  fetchDashboardStats,
  selectTotalUsers,
  selectTotalGuides,
  selectTotalTours,
  selectTotalBookings,
  selectAdminLoading,
  selectAdminError,
} from "@/redux/slices/adminSlice";
import {
  Users,
  UserCheck,
  MapPin,
  CalendarCheck,
  MessageSquare,
  MessageCircleCode,
  LogOut,
  Bell,
  Search,
  Compass,
  TrendingUp,
  BarChart3,
  Activity,
  Menu,
  X,
  Home,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

// Pages
import MyBookingPage from "./booking/page";
import AdminReviewsPage from "./reviews/page";
import AdminGuidesPage from "./guide/[id]/page";
import AdminUsersPage from "./traveller/[id]/page";
import AdminMessagesPage from "./message/page";
import AdminDestinationsPage from "./destinations/page";

// Notifications
import { selectUnreadNotifications } from "@/redux/slices/notificationSlice";
import NotificationDrawer from "@/components/NotificationDrawer";

const AdminDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "dashboard";

  const [active, setActive] = useState(initialTab);
  const [showDialog, setShowDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useAppDispatch();

  // Stats from Redux
  const totalUsers = useAppSelector(selectTotalUsers);
  const totalGuides = useAppSelector(selectTotalGuides);
  const totalTours = useAppSelector(selectTotalTours);
  const totalBookings = useAppSelector(selectTotalBookings);
  const loading = useAppSelector(selectAdminLoading);
  const error = useAppSelector(selectAdminError);

  // Notifications
  const unreadNotifications = useAppSelector(selectUnreadNotifications);

  // Fetch stats on mount
  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Handle active tab + update URL
  const handleSetActive = (tab: string) => {
    setActive(tab);
    router.push(`?tab=${tab}`, { scroll: false });
  };

  // Show error toast if there's an error
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, key: "dashboard" },
    { name: "Users", icon: <Users size={20} />, key: "users" },
    { name: "Guides", icon: <UserCheck size={20} />, key: "guides" },
    { name: "Destinations", icon: <MapPin size={20} />, key: "destinations" },
    { name: "Bookings", icon: <CalendarCheck size={20} />, key: "bookings" },
    { name: "Reviews", icon: <MessageSquare size={20} />, key: "reviews" },
    { name: "Messages", icon: <MessageCircleCode size={20} />, key: "messages" },
  ];

  const statsCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Users size={24} />,
      color: "bg-blue-500",
      trend: "+12%",
      description: "Active users",
    },
    {
      title: "Total Tours",
      value: totalTours,
      icon: <MapPin size={24} />,
      color: "bg-green-500",
      trend: "+8%",
      description: "Available tours",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <CalendarCheck size={24} />,
      color: "bg-orange-500",
      trend: "+15%",
      description: "This month",
    },
    {
      title: "Active Guides",
      value: totalGuides,
      icon: <UserCheck size={24} />,
      color: "bg-purple-500",
      trend: "+5%",
      description: "Verified guides",
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/clear-cookie", { method: "POST" });
      toast.success("Logged out successfully");
    } catch (err) {
      console.warn("Failed to clear cookies", err);
    }
    router.replace("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col justify-between shadow-2xl transition-all duration-300 ease-in-out relative`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <img src={`/images/logo.png`} alt="Logo" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white">Journiq</h1>
                <span className="text-xs text-blue-300 font-medium -mt-1">
                  Admin Portal
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menu.map((item) => (
              <li
                key={item.key}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                  active === item.key
                    ? "bg-[#ff9100] text-white shadow-lg shadow-blue-600/25"
                    : "hover:bg-slate-700 text-slate-300 hover:text-white"
                }`}
                onClick={() => handleSetActive(item.key)}
              >
                <div
                  className={`${
                    active === item.key
                      ? "text-white"
                      : "text-slate-400 group-hover:text-white"
                  } transition-colors`}
                >
                  {item.icon}
                </div>
                {sidebarOpen && (
                  <span
                    className={`font-medium ${
                      active === item.key ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {item.name}
                  </span>
                )}
                {active === item.key && sidebarOpen && (
                  <ChevronRight className="w-4 h-4 ml-auto text-white" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => setShowDialog(true)}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-600 transition-all duration-200 text-slate-300 hover:text-white group"
          >
            <LogOut size={20} className="text-slate-400 group-hover:text-white" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-slate-600" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpenDrawer(true)}
                className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900">Admin</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {active === "dashboard" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Dashboard Overview
                  </h2>
                  <p className="text-slate-600 mt-1">
                    Monitor your platform's performance and key metrics
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    <Activity className="w-4 h-4" />
                    <span>Live</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}
                      >
                        {stat.icon}
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <TrendingUp className="w-3 h-3" />
                        {stat.trend}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                      {stat.value.toLocaleString()}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-slate-900">
                      Recent Activity
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-700">
                        New user registered
                      </span>
                      <span className="text-xs text-slate-500">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-700">
                        Tour booking confirmed
                      </span>
                      <span className="text-xs text-slate-500">5 min ago</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-slate-900">
                      Quick Actions
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleSetActive("users")}
                      className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                    >
                      <Users className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-blue-900">
                        Manage Users
                      </span>
                    </button>
                    <button
                      onClick={() => handleSetActive("destinations")}
                      className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
                    >
                      <MapPin className="w-6 h-6 text-green-600 mb-2" />
                      <span className="text-sm font-medium text-green-900">
                        View Destinations
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "users" && <AdminUsersPage />}
          {active === "guides" && <AdminGuidesPage />}
          {active === "destinations" && <AdminDestinationsPage />}
          {active === "bookings" && <MyBookingPage />}
          {active === "reviews" && <AdminReviewsPage />}
          {active === "messages" && <AdminMessagesPage />}
        </div>
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />

      {/* Logout dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Confirm Logout
              </h2>
              <p className="text-slate-600">
                Are you sure you want to log out from{" "}
                <span className="font-semibold text-blue-600">Journiq</span>?
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDialog(false)}
                className="flex-1 px-6 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
