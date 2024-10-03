import express from 'express'
import { likeController } from '../Controllers/Like.js'
import { viewsController } from '../Controllers/Views.js'
import { uploadVideo, getAllVideos } from '../Controllers/Video.js'
import upload  from '../Helper/FileHelper.js'
import auth from '../Middleware/auth.js'

const routes = express.Router()

routes.post("/upload",auth,upload.single("file"),uploadVideo)
routes.get("/getvideos",getAllVideos)
routes.patch("/like/:id",auth,likeController)
routes.patch("/views/:_id",auth,viewsController)

export default routes