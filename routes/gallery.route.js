const express = require('express');
const router = express.Router();
const multer = require('multer')();
const {
    postGallery,
    getGallery,
    getGalleryId,
    updateGallery,
    deleteGallery
} = require('../controllers/gallery.controller');
const { authorization } = require('../middlewares/restrict');


router.post('/', authorization, multer.single('image'), postGallery);
router.get('/', getGallery);
router.get('/:id', getGalleryId);
router.put('/:id', authorization, multer.single('image'), updateGallery);
router.delete('/:id', authorization, deleteGallery);

module.exports = router;