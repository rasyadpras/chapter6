const express = require('express');
const router = express.Router();
const storage = require('../libs/multer');
const {
    postGallery,
    getGallery,
    getGalleryId,
    updateGallery,
    deleteGallery
} = require('../controllers/gallery.controller');

router.post('/', storage.image.single('image'), postGallery);
router.get('/', getGallery);
router.get('/:id', getGalleryId);
router.put('/:id', storage.image.single('image'), updateGallery);
router.delete('/:id', deleteGallery);

module.exports = router;