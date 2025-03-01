const rateLimit = require('express-rate-limit');
const { RuntimeError } = require('../utils/errorTypes');

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    handler: (req, res, next) => {
        next(new RuntimeError('Too many requests', 'Too many requests from this IP, please try again after 15 minutes', 429));
    }
});

module.exports = { rateLimiter };