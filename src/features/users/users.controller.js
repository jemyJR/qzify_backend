const UserService = require('./users.service');

exports.getUsers = async function(req, res, next) {
    try {
        const users = await UserService.getUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.getUserProfile = async function(req, res, next) {
    try {
        const id = req.params.id;
        const user = await UserService.getUserById(id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.updateUserProfile = async function(req, res, next) {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedUser = await UserService.updateUser(id, updateData);
        res.json({
            code: 200,
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteUserProfile = async function(req, res, next) {
    try {
        const id = req.params.id;
        const message = await UserService.deleteUser(id);
        res.json({
            code: 200,
            message,
        });
    } catch (err) {
        next(err);
    }
};