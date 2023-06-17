import * as chatController from './controller/chat.js'
import { Router } from "express";
import {auth,roles} from '../../middleware/auth.js'

const chatRouter=Router()

chatRouter.get('/allusers/:role',chatController.allusers)
chatRouter.post('/addMessage',chatController.addMessage)   // update with token
chatRouter.post('/getAllMessages',chatController.getAllMessages)  // update with token

export default chatRouter