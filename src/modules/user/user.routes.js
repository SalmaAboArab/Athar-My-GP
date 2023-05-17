import express from "express";
import * as endPoint from "./user.controller.js";
import {auth,roles} from "../../middleware/auth.js"
const userRouter = express.Router();

userRouter
  .route("/")
  .post(endPoint.adduser)
  .delete(endPoint.deleteusers);
  userRouter.get("/getusers", endPoint.getusers);
  userRouter.get("/userdata" , endPoint.getuserdata);
  userRouter.get("/userList",auth(Object.values(roles)),endPoint.userList);
  userRouter.get("/getProfile",auth(Object.values(roles)),endPoint.getProfile)
export default userRouter;


//auth(Object.values(roles)),