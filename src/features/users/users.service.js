const User = require('./user.model');
const bcrypt = require('bcrypt');
const { ResourceNotFoundError, RuntimeError } = require('../../shared/utils/errorTypes');

class UserService {
    static async getUsers() {
        const users = await User.find().select('-password');
        return users;
    }

    static async getUserById(id) {
        const user =await User.findById(id).select('-password');
        if (!user) {
            throw new ResourceNotFoundError('User', 'id', id, 'User not found');
        }
        return user;
    }

    static async createUser(newUser) {
        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            throw new RuntimeError('User already exists', 'User with this email already exists', 400);
        }
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;
        const user = new User(newUser);
        await user.save();
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;

    }

    static async updateUser(id, updatedUser) {
        
        if (updatedUser.hasOwnProperty('role')) {
            delete updatedUser.role;
        }
        
        const user =await User.findByIdAndUpdate(id, updatedUser, { new: true }).select('-password');
        if (!user) {
            throw new ResourceNotFoundError('User', 'id', id, 'User not found');
        }
        return user;
    }

    static async deleteUser(id) {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new ResourceNotFoundError('User', 'id', id, 'User not found');
        }
        return { message: 'User deleted successfully' };
    }
}

module.exports = UserService;

