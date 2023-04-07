import {PrismaClient} from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const profile = async(req, res) => {
    try {
        const response = await prisma.user.findFirst({
            where: {
                id: req.userId
            },
            select: {
                name: true,
                email: true
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: "Data tidak ditemukan..."})
    }
}

export const register = async(req, res) => {
    const {name, email, password} = req.body

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        })
        res.status(201).json({msg: "Register berhasil!"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const login = async(req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })

        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) return res.status(400).json({msg: "Wrong password"})

        const userId = user.id
        const name = user.name
        const email = user.email

        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20s"
        })

        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        })

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {refresh_token: refreshToken}
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true
        })

        res.json({accessToken})

    } catch (error) {
        res.status(404).json({msg: "Email tidak ditemukan"})
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)

    const user = await prisma.user.findFirst({
        where: { refresh_token: refreshToken }
    })

    if(!user) return res.sendStatus(204)

    const userId = user.id
    await prisma.user.update({
        where: {id: userId},
        data: {refresh_token: null}
    })

    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}
