"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter()
  return (
    <footer className="w-full bg-slate-900 px-6 py-10 flex flex-col   text-[#0c0c0c] shadow-md ">
      
      {/* text & button */}
      <div className=" flex flex-row  justify-between items-start px-10 pb-6">
        <div >
          <h1 className=" text-gray-400 text-6xl font-bold leading-tight">Pack your bags, your<br/> <span className="text-slate-600 "> adventure awaits!</span></h1>
        </div>
        <div className="">
          <Button 
            className="bg-white text-gray-700 rounded-full font-medium transition hover:bg-orange-400 mt-5 px-5 py-5 "
            onClick={() => router.push('/login')} >Book a Vacation <span>&gt;&gt;&gt;</span></Button>
        </div>
      </div>
      <hr className="border-gray-700 mx-10 mt-6"/>


<div className="flex justify-between items-center  py-6 px-10">
    <div className="flex flex-row  align-center items-center justify-start">
      <h6 className=" text-gray-300 font-semibold text-xl px-10 pt-5">Explore</h6>
      <div className="px-10 text-gray-500  pt-6 flex gap-10 ">
        <a href="#why-choose-us" className="px-4 py-2 rounded-full hover:bg-white hover:text-gray-900 transition"> Why Choose Us</a>
        <a href="#destination" className="px-4 py-2 rounded-full hover:bg-white hover:text-gray-900 transition">Destination</a>
        <a href="#about" className="px-4 py-2 rounded-full hover:bg-white hover:text-gray-900 transition">About Us</a>
        <a href="#review" className="px-4 py-2 rounded-full hover:bg-white hover:text-gray-900 transition"> Testimonials</a>
      </div>
    </div>

      {/* Logo + Text */}
      <div className="flex flex-row items-center justify-end px-10  gap-2  ">
        <Image src="/images/logo.png" alt="journiq-logo" width={35} height={35} />
        <span className="text-2xl text-gray-400  font-bold">Journiq</span>
      </div>
</div>

      {/* Copyright */}
      {/* <div className="text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Journiq. All rights reserved.
      </div> */}
    </footer>
  );
};

export default Footer;
