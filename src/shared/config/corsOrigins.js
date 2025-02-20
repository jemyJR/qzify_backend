const allowedOrigins = require('./allowedOrigins');

const coreOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    creadentials: true,
    optionSuccessStatus: 200,
};

module.exports = coreOptions;