import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const getAllTweets = async(req, res) => {
    try {
        const response = await prisma.tweet.findMany({
            select: {
                id: true,
                user_id: true,
                description: true,
                createdAt: true,
                user: {
                  select: {
                    name: true,
                    email: true
                  },
                },
                comment: {
                    select: {
                        id: true,
                        user_id: true,
                        description: true,
                        createdAt: true
                    }
                }
            },
        });
        res.status(200).json({msg: "Sukses", response})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getTweets = async(req, res) => {
    try {
        const response = await prisma.tweet.findMany({
            where: {user_id: req.userId},
            select: {
                id: true,
                user_id: true,
                description: true,
                createdAt: true,
                comment: {
                    select: {
                        id: true,
                        user_id: true,
                        description: true,
                        createdAt: true
                    }
                }
            },
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getTweetById = async(req, res) => {
    try {
        const response = await prisma.tweet.findFirstOrThrow({
            where: {
                id: Number(req.params.id),
                user_id: Number(req.userId)
            },
            select: {
                id: true,
                user_id: true,
                description: true,
                createdAt: true,
                comment: {
                    select: {
                        id: true,
                        user_id: true,
                        description: true,
                        createdAt: true
                    }
                }
            },
        });
        res.status(200).json({msg: "Sukses", response})
    } catch (error) {
        res.status(404).json({msg: "Data tidak ditemukan..."})
    }
}

export const createTweet = async(req, res) => {
    const {description} = req.body
    
    try {
        const tweet = await prisma.tweet.create({
            data: {
                description: description,
                user_id: req.userId
            }
        })
        res.status(201).json({msg: "Sukses", tweet})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateTweet = async(req, res) => {
    const {description} = req.body

    try {

        const cek = await prisma.tweet.findFirstOrThrow({
            where: {
                id: Number(req.params.id),
                user_id: Number(req.userId)
            }
        });

        const tweet = await prisma.tweet.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                description: description
            }
        })
        res.status(200).json({msg: "Sukses", tweet})
    } catch (error) {
        res.status(403).json({msg: "Anda tidak memiliki hak untuk mengakses Tweet ini..."})
    }
}

export const deleteTweet = async(req, res) => {
    try {

        const cek = await prisma.tweet.findFirstOrThrow({
            where: {
                id: Number(req.params.id),
                user_id: Number(req.userId)
            }
        });
        
        const tweet = await prisma.tweet.delete({
            where: {
                id: Number(req.params.id)
            },
        })
        res.status(200).json({msg: "Tweet berhasil di hapus"})
    } catch (error) {
        res.status(403).json({msg: "Anda tidak memiliki hak untuk mengakses Tweet ini..."})
    }
}