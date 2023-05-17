import Joi from 'joi';

export const newJob = Joi.object({
    title: Joi.string().min(3).required()
});

export const jobSchema = Joi.object({
    _id : Joi.string().hex().length(24).required()
}); // delete & country



