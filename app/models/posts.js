import mongoose from "mongoose";
const { Schema,model } = mongoose;
const Posterschema = new Schema({
    user: { type: String, required: true },
    picture:{type:String,required:true},
    description:{type:String},
    likes:{type:Number},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    done:{type:Boolean,default:false}
})

const Poster= mongoose.models.Poster || model("Poster", Posterschema);
export default Poster