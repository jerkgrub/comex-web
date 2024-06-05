const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// insert routes here

// Auth
router.post('/api/login', userController.login);

// 1. Create
router.post('/api/acc/new', userController.newAcc);

// 2. Read
router.get('/api/acc/all', userController.findAllUser);
router.get('/api/acc/:id', userController.findOneUser);

// 3. Update
router.put('/api/acc/update/:id', userController.updateUser);

// 4. Delete
router.delete('/api/acc/delete/:id', userController.deleteUser); //DELETE

module.exports = router;