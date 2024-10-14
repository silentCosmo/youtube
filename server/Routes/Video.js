import express from 'express'
import auth from '../Middleware/auth.js'
import upload  from '../Helper/FileHelper.js'
import { likeController } from '../Controllers/Like.js'
import { viewsController } from '../Controllers/Views.js'
import { historyController, getAllHistoryController, deleteHistory } from '../Controllers/History.js'
import { uploadVideo, getAllVideos } from '../Controllers/Video.js'

const routes = express.Router()

routes.post("/upload",auth,upload.single("file"),uploadVideo)
routes.get("/getvideos",getAllVideos)
routes.patch("/like/:id",auth,likeController)
routes.patch("/views/:_id",viewsController)

routes.post("/history/push",auth,historyController)
routes.get("/history/get",getAllHistoryController)
routes.delete(`/history/delete/:uid`,auth,deleteHistory)


export default routes