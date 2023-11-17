const { ResponseTemplate } = require("../template_helper/response");

const storageImage = (req, res) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    return res.status(200).json(ResponseTemplate({image: imageUrl}, 'add image success', true));
};

module.exports = { storageImage };