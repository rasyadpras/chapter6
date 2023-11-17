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


router.post('/', multer.single('image'), postGallery);
router.get('/', getGallery);
router.get('/:id', getGalleryId);
router.put('/:id', multer.single('image'), updateGallery);
// router.put('/:id/image', multer.single('image'), updateGallery);
router.delete('/:id', deleteGallery);

module.exports = router;