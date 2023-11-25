import Question from "@/models/questionSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const GET = async ()=>{
    try{
        await connectDB();

        const questions = await Question.find();
        console.log(questions)
        return NextResponse.json({status:200, data:questions})
    }catch(err){
        console.log (err);
       return NextResponse.json({status:500, json:err})
    }
}

export const POST = async (req)=>{
    try{
        const { category, questionType ,question, score, options } = await req.json();
        await connectDB();
        await Question.create({category ,questionType, question, score , options});
        return NextResponse.json({message:"Question Created"},{status:201})
    }catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }
}



