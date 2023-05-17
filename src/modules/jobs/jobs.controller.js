import jobModel from '../../../database/models/job.js';
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";
import { ApiFeatures } from "../../utils/api.features.js";

export const addJob = catchError(async(req,res,next)=>{
    const {title} = req.body;
    const findJob = await jobModel.findOne({title});
    if(findJob)  return next(new AppError('this job already exists' , 400)); 
    const job = await jobModel.insertMany(req.body);
    res.status(200).json({message:'success',job });
});

export const getJobs = catchError(async(req,res,next)=>{
    const jobs = await jobModel.find();
    const titles = jobs.map(job => job.title);
    res.status(200).json(titles);
});

export const deleteJob = catchError(async(req,res,next)=>{
    const {_id} = req.body;
    const job = await jobModel.findByIdAndDelete(_id);
    !job && next(new AppError('not found job title' , 400));
    job && res.status(200).json({message:"success"});
});