import Test from "@/models/testSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const GET = async()=>{
    try{
        await connectDB();
        const tests =  await Test.find({}, 'title description ').exec();
        console.log(tests);
        return NextResponse.json({status:200, data: tests});
    }catch(err){
        return NextResponse.json({ status: 500, json: err });
    }
}

export const POST = async(req) =>{
    try{
        const {title,description,category,questions,traits} = await req.json();
        await connectDB();
        await Test.create({title,description,category,questions,traits});
        return NextResponse.json({status:200, data: "question created succesfully"});
    }catch(err){
        return NextResponse.json({ status: 500, json: err });
    }
}