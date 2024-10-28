import mongoose from "mongoose";
import users from '../Models/Auth.js'

export const pointUpdationController = async(req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json('No user found with the Id')
    }
    try {
        await users.findByIdAndUpdate(
            _id,{$inc:{points:5}}
        )
        return res.status(200).json('Point updated successfuly')
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const userDetailsControlller = async(req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json('User identification failed')
    }
    try {
        const userData = await users.findById(_id)
        return res.status(200).send(userData)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}