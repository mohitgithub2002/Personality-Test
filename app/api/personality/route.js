import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req)=>{
    try{
        const {mobile,personality} = await req.json();
        console.log(mobile,personality)
        await connectDB();
        const user = await User.findOne({mobile});
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        if(user.personality){
            User.updateOne({mobile:mobile},{$set:{personality:personality}});
            return NextResponse.json({message:"Personality Updated"},{status:201})
        }
        else{
            return NextResponse.json({message:"Personality already exists"},{status:201})
        }


        
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}