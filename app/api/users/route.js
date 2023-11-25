import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb"
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try{await connectDB();
    const users = await User.find();
    return NextResponse.json({status:200, data:users})
    }catch(err){
        return NextResponse.json({status:500, json:err})
    }
}

export const POST = async (req) => {
    try{
        await connectDB();
        const {email} = await req.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        return NextResponse.json({status:200, data:user})
    }catch(err){
        return NextResponse.json({status:500, json:err})
    }
}