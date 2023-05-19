import joi from 'joi'
import { generalFields } from '../../middleware/uservalidation.js'


export const editProfile =joi.object({
    id:joi.string().required(),
    role:joi.string().required(),
    name:joi.string().min(2).max(20).required(),
    Description:joi.string(),
    phone:generalFields.phone,
    CRN:joi.string(),
    address:joi.string()

}).required()