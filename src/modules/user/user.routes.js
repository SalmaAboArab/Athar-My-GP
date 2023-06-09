import express from "express";
import * as endPoint from "./user.controller.js";
import {auth,roles} from "../../middleware/auth.js"
import { validation } from '../../middleware/uservalidation.js';
import * as validators from './user.validation.js'
import {fileUpload,fileValidation} from "../../utils/multer.js"
const userRouter = express.Router();

userRouter
  .route("/")
  .post(endPoint.adduser)
  .delete(endPoint.deleteusers);
  userRouter.get("/getusers", endPoint.getusers);
  userRouter.get("/userdata" , endPoint.getuserdata);
  userRouter.get("/userList",auth(Object.values(roles)),endPoint.userList);
  userRouter.post("/getProfile",endPoint.getProfile)
  userRouter.put("/editProfile",auth("User"),validation(validators.editProfile),endPoint.editProfile)
  userRouter.patch("/uploadProfileImage",fileUpload(fileValidation.image).single('image'),auth(Object.values(roles)),endPoint.uploadProfileImage)
  userRouter.patch("/beVolunteer",auth("User"),validation(validators.beVolunteer),endPoint.beVolunteer)
  userRouter.patch("/exitVolunteer",auth("User"),endPoint.exitVolunteer)
export default userRouter;


//auth(Object.values(roles)),