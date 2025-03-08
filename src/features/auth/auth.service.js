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

const generateEmailToken = (type) => {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    let expireTime;

    if (type === "resetPassword") {
        expireTime = Date.now() + 10 * 60 * 1000;
    } else if (type === "emailVerification") {
        expireTime = Date.now() + 24 * 60 * 60 * 1000;
    } else {
        throw new Error("Invalid token type");
    }
    return { token, hashedToken, expireTime };
};


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

exports.registerUser = async function (protocol, host, user) {
    const existingUser = await userService.getUserByEmail(user.email)
    if (existingUser) {
        throw new RuntimeError('User already exists', 'User with this email already exists', 400);
    }
    const { password, ...userData } = user;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const { token, hashedToken, expireTime } = generateEmailToken("emailVerification");

    const newUser = await userService.createUser({
        password: hashedPassword,
        isVerified: false,
        verificationToken: hashedToken,
        verificationTokenExpire: expireTime,
        ...userData,
    });
    const verifyUrl = `${protocol}://${host}/auth/verify-email/${token}`;
    const message = `Click the link to verify your email: ${verifyUrl}`;

    await sendEmail({
        email: newUser.email,
        subject: "Verify Your Email",
        message: message,
    });
    return { message: 'Verification email sent. Please check your inbox.' };
};

exports.verifyEmail = async (token) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await userService.getUserByprop({ verificationToken: hashedToken, verificationTokenExpire: { $gt: Date.now() } });
    if (!user) throw new ResourceNotFoundError("User", "", "", "");
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpire = null;
    await userService.updateUser(user.id, user);
    return userUtlis.removePassword(user);
};

exports.loginUser = async function (email, password) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
        throw new RuntimeError('Invalid credentials', 'Invalid email or password', 400);
    }
    if (!user.isVerified) {
        throw new RuntimeError('Email not verified', 'Please verify your email before logging in', 403);
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
    await logoutAllDevices(decoded.id);
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
    await logoutAllDevices(user.id);
    return { message: 'Password changed successfully' };
};

exports.forgotPassword = async (email, protocol, host) => {
    const user = await userService.getUserByEmail(email);
    if (!user) throw new ResourceNotFoundError('User', 'email', email, 'User not found');
    const { token, hashedToken, expireTime } = generateEmailToken("resetPassword");
    user.resetPassToken = hashedToken;
    user.resetPassTokenExpire = expireTime;
    await userService.updateUser(user.id, user);
    const resetUrl = `${protocol}://${host}/auth/reset-password/${token}`;
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
        await logoutAllDevices(user.id);
        const loginToken = generateAccessToken(user);
        return loginToken;
    } else {
        throw new RuntimeError('Invalid credentials', 'Invalid password', 400);
    }

}