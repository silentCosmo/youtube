import videoFile from "../Models/VideoFile.js";
import mongoose from "mongoose";

export const  likeController = async(req,res)=>{
    console.log(req.params);
    console.log(req.body);
    
    const {id:_id} = req.params;
    const {like} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Video unavailable..")
    }
    try {
        const updateLike = await videoFile.findByIdAndUpdate(
            _id,{
                $set:{"like":like}
            }
        )
        res.status(200).json(updateLike)
    } catch (error) {
        res.status(404).json("error",error)
        return       
    }
}