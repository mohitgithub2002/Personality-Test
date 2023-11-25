import LoginDetails from "@/components/loginDetails";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../api/auth/[...nextauth]/route";
export default async function LoginPage (){
    const session = await getServerSession(authOption)
    if(session) redirect("/dashboard")
    return (
        <div className="h-screen bg-gradient-to-tl  from-rose-400 via-pink-200 to-white">
            <LoginDetails />
        </div>
        
    )
}