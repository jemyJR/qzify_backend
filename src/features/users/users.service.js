const UserRepo = require('./user.repo');
const { ResourceNotFoundError } = require('../../shared/utils/errorTypes');
const { removeSensitiveInfo } = require('./user.utils');

exports.getUsers = async function () {
    const users = await UserRepo.findAll();
    return users.map(user => removeSensitiveInfo(user))
};

exports.getUserByEmail = async (email) => {
    return await UserRepo.findOne({ email });
}
exports.getUserByprop = async (prop) => {
    return await UserRepo.findOne(prop);
}
exports.getUserById = async function (id) {
    const user = await UserRepo.findById(id);
    if (!user) {
        throw new ResourceNotFoundError('User', 'id', id, 'User not found');
    }
    return user;
};

exports.createUser = async (user) => {
    return await UserRepo.save(user);
}

exports.updateUser = async function (id, updatedUser) {
    if (updatedUser.hasOwnProperty('role')) {
        delete updatedUser.role;
    }
    return await UserRepo.save({ id, ...updatedUser });
};

exports.deleteUser = async function (id) {
    const user = await UserRepo.deleteById(id);
    if (!user) {
        throw new ResourceNotFoundError('User', 'id', id, 'User not found');
    }
    return { message: 'User deleted successfully' };
};