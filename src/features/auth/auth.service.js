const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const UserService = require('../users/users.service');
const { ResourceNotFoundError, RuntimeError } = require('../../shared/utils/errorTypes');

exports.generateAccessToken = function(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

exports.generateRefreshToken = function(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

exports.verifyAccessToken = function(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

exports.verifyRefreshToken = function(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

exports.registerUser = async function(newUser) {
    const user = await UserService.createUser(newUser);
    return user;
};

exports.loginUser = async function(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new RuntimeError('Invalid credentials', 'Invalid email or password', 400);
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new RuntimeError('Invalid credentials', 'Invalid email or password', 400);
    }
    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    const accessToken = exports.generateAccessToken(user);
    const refreshToken = exports.generateRefreshToken(user);
    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
    };
};

exports.refreshToken = async function(refreshToken) {
    const decoded = exports.verifyRefreshToken(refreshToken);
    if (!decoded) {
        throw new RuntimeError('Unauthorized', 'Invalid token', 401);
    }
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new RuntimeError('Unauthorized', 'Invalid token', 401);
    }
    const accessToken = exports.generateAccessToken(user);
    const newRefreshToken = exports.generateRefreshToken(user);
    return {
        accessToken,
        refreshToken: newRefreshToken,
    };
};

exports.logout = async function(refreshToken) {
    const decoded = exports.verifyRefreshToken(refreshToken);
    if (!decoded) {
        throw new RuntimeError('Unauthorized', 'Invalid token', 401);
    }
    return {
        message: 'User logged out successfully',
    };
};

exports.changePassword = async function(id, oldPassword, newPassword) {
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
};