const globalErrorHandlerMiddleware = (error, req, res, next) => {
    console.error('Error:',{
        message : error.message,
        details : error.details,
        stack : error.stack,
        statusCode : error.statusCode
    });

    const errorResponse = {
        code : (error.statusCode && error.statusCode !== 500) ? error.statusCode : 500,
        message : error.message || 'Internal Server Error',
        details : error.details || 'An unexpected error occurred'
    };

    if(error.name === 'ValidationError'){
        errorResponse.code = 400;
        errorResponse.message = 'Validation Error';
        errorResponse.details = Object.values(error.errors).map((val) => val.message);
    }

    if(error.name === 'CastError'){
        errorResponse.code = 400;
        errorResponse.message = 'Invalid ID';
        errorResponse.details = `Invalid ID: ${error.value}`;
    }

    res.status(errorResponse.code).json(errorResponse);
    
};

module.exports = { globalErrorHandlerMiddleware };