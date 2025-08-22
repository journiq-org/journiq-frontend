"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  return (
    <nav className="bg-transparent px-6 py-4 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Journiq Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-lg font-bold text-[#0c0c0c]">Journiq</span>
        </Link>

        {/* Auth Icons */}
        <div className="flex items-center gap-4">
          {isLoginPage && (
            <Link
              href="/register"
              className="text-[#0c0c0c] hover:text-indigo-600 text-2xl"
              title="Register"
            >
              <i className="fa-solid fa-user-plus"></i>
            </Link>
          )}
          {isRegisterPage && (
            <Link
              href="/login"
              className="text-[#0c0c0c] hover:text-indigo-600 text-2xl"
              title="Login"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
