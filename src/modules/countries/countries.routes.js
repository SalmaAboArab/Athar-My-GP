import express from "express";
import * as endPoint from "./countries.controller.js";
import { validation } from "../../middleware/validation.js";
import * as countryValidation from "./countries.validation.js";
import { MultiFile } from "../../utils/files.uploads.js";
const countryRouter = express.Router();
let ImageArray = [
  { name: "cardImage", maxCount: 1 },
  { name: "headerImage", maxCount: 1 },
  { name: "problem", maxCount: 10 },
];
countryRouter
  .route("/")
  .post(
    MultiFile(ImageArray),
    validation(countryValidation.newCountry),
    endPoint.addCountry
  )
  .put(validation(countryValidation.updateCountry), endPoint.updateCountry);
countryRouter.delete("/delete", endPoint.deleteCountry);
countryRouter.get("/getallcountries", endPoint.getCountries);
countryRouter.get("/dashboard/admin", endPoint.getCountriesAdmin);
countryRouter.get("/getcountry/:id",endPoint.getCountry)
export default countryRouter;
