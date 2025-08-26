

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  MapPin,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, key: "dashboard" },
    { name: "Users", icon: <Users size={20} />, key: "users" },
    { name: "Guides", icon: <UserCheck size={20} />, key: "guides" },
    { name: "Tours", icon: <MapPin size={20} />, key: "tours" },
    { name: "Bookings", icon: <CalendarCheck size={20} />, key: "bookings" },
    { name: "Reviews", icon: <MessageSquare size={20} />, key: "reviews" },
    { name: "Settings", icon: <Settings size={20} />, key: "settings" },
  ];


  
  const handleLogout = async() => {
    try{
      //cookie remove
      await fetch('/api/auth/clear-cookie',{
        method: 'POST'
      })
      toast.success("Logged out ✅");
    }catch(err){
       console.warn('Failed to clear cookies', err)
    }

    //redirect to home
    router.replace('/')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-bold p-6 text-center border-b border-gray-700 tracking-wide">
            TourAdmin
          </h1>
          <ul className="p-4 space-y-2">
            {menu.map((item) => (
              <li
                key={item.key}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition text-sm font-medium ${
                  active === item.key
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
                onClick={() => setActive(item.key)}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-4 border-t border-gray-700 hover:bg-red-600 transition text-sm font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white p-4 shadow-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-6">
            <Bell className="text-gray-600 cursor-pointer" size={22} />
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-9 h-9 rounded-full border"
              />
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {active === "dashboard" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                  <h3 className="text-gray-500 text-sm">Total Users</h3>
                  <p className="text-2xl font-bold mt-2">1,245</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                  <h3 className="text-gray-500 text-sm">Total Guides</h3>
                  <p className="text-2xl font-bold mt-2">150</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                  <h3 className="text-gray-500 text-sm">Active Tours</h3>
                  <p className="text-2xl font-bold mt-2">320</p>
                </div>
              </div>
            </div>
          )}

          {active === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">User Management</h2>
              <div className="bg-white rounded-xl shadow p-4">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr className="text-left text-gray-600">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-3">John Doe</td>
                      <td className="p-3">john@example.com</td>
                      <td className="p-3">Active</td>
                      <td className="p-3 flex gap-2">
                        <button className="text-red-600">Block</button>
                        <button className="text-gray-600">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {active === "guides" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Guide Verification</h2>
              <div className="bg-white rounded-xl shadow p-4">
                <p>List of guides pending verification will appear here.</p>
              </div>
            </div>
          )}

          {active === "tours" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Tour Moderation</h2>
              <div className="bg-white rounded-xl shadow p-4">
                <p>Admin can block/unblock tours, view tours by guide, etc.</p>
              </div>
            </div>
          )}

          {active === "bookings" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Booking Moderation</h2>
              <div className="bg-white rounded-xl shadow p-4">
                <p>Admin can review bookings and check details here.</p>
              </div>
            </div>
          )}

          {active === "reviews" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Review Moderation</h2>
              <div className="bg-white rounded-xl shadow p-4">
                <p>Admin can delete inappropriate reviews.</p>
              </div>
            </div>
          )}

          {active === "settings" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <div className="bg-white rounded-xl shadow p-6 space-y-4">
                <p>General admin settings page.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to log out of your admin account?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
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
 