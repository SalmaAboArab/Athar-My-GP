import express from "express";
import * as endPoint from "./charity.controller.js";
import {auth,roles} from "../../middleware/auth.js"
import { validation } from '../../middleware/uservalidation.js';
import * as validators from './charity.validation.js'
const charityRouter = express.Router();

charityRouter
  .route("/")
  .post(endPoint.addcharity)
  .delete(endPoint.deleteusers);
  charityRouter.get("/getcharity", endPoint.getcharity);
  charityRouter.get('/data',endPoint.charity)
  charityRouter.put("/editProfile",auth("Charity"),validation(validators.editProfile),endPoint.editProfile)
  charityRouter.put("/verifyCharity",auth("Charity"),endPoint.verifyCharity)
export default charityRouter;
