const express = require('express');
const usersController = require('./users.controller');

const userRouter = express.Router();

userRouter.get('/', usersController.getUsers);

userRouter.get('/:id', usersController.getUser);

userRouter.post('/', usersController.createUser);

userRouter.put('/:id', usersController.updateUser);

userRouter.delete('/:id', usersController.deleteUser);

module.exports = { userRouter };