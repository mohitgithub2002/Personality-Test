"use client"
import {SessionProvider} from "next-auth/react"
import { checkUser } from "@/utils/auth"
export const AuthProvider = ({children}) => {
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

// Note: Wrap children with this authProvider in layout.js