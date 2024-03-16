import Users from "@/models/userModel";
import Submit from "@/models/submissionModels";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";
export const POST = async (req)=>{
    try{
        const {email,testId,answers} = await req.json();
        await connectDB();
        const user = await Users.findOne({email});
        if(!user){
           return NextResponse.json({data:"Please Login first"},{status:401});
        }
        const userId  = user._id;
        await Submit.create({user:userId,test:testId,answers:answers});
        return NextResponse.json({data:"Test Submitted"},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}