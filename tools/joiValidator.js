const Joi = require("joi")
module.exports.register = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(4)
        .max(50)
        .required(),
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    mobile: Joi.number()
        .integer()
        .required(),
    sex: Joi.string()
        .required()
        .valid('female', 'male')
        .label('gender'),
    role: Joi.string(),

})
module.exports.dashboard = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(4)
        .max(50)
        .required(),
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    mobile: Joi.number()
        .integer()
        .required(),
    sex: Joi.string()
        .required()
        .valid('female', 'male')
        .label('gender'),
    role: Joi.string(),

})