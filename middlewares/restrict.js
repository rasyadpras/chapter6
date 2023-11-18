const jwt = require('jsonwebtoken');
const { ResponseTemplate } = require('../template_helper/response');

async function authorization (req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        let response = ResponseTemplate(null, 'user unauthorized', null, 400);
        return res.status(400).json(response);
    }

    try {
        const user = await jwt.verify(authorization, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        let response = ResponseTemplate(null, 'user not authorized', null, 401);
        return res.status(401).json(response);
    }
};

module.exports = { authorization };