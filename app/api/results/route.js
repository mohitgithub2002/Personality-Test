import User from "@/models/UserSchema";
import userTest from "@/models/userTestSchema";
import Test from "@/models/testSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";
export const POST = async (req)=>{
    
    try{
        const {email, testId} = await req.json();
        await connectDB();
        const user = await User.findOne({email});
        const test = await Test.findOne({_id:testId})
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        const userId = user._id;
        const userTestResult = await userTest.findOne({user:userId, test:testId});
        console.log(userTestResult);
        return NextResponse.json({data:{
            title: test.title,
            category: test.category, 
            description: test.description,
            score: userTestResult.score,
            categoryScore: userTestResult.categoryScore,
            traits: test.traits, 
        }},{status:200}
        )
 
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}