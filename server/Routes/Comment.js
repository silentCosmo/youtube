import express from "express"
import { postComment,getComment,editComment,deleteComment } from "../Controllers/comment.js"
import Auth from "../Models/Auth.js"

const router = express.Router()

router.post("/post",postComment)
router.get("/get",getComment)
router.patch("/edit/:id",editComment)
router.delete("/delete/:id",deleteComment)

export default router