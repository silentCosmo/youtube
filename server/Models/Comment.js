import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    vid:String,
    uid:String,
    city:String,
    like:{type:Number,default:0},
    likedBy:[{type:mongoose.Schema.Types.ObjectId}],
    dislikedBy:[{type:mongoose.Schema.Types.ObjectId}],
    commentBody:String,
    commentedUser:String,
    commentedOn:{type:Date, default:Date.now}
})
export default mongoose.model("comment", commentSchema)
