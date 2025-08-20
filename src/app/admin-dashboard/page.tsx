"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Users,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const router = useRouter();

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, key: "dashboard" },
    { name: "Users", icon: <Users size={20} />, key: "users" },
    { name: "Books", icon: <BookOpen size={20} />, key: "books" },
    { name: "Settings", icon: <Settings size={20} />, key: "settings" },
  ];

  const handleLogout = () => {
    // Clear session logic here
    router.push("/login");
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
                  active === item.key
                    ? "bg-indigo-600"
                    : "hover:bg-gray-800"
                }`}
                onClick={() => setActive(item.key)}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleLogout}
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
    </div>
  );
}
