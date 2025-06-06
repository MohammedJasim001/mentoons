import express from 'express'
import { acceptRequest, currentUser, getUsers, sentRequest } from '../controller/userController.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/user', userAuth, currentUser)
router.get('/users',userAuth ,getUsers)
router.post('/users/request/:receiverId',userAuth, sentRequest)
router.post('/users/accept/:senderId',userAuth, acceptRequest)

export default router