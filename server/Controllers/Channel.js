import mongoose from "mongoose";
import users from "../Models/Auth.js"

export const updateChannelData = async (req,res)=>{
    console.log(req);
    
    const {id:_id} = req.params;
    const {name,desc} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send("Channel unavailable..")
    }
    try {
        const updateData = await users.findByIdAndUpdate(
            _id,{
                $set:{
                    name:name,
                    desc:desc,

                }
            },
            {new:true}
        )
        res.status(200).json(updateData)
    } catch (error) {
        res.status(405).json({message:error.message})
        return
    }
}

export const getAllChannels = async (req,res) =>{
    try {
        const allChannels = await users.find()
        const allChannelsData = []
        
        allChannels.forEach((channel)=>{
            allChannelsData.push({
                _id:channel._id,
                name:channel.name,
                email:channel.email,
                desc:channel.desc
            })
        })
        res.status(200).json(allChannelsData)
    } catch (error) {
        res.status(405).json({message:error.message})
        return
    }
}