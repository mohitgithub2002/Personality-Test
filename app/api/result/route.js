import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import Personality from "./aboutPersonality";
import dichotomy from "./dichotmy";
export const POST = async (req)=>{
    
    try{
        const {email} = await req.json();
        await connectDB();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        
        const categoryScore = user.categoryScore;
        const score = user.score;
        const about = "You are a person who is";
        const aboutCategory = ["Energized by the outer world","Energized by the inner world","Absorbed in the present","Absorbed in the future","Focused on the present"];
        return NextResponse.json({data:{
            // personalityType,
            // personalitySymbol,
            // aboutPersonality,
            score,
            about,
            categoryScore,
            aboutCategory
            // traits,
            // traitAbout
        }},{status:200}
        )
 
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}