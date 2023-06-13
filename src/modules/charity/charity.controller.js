import charityModel from '../../../database/models/charity.js';
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";
import { ApiFeatures } from "../../utils/api.features.js";
import { asyncHandler } from '../../utils/errorHandling.js';

export const addcharity = catchError(async(req,res,next)=>{
    const charity = await charityModel.insertMany(req.body);
    res.status(200).json({message:'success',charity });
});

export const getcharity = catchError(async(req,res,next)=>{
    const total = await charityModel.countDocuments({});
      const totalPages = Math.ceil(total / 10);
      let features = new ApiFeatures(charityModel.find(), req.query)
        .sort()
        .paginate(totalPages)
        .fields()
        .filter();
      const charities = await features.mongooseQuery;
      res
        .status(200)
        .json({ message: "success", totalPages, page: features.page, charities });
});
export const charity = catchError(async(req,res)=>{
  const charity = await charityModel.findById(req.query.id);
  res.status(200).json({message:'success' , charity})
})
export const deleteusers = catchError(async(req,res,next)=>{
    await charityModel.deleteMany();
    res.status(200).json({ message: "success"});
});

export const editProfile = asyncHandler(async(req,res,next)=>{
  const { id, role, name,Description,phone,CRN,address }=req.body;
  let profile;
  if(role.toLowerCase()=='charity') profile=await charityModel.findByIdAndUpdate(id,{name,Description,phone,CRN,address })
  else{
      return next(new Error("In-valid user", { cause: 400 }))
  }
  return res.status(200).json({message:"Done",profile})
})

export const verifyCharity = asyncHandler(async(req,res,next)=>{
  const {name,role,verified} = req.body;
  let charity;
  if(role.toLowerCase()=='charity'){
    // charity=await charityModel.findByIdAndUpdate(name,{verified})
    charity= await charityModel.updateOne({name},{verified})
  }
  else{
      return next(new Error("In-valid user", { cause: 400 }))
  }
  return res.status(200).json({message:"Done",verified:verified})
})