import Poster from '@/app/models/posts'
import connectDB from '@/app/db/connectDb';

export const  GET= async(req,{params})=>{
    console.log("i am called")
    await connectDB();
    const {username}  = params
    let poster = await Poster.find({user:username}).lean();
    if(!poster) return false;
    else{
        return  Response.json(poster);
    }
}
