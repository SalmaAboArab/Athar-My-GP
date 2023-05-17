import express from "express";
import * as endPoint from "./convoys.controller.js";
import { validation } from "../../middleware/validation.js";
import * as convoyValidation from "./convoys.validation.js";
const convoyRouter = express.Router();

convoyRouter.post(
  "/",
  validation(convoyValidation.newConvoy),
  endPoint.addConvoy
);
convoyRouter.put(
  "/addUser",
  validation(convoyValidation.userToConvoy),
  endPoint.addUserToConvoy
);
convoyRouter.put(
  "/deleteUser",
  validation(convoyValidation.userToConvoy),
  endPoint.deleteUserFromConvoy
);
convoyRouter.delete(
  "/delete/:_id",
  validation(convoyValidation.convoySchema),
  endPoint.deleteConvoy
);
convoyRouter.get("/user", endPoint.getUserConvoys);
convoyRouter.get("/getconvoys", endPoint.getConvoys); // Get convoys to users
convoyRouter.get("/charity", endPoint.getConvoysToCharity); // Get convoys to charity & admin
export default convoyRouter;
