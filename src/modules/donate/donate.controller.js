import donateModel from "../../../database/models/donation.js";
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";
import { ApiFeatures } from "../../utils/api.features.js";
import userModel from "../../../database/models/user.js";
import BoxModel from "../../../database/models/donationBox.js";
import * as manage from "./donation.manage.js";

export const newDonate = catchError(async (req, res, next) => {
  const { userId, donationBox, amount} = req.body;
  const [user, box] = await Promise.all([
    userModel.findById(userId),
    BoxModel.findById(donationBox),
  ]);
  if (!user || !box) next(new AppError("Not found inputs", 400));
  // Edit amount in donation box
  await manage.updateDonationBox(box, amount);
  let donate = await donateModel.findOne({userId , donationBox});
  if(donate) {
    donate.amount += req.body.amount;
    await donate.save();
  }
  if(!donate) donate = await donateModel.insertMany(req.body);
  await manage.processFinancialTransaction(box, amount);   // Finance process
  res.json({ message: "success", donations: donate });
});

export const getdonations = catchError(async (req, res, next) => {
  const { _id } = req.query;
  const total = await donateModel.countDocuments({ userId: _id });
  const totalPages = Math.ceil(total / 10);
  let features = new ApiFeatures(donateModel.find({ userId: _id }), req.query)
    .sort()
    .fields()
    .paginate(totalPages);
  const donations = await features.mongooseQuery;
  res
    .status(200)
    .json({ message: "success", totalPages, page: features.page, donations });
});
export const deleted = catchError(async(req,res)=>{
  await donateModel.deleteMany();
  res.json('success')
})
