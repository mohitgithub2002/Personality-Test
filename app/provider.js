"use client"
import {SessionProvider} from "next-auth/react"

export const AuthProvider = ({children}) => {
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

// Note: Wrap children with this authProvider in layout.js