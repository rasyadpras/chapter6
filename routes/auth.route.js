const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const restrict = require('../middlewares/restrict');
const { ResponseTemplate } = require('../template_helper/response');
const { checkRegist } = require('../middlewares/middleware');
const router = express.Router();

router.post('/register', checkRegist, register);
router.post('/login', login);
router.post('/whoami', restrict, (req, res) => {
    let response = ResponseTemplate({ user: req.user }, 'success', null, 200)
    return res.status(200).json(response)
});

module.exports = router;