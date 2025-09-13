"use client";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 px-6 py-23 flex flex-col items-center  text-[#0c0c0c] shadow-md mt-10">
      {/* Logo + Text */}
      <div className="flex items-center  gap-2 mb-3">
        <Image src="/images/logo.png" alt="journiq-logo" width={35} height={35} />
        <span className="text-lg text-white font-semibold">Journiq</span>
      </div>

      {/* Copyright */}
      <div className="text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Journiq. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
