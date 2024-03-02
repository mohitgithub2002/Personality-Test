import Test from "@/models/testSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse,NextRequest } from "next/server";

export const POST = async(req) =>{
    try{
        const { testId } = await req.json();
        console.log(testId);
        await connectDB();
        const test = await Test.findById(testId);
        let questionsList = [];
        const questions = test.questions;
        questions.forEach(data => {
            const categoryIndex = data.category - 1;
            if (!questionsList[categoryIndex]) {
                questionsList[categoryIndex] = [];
            }
            questionsList[categoryIndex].push(data.question);
        });
        
        if (!test) {
            return NextResponse.json({status:404, data: "Test not found"});
        }
        return NextResponse.json({status:200, data: test, questionsList: questionsList});
    }catch(err){
        console.log(err);
        return NextResponse.json({ status: 500, json: err });
    }
}