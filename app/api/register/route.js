import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST (req){
    try{
        const {name, mobile, password, personality}= await req.json();
        await connectDB();
        const existingUser = await User.findOne({mobile})
        if(existingUser){
            return NextResponse.json({message : "User already exists"},{status: 400})
        }
        const email = "";
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name,email, mobile, password: hashedPassword, personality});
        return NextResponse.json({message : "User Created"},{status: 201})


    }catch(error){
        return NextResponse.json({message : error.message},{status: 500});
    }
}