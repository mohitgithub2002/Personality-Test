import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req)=>{
    //scores are already calculated on UI for every category out of 100 and pass in api
    try{
        const {email,answers,categoryscore} = await req.json();
        console.log(email,answers,categoryscore);
        await connectDB();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User not found",status:404})
        }
        console.log("userScore is"+user.score);
        if(!user.score){
            let totalScore = 0;
            categoryscore.forEach(element => {
                totalScore += Number(element)
            });
            const userScore = totalScore/(categoryscore.length);
            console.log(userScore);
            user.score = userScore;
            user.quizAnswer = answers;
            user.categoryScore = categoryscore;
            await user.save();
            return NextResponse.json({data:"Test Submitted",status:200})
        }
        else{
            return NextResponse.json({data:"Personality already exists",status:201})
        }


        
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}