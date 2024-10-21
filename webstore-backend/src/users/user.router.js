const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

// Create a new user
router.post('/', userController.createUser);

// Get a user by ID
router.get('/:id', userController.getUser);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
