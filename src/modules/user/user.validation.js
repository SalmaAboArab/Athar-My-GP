import joi from 'joi'
import { generalFields } from '../../middleware/uservalidation.js'



export const editProfile =joi.object({
    name:joi.string().min(2).max(20).required(),
    gender:joi.string().required(),
    phone:generalFields.phone,
    job:joi.string().required(),
    country:joi.string().required()

}).required()