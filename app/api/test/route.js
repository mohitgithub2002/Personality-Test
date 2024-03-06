import Test from "@/models/testSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse,NextRequest } from "next/server";

export const POST = async(req) =>{
    try{
        const { testId } = await req.json();
        console.log(testId);
        await connectDB();
        let test = await Test.findById(testId);
        const questions = test.questions;
        //calculate the category length
        const categoryLength = [0];
        questions.forEach(que => {
            
            if(categoryLength[Number(que.category-1)]===undefined){
                categoryLength[Number(que.category-1)] = 0;
            }
            categoryLength[Number(que.category-1)] = categoryLength[Number(que.category-1)] + 1;
        });
        //extend test with category length
        
        test = {...test.toObject(), categoryLength: categoryLength};
        
        if (!test) {
            return NextResponse.json({status:404, data: "Test not found"});
        }
        return NextResponse.json({status:200, data: test});
    }catch(err){
        console.log(err);
        return NextResponse.json({ status: 500, json: err });
    }
}