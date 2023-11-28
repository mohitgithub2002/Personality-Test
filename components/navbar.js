"use client"
import Link from "next/link"
import Image from "next/image"
import { signOut} from "next-auth/react"
import { useRouter } from 'next/navigation'
import { checkUser } from "@/utils/auth"
import { useEffect, useState } from "react"

export default function Navbar() {
    const router = useRouter()
    const [user, setUser] = useState(null)

    async function fetchData() {
        const user = await checkUser();
        setUser(user);
        console.log("user is ", user)
    }

    useEffect(() => {
        fetchData()
    }, [router])

    return (
        <div className="flex justify-center items-center w-full h-20 shadow-xl  bg-white backdrop-blur-xl back">
            <div className="flex justify-between items-center h-full py-4 w-[1284px] max-w-[1284px] px-4 lg:px-0">
                <Link href="/" className="flex gap-2 flex-center">
                    <Image src="/logo.png" alt="logo" width={200} height={200} />
                </Link>
                {user ?
                    <div className="hidden md:flex md:items-center md:gap-4 text-black ">
                        <button onClick={() => signOut()} className="navbar-brand text-red-600 p-2 border-r-2">LogOut</button>
                        <p className="text-black">Hi, {user ? user.name : null} </p>
                    </div>
                    :
                    <div>
                        <Link href={"/login"} className="text-color3 p-2 border-r-2">Login</Link>
                        <Link href={"/register"} className="text-color3 p-2 ">Register</Link>
                    </div>
                }
            </div>
        </div>
    )
}