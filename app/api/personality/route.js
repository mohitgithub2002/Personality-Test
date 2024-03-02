import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import Personality from "./personality";
export const POST = async (req)=>{
    //scores are already calculated on UI for every category out of 100 and pass in api
    try{
        const {email,name,categoryScore} = await req.json();
        console.log(email,name,categoryScore);
        await connectDB();
        
        let score =0;
        categoryScore.forEach(element => {
            score = score + Number(element);
        });
        score = Math.round(score/5);
        console.log(score);
        const userScore = score;
        //check user login already or not
        const user = await User.findOne({email});

        // if not create a new user
        if(!user){
            //create a new user with email as primary key and personality type and symbol
            await User.create({name,email,categoryScore,score})
            return NextResponse.json({data:"Test Submitted user created"},{status:200})
        }

        //if yes update the personality type and symbol
        else{
            //update the personality type and symbol
            if(!user.score){
                user.name = name;
                user.score = 10;
                user.categoryScore = categoryScore;
                // user.personalityType = personality.personalityType;
                // user.personalitySymbol = personality.personalitySymbol;
                await user.save();
                return NextResponse.json({data:"Test Submitted test data updated"},{status:200})
            }
            else{
                return NextResponse.json({data:"Test already submitted"},{status:201})
            }
        }

        
    }catch(err){
        console.log(err)
        return NextResponse.json({message:err.message},{status:500})
    }
}