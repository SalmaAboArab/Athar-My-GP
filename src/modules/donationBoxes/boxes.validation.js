import Joi from 'joi';

export const newBox = Joi.object({
    charityId:Joi.string().hex().length(24).required(),
    countryId:Joi.string().hex().length(24).required(),
    title : Joi.string().min(20).required(),
    categories:Joi.array().min(1).items().required(),
    amount: Joi.number().min(1).required(),
})

export const EditBox = Joi.object({
    _id:Joi.string().hex().length(24).required(),
    title : Joi.string().min(20),
    categories:Joi.array().min(1).items(),
    amount: Joi.number().min(0),
});


export const BoxSchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
}); // delete & country



