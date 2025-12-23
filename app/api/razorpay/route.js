import { NextResponse } from "next/server";
import Payment from "@/app/models/payments";
import crypto from "crypto";
import connectDB from "@/app/db/connectDb";
import { fetchuser } from "@/actions/useractions";
export const POST = async(req)=>{
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)
    console.log(body.razorpay_order_id)
    let p = await Payment.findOne({oid: body.razorpay_order_id})
    let u = await fetchuser(p.to_user)
    if(!p){
        return NextResponse.json({ error: "No order ID found" }, { status: 404 });

    }
    
    const generated_signature = crypto
  .createHmac("sha256", u.razorpaysecret)
  .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
  .digest("hex");
    if (generated_signature == body.razorpay_signature) {
        const updatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new:true})
        return NextResponse.redirect(`http://localhost:3000/${updatedPayment.to_user}?paymentDone=true`)
     }
     else{
        return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
     }
}