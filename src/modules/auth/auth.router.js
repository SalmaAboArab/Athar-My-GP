import * as authController from './controller/auth.js'
import { Router } from "express";
import { validation } from '../../middleware/uservalidation.js';
import * as validators from './auth.validation.js'
import {auth,roles} from '../../middleware/auth.js'

const authRouter=Router()


authRouter.post('/usersignup', validation(validators.usersignup), authController.usersignup)
authRouter.post('/charitysignup', validation(validators.charitysignup), authController.charitysignup)
authRouter.get('/confirmEmail/:token',validation(validators.token),authController.confirmEmail)
authRouter.get('/NewConfirmEmail/:token',validation(validators.token),authController.NewConfirmEmail)
authRouter.post('/login',validation(validators.login),authController.login)
authRouter.post('/sendCode',validation(validators.sendCode),authController.sendCode)
authRouter.post('/confirmCode',validation(validators.confirmCode),authController.confirmCode)
authRouter.put('/resetPassword',validation(validators.resetPassword),authController.resetPassword)
authRouter.post('/logout',auth(Object.values(roles)),authController.logout)
authRouter.post('/addAdmin',validation(validators.addAdmin),authController.addAdmin)

export default authRouter