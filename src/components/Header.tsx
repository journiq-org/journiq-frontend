"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()

  return (
    <header className="w-full bg-[#E2E0DF]  px-15 py-4 flex justify-between items-center relative">

      {/* Logo / Brand */}
      <div className="text-2xl font-bold text-[#0c0c0c] flex justify-center align-center cursor-pointer" 
      onClick={() => router.push("/")}
      >
        <Image src={'/images/logo.png'} alt="journiq-logo" width={35} height={35}/>
        Journiq
      </div>

      {/* login button */}

      <button
      onClick={() => router.push('/login')}
      className="bg-[#0c0c0c] text-white px-7 py-3 rounded-4xl text-sm hover:bg-[#5c4033] transition cursor-pointer"
      >
        Login
      </button>

    </header>
  );
};

export default Header;