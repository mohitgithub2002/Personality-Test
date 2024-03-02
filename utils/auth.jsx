"use client"

import {  getSession } from "next-auth/react"
import Cookies from "js-cookie";
export async function checkUser() {
    const session = await getSession();
    console.log("user Email",session?.user?.email)
    if(session?.user?.email){
        try{
            const res =  await fetch("api/users",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:session?.user?.email})
        })
        const data = await res.json();
        Cookies.set("user",data.data.email)
        console.log("my data is ",data)
        return data.data
        }catch(err){
            console.log(err);
            return null;
        }
        
    }
    return null
    
}
