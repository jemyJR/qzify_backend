const jwt = require('jsonwebtoken');
const userService = require('../../features/users/users.service');
const { RuntimeError } = require('../utils/errorTypes');

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
        throw new RuntimeError('Unauthorized', 'No token provided', 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await userService.getUserById(decoded.id);
        if (!user) {
            throw new RuntimeError('Unauthorized', 'User not found', 401);
        }

        if (user.tokenVersion !== decoded.tokenVersion) {
            throw new RuntimeError("Session expired", "Please log in again.", 401);
        }
        req.user = decoded;
        next();
    } catch (err) {
        throw new RuntimeError('Unauthorized', 'Invalid token', 401);
    }
}

module.exports = { verifyJWT };