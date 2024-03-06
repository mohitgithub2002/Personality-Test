import User from "@/models/UserSchema";
import userTest from "@/models/userTestSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";
export const POST = async (req)=>{
    //scores are already calculated on UI for every category out of 100 and pass in api
    try{
        const {name,email,mobile,testId,categoryScore} = await req.json();
        console.log(name,email,mobile,testId,categoryScore);
        await connectDB();
        
        let score =0;
        categoryScore.forEach(element => {
            score = score + Number(element);
        });
        score = Math.round(score/5);
        console.log(score);
        //check user login already or not
        const user = await User.findOne({email});
        let userId
        if(!user){
            const newUser = await User.create({name,email,mobile});
            userId = newUser._id;
        }else{
            userId  = user._id;
        }
        await userTest.create({user:userId,test:testId,mobile:mobile,score:score,categoryScore:categoryScore,dateTaken:Date.now()});
        return NextResponse.json({data:"Test Submitted"},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}