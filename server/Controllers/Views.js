import videoFile from "../Models/VideoFile.js";
import mongoose from "mongoose";

export const viewsController = async(req,res)=>{
    const {id,_id} = req.params;
    if(mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Video unavailable..")
    }
    try {
        const file = await videoFile.findById(_id);
        const views = file.views;
        const updateViews = await videoFile.findByIdAndUpdate(
            _id,{
                $set:{views:views+1}
            }
        )
        res.status(200).json(updateViews)
    } catch (error) {
        res.status(404).json("error",error)
        return       
    }
}