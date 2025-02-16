const express = require('express');
const authController = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/register', authController.register);

authRouter.patch('/change-password', authController.changePassword);

module.exports = { authRouter };