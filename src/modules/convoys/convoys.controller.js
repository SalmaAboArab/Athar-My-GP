import convoyModel from "../../../database/models/convoy.js";
import charityModel from "../../../database/models/charity.js";
import countryModel from "../../../database/models/country.js";
import userModel from "../../../database/models/user.js";
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";
import { ApiFeatures } from "../../utils/api.features.js";
import * as manage from './convoys.manage.js'
export const addConvoy = catchError(async (req, res, next) => {
  const { charityId, countryId, jobs, totalVolunteers , startDate , endDate} = req.body;
  if (manage.validateDates(startDate , endDate)) {
    return next(new AppError("Invalid start or end date", 400));
  }
  // check if found charity in db and country.
  const [findCharity , findCountry] = await manage.findCountryAndCharity(countryId , charityId);
  if (!findCountry || !findCharity)
    return next(new AppError("Could not find the charity or country", 400));
  // Check if the start and end dates of a new convoy fall within the date range of any existing convoys.
  const existingConvoy = await convoyModel.findOne({
    charityId: charityId,
    $and: [{ startDate: { $lte: endDate } }, { endDate: { $gte: startDate } }],
  });
  if (existingConvoy) {
    return next(
      new AppError("There is already a convoy in the specified date range", 400)
    );
  }
  // check if charity input invalid range to volunteers.
  // valid range ---> 500 volunteers
  const totalCount = jobs.reduce((acc, job) => acc + job.count, 0);
  if (totalCount > 500 || totalCount !== totalVolunteers) {
    return next(
      new AppError("Invalid number of volunteers for the given jobs", 400)
    );
  }
  findCharity.convoysNumber += 1;
  await findCharity.save();
  findCountry.convoysNumber += 1;
  await findCountry.save();
  const convoy = await convoyModel.insertMany(req.body);
  res.status(200).json({ message: "success", convoy });
});

//join new user
export const addUserToConvoy = catchError(async (req, res, next) => {
  const { _id, userId} = req.body;
  //check if the user exists in the database and has the same job assigned to them for this convoy.
  const user = await userModel.findOne({ _id: userId});
  if (!user) return next(new AppError("Could not add user to convoy", 400));
  console.log(user)
  let convoy = await convoyModel.findOne({
    _id,
    "jobs.job": user.job,
    completed: false,
  });
  if (!convoy) return next(new AppError("Could not add user to convoy", 400));
  //  check if the job section has been completed or not.
  const jobIndex = convoy.jobs.findIndex((obj) => obj.job === user.job);
  console.log(jobIndex)
  let job = convoy.jobs[jobIndex];
  let beforeAddUser = job.usersId.length;
  if (job.completed)
    return next(new AppError("Cannot add user to a completed job.", 400));
  convoy = await convoyModel.findOneAndUpdate(
    //Add user to this convoy
    { _id, "jobs.job": user.job },
    { $addToSet: { "jobs.$.usersId": userId } },
    { new: true }
  );
  console.log(convoy)
  job = convoy.jobs[jobIndex];
  let totalUsers = job.usersId.length;
  if (totalUsers == beforeAddUser)
    return next(new AppError("User alredy in this convoy.", 400));
  await userModel.findByIdAndUpdate(userId, { $addToSet: { convoys: _id } }); // Add convoy to "list convoys" in user
  if (job.usersId.length === job.count) {
    // if the job section has been completed or not after add new user.
    convoy.jobs[jobIndex].completed = true;
    await convoy.save();
  }
  const jobsCompleted = convoy.jobs.every((job) => job.completed);
  if (jobsCompleted) {
    // if convoy completed after new user or not
    convoy.completed = true;
    await convoy.save();
  }
  const charity = await charityModel.findByIdAndUpdate(convoy.charityId, {
    $inc: { volunteers: 1 },
  });
  const country = await countryModel.findByIdAndUpdate(convoy.countryId, {
    $inc: { volunteers: 1 },
  });
  res.status(200).json({ message: "success" , user});
});

