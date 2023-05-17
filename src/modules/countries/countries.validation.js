import Joi from 'joi';

export const newCountry = Joi.object({
    name: Joi.string().min(3).required(),
    population: Joi.number().min(1).required(),
    births: Joi.number().min(1).required(),
    deaths: Joi.number().min(1).required(),
    needHelp: Joi.number().min(1).required(),
    income: Joi.number().min(0).required(),
    war:Joi.boolean(),
    problems: Joi.array().items(
        Joi.object({
            problem: Joi.string().min(10).required()
        })
    )
})

export const updateCountry = Joi.object({ 
    _id : Joi.string().hex().length(24).required(),
    name: Joi.string().min(3),
    population: Joi.number().min(1),
    births: Joi.number().min(1),
    deaths: Joi.number().min(1),
    needHelp: Joi.number().min(1),
    income: Joi.number().min(0),
    war:Joi.boolean(),
    problems: Joi.array().items(
        Joi.object({
            problem: Joi.string().min(10),
            _id : Joi.string().hex().length(24).required(),
        })
    )
});

export const countrySchema = Joi.object({
    _id : Joi.string().hex().length(24).required(),
}); // delete & country



