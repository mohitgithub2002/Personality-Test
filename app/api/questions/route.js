import Question from "@/models/questionSchema";
import { connectDB } from "@/utils/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async ()=>{
    try{
        await connectDB();

        const questions = await Question.find();
        return NextResponse.json({status:200, data:questions})
    }catch(err){
       return NextResponse.json({status:500, json:err})
    }
}

export const POST = async (req)=>{
    try{
        const {id, question,options} = await req.json();
        await connectDB();
        await Question.create({id, question,options});
        return NextResponse.json({message:"Question Created"},{status:201})
    }catch(err){
        return NextResponse.json({message:err.message},{status:500})
    }
}



