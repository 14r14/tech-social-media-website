const express = require('express');

const router = express.Router();

const authHelperController = require('../controllers/authHelper');

router.get('/get-auth-token', authHelperController.getAuthToken);

module.exports = router;