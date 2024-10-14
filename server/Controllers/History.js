import History from "../Models/History.js";

export const historyController = async(req,res)=>{
    const historyData = req.body;
    const addHistory = new History(historyData)
    try {
        await addHistory.save()
        res.status(200).json("added to history")
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
 
export const getAllHistoryController = async(req,res)=>{
    try {
        const files = await History.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const deleteHistory = async(req,res)=>{
    const {uid:uid} = req.params;
    try {
        await History.deleteMany({
            viewer:uid
        })
        res.status(200).json("History was cleared successfuly")
    } catch (error) {
        res.status(400).json(error.message)
        return
    }

}