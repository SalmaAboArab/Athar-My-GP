import { verifyToken } from "../utils/GenerateAndVerifyToken.js";
import userModel from "../../database/models/user.js";
import { asyncHandler } from "../utils/errorHandling.js";
import charityModel from "../../database/models/charity.js";
import adminModel from "../../database/models/admin.js";


export const roles = {
    Admin: "Admin",
    User: 'User',
    HR: "HR"
}

export const auth= (accessRoles=[])=>{
    return asyncHandler(async(req,res,next)=>{
        const{authorization}=req.headers;
        if(!authorization?.startsWith(process.env.BEARER_KEY)){
            return next (new Error("In-Valid Barrer Key"),{cause:400})
        }
        const token=authorization.split(process.env.BEARER_KEY)[1]
        if(!token){
            return next(new Error("In-Valid token",{cause:400}))
        }
        const decoded=verifyToken({token})
        if(!decoded?.id){
            return next(new Error("In-Valid token payload",{cause:400}))
        }
        let user;
        if(decoded.role=='user'){
            user = await userModel.findById(decoded.id)            // .select("username image")
        }
        else if(decoded.role=='charity'){
            user = await charityModel.findById(decoded.id)         // .select("username image")
        }
        else if(decoded.role=='admin'){
            user = await adminModel.findById(decoded.id)          // .select("username image")
        }
        if(!user){
            return next(new Error("Not register user",{cause:401}))
        }
        
        if(accessRoles.includes(user.role)){
            return next(new Error("Not authorized user",{cause:403}))
        }
        req.user=user;
        return next();
    })
}