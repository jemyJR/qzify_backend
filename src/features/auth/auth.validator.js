const { check, body } = require('express-validator');
const { changePassword, forgotPassword, resetPassword } = require('./auth.service');
const { RuntimeError } = require('../../shared/utils/errorTypes');

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
    forgotPassword: [
        check('email').isEmail().withMessage('Email must be a valid email'),
    ],
    resetPassword: [
        check('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
        body('passwordConfirmation').custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new RuntimeError('Validation error', 'Password confirmation does not match new password', 400);
            }
            return true;
        }),
    ]
};

module.exports = { authValidator };