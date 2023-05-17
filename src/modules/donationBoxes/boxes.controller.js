import BoxModel from "../../../database/models/donationBox.js";
import charityModel from "../../../database/models/charity.js";
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";
import { ApiFeatures } from "../../utils/api.features.js";
import countryModel from "../../../database/models/country.js";

export const addBox = catchError(async (req, res, next) => {
  const { charityId, countryId } = req.body;
  const [findCharity, findCountry] = await Promise.all([
    charityModel.findById(charityId),
    countryModel.findById(countryId),
  ]);
  if (!findCharity || !findCountry) return next(new AppError("Not Found", 400));
  const box = await BoxModel.insertMany(req.body);
  !box && next(new AppError("Could not add donation box"));
  box[0].left = box[0].amount;
  await box[0].save();
  findCharity.donationBoxNumber += 1;
  await findCharity.save();
  findCountry.donationBoxes += 1;
  await findCountry.save();
  box && res.status(200).json({ message: "success", box });
});

export const editBox = catchError(async (req, res, next) => {
  const { _id } = req.body;
  const box = await BoxModel.findById(_id);
  if (req.body.categories) {
    const allCategoriesPresent = box.categories.every((category) =>
      req.body.categories.includes(category)
    );
    if (!allCategoriesPresent)
      return next(
        new AppError(
          "You can't change categories you can add new categories",
          400
        )
      );
  }
  let amount = req.body.amount;
  if (amount && amount < box.raised) {
    return next(
      new AppError(
        "New Amount must be greater than or equel raised amount",
        400
      )
    );
  } else if (amount >= box.raised) {
    req.body.left = amount - box.raised;
    if (req.body.left == 0) req.body.completed = true;
  }
  const Editbox = await BoxModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  !box && next(new AppError("Could not edit donation box"));
  box && res.status(200).json({ message: "success", Editbox });
});

export const getCountryBoxes = catchError(async (req, res, next) => {
  const { _id } = req.params;
  const total = await BoxModel.countDocuments({
    countryId: _id,
    completed: false,
  });
  const totalPages = Math.ceil(total / 10);
  let features = new ApiFeatures(
    BoxModel.find({ countryId: _id, completed: false }),
    req.query
  )
    .sort()
    .paginate(totalPages)
    .fields();
  const boxes = await features.mongooseQuery.populate('charityId' , 'name image verified');
  res
    .status(200)
    .json({ message: "success", totalPages, page: features.page, boxes });
});

export const getCharityBoxes = catchError(async (req, res, next) => {
  const { id } = req.query;
  const total = await BoxModel.countDocuments({
    charityId: id,
  });
  const totalPages = Math.ceil(total / 10);
  let features = new ApiFeatures(BoxModel.find({charityId: id}), req.query)
    .sort()
    .paginate(totalPages)
    .fields().filter();
  const boxes = await features.mongooseQuery.populate("countryId", "name");
  res
    .status(200)
    .json({ message: "success", totalPages, page: features.page, boxes });
});
