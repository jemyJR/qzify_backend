const AuthService = require('./auth.service');
const sendErrorResponse = require('../../shared/utils/errorHandler');

class AuthController {
    static login(req, res) {
        try {
            const { email, password } = req.body;
            const user = AuthService.login(email, password);
            res.json({
                code: 200,
                message: 'Login successful',
                user
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Email or password is incorrect') {
                sendErrorResponse(res, 400, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static register(req, res) {
        try {
            const newUser = AuthService.register(req.body);
            res.json({
                code: 201,
                message: 'User created successfully',
                user: newUser
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Email already exists') {
                sendErrorResponse(res, 400, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static changePassword(req, res) {
        try {
            const { email, oldPassword, newPassword } = req.body;
            const user = AuthService.changePassword(email, oldPassword, newPassword);
            res.json({
                code: 200,
                message: 'Password changed successfully',
                user
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Email or password is incorrect' || err.message === 'New password must be different') {
                sendErrorResponse(res, 400, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = AuthController;
