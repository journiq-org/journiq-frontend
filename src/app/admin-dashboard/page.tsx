

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   UserCheck,
//   MapPin,
//   CalendarCheck,
//   MessageSquare,
//   MessageCircleCode,
//   LogOut,
//   Bell,
//   Search,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import MyBookingPage from "./booking/page";
// import AllToursPage from "./tour/page";
// import AdminReviewsPage from "./reviews/page";
// import AdminGuidesPage from "./guide/page";
// import AdminUsersPage from "./traveller/page";
// import AdminMessagesPage from "./message/page";

// const AdminDashboard = () => {
//   const [active, setActive] = useState("dashboard");
//   const [showDialog, setShowDialog] = useState(false);
//   const router = useRouter();

//   const menu = [
//     { name: "Dashboard", icon: <LayoutDashboard size={20} />, key: "dashboard" },
//     { name: "Users", icon: <Users size={20} />, key: "users" },
//     { name: "Guides", icon: <UserCheck size={20} />, key: "guides" },
//     { name: "Tours", icon: <MapPin size={20} />, key: "tours" },
//     { name: "Bookings", icon: <CalendarCheck size={20} />, key: "bookings", path: "/booking/my-booking"  },
//     { name: "Reviews", icon: <MessageSquare size={20} />, key: "reviews" },
//     { name: "Messages", icon: <MessageCircleCode size={20} />, key: "messages" },
//   ];


  
//   const handleLogout = async() => {
//     try{
//       //cookie remove
//       await fetch('/api/auth/clear-cookie',{
//         method: 'POST'
//       })
//       toast.success("Logged out ✅");
//     }catch(err){
//        console.warn('Failed to clear cookies', err)
//     }

//     //redirect to home
//     router.replace('/login')
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
//         <div>
//           <h1 className="text-2xl font-bold p-6 text-center border-b border-gray-700 tracking-wide">
//             TourAdmin
//           </h1>
//           <ul className="p-4 space-y-2">
//             {menu.map((item) => (
//               <li
//                 key={item.key}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition text-sm font-medium ${
//                   active === item.key
//                     ? "bg-indigo-600 text-white shadow-md"
//                     : "hover:bg-gray-800 text-gray-300"
//                 }`}
//                 onClick={() => setActive(item.key)}
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 p-4 border-t border-gray-700 hover:bg-red-600 transition text-sm font-medium"
//         >
//           <LogOut size={20} />
//           Logout
//         </button>
//       </div>

//       {/* Main Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Navbar */}
//         <div className="flex items-center justify-between bg-white p-4 shadow-md sticky top-0 z-10">
//           <div className="flex items-center gap-3">
//             <Search className="text-gray-500" size={20} />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//           <div className="flex items-center gap-6">
//             <Bell className="text-gray-600 cursor-pointer" size={22} />
//             <div className="flex items-center gap-2 cursor-pointer">
//               <img
//                 src="https://i.pravatar.cc/40"
//                 alt="profile"
//                 className="w-9 h-9 rounded-full border"
//               />
//               <span className="text-sm font-medium">Admin</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-6 overflow-y-auto">
//           {active === "dashboard" && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                   <h3 className="text-gray-500 text-sm">Total Users</h3>
//                   <p className="text-2xl font-bold mt-2">1,245</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                   <h3 className="text-gray-500 text-sm">Total Guides</h3>
//                   <p className="text-2xl font-bold mt-2">150</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//                   <h3 className="text-gray-500 text-sm">Active Tours</h3>
//                   <p className="text-2xl font-bold mt-2">320</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {active === "users" && <AdminUsersPage/>}

//           {active === "guides" && <AdminGuidesPage/>}

//           {active === "tours" && <AllToursPage/>}

//           {active === "bookings" && <MyBookingPage/>}

//           {active === "reviews" && <AdminReviewsPage/>}

//           {active === "messages" && <AdminMessagesPage/>}
//         </div>
//       </div>

//       {/* Logout Confirmation Dialog */}
//       {showDialog && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Confirm Logout
//             </h2>
//             <p className="mt-2 text-gray-600">
//               Are you sure you want to log out of your admin account?
//             </p>

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 onClick={() => setShowDialog(false)}
//                 className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
 


