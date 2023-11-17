const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const { ResponseTemplate } = require('../template_helper/response');

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const exist = await prisma.users.findUnique({ where: { email } });
        const encryptedPass = await bcrypt.hash(password, 10);

        if (exist) {
            let response = ResponseTemplate(null, 'bad request', 'email already used!', 400);
            return res.status(400).json(response);
        }

        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: encryptedPass
            }
        });
        let response = ResponseTemplate(user, 'input data success', null, 201);
        return res.status(201).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({ where: { email: email } });
        if (!user) {
            let response = ResponseTemplate(null, 'bad request', 'invalid email or password!', 400);
            return res.status(400).json(response);
        };

        const passwordTrue = await bcrypt.compare(password, user.password);
        if (!passwordTrue) {
            let response = ResponseTemplate(null, 'bad request', 'invalid email or password!', 400);
            return res.status(400).json(response);
        };

        let token = jwt.sign({ email: user.email, user_id: user.user_id }, process.env.SECRET_KEY);
        let response = ResponseTemplate({ user, token }, 'created', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
};