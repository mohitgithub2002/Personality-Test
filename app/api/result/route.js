import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req)=>{
    
    try{
        const {email} = await req.json();
        await connectDB();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        const userScore = user.score;
        const categoryScore = user.categoryScore;
        return NextResponse.json({data:{
            userScore,
            categoryScore
        }},{status:200}
        )
 
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}