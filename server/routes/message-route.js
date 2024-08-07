import express from 'express'
import { getMessages, sendMessage } from '../controllers/message-controller.js'
import protectRoute from '../middlewares/protect.route.js'

const router  = express.Router()

router.post('/send/:id',protectRoute,sendMessage)
router.get('/:id',protectRoute, getMessages)
// router.post('/logout',logout)
export default router

// id defualt generted by  mongodb 
// sender id  which the sender id 
// receiver id which is the receiiver id 
// message contnet ; message body 

// conversion betwen user