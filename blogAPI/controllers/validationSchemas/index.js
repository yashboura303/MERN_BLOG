const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        fullName: Joi.string(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(4)
            .required(),
        username: Joi.string()
            .min(4)
            .required()

    });
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        password: Joi.string()
            .min(4)
            .required(),
        username: Joi.string()
            .min(4)
            .required()

    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;