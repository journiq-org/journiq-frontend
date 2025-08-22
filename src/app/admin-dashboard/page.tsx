"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Users, BookOpen, Settings, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, key: "dashboard" },
    { name: "Users", icon: <Users size={20} />, key: "users" },
    { name: "Books", icon: <BookOpen size={20} />, key: "books" },
    { name: "Settings", icon: <Settings size={20} />, key: "settings" },
  ];

  const confirmLogout = async () => {
    try {
      await fetch("/Auth/clear-cookies", { method: "POST" }); // 🔹 clears cookies
      toast.success("Logged out ✅");
      router.push("/login");
    } catch {
      toast.error("Error logging out");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold p-4 text-center border-b border-gray-700">
            Admin
          </h1>
          <ul className="p-4 space-y-2">
            {menu.map((item) => (
              <li
                key={item.key}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                  active === item.key ? "bg-indigo-600" : "hover:bg-gray-800"
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
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 p-4 border-t border-gray-700 hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {active === "dashboard" && (
          <h2 className="text-2xl font-bold">Welcome to Admin Dashboard</h2>
        )}
        {active === "users" && (
          <h2 className="text-2xl font-bold">Manage Users</h2>
        )}
        {active === "books" && (
          <h2 className="text-2xl font-bold">Manage Books</h2>
        )}
        {active === "settings" && (
          <h2 className="text-2xl font-bold">Settings</h2>
        )}
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
                onClick={confirmLogout}
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
}
