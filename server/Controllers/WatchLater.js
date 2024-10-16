import WatchLater from "../Models/WatchLater.js";

export const watchLaterController = async(req,res)=>{
    const watchlaterData = req.body
    const addWatchLater = new WatchLater(watchlaterData)
    try {
        await addWatchLater.save()
        res.status(200).json('Added to watchlater')
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const getWatchLaterController = async(req,res)=>{
    try {
        const files = await WatchLater.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const removeWatchLater = async(req,res)=>{
    const {vid:vid, viewer:viewer} = req.params
    
    try {
        await WatchLater.findOneAndDelete({vid:vid,viewer:viewer})
        res.status(200).json({message:'Video removed from watchlater'})
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}