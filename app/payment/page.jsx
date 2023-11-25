"use client"
import React, { useState } from 'react';
import Script from 'next/script'
const paymentPage = () => {
    const [amount, setAmount] = useState(0)
    const checkout = async() =>{
        
        const res =  await fetch("api/checkout",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                email: "hello@example.com",
                amount
                

            }),
            
        })
        const data = await res.json()
        const order = data.order;
        console.log("ordeer is",order);

        const options = {
            "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Relationship Pills",
            "description": "Premium subscription",
            "image": "",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/api/updatepremium",
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        
            
        
    }

    return (
        <>
            
            <div>
            <h1>Payment Page</h1>
            <label className="font-medium">
                amount
            </label>
            <input
                name="amount"
                type="number"
                placeholder="999"
                required
                onChange={(e)=>{setAmount(e.target.value);console.log(amount);}}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-sm rounded-lg"
            />
<button onClick={checkout}>Checkout</button>
            </div>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" /> 
        </>
        
    );
}

export default paymentPage;