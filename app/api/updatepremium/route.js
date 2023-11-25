import { NextResponse } from "next/server";
import crypto from "crypto";
import { redirect } from "next/navigation";
export const POST = async (req) => {
    
  try {
      const body = await req.formData();
      const payment_id = body.get('razorpay_payment_id');
      const order_id =  body.get('razorpay_order_id');
      const signature =  body.get('razorpay_signature');

      //verification
      const data = order_id + "|" + payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(data.toString())
        .digest("hex");

        const isAuthentic = expectedSignature === signature;

        console.log(req.url)
        console.log(isAuthentic)
        if(isAuthentic){
            // const response = NextResponse.create();
            // const cookie = {}
            // response.cookies.set(cookie);
            return NextResponse.redirect(`http://localhost:3000/dashboard?id=${payment_id}`)
        }else{
            return NextResponse.redirect (
                `http://localhost:3000/payment?reference=${payment_id}`
            );
        }
      console.log(isAuthentic);
      
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: error.message }, { status: 500 });
  }
};
