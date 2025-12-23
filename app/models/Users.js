import mongoose from "mongoose";
const {Schema,model} = mongoose;
const Userschema = new Schema({
    email:{type:String,required:true},
    name:{type:String},
    username:{type:String,required:true},
    profilepic:{type:String},
    coverpic:{type:String},
    razorpayid:{type:String,default:""},
    razorpaysecret:{type:String,default:""},
    description:{type:String,default:""},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
})
const User= mongoose.models.User ||  model("User", Userschema);
export default User