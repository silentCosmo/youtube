import VideoFile from "../Models/VideoFile.js";
export const uploadVideo = async(req,res)=>{
    if(req.file === undefined){
        res.status(404).json({message:"You can only upload a mp4 video file only"})
    }else{
        try {
            const file = new VideoFile({
                title:req.body.title,
                name:req.file.originalname,
                path:req.file.path,
                type:req.file.mimetype,
                size:req.file.size,
                channel:req.body.channel,
                uploader:req.body.uploader,
            })
            console.log('toMongo',file);
            await file.save()
            res.status(200).send("File uploaded successfully")
        } catch (error) {
            res.status(404).json(error.message)
            return
        }
    }
}
export const getAllVideos = async(req,res)=>{
    try {
        const files = await VideoFile.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(404).json(error.message)
        return
    }
}