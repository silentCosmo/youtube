import mongoose from "mongoose";
const watchLaterVideoSchema = mongoose.Schema({
    vid:{type:String,required:true},
    viewer:{type:String,required:true},
    addedOn:{type:Date,default:Date.now()}
})

export default mongoose.model("WatchLater",watchLaterVideoSchema)