//TODO: Will be Deleted
const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        code: statusCode,
        message: message
    });
};

module.exports = sendErrorResponse;