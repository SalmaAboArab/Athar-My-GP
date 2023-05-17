import express from "express";
import * as endPoint from "./boxes.controller.js";
import { validation } from "../../middleware/validation.js";
import * as boxValidation from "./boxes.validation.js";
const boxRouter = express.Router();

boxRouter.post(
  "/addBox",
  validation(boxValidation.newBox),
  endPoint.addBox
);
boxRouter.put(
  "/",
  validation(boxValidation.EditBox),
  endPoint.editBox
);
boxRouter.get("/getBoxs/:_id", endPoint.getCountryBoxes); // Get Boxs to users
boxRouter.get("/charity" , endPoint.getCharityBoxes);  // Get Boxs to charity & admin

export default boxRouter;
