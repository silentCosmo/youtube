import comment from "../Models/Comment.js";
import mongoose from "mongoose";

export const postComment = async(req,res)=>{
    const commentData = req.body
    
    const postComment = new comment(commentData)
    try {
        await postComment.save()
        res.status(200).json("Comment was posted") 
    } catch(error){
        res.status(400).json(error.message)
        return
    }
}

export const getComment = async(req,res)=>{
    try {
        const commentList = await comment.find()
        res.status(200).send(commentList)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const deleteComment = async(req,res)=>{
    const {id:_id} = req.params
    console.log(req.params);
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send("Comment unavailable..")
    }
    try {
        await comment.findByIdAndDelete(_id)
        res.status(200).json({message:"Comment deleted successfully"})
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const editComment = async(req,res)=>{
    const {id:_id} = req.params
    const {commentBody} =  req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send("Comment unavailable..")
    }
    try {
        const updateComment = await  comment.findByIdAndUpdate(
            _id,
            {$set:{"commentBody": commentBody}}
        )
        res.status(200).json(updateComment)
    } catch (error) {
        res.status(400).json(error.message)
    }
    return
}