import mongoose from 'mongoose'
const historyShema = mongoose.Schema({
    vid:{type:String,require:true},
    viewer:{type:String,require:true},
    watchedOn:{type:Date,default:Date.now()}
})

export default mongoose.model("History",historyShema)