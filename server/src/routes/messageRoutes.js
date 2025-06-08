import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { blockUser, getMessages } from '../controller/messageController.js'

const router = express.Router()

router.get('/messages/:user2',userAuth,getMessages)
router.post('/block/:userId',userAuth,blockUser)

export default router