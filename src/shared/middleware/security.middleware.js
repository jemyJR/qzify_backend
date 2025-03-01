const hpp = require('hpp');
const helmet = require('helmet');
const { rateLimiter } = require('./rateLimiter.middleware');
const xss = require('xss-clean');
const sanitize = require('express-mongo-sanitize');

const securityMiddleware = (app) => {
    // Set security headers
    app.use(helmet());

    // Prevent http param pollution
    app.use(hpp());

    // Prevent XSS attacks
    app.use(xss());

    // Rate limiting
    app.use(rateLimiter);

    // Prevent NoSQL injection
    app.use(sanitize());

};

module.exports = { securityMiddleware };