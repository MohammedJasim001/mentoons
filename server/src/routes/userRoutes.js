import express from 'express'
import { acceptRequest, currentUser, friends, getNotifications, getSingleuser, getUsers, readNotification, requestes, sentRequest } from '../controller/userController.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/user', userAuth, currentUser)
router.get('/user/:userId',userAuth,getSingleuser)
router.get('/users',userAuth ,getUsers)
router.post('/users/request/:receiverId',userAuth, sentRequest)
router.post('/users/accept/:senderId',userAuth, acceptRequest)
router.get('/users/requestedusers',userAuth,requestes)
router.get('/users/notification',userAuth,getNotifications)
router.put('/user/notification/read',userAuth,readNotification)
router.get('/users/connections',userAuth,friends)

export default router