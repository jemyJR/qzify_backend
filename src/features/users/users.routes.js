const express = require('express');
const usersController = require('./users.controller');
const {userValidator}  = require('./user.validator');
const { verifyJWT } = require('../../shared/middleware/verifyJWT.middleware');
const { requireAdmin } = require('../../shared/middleware/requireAdmin.middleware');

const userRouter = express.Router();

// userRouter.use( verifyJWT );

// userRouter.get('/', requireAdmin, usersController.getUsers);
userRouter.get('/', usersController.getUsers);


userRouter.get('/:id', usersController.getUserProfile);

userRouter.put('/:id', userValidator.updateUser, usersController.updateUserProfile);

userRouter.delete('/:id', requireAdmin, usersController.deleteUserProfile);

module.exports = { userRouter };