import Users from "@/models/userModel";
import Submit from "@/models/submissionModels";
import Tests from "@/models/testModal";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";
export const POST = async (req)=>{
    const {email,testId} = await req.json();
    try{
        await connectDB();
        const user = await Users.findOne({email});
        if(!user){
           return NextResponse.json({data:"Please Login first"},{status:401});
        }
        const userId  = user._id;
        const test = await Tests.findById(testId);
        const questions = test.questions;
        const userResponse  = await Submit.findOne({user:userId,test:testId});
        if(!userResponse){
            return NextResponse.json({data:"Test not taken yet"},{status:404});
        }
        const answers = userResponse.answers;
        const results = [];
        answers.forEach((answer,Qindex)=>{
            const res = answer.answer
            const question = questions[Qindex];
            const category = question.category;
            const options = question.options;
            let detail = [];
            res.forEach(Aindex => {
                detail.push(options[Aindex].description)
            });
            const result = {
                category:category,
                detail:detail
            }
            results.push(result)
        });
        return NextResponse.json({data:results},{status:200});
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}