import express from "express";
import * as endPoint from "./charity.controller.js";
const charityRouter = express.Router();

charityRouter
  .route("/")
  .post(endPoint.addcharity)
  .delete(endPoint.deleteusers);
  charityRouter.get("/getcharity", endPoint.getcharity);
  charityRouter.get('/data',endPoint.charity)
export default charityRouter;
