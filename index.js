import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import UserRoute from "./routes/UserRoute.js"
import TweetRoute from "./routes/TweetRoute.js"
import CommentRoute from "./routes/CommentRoute.js"

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())

// Route
app.use(UserRoute)
app.use(TweetRoute)
app.use(CommentRoute)

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running...")
}) 