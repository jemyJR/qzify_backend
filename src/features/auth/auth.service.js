const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const userService = require('../users/users.service');
const userUtlis = require('../users/user.utils');
const sendEmail = require('../../shared/utils/email');
const { ResourceNotFoundError, RuntimeError } = require('../../shared/utils/errorTypes');

const generateAccessToken = function (user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
            tokenVersion: user.tokenVersion
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

const generateRefreshToken = function (user) {
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

const generateResetPassToken = () => {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    expireTime = Date.now() + 10 * 60 * 1000;
    return { resetToken, passResetToken, expireTime };
}

const logoutAllDevices = async (id) => {
    const user = await userService.getUserById(id);
    if (!user) throw new ResourceNotFoundError('User', 'id', id, 'User not found');
    user.tokenVersion = (user.tokenVersion || 0) + 1;
    await userService.updateUser(id, user);
    console.log('You have been logged out from all devices');
}

const verifyAccessToken = function (token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = function (token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

exports.registerUser = async function (user) {
    const existingUser = await userService.getUserByEmail(user.email)
    if (existingUser) {
        throw new RuntimeError('User already exists', 'User with this email already exists', 400);
    }
    const { password, ...userData } = user;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userService.createUser({
        password: hashedPassword,
        ...userData,
    });
    generateAccessToken(newUser);

    return userUtlis.removePassword(newUser);
};

exports.loginUser = async function (email, password) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new RuntimeError('Invalid credentials', 'Invalid email or password', 400);
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new RuntimeError('Invalid credentials', 'Invalid email or password', 400);
    }
    const userWithoutPassword = userUtlis.removePassword(user);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
    };
};

exports.refreshToken = async function (refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
        throw new RuntimeError('Unauthorized', 'Invalid token', 401);
    }
    const user = await userService.getUserById(decoded.id);
    if (!user) {
        throw new RuntimeError('Unauthorized', 'Invalid token', 401);
    }
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    return {
        accessToken,
        refreshToken: newRefreshToken,
    };
};

exports.logout = async function (refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
        throw new RuntimeError('Unauthorized', 'Invalid token', 401);
    }
    return {
        message: 'User logged out successfully',
    };
};

exports.changePassword = async function (id, oldPassword, newPassword) {
    const user = await userService.getUserById(id)
    if (!user) {
        throw new ResourceNotFoundError('User', 'id', id, 'User not found');
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
        throw new RuntimeError('Invalid credentials', 'Invalid password', 400);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await userService.updateUser(user.id, user);
    logoutAllDevices(user.id);
    return { message: 'Password changed successfully' };
};

exports.forgotPassword = async (email, protocol, host) => {
    const user = await userService.getUserByEmail(email);
    if (!user) throw new ResourceNotFoundError('User', 'email', email, 'User not found');
    const resetData = generateResetPassToken();
    user.resetPassToken = resetData.passResetToken;
    user.resetPassTokenExpire = resetData.expireTime;
    await userService.updateUser(user.id, user);
    const resetUrl = `${protocol}://${host}/auth/resetPassword/${resetData.resetToken}`;
    const message = `Click Here: ${resetUrl} to reset your password\nThis link is only valid for 10 minutes.\n\nIf you didn't request this, you can safely ignore this email.`

    await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message: message
    });
    return `Password reset Link has been sent to this email: ${user.email}`
}

exports.resetPassword = async (token, pass, confirmPass) => {
    const resetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await userService.getUserByprop({ resetPassToken: resetToken, resetPassTokenExpire: { $gt: Date.now() } });
    if (!user) throw new ResourceNotFoundError("User", "", "", "");
    if (pass === confirmPass) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(pass, salt);
        user.resetPassToken = null;
        user.resetPassTokenExpire = null;
        await userService.updateUser(user.id, user);
        logoutAllDevices(user.id);
        const loginToken = generateAccessToken(user);
        return loginToken;
    } else {
        throw new RuntimeError('Invalid credentials', 'Invalid password', 400);
    }

}