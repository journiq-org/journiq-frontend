"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // adjust path if needed

const NavbarWrapper = () => {
  const pathname = usePathname();

  // Define the routes where Navbar should appear
  const visibleRoutes = ["/login", "/register"];

  // Hide Navbar if current path is not in visibleRoutes
  if (!visibleRoutes.includes(pathname)) return null;

  return <Navbar />;
};

export default NavbarWrapper;
