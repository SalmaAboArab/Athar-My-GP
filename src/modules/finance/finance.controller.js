import express from "express";
import financeModel from '../../../database/models/finance.js';
import charityModel from '../../../database/models/charity.js';
import { catchError } from "../../middleware/catch.errors.js";
import { ApiFeatures } from "../../utils/api.features.js";
const financeRouter = express.Router();

financeRouter.get('/' , catchError(async(req,res)=>{
    let features = new ApiFeatures(financeModel.find(), req.query)
    .sort().fields();
    const result = await features.mongooseQuery;
    res.status(200).json({ message: "success" , result});
}));

export default financeRouter;


