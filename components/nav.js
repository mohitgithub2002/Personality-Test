"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react"
import Cookies from "js-cookie";

const Navbar = () => { 
  // const { data: session, status } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  // if( status === "authenticated"){
  //   setUser(session.user.email)
  // }

  const logout = () => {
    signOut({callbackUrl: '/login'})
    Cookies.remove('user');
  }
  return(
    <nav className="bg-white border-gray-200 shadow-black drop-shadow-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href="https://relationshipplus.xyz/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo1.png" className="h-10" alt="Relationship plus Logo"/>
      </Link>
      {<div className="relative">
        <div onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
          <Image src="/avatar.png" width={40} height={40} alt="avatar" className="cursor-pointer"  />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
              <Link href="/profile">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</div>
              </Link>
              <button onClick={logout}>
                <div className="block px-4 py-2 text-sm  hover:bg-gray-100 text-red-700">Logout</div>
              </button>
            </div>
          )}
        </div>
      </div>
      }
      
      </div>
    </nav>

  )
}

export default Navbar;