export const deleteUserFromConvoy = catchError(async (req, res, next) => {
  const { _id, userId } = req.body;
  const user = await userModel.findOneAndUpdate(
    //check if the user exists in the database and has joined this convoy.
    { _id: userId, convoys: _id },
    { $pull: { convoys: _id } }
  );
  if (!user) return next(new AppError("User not found in this convoy", 400));
  const convoy = await convoyModel.findOneAndUpdate(
    // Delete user from convoy data
    { _id, "jobs.job": user.job },
    {
      $pull: { "jobs.$[job].usersId": userId },
      $set: { "jobs.$[job].completed": false, completed: false },
    },
    {
      new: true,
      arrayFilters: [{ "job.job": user.job }], // to only update the job field in those objects
    }
  );
  if (!convoy)
    return next(new AppError("Faild remove user from this convoy", 400));
  await charityModel.findByIdAndUpdate(convoy.charityId, {
    $inc: { volunteers: -1 },
  });
  await countryModel.findByIdAndUpdate(convoy.countryId, {
    $inc: { volunteers: -1 },
  });
  res.status(200).json({ message: "success" });
});

export const deleteConvoy = catchError(async (req, res, next) => {
  const { _id } = req.params;
  const convoy = await convoyModel.findOneAndDelete(_id);
  if (!convoy) return next(new AppError("Not found convoy", 400));
  const jobs = convoy.jobs;
  let usersNumber = 0;
  for (const job of jobs) {
    // to delete convoy from all users
    usersNumber += job.usersId.length;
    for (const user of job.usersId) {
      await userModel.findByIdAndUpdate(user, { $pull: { convoys: _id } });
    }
  } // use "for" instead "map" --> map return array and take from memory , so "for loop" high performance from "map"
  await charityModel.findByIdAndUpdate(convoy.charityId, {
    $inc: { convoysNumber: -1, volunteers: -usersNumber },
  });
  await countryModel.findByIdAndUpdate(convoy.countryId, {
    $inc: { convoysNumber: -1, volunteers: -usersNumber },
  });
  res.status(200).json({ message: "success" });
});

export const getConvoys = catchError(async (req, res, next) => {
  const { id } = req.query;
  const user = await userModel.findById(id);
  if (!user) {
    return next(new AppError("User not found.", 400));
  }
  const total = await convoyModel.countDocuments({
    jobs: {
      $elemMatch: {
        job: { $in: [user.job, "other"] },
        usersId: { $not: { $eq: id } },
        completed: false,
      },
    },
  });
  const totalPages = Math.ceil(total / 10);
  let features = new ApiFeatures(
    convoyModel
      .find({ jobs: {
        $elemMatch: {
          job: { $in: [user.job, "other"] },
          usersId: { $not: { $eq: id } },
          completed: false,
        },
      }}),
    req.query
  )
    .paginate(totalPages)
    .sort()
    .fields();
  const convoys = await features.mongooseQuery.populate('charityId', 'name image verified');
  res.status(200).json({ message: "success", totalPages, page: features.page, convoys });

});

export const getUserConvoys = catchError(async (req, res, next) => {
  const {id} = req.query;
  const user = await userModel.findById(id);
  if(!user) return next(new AppError('Not found user' , 404));
  res.status(200).json({message: 'success' , convoys:user.convoys})
})

export const getConvoysToCharity = catchError(async (req, res, next) => {
  const total = await convoyModel.countDocuments({
    charityId: req.query.id,
  });
  const totalPages = Math.ceil(total / 10);
  let features = new ApiFeatures(
    convoyModel.find({ charityId: req.query.id}),req.query)
    .paginate(totalPages)
    .sort()
    .fields().filter();
  const convoys = await features.mongooseQuery;
  res.status(200)
    .json({ message: "success", totalPages, page: features.page, convoys });
});
