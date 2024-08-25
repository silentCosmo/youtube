import mongoose from "mongoose";
const videoFileSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            require:true
        },
        name:{
            type:String,
            require:true
        },
        type:{
            type:String,
            require:true
        },
        path:{
            type:String,
            require:true
        },
        size:{
            type:String,
            require:true
        },
        channel:{
            type:String,
            require:true
        },
        like:{
            type:Number,
            default:0
        },
        views:{
            type:Number,
            default:0
        },
        uploader:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("VideoFiels",videoFileSchema)