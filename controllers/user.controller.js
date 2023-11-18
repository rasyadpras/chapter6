const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { ResponseTemplate } = require('../template_helper/response');
const prisma = new PrismaClient();

async function getUser(req, res) {
    const { name } = req.query;
    const payload = {}

    if (name) {
        payload.name = name
    }

    try {
        const user = await prisma.users.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
        });
        let response = ResponseTemplate(user, 'get data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function getUserId(req, res) {
    const { id } = req.params;
    
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: Number(id)
            },
        });
        if (!user) {
            let response = ResponseTemplate(null, 'user not found', error, 404);
            return res.status(404).json(response);
        } else {
            let response = ResponseTemplate(user, 'get data success', null, 200);
            return res.status(200).json(response);
        }
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function updateUser(req, res) {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const payload = {};

    if (!name && !email && !password) {
        let response = ResponseTemplate(null, 'bad request', error, 400);
        return res.status(400).json(response);
    }

    if (name) {
        payload.name = name
    }
    if (email) {
        payload.email = email
    }
    if (password) {
        payload.password = password
    }

    try {
        const findUser = await prisma.users.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!findUser) {
            let response = ResponseTemplate(null, 'user not found', error, 404);
            return res.status(404).json(response);
        };

        const user = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: payload,
        });
        let response = ResponseTemplate(user, 'update data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
}

module.exports = {
    getUser,
    getUserId,
    updateUser
};