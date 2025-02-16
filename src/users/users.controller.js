const UserService = require('./users.service');
const sendErrorResponse = require('../shared/utils/errorHandler');

class UserController {

    static getUsers(req, res) {
        try {
            const users = UserService.getUsers();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    static getUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = UserService.getUser(id);
            res.json(user);
        } catch (err) {
            console.error(err);
            if (err.message === 'User not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static createUser(req, res) {
        try {
            const newUser = UserService.createUser(req.body);
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

    static updateUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            const updatedUser = UserService.updateUser(id, req.body);
            res.json({
                code: 200,
                message: 'User updated successfully',
                user: updatedUser
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'User not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            UserService.deleteUser(id);
            res.json({
                code: 200,
                message: 'User deleted successfully',
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'User not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = UserController;
