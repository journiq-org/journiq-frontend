// components/GuideLayout.tsx
"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hook";
import { fetchNotifications } from "@/redux/slices/notificationSlice";
import GuideNavbar from "./GuideNavbar";

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetch immediately on mount
    dispatch(fetchNotifications());

    // optional: poll every 30 seconds for new notifications
    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <GuideNavbar />
      <main>{children}</main>
    </>
  );
}
