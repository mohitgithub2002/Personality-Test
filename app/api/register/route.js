import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST (req){
    try{
        const {name, email, password}= await req.json();
        await connectDB();
        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json({data : "User already exists",status: 400})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password: hashedPassword});
        return NextResponse.json({data : "User Created",status: 201})


    }catch(error){
        console.log(error);
        return NextResponse.json({data : error.message},{status: 500});
    }
}