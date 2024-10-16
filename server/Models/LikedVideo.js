import mongoose from "mongoose";
const likedVideoSchema = mongoose.Schema({
    vid:{type:String,required:true},
    viewer:{type:String,required:true},
    likedOn:{type:Date,default:Date.now()}
})

export default mongoose.model("LikedVideo",likedVideoSchema)