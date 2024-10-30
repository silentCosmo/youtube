import comment from "../Models/Comment.js";
import mongoose from "mongoose";

export const postComment = async (req, res) => {
  const commentData = req.body;

  const postComment = new comment(commentData);
  try {
    await postComment.save();
    res.status(200).json("Comment was posted");
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const getComment = async (req, res) => {
  try {
    const commentList = await comment.find().populate({path:"uid",select:"city name"})
    
    res.status(200).send(commentList);
  } catch (error) {
    console.log(error.message);
    
    res.status(400).json(error.message);
    return;
  }
};

export const deleteComment = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.params);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comment unavailable..");
  }
  try {
    await comment.findByIdAndDelete(_id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const editComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentBody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comment unavailable..");
  }
  try {
    const updateComment = await comment.findByIdAndUpdate(_id, {
      $set: { commentBody: commentBody },
    });
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(400).json(error.message);
  }
  return;
};

export const commentLikesController = async (req, res) => {
  const { id: _id } = req.params;
  const { like, uid } = req.body;
  console.log(like, uid);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("comment unavailable..");
  }

  try {
    const commentData = await comment.findById(_id)
    const updateLike = async(inc)=> await comment.findByIdAndUpdate(_id,{$inc:{like:inc}},{new:true})

    if (like !== -1) {
        if(commentData.likedBy?.includes(uid)){

            //await comment.findByIdAndUpdate(_id,{$inc:{like:-1}})
            commentData.likedBy.pull(uid)
            await updateLike(-1)
            await commentData.save()
            return res.status(200).json('like was removed')
          }else{
            //await comment.findByIdAndUpdate(_id,{$inc:{like:+1}},{new:true})
            //commentData.like = like
            commentData.likedBy.push(uid)
            commentData.dislikedBy.pull(uid)
            await updateLike(+1)
            await commentData.save()
            return res.status(200).json(commentData);
        }
    }else{
      if(commentData.dislikedBy?.includes(uid)){
        
        commentData.dislikedBy.pull(uid)
        await commentData.save()
        return res.status(200).json('dislike was removed')
      }else{
        
            //commentData.like>0&& await comment.findByIdAndUpdate(_id,{$inc:{like:-1}})
            commentData.like>0&& updateLike(-1)
            commentData.likedBy.pull(uid)
            commentData.dislikedBy.push(uid)
            await commentData.save()

            const uniqDislikes = commentData.dislikedBy.filter((user)=>user.toString() !== commentData.uid._id.toString())
            //console.log(commentData.uid._id,'ud',uniqDislikes.length);
            
            if(uniqDislikes.length>=2){
                await comment.findByIdAndDelete(_id)
                return res.status(200).json({message:'comment was deleted'})
            }

            return res.status(200).json(commentData);
        }
    }

  } catch (error) {
    return res.status(400).json({message:error.message});
  }
};
