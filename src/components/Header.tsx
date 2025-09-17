"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()

  return (
 

    <header className="w-full fixed top-0 left-0 z-50 bg-transparent px-15 py-4 flex justify-between items-center">
  {/* Logo */}
  <div
    className="text-2xl font-bold text-black flex items-center cursor-pointer"
    onClick={() => router.push("/")}
  >
    <Image src="/images/logo.png" alt="journiq-logo" width={35} height={35}  />
    Journiq
  </div>

  {/* Login Button */}
  <button
    onClick={() => router.push("/login")}
    className="bg-orange-400 text-white px-7 py-3 rounded-full text-sm hover:bg-[#5c4033] transition"
  >
    Login
  </button>
</header>

  );
};

export default Header;