const express = require('express');
const router = express.Router();
const {
    getUser,
    getUserId,
    updateUser
} = require('../controllers/user.controller');

router.get('/', getUser);
router.get('/:id', getUserId);
router.put('/:id', updateUser);

module.exports = router;