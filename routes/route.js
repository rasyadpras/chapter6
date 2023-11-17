const express = require('express');
const morgan = require('morgan');
const router = express.Router();
const userRoute = require('./user.route');
const galleryRoute = require('./gallery.route');
const authRoute = require('./auth.route');

router.use(morgan('dev'));

router.use('/api/v1', authRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/arts', galleryRoute);

module.exports = router;