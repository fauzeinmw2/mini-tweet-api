import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const getCommentsTweet = async(req, res) => {
    try {
        const response = await prisma.comment.findMany({
            where: {tweet_id: Number(req.params.idTweet)},
            // include: { user: true }
            select: {
                id: true,
                tweet_id: true,
                user_id: true,
                description: true,
                createdAt: true,
                user: {
                  select: {
                    name: true,
                    email: true
                  },
                },
            },
        });
        res.status(200).json({msg: "sukses", response})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getCommentById = async(req, res) => {
    try {
        const response = await prisma.comment.findFirstOrThrow({
            where: {
                id: Number(req.params.id),
                user_id: Number(req.userId)
            },
            select: {
                id: true,
                tweet_id: true,
                user_id: true,
                description: true,
                createdAt: true,
                user: {
                  select: {
                    name: true,
                    email: true
                  },
                },
            },
        });
        res.status(200).json({msg: "Sukses", response})
    } catch (error) {
        res.status(404).json({msg: "Data tidak ditemukan..."})
    }
}

export const createComment = async(req, res) => {
    const {description, tweet_id} = req.body
    
    try {
        const comment = await prisma.comment.create({
            data: {
                description: description,
                user_id: req.userId,
                tweet_id: Number(tweet_id)
            }
        })
        res.status(201).json({msg: "Sukses", comment})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateComment = async(req, res) => {
    const {description} = req.body

    try {

        await prisma.comment.findFirstOrThrow({
            where: {
                id: Number(req.params.id),
                user_id: Number(req.userId)
            }
        });

        const comment = await prisma.comment.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                description: description
            }
        })
        res.status(200).json({msg: "Sukses", comment})
    } catch (error) {
        res.status(403).json({msg: "Anda tidak memiliki hak untuk mengakses Comment ini..."})
    }
}

export const deleteComment = async(req, res) => {
    try {

        await prisma.comment.findFirstOrThrow({
            where: {
                id: Number(req.params.id),
                user_id: Number(req.userId)
            }
        });
        
        await prisma.comment.delete({
            where: {
                id: Number(req.params.id)
            },
        })
        res.status(200).json({msg: "Comment berhasil di hapus..."})
    } catch (error) {
        res.status(403).json({msg: "Anda tidak memiliki hak untuk mengakses Comment ini..."})
    }
}