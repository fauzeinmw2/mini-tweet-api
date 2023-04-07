import express from "express"
import { verifyToken } from "../middleware/VerifyToken.js"

import {
    getTweets,
    getTweetById,
    createTweet,
    updateTweet,
    deleteTweet,
    getAllTweets
} from "../controllers/TweetController.js"

const router = express.Router()

router.get('/all-tweets', getAllTweets)
router.get('/tweets', verifyToken, getTweets)
router.get('/tweets/:id', verifyToken, getTweetById)
router.post('/tweets', verifyToken, createTweet)
router.patch('/tweets/:id', verifyToken, updateTweet)
router.delete('/tweets/:id', verifyToken, deleteTweet)

export default router