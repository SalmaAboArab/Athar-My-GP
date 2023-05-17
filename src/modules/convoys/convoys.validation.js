import Joi from 'joi';

export const newConvoy = Joi.object({
    charityId:Joi.string().hex().length(24).required(),
    countryId:Joi.string().hex().length(24).required(),
    totalVolunteers : Joi.number().min(1).max(500).required(),
    jobs:Joi.array().items(
        Joi.object({
            job: Joi.string().required(),
            count: Joi.number().min(1).max(500).required()
        }).required()
    ).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
})

export const userToConvoy = Joi.object({
    _id : Joi.string().hex().length(24).required(),
    userId : Joi.string().hex().length(24).required(),
});


export const convoySchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
}); // delete & country



