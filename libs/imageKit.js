var ImageKit = require('imagekit');
require('dotenv').config();

const {
    IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_SECRET_KEY,
    IMAGEKIT_URL_ENDPOINT
} = process.env;

const imagekit = new ImageKit ({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_SECRET_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT
});

module.exports = imagekit;