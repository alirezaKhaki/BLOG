const Joi = require("joi")
module.exports = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    mobile: Joi.number()
        .integer()
        .required(),
    sex: Joi.string()
        .required()
        .valid('female', 'male'),
    role: Joi.string(),

})