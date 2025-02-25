const jwt = require('jsonwebtoken');
const { RuntimeError } = require('../utils/errorTypes');

const verifyJWT = (req, res, next) => {
    const  authHeader = req.headers['authorization'];
    if(!authHeader?.startsWith('Bearer ')) {
        throw new RuntimeError('Unauthorized', 'No token provided', 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        throw new RuntimeError('Unauthorized', 'Invalid token', 401);
    }
}

module.exports = { verifyJWT };