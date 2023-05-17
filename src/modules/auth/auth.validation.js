import joi from 'joi'
import { generalFields } from '../../middleware/uservalidation.js'



export const usersignup =joi.object({
    name:joi.string().min(2).max(20).required(),
    email:generalFields.email,
    password:generalFields.password,
    cpassword:generalFields.cPassword.valid(joi.ref('password')),
    phone:generalFields.phone,
    job:joi.string().required(),
    gender:joi.string().required(),
    country:joi.string().required()

}).required()

export const charitysignup =joi.object({
    name:joi.string().min(2).max(20).required(),
    email:generalFields.email,
    password:generalFields.password,
    cpassword:generalFields.cPassword.valid(joi.ref('password')),
    phone:generalFields.phone,
    description:joi.string(),
    CRN:joi.string(),
    address:joi.string()

}).required()

export const login =joi.object({
    email:generalFields.email,
    password:generalFields.password,
    role:joi.string().required()
}).required()

export const token =joi.object({
    token:joi.string().required()

}).required()

export const sendCode =joi.object({
    email:generalFields.email,
    role:joi.string().required()
}).required()

export const confirmCode =joi.object({
    email:generalFields.email,
    code:joi.string().pattern(new RegExp(/^[0-9]{4}$/)).required(),
    role:joi.string().required()
}).required()

export const resetPassword =joi.object({
    email:generalFields.email,
    password:generalFields.password,
    cpassword:generalFields.cPassword.valid(joi.ref('password')),
    role:joi.string().required()
}).required()

export const logout=joi.object({
    id:generalFields.id,
    role:joi.string().required()
})

export const addAdmin =joi.object({
    name:joi.string().min(2).max(20).required(),
    email:generalFields.email,
    password:generalFields.password,
    cpassword:generalFields.cPassword.valid(joi.ref('password')),
    phone:generalFields.phone,
    gender:joi.string().required(),
    address:joi.string()

}).required()