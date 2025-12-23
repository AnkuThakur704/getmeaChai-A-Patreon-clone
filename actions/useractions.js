"use server"
import Razorpay from "razorpay"
import Payment from "@/app/models/payments"
import connectDB from "@/app/db/connectDb"
import User from "@/app/models/Users"
import Poster from "@/app/models/posts"
export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    let u = await fetchuser(to_username)
    var instance = new Razorpay({
  key_id: u.razorpayid, 
  key_secret: u.razorpaysecret
})
    
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }
    let x = await instance.orders.create(options) 
    await Payment.create({oid:x.id,amount:amount,to_user:to_username,name:paymentform.name,message:paymentform.message})
    return x
}


export const fetchuser = async(username)=>{
    await connectDB()
    let npuser  = await User.findOne({username}).lean()
   if (!npuser) return false; // no user found

  return {
    ...npuser,
    _id: npuser._id.toString(), // convert ObjectId → string
  };
}
export const fetchpayments = async(username)=>{
    await connectDB()
    let pay = await Payment.find({to_user:username}).sort({amount:-1}).lean().limit(11)
    let p = JSON.parse(JSON.stringify(pay));
    return p;
}
export const fetchALLpayments = async(username)=>{
    await connectDB()
    let payALL = await Payment.find({to_user:username}).lean()
    let pALL = JSON.parse(JSON.stringify(payALL));
    return pALL;
}



export const updateProfile = async(data,oldusername)=>{
    await connectDB()
    let ndata = Object.fromEntries(data)
    if(oldusername!==ndata.username){
        let u = await User.findOne({username:oldusername})
        if(u){
            return{error:"Username should be unique"}
        }
        

    }  
    await User.updateOne({email:ndata.email},ndata)
}

export const updateposts = async(username)=>{
    await connectDB()
    await Poster.create({user:username,picture:"https://imgs.search.brave.com/uUFA4iDzqif1Y5gp0B8h7ieXHqfhNFbCW2DuuZBw5fo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdmUtc3VpdGUv/cGhvdG9ncmFwaHkv/YW5pbWF0ZS1zb2Np/YWwud2VicA"})
    console.log("this is created....done")
}