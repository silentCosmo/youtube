import express from 'express'
import auth from '../Middleware/Auth.js'
import upload  from '../Helper/FileHelper.js'
import { likeController } from '../Controllers/Like.js'
import { viewsController } from '../Controllers/Views.js'
import { historyController, getAllHistoryController, deleteHistory } from '../Controllers/History.js'
import { uploadVideo, getAllVideos, deleteVideo } from '../Controllers/Video.js'
import { getWatchLaterController, removeWatchLater, watchLaterController } from '../Controllers/WatchLater.js'
import { getLikedVideo, likedVideoController, removeLikedVideo } from '../Controllers/LikedVideo.js'

const routes = express.Router()

routes.post("/upload",auth,upload.single("file"),uploadVideo)
routes.get("/getvideos",getAllVideos)
routes.patch("/like/:id",auth,likeController)
routes.patch("/views/:_id",viewsController)
routes.delete('/delete/:id',deleteVideo);

routes.post("/history/push",auth,historyController)
routes.get("/history/get",getAllHistoryController)
routes.delete(`/history/delete/:uid`,auth,deleteHistory)

routes.post("/watchlater",auth,watchLaterController)
routes.get("/watchlater/get",auth,getWatchLaterController)
routes.delete("/watchlater/remove/:vid/:viewer",auth,removeWatchLater)

routes.post("/liked",auth,likedVideoController)
routes.get("/liked/get",auth,getLikedVideo)
routes.delete("/liked/remove/:vid/:viewer",auth,removeLikedVideo)

export default routes