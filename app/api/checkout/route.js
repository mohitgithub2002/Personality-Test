import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export async function POST(req) {
    try{
        const {email , amount} = await req.json();
        console.log(email, "+", amount)
        await connectDB();
        
        const options = {
        amount: (amount*100),  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
        };
        const order = await instance.orders.create(options);
        console.log(order);
        return NextResponse.json({order: order});

    }catch(error){
        console.log(error);
        return NextResponse.json({ data: error.message }, { status: 500 });
    }
    
}
