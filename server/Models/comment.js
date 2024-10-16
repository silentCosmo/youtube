import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    vid:String,
    uid:String,
    commentBody:String,
    commentedUser:String,
    commentedOn:{type:Date, default:Date.now}
})
export default mongoose.model("comment", commentSchema)