const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const UserService = require('../users/users.service');
const { ResourceNotFoundError, RuntimeError } = require('../../shared/utils/errorTypes');

class AuthService{
    static async registerUser(newUser){
        const user = await UserService.createUser(newUser);
        return user;
    }

    static async loginUser(email, password){
        const
        user = await User.findOne({ email });
        if (!user) {
            throw new RuntimeError('Invalid credentials', 'Invalid email or password', 400);
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new RuntimeError('Invalid credentials', 'Invalid email or password', 400);
        }
        const { password: userPassword, ...userWithoutPassword } = user.toObject();
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        return {
            user: userWithoutPassword,
            accessToken,
            refreshToken,
        }
    }
    static async refreshToken(refreshToken){
        const decoded = this.verifyRefreshToken(refreshToken);
        if (!decoded) {
            throw new RuntimeError('Unauthorized', 'Invalid token', 401);
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new RuntimeError('Unauthorized', 'Invalid token', 401);
        }
        const accessToken = this.generateAccessToken(user);
        const newRefreshToken = this.generateRefreshToken(user);
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
    static async logout(refreshToken){
        const decoded = this.verifyRefreshToken(refreshToken);
        if (!decoded) {
            throw new RuntimeError('Unauthorized', 'Invalid token', 401);
        }
        return {
            message: 'User logged out successfully',
        };
    }
    
    static async changePassword(id, oldPassword, newPassword){
        const user = await User.findById(id);
        if (!user) {
            throw new ResourceNotFoundError('User', 'id', id, 'User not found');
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            throw new RuntimeError('Invalid credentials', 'Invalid password', 400);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return { message: 'Password changed successfully' };
    }

    static generateAccessToken(user){
        return jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
    }

    static generateRefreshToken(user){
        return jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            }, process.env.REFRESH_TOKEN_SECRET , { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
    }
    static verifyAccessToken(token){
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }

    static verifyRefreshToken(token){
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }

}

module.exports = AuthService;

