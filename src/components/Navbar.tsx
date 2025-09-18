// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Navbar = () => {
//   const pathname = usePathname();

//   const isLoginPage = pathname === "/login";
//   const isRegisterPage = pathname === "/register";

//   return (
//     <nav className="bg-[#d1cfc8] px-6 py-4 fixed top-0 left-0 w-full z-50 ">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <Image
//             src="/images/logo.png"
//             alt="Journiq Logo"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           <span className="text-lg font-bold text-[#0c0c0c]">Journiq</span>
//         </Link>

//         {/* Auth Icons */}
//         <div className="flex items-center gap-4">
//           {isLoginPage && (
//             <Link
//               href="/register"
//               className="text-[#0c0c0c]  transition"
//               title="Register"
//             >
//               <i className="fa-solid fa-user-plus"></i> 
//             </Link>
//           )}
//           {isRegisterPage && (
//             <Link
//               href="/login"
//               className="text-[#0c0c0c]  transition"
//               title="Login"
//             >
//               <i className="fa-solid fa-right-to-bracket"></i>
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-transparent px-6 lg:px-15 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link 
        href="/" 
        className="text-2xl font-bold text-orange-400 flex items-center cursor-pointer hover:text-orange-200 transition-colors duration-200"
      >
        <Image 
          src="/images/logo.png" 
          alt="journiq-logo" 
          width={35} 
          height={35} 
          className="mr-2"
        />
        Journiq
      </Link>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {isLoginPage && (
          <Link
            href="/register"
            className="bg-orange-400 text-white px-7 py-3 rounded-full text-sm hover:bg-[#5c4033] transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            title="Create Account"
          >
            Register
          </Link>
        )}
        {isRegisterPage && (
          <Link
            href="/login"
            className="bg-orange-400 text-white px-7 py-3 rounded-full text-sm hover:bg-[#5c4033] transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            title="Sign In"
          >
            Login
          </Link>
        )}
        {!isLoginPage && !isRegisterPage && (
          <Link
            href="/login"
            className="bg-orange-400 text-white px-7 py-3 rounded-full text-sm hover:bg-[#5c4033] transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            title="Login"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;