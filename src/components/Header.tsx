"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()

  return (
    <header className="w-full bg-[#E2E0DF]  px-15 py-4 flex justify-between items-center relative">

      {/* Menu Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#d1cfc8]  px-7 py-3 rounded-4xl hover:bg-[#4E4D45] text-[#0c0c0c] hover:text-white"
        >
          Menu
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 text-[#5E361D] right-0 left-5 mt-2 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 w-40">
            <a href="/" className=" hover:text-amber-700">Home</a>
            <a href="/tours" className="hover:text-amber-700">Tours</a>
            <a href="/destinations" className="hover:text-amber-700">Destinations</a>
            <a href="/contact" className="hover:text-amber-700">Contact</a>
          </div>
        )}
      </div>

      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-[#0c0c0c] flex justify-center align-center">
        <Image src={'/images/logo.png'} alt="journiq-logo" width={35} height={35}/>
        Journiq
      </div>

      {/* login button */}

      <button
      onClick={() => router.push('/login')}
      className="bg-[#0c0c0c] text-white px-7 py-3 rounded-4xl text-sm hover:bg-[#5c4033] transition"
      >
        Login
      </button>

    </header>
  );
};

export default Header;