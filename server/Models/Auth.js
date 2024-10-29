import mongoose from "mongoose";

const userscema = mongoose.Schema({
    email:{type:String,require:true},
    name:{type:String},
    ip:{type:String},
    city:{type:String},
    region:{type:String},
    points:{type:Number},
    desc:{type:String},
    joinedon:{type:Date,default:Date.now}
})

export default mongoose.model("User",userscema)