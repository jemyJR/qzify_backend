const { check } = require('express-validator');
const { changePassword } = require('./auth.service');
const authValidator = {
    login: [
        check('email').isEmail().withMessage('Email must be a valid email'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    register: [
        check('first_name').isString().withMessage('First name must be a string'),
        check('last_name').isString().withMessage('Last name must be a string'),
        check('email').isEmail().withMessage('Email must be a valid email'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        check('image').optional().isString().withMessage('Image must be a string'),
        check('role').optional().isString().withMessage('Role must be a string'),
    ],
    refreshToken: [
        check('refreshToken').optional().isString().withMessage('Refresh token must be a string'),
    ],
    changePassword: [
        check('oldPassword').isLength({ min: 6 }).withMessage('Old password must be at least 6 characters long'),
        check('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
    ],
};

module.exports = { authValidator };