"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import TravellerNavbar from "@/components/TravellerNavbar"; 

const TravellerDashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/login"); // ✅ Redirect to login after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      {/* ✅ Navbar on top */}
      <TravellerNavbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Traveller Dashboard</h1>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TravellerDashboard;
