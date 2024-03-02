import User from "@/models/UserSchema";
import userTest from "@/models/userTestSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";
export const POST = async (req)=>{
    //scores are already calculated on UI for every category out of 100 and pass in api
    try{
        const {email,testId,categoryScore} = await req.json();
        console.log(email,categoryScore);
        await connectDB();
        
        let score =0;
        categoryScore.forEach(element => {
            score = score + Number(element);
        });
        score = Math.round(score/5);
        console.log(score);
        //check user login already or not
        const user = await User.findOne({email});
        if(!user){
           return NextResponse.json({data:"Please Login first"},{status:401});
        }
        const userId  = user._id;
        await userTest.create({user:userId,test:testId,score:score,categoryScore:categoryScore,dateTaken:Date.now()});
        return NextResponse.json({data:"Test Submitted"},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}