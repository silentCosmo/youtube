import LikedVideo from "../Models/LikedVideo.js"

export const likedVideoController = async(req,res)=>{
    const likedVideoData = req.body
    
    const addLikedVideo = new LikedVideo(likedVideoData)
    try {
        await addLikedVideo.save()
        res.status(200).json('Added to liked videos')
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const getLikedVideo = async(req,res)=>{
    try {
        const files = await LikedVideo.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const removeLikedVideo = async(req,res)=>{
    const {vid:vid, viewer:viewer} = req.params
    
    try {
        await LikedVideo.findOneAndDelete({vid:vid,viewer:viewer})
        res.status(200).json({message:'Video removed from liked videos'})
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}