"use strict";
import fs from 'fs'
import multer from "multer"
const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        console.log(req);
        
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            console.log('no path');
            
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString().replace(/:/g,"-")+"-"+file.originalname)
    },
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "video/mp4"){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload = multer({storage:storage,fileFilter:fileFilter})
export default upload;