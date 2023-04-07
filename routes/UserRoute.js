import express from "express"
import { verifyToken } from "../middleware/VerifyToken.js"
import { refreshToken } from "../controllers/RefreshTokenController.js"

import {
    profile,
    register,
    login,
    logout
} from "../controllers/UserController.js"

const router = express.Router()

router.get('/profile', verifyToken, profile)
router.post('/register', register)
router.post('/login',login)
router.get('/token', refreshToken)
router.delete('/logout', logout)

export default router