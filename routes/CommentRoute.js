import express from "express"
import { verifyToken } from "../middleware/VerifyToken.js"

import {
    getCommentsTweet,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
} from "../controllers/CommentController.js"

const router = express.Router()

router.get('/comments-tweet/:idTweet', getCommentsTweet)
router.get('/comments/:id', verifyToken, getCommentById)
router.post('/comments', verifyToken, createComment)
router.patch('/comments/:id', verifyToken, updateComment)
router.delete('/comments/:id', verifyToken, deleteComment)

export default router