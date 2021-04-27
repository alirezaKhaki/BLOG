const Joi = require("joi")

//validator for register page
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
    //validator for dashboard page
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
    //validator for edit function in dashboard page

module.exports.editDashboard = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
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
    //validator for comment section
module.exports.comment = Joi.object({
        text: Joi.string()
            .min(3)
            .max(200)
            .required(),
        owner: Joi.string()
            .required(),
        article: Joi.string()
            .required(),
    })
    //validator for forget password page
module.exports.forgot = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().email({ tlds: { allow: false } })
})