// Updated AdminDashboard component using your existing Redux slice
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { 
  fetchDashboardStats, 
  selectTotalUsers, 
  selectTotalGuides, 
  selectTotalTours, 
  selectTotalBookings,
  selectAdminLoading,
  selectAdminError
} from "@/redux/slices/adminSlice";
import {
  LayoutDashboard,
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
  Settings,
  ChevronRight,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import MyBookingPage from "./booking/page";
// import AllToursPage from "./tour/page";
import AdminReviewsPage from "./reviews/page";
import AdminGuidesPage from "./guide/[id]/page";
import AdminUsersPage from "./traveller/[id]/page";
import AdminMessagesPage from "./message/page";

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [showDialog, setShowDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

// Get stats from your existing Redux store
  const totalUsers = useAppSelector(selectTotalUsers);
  const totalGuides = useAppSelector(selectTotalGuides);
  const totalTours = useAppSelector(selectTotalTours);
  const totalBookings = useAppSelector(selectTotalBookings);
  const loading = useAppSelector(selectAdminLoading);
  const error = useAppSelector(selectAdminError);

  // Fetch dashboard statistics on component mount
  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, key: "dashboard" },
    { name: "Users", icon: <Users size={20} />, key: "users" },
    { name: "Guides", icon: <UserCheck size={20} />, key: "guides" },
    { name: "Tours", icon: <MapPin size={20} />, key: "tours" },
    { name: "Bookings", icon: <CalendarCheck size={20} />, key: "bookings", path: "/booking/my-booking" },
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
      description: "Active users"
    },
    {
      title: "Total Tours",
      value: totalTours,
      icon: <MapPin size={24} />,
      color: "bg-green-500",
      trend: "+8%",
      description: "Available tours"
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <CalendarCheck size={24} />,
      color: "bg-orange-500",
      trend: "+15%",
      description: "This month"
    },
    {
      title: "Active Guides",
      value: totalGuides,
      icon: <UserCheck size={24} />,
      color: "bg-purple-500",
      trend: "+5%",
      description: "Verified guides"
    }
  ];

  const handleLogout = async() => {
    try {
      await fetch('/api/auth/clear-cookie', {
        method: 'POST'
      });
      toast.success("Logged out successfully");
    } catch (err) {
      console.warn('Failed to clear cookies', err);
    }
    router.replace('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col justify-between shadow-2xl transition-all duration-300 ease-in-out relative`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl border border-blue-500">
              <Compass className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white">journiq</h1>
                <span className="text-xs text-blue-300 font-medium -mt-1">Admin Portal</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menu.map((item) => (
              <li
                key={item.key}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                  active === item.key
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "hover:bg-slate-700 text-slate-300 hover:text-white"
                }`}
                onClick={() => setActive(item.key)}
              >
                <div className={`${active === item.key ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors`}>
                  {item.icon}
                </div>
                {sidebarOpen && (
                  <span className={`font-medium ${active === item.key ? 'text-white' : 'text-slate-300'}`}>
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

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => setShowDialog(true)}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-600 transition-all duration-200 text-slate-300 hover:text-white group"
          >
            <LogOut size={20} className="text-slate-400 group-hover:text-white" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
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
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-0 bg-slate-50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  3
                </span>
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

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {active === "dashboard" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
                  <p className="text-slate-600 mt-1">Monitor your platform's performance and key metrics</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    <Activity className="w-4 h-4" />
                    <span>Live</span>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                        {stat.icon}
                      </div>
                      {loading ? (
                        <div className="w-12 h-6 bg-slate-200 rounded-full animate-pulse"></div>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <TrendingUp className="w-3 h-3" />
                          {stat.trend}
                        </div>
                      )}
                    </div>
                    <div>
                      {loading ? (
                        <div className="space-y-2">
                          <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value.toLocaleString()}</h3>
                          <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                          <p className="text-slate-500 text-xs mt-1">{stat.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts/Additional Content Area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">New user registered</span>
                      </div>
                      <span className="text-xs text-slate-500">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Tour booking confirmed</span>
                      </div>
                      <span className="text-xs text-slate-500">5 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-slate-700">Guide application received</span>
                      </div>
                      <span className="text-xs text-slate-500">10 min ago</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setActive("users")}
                      className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                    >
                      <Users className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-blue-900">Manage Users</span>
                    </button>
                    <button
                      onClick={() => setActive("tours")}
                      className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
                    >
                      <MapPin className="w-6 h-6 text-green-600 mb-2" />
                      <span className="text-sm font-medium text-green-900">View Tours</span>
                    </button>
                    <button
                      onClick={() => setActive("bookings")}
                      className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group"
                    >
                      <CalendarCheck className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-orange-900">Bookings</span>
                    </button>
                    <button
                      onClick={() => setActive("reviews")}
                      className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
                    >
                      <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
                      <span className="text-sm font-medium text-purple-900">Reviews</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "users" && <AdminUsersPage/>}
          {active === "guides" && <AdminGuidesPage/>}
          {/* {active === "tours" && <AllToursPage/>} */}
          {active === "bookings" && <MyBookingPage/>}
          {active === "reviews" && <AdminReviewsPage/>}
          {active === "messages" && <AdminMessagesPage/>}
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Confirm Logout</h2>
              <p className="text-slate-600">
                Are you sure you want to log out from <span className="font-semibold text-blue-600">journiq</span> admin panel?
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDialog(false)}
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
      )}
    </div>
  );
};

export default AdminDashboard;