import videoFile from "../Models/VideoFile.js";
import mongoose from "mongoose";

export const viewsController = async (req, res) => {
    const { _id } = req.params;
    console.log(req.params);
    console.log(_id);
    
    console.log(mongoose.Types.ObjectId.isValid(_id));
    
    // Correct the check for a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Video unavailable..");
    }

    try {
        const file = await videoFile.findById(_id);

        // If no file is found, return 404
        if (!file) {
            return res.status(404).send("Video not found.");
        }

        // Increment views
        const views = file.views;
        const updateViews = await videoFile.findByIdAndUpdate(
            _id, {
                $set: { views: views + 1 }
            }, { new: true } // Return the updated document
        );

        // Respond with the updated file
        res.status(200).json(updateViews);
    } catch (error) {
        // Send the error message properly
        res.status(500).json({ error: "An error occurred while updating views", details: error.message });
    }
};

/* export const viewsController = async(req,res)=>{
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
} */