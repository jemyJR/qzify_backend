const { check } = require('express-validator');
const userValidator = {
    updateUser: [
        check('first_name').optional().isString().withMessage('First name must be a string'),
        check('last_name').optional().isString().withMessage('Last name must be a string'),
        check('email').optional().isEmail().withMessage('Email must be a valid email'),
        check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        check('image').optional().isString().withMessage('Image must be a string'),
        check('role').optional().isString().withMessage('Role must be a string')
    ]
    
};

module.exports = { userValidator };