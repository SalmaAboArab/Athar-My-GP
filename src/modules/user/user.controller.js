import userModel from '../../../database/models/user.js';
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";
import { ApiFeatures } from "../../utils/api.features.js";
import { asyncHandler } from '../../utils/errorHandling.js';
import adminModel from '../../../database/models/admin.js';
import charityModel from '../../../database/models/charity.js';


export const adduser = catchError(async(req,res,next)=>{
    const user = await userModel.insertMany(req.body);
    res.status(200).json({message:'success',user });
});

export const getusers = catchError(async(req,res,next)=>{
    // const users = await userModel.find();
    // res.status(200).json({ message: "success", users });
    const jobs = await userModel.find();
    const titles = jobs.map(job => job._id);
    res.status(200).json(titles);
});
export const getuserdata = catchError(async(req,res,next)=>{
    let features = new ApiFeatures(userModel.findById({_id:req.query.id}), req.query)
    .fields()
  const user = await features.mongooseQuery;
    res.status(200).json({ message: "success", user });
});
export const deleteusers = catchError(async(req,res,next)=>{
    await userModel.deleteMany();
    res.status(200).json({ message: "success"});
});

export const userList = asyncHandler(async(req,res,next)=>{
    // const users=await userModel.find({_id:{$ne:req.user._id}})
    let users;
    if(req.user.role=='user' || req.user.role=='charity') users=await adminModel.find();
    else if(req.user.role=='admin')  users=await userModel.find()+charityModel.find();
    return res.status(200).json({message:"Done",users})
})

export const getProfile = asyncHandler(async(req,res,next)=>{
    let profile;
    if(req.user.role=='user') profile=await userModel.findById({_id:req.user.id})
    else if(req.user.role=='charity') profile=await charityModel.findById({id:req.user.id})
    else if(req.user.role=='admin') profile=await adminModel.findById({id:req.user.id})
    return res.status(200).json({message:"Done",profile})
})

export const editProfile = asyncHandler(async(req,res,next)=>{
    let profile;
    if(req.user.role=='user') profile=await userModel.findById({_id:req.user.id})
    else if(req.user.role=='charity') profile=await charityModel.findById({id:req.user.id})
    else if(req.user.role=='admin') profile=await adminModel.findById({id:req.user.id})
    return res.status(200).json({message:"Done",profile})
})