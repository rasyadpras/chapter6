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


router.post('/', multer.single('imageUrl'), postGallery);
router.get('/', getGallery);
router.get('/:id', getGalleryId);
router.put('/:id', multer.single('imageUrl'), updateGallery);
router.delete('/:id', authorization, deleteGallery);

module.exports = router;