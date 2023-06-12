import countryModel from "../../../database/models/country.js";
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";
import { ApiFeatures } from "../../utils/api.features.js";
import cloudinary from "../../utils/cloudinary.js";
import charityModel from "../../../database/models/charity.js";
import BoxModel from "../../../database/models/donationBox.js";
import convoyModel from "../../../database/models/convoy.js";

export const addCountry = catchError(async (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  const countryName = await countryModel.findOne({ name });
  if (countryName) {
    return next(new AppError("This country is already in the list", 400));
  }
  if (
    !req.files ||
    !req.files.cardImage ||
    req.files.cardImage.length <= 0 ||
    !req.files.headerImage ||
    req.files.headerImage.length <= 0
  ) {
    return next(new AppError("upload full image", 400));
  }
  const [cardImage, headerImage] = await Promise.all([
    cloudinary.uploader.upload(req.files.cardImage[0].path, {
      folder: "countries",
    }),
    cloudinary.uploader.upload(req.files.headerImage[0].path, {
      folder: "countries",
    }),
  ]);
  const problemImages = req.files.problem;
  if (!cardImage || !headerImage || !problemImages || !problemImages.length) {
    return next(new AppError("upload full image", 400));
  }
  if (problemImages.length != req.body.problems.length) {
    return next(new AppError("images not equal problems", 400));
  }
  const country = await countryModel.insertMany(req.body);
  country[0].cardImage = {
    public_id: cardImage.public_id,
    secure_url: cardImage.secure_url,
  };
  country[0].headerImage = {
    public_id: headerImage.public_id,
    secure_url: headerImage.secure_url,
  };
  await Promise.all(
    problemImages.map((image) => {
      return cloudinary.uploader.upload(image.path, { folder: "countries" });
    })
  )
    .then((data) => {
      country[0].problems.map((problem, idx) => {
        console.log(idx);
        problem.image = {
          public_id: data[idx].public_id,
          secure_url: data[idx].secure_url,
        };
      });
    })
    .catch((error) => {
      console.error(error);
    });
  await country[0].save();

  res.status(200).json({ message: "success", country });
});

export const updateCountry = catchError(async (req, res, next) => {
  if (req.body.problems) {
    await Promise.all(
      req.body.problems.map(async (obj) => {
        await countryModel.findOneAndUpdate(
          { _id: req.body._id, "problems._id": obj._id },
          { $set: { "problems.$": obj } }
        );
      })
    );
  }
  delete req.body.problems;
  const result = await countryModel.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  res.json({ message: "success", result });
});

export const deleteCountry = catchError(async (req, res, next) => {
  const { _id } = req.params;
  const country = await countryModel.findByIdAndDelete(_id);
  !country && next(new AppError("Not Found This country", 400));
  country && res.json({ message: "success", country });
});

export const getCountries = catchError(async (req, res, next) => {
  let features = new ApiFeatures(countryModel.find(), req.query)
    .fields()
    .sort();
  const countries = await features.mongooseQuery;
  res.status(200).json({ message: "success", countries });
});

export const getCountry = catchError(async (req, res, next) => {
  const {id}=req.params;
  const country=await countryModel.findById(id);
  if(!country) return next(new Error("Not founded charity", { cause: 404 }))
   return res.status(200).json({ message: "success", country });
 });

export const getCountriesAdmin = catchError(async (req, res, next) => {
  const charities = await charityModel.countDocuments();
  const donationBoxes = await BoxModel.countDocuments();
  const convoys = await convoyModel.countDocuments();
  let features = new ApiFeatures(countryModel.find(), req.query)
    .fields()
    .sort();
  const countries = await features.mongooseQuery;
  res
    .status(200)
    .json({
      message: "success",
      country: countries.length,
      charities,
      donationBoxes,
      convoys,
      countries,
    });
});
