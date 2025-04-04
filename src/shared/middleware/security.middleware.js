const hpp = require('hpp');
const helmet = require('helmet');
const { rateLimiter } = require('./rateLimiter.middleware');
const { conditionalXssMiddleware } = require('./xssMiddleware');
const sanitize = require('express-mongo-sanitize');

const securityMiddleware = (app) => {
    // Set security headers
    app.use(helmet());

    // Prevent http param pollution
    app.use(hpp());

    // Prevent XSS attacks
    app.use(conditionalXssMiddleware());

    // Rate limiting
    app.use(rateLimiter);

    // Prevent NoSQL injection
    app.use(sanitize());

};

module.exports = { securityMiddleware };