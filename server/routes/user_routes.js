const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// insert routes here
router.post('/api/acc/new', userController.newAcc);
router.post('/api/login', userController.login);

module.exports = router;