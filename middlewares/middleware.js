const Joi = require('joi');

const checkRegist = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        let response = ResponseTemplate(null, 'invalid request',error.details[0].message, 400)
        return res.status(400).json(response);
    };
    next();
};

module.exports = { checkRegist }