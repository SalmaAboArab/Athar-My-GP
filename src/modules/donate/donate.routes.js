import express from "express";
import * as endPoint from "./donate.controller.js";
import { validation } from "../../middleware/validation.js";
import * as donate from "./donate.validation.js";
const donateRouter = express.Router();

donateRouter.post('/',validation(donate.newdonate),endPoint.newDonate)
donateRouter.get("/", endPoint.getdonations);
export default donateRouter;
