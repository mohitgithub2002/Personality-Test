"use client"

import {  getSession } from "next-auth/react"

export async function checkUser() {
    const session = await getSession();
    console.log("user Email",session?.user?.email)
    if(session?.user?.email){
        const res =  await fetch("api/users",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:session?.user?.email})
        })
        const data = await res.json();
        console.log("my data is ",data)
        return data.data
    }
    return null
    
}
