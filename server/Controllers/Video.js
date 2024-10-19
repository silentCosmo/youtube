import VideoFile from "../Models/VideoFile.js";
import { format } from 'util';
import admin from 'firebase-admin';
//import serviceAccountKey from "../serviceAccountKey.json" assert { type: 'json' }
import dotenv from 'dotenv'

dotenv.config()

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY)

//console.log(serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'order-mate-pos.appspot.com' 
});

const bucket = admin.storage().bucket();

export const uploadVideo = async (req, res) => {
    if (!req.file) {
        return res.status(404).json({ message: "You can only upload a mp4 video file only" });
    }

    try {
        // Generate a unique filename
        const uniqueFileName = new Date().toISOString().replace(/:/g, "-") + "-" + req.file.originalname;

        // Upload to Firebase Storage
        const blob = bucket.file(`videos/${uniqueFileName}`);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            console.error('Firebase upload error:', error);
            return res.status(500).json({ message: "Failed to upload video to Firebase" });
        });

        blobStream.on('finish', async () => {
            // Make the file public
            await blob.makePublic();

            // Get the public URL of the uploaded video
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

            // Save file metadata in MongoDB with Firebase Storage URL
            const file = new VideoFile({
                title: req.body.title,
                name: req.file.originalname,
                path: publicUrl,  // Use Firebase URL instead of local path
                type: req.file.mimetype,
                size: req.file.size,
                channel: req.body.channel,
                uploader: req.body.uploader,
            });

            console.log('Saving video metadata to MongoDB:', file);
            await file.save();
            res.status(200).json({ message: "File uploaded successfully", file });
        });

        // End the blobStream and upload the video buffer
        blobStream.end(req.file.buffer);

    } catch (error) {
        console.error('Error during video upload:', error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteVideo = async (req, res) => {
    const videoId = req.params.id; // Assuming you're passing the video ID via request params

    try {
        // Find video metadata from MongoDB
        const video = await VideoFile.findById(videoId);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Extract the video file path from Firebase Storage URL
        const videoFilePath = video.path.replace(`https://storage.googleapis.com/${bucket.name}/`, '');

        // Delete the file from Firebase Storage
        const file = bucket.file(videoFilePath);
        await file.delete();

        // Remove video metadata from MongoDB
        await VideoFile.findByIdAndDelete(videoId);

        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        console.error('Error during video deletion:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllVideos = async(req,res)=>{

    try {
        const files = await VideoFile.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(404).json(error.message)
        return
    }
} 

/* import VideoFile from "../Models/VideoFile.js";
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
} */

