// "use client";
// import React, { useState } from "react";
// import { Menu, X, Home, PlusSquare, Edit3, Settings } from "lucide-react";

// export default function GuideDashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="min-h-screen flex bg-[#E2E0DF] text-[#0C0C0C]">
//       {/* Sidebar */}
//       <div
//         className={`${
//           sidebarOpen ? "w-64" : "w-20"
//         } bg-[#5E361D] text-[#EFEDE9] flex flex-col transition-all duration-300`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between p-4 border-b border-[#4E4D45]">
//           <h2
//             className={`font-bold text-lg transition-all duration-300 ${
//               sidebarOpen ? "opacity-100" : "opacity-0 hidden"
//             }`}
//           >
//             Guide Panel
//           </h2>
//           <button
//             className="text-[#FF9100]"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* Sidebar Links */}
//         <nav className="flex-1 p-4 space-y-4">
//           <a
//             href="#"
//             className="flex items-center gap-3 hover:bg-[#4E4D45] p-2 rounded-md transition"
//           >
//             <Home size={20} />
//             {sidebarOpen && <span>Dashboard</span>}
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 hover:bg-[#4E4D45] p-2 rounded-md transition"
//           >
//             <PlusSquare size={20} />
//             {sidebarOpen && <span>Create Tour</span>}
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 hover:bg-[#4E4D45] p-2 rounded-md transition"
//           >
//             <Edit3 size={20} />
//             {sidebarOpen && <span>My Tours</span>}
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 hover:bg-[#4E4D45] p-2 rounded-md transition"
//           >
//             <Settings size={20} />
//             {sidebarOpen && <span>Settings</span>}
//           </a>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="w-full bg-[#EFEDE9] shadow-md p-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-[#0C0C0C]">Guide Dashboard</h1>
//           <button className="bg-[#FF9100] text-white px-4 py-2 rounded-lg shadow hover:bg-[#E07F00]">
//             + New Tour
//           </button>
//         </header>

//         {/* Content Area */}
//         <main className="flex-1 p-6 bg-[#E0DDD7]">
//           <h2 className="text-xl font-semibold mb-4">Welcome, Guide!</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="bg-[#EFEDE9] rounded-xl p-6 shadow hover:shadow-lg transition">
//               <h3 className="text-lg font-bold mb-2 text-[#0C0C0C]">
//                 My Tours
//               </h3>
//               <p className="text-sm text-[#4E4D45]">
//                 Manage and edit your existing tours.
//               </p>
//             </div>
//             <div className="bg-[#EFEDE9] rounded-xl p-6 shadow hover:shadow-lg transition">
//               <h3 className="text-lg font-bold mb-2 text-[#0C0C0C]">
//                 Bookings
//               </h3>
//               <p className="text-sm text-[#4E4D45]">
//                 View all bookings made for your tours.
//               </p>
//             </div>
//             <div className="bg-[#EFEDE9] rounded-xl p-6 shadow hover:shadow-lg transition">
//               <h3 className="text-lg font-bold mb-2 text-[#0C0C0C]">
//                 Notifications
//               </h3>
//               <p className="text-sm text-[#4E4D45]">
//                 Stay updated with recent activities.
//               </p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client"; 
import React from "react";
import { Bell, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#E2E0DF] text-[#0C0C0C] flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#EFEDE9] shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#5E361D]">Guide Dashboard</h1>

        <nav className="hidden md:flex gap-8 font-medium">
          <a href="#" className="hover:text-[#FF9100] transition">Dashboard</a>
          <a href="/guide/tours" className="hover:text-[#FF9100] transition cursor-pointer">My Tours</a>
          <a href="#" className="hover:text-[#FF9100] transition">Bookings</a>
          <a href="#" className="hover:text-[#FF9100] transition">Settings</a>
        </nav>

        <div className="flex items-center gap-6">
          <button className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#FF9100] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
          </button>
          <button className="flex items-center gap-2 hover:text-[#FF9100]">
            <User className="w-6 h-6" />
            <span className="hidden md:block">Profile</span>
          </button>
          <button className="flex items-center gap-2 hover:text-[#FF9100]">
            <LogOut className="w-6 h-6" />
            <span className="hidden md:block" onClick={() => router.push('/')}>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#E0DDD7]">
        <h2 className="text-xl font-semibold mb-6">Welcome, Guide!</h2>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => router.push("/guide/tours")}
            className="bg-[#EFEDE9] rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-lg font-bold mb-2">My Tours</h3>
            <p className="text-sm text-[#4E4D45]">Manage and edit your tours.</p>
          </div>

          <div className="bg-[#EFEDE9] rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2">Bookings</h3>
            <p className="text-sm text-[#4E4D45]">View bookings for your tours.</p>
          </div>

          <div className="bg-[#EFEDE9] rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2">Notifications</h3>
            <p className="text-sm text-[#4E4D45]">Stay updated with recent activities.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#5E361D] text-[#EFEDE9] py-4 text-center text-sm">
        © 2025 Journiq Guide Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
