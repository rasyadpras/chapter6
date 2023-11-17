const { PrismaClient } = require('@prisma/client');
const { ResponseTemplate } = require('../template_helper/response');
const prisma = new PrismaClient();

async function postGallery(req, res) {
    const { title, description, user_id } = req.body;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    try {
        const art = await prisma.gallery.create({
            data: {
                title,
                description,
                image: imageUrl,
                user_id
            }
        });
        let response = ResponseTemplate(art, 'input data success', null, 201);
        return res.status(201).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', null, 500);
        return res.status(500).json(response);
    }
};

async function getGallery(req, res) {
    const { title } = req.query;
    const payload = {};

    if (title) {
        payload.title = title
    }

    try {
        const art = await prisma.gallery.findMany({
            where: payload,
            orderBy: {
                id: 'asc'
            },
        });
        let response = ResponseTemplate(art, 'get data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', null, 500);
        return res.status(500).json(response);
    }
};

async function getGalleryId(req, res) {
    const { id } = req.params;

    try {
        const art = await prisma.gallery.findUnique({
            where: {
                id: Number(id)
            },
        });
        if (!art) {
            let response = ResponseTemplate(null, 'data not found', null, 404);
            return res.status(404).json(response);
        } else {
            let response = ResponseTemplate(users, 'get data success', null, 200);
            return res.status(200).json(response);
        }
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function updateGallery(req, res) {
    const { title, description, image } = req.body;
    const { id } = req.params;
    const payload = {};
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    if (!title && !description && !image) {
        let response = ResponseTemplate(null, 'bad request', error, 400);
        return res.status(400).json(response);
    }

    if (title) {
        payload.title = title
    }
    if (description) {
        payload.description = description
    }
    if (image) {
        payload.image = imageUrl
    }

    try {
        const find = await prisma.gallery.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!find) {
            let response = ResponseTemplate(null, 'user not found', error, 404);
            return res.status(404).json(response);
        };

        const art = await prisma.gallery.update({
            where: {
                id: Number(id)
            },
            data: payload,
        });
        let response = ResponseTemplate(art, 'update data success', null, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

async function deleteGallery(req, res) {
    const { id } = req.body;

    try {
        const find = await prisma.gallery.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!find) {
            let response = ResponseTemplate(null, 'user not found', error, 404);
            return res.status(404).json(response);
        };

        const art = await prisma.gallery.delete({
            where: {
                id: Number(id)
            },
        });
        let response = ResponseTemplate(null, 'delete data success', false, 200);
        return res.status(200).json(response);
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500);
        return res.status(500).json(response);
    }
};

module.exports = {
    postGallery,
    getGallery,
    getGalleryId,
    updateGallery,
    deleteGallery
}