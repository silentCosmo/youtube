import express from "express"
import { postComment,getComment,editComment,deleteComment, commentLikesController } from "../Controllers/Comment.js"
import Auth from "../Models/Auth.js"

const router = express.Router()

router.post("/post",postComment)
router.get("/get",getComment)
router.patch("/edit/:id",editComment)
router.delete("/delete/:id",deleteComment)
router.patch("/like/:id",commentLikesController)

export default router