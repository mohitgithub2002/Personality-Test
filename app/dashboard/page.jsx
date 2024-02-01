"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import {checkUser} from "@/utils/auth"
import { signOut } from "next-auth/react"
// import QuizComponent from "@/components/questionpage"
export default function Dashboard (){
    
    const [user,setUser] = useState(null)
    
    async function fetchData(){
        const user = await checkUser();
        setUser(user);
        console.log("user is ",user)
    }
    useEffect(()=>{
        fetchData()
    },[])
    return(
        <div>
            {/* <h1>Dashboard</h1>

            
            <Image src= "https://i.postimg.cc/ThPFWg48/e-commerce.png" width={150} height={150} />
            <h2>{user?user.email:null}</h2>
            <h2>{user?user.name:null}</h2>
            <h2>{user?user.personality:null}</h2>

            <button onClick={()=>signOut()}>Logout</button> */}
        {/* <QuizComponent/> */}
        </div>
    )
}

