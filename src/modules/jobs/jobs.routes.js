import express from "express";
import * as endPoint from "./jobs.controller.js";
import { validation } from "../../middleware/validation.js";
import * as jobValidation from "./job.validation.js";
const jobRouter = express.Router();

jobRouter
  .route("/")
  .post(validation(jobValidation.newJob),endPoint.addJob)
  .delete(validation(jobValidation.jobSchema),endPoint.deleteJob);
  jobRouter.get("/getjobs", endPoint.getJobs);
export default jobRouter;
