import Joi from 'joi';

export const newdonate = Joi.object({
    userId:Joi.string().hex().length(24).required(),
    donationBox:Joi.string().hex().length(24).required(),
    amount : Joi.number().min(10).required()
})

export const cancelDonate = Joi.object({
    _id : Joi.string().hex().length(24).required()
});




