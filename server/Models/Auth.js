import mongoose from "mongoose";

const userscema = mongoose.Schema({
    email:{type:String,require:true},
    user:{type:String},
    name:{type:String},
    ip:{type:String},
    city:{type:String},
    region:{type:String},
    points:{type:Number},
    desc:{type:String},
    plan:{
        tier:{type:String,default:'Free'},
        watchTime:{type:Number,default:300},
        startDate:{type:Date,default:Date.now},
        resetDate:{type:Date,default:null}
    },
    payment:{type:String,default:'inactive'},
    joinedon:{type:Date,default:Date.now}
})

export default mongoose.model("User",userscema)