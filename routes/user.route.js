const express = require('express');
const router = express.Router();
const {
    getUser,
    getUserId,
    updateUser
} = require('../controllers/user.controller');
const { authorization } = require('../middlewares/restrict');

router.get('/', getUser);
router.get('/:id', getUserId);
router.put('/:id', authorization, updateUser);

module.exports = router;