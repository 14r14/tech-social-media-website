const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/login', authController.postLoginController);

router.post('/register', authController.postRegisterController);

module.exports = router;