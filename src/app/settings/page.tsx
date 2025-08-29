"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";

// Example navbar imports
import GuideNavbar from "@/components/GuideNavbar";
import TravellerNavbar from "@/components/TravellerNavbar";

const SettingsPage: React.FC = () => {
  const [role, setRole] = useState<"guide" | "traveller" | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        // ✅ Call API that reads cookies from request
        const res = await fetch("/api/auth/get-cookie", {
          method: "GET",
          credentials: "include", // send cookies
        });

        if (!res.ok) {
          throw new Error("Failed to fetch role");
        }

        const data = await res.json();
        // assuming your API returns { role: "guide" } or { role: "traveller" }
        setRole(data.role === "guide" ? "guide" : "traveller");
      } catch (err) {
        console.error("❌ Failed to get role", err);
        setRole("traveller"); // fallback
      }
    };

    fetchRole();
  }, []);

  return (
    <>
      {/* ✅ Navbar based on role */}
      {role === "guide" && <GuideNavbar />}
      {role === "traveller" && <TravellerNavbar />}

      <Box sx={{ p: 4, maxWidth: "800px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Account</Typography>
            <Divider sx={{ my: 2 }} />
            <FormControlLabel control={<Switch />} label="Enable Notifications" />
            <FormControlLabel control={<Switch />} label="Private Account" />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Preferences</Typography>
            <Divider sx={{ my: 2 }} />
            <FormControlLabel control={<Switch />} label="Dark Mode" />
            <FormControlLabel control={<Switch />} label="Email Updates" />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Danger Zone</Typography>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" color="error">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default SettingsPage;
