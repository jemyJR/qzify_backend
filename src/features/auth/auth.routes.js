const express = require('express');
const authController = require('./auth.controller');
const { authValidator } = require('./auth.validator');
const { validate } = require('../../shared/utils/validate');
const { verifyJWT } = require('../../shared/middleware/verifyJWT.middleware');

const authRouter = express.Router();

authRouter.post('/login', validate(authValidator.login), authController.login);
authRouter.post('/register', validate(authValidator.register), authController.register);
authRouter.get('/verify-email/:token', authController.verifyEmail);
authRouter.post('/refresh-token', verifyJWT, validate(authValidator.refreshToken), authController.refreshToken);
authRouter.post('/logout', verifyJWT, validate(authValidator.refreshToken), authController.logout);
authRouter.post('/change-password', verifyJWT, validate(authValidator.changePassword), authController.changePassword);
authRouter.post("/forgot-password", validate(authValidator.forgotPassword), authController.forgotPassword);
authRouter.patch("/reset-password/:token", validate(authValidator.resetPassword), authController.resetPassword);

module.exports = { authRouter };