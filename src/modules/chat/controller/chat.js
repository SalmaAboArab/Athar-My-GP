import userModel from "../../../../database/models/user.js";
import charityModel from "../../../../database/models/charity.js";
import { generateToken, verifyToken } from '../../../utils/GenerateAndVerifyToken.js'
import { asyncHandler } from "../../../utils/errorHandling.js";
import adminModel from "../../../../database/models/admin.js";
import messageModel from "../../../../database/models/message.js";



export const allusers=asyncHandler(async(req,res,next)=>{
    const {role}=req.params;
    let allUsers;
    if(role.toLowerCase()=='user') {
        allUsers=await adminModel.find().select([
            "email","name","image","_id","role"
        ]);
    }
    else if(role.toLowerCase()=='admin'){
        let users=await userModel.find({confirmEmail:true}).select([
            "email","name","image","_id","role"
        ]);
        let charitis=await charityModel.find({confirmEmail:true}).select([
            "email","name","image","_id","role"
        ]);
        allUsers=[...users,...charitis]
    }
    else if(role.toLowerCase()=='charity'){
        allUsers=await adminModel.find().select([
            "email","name","image","_id","role"
        ]);
    }
    else{
        return next(new Error('In-valid role',{cause: 400}))
    }
    return res.status(201).json({message:"Done",allUsers})
})

export const addMessage = asyncHandler(async(req,res,next)=>{
    const {from,to,message} = req.body;  // & role in token
    // const destUser=await userModel.findById(to);
    // if(!destUser) return next(new Error('In-valid user',{cause: 404}))
    const data = await messageModel.create({message:message,users:[from,to],sender:from})
    if(data) return res.status(201).json({message:"Message added successfully."})
    return next(new Error('Failed to add message to database',{cause: 400}))
})

export const getAllMessages = asyncHandler(async(req,res,next)=>{
    const {from,to}=req.body;
    const messages=await messageModel.find({
        users:{
            $all:[from,to]
        }
    }).sort({updatedAt:1})
    if(!messages)  return next(new Error('No messages found',{cause: 404}))
    const projectMessages=messages.map((msg)=>{
       return {
        fromSelf:msg.sender.toString()===from,
        message:msg.message
       } 
    })
    
    return res.status(201).json(projectMessages)
})