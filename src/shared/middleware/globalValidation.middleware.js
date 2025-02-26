const { validationResult } = require('express-validator');

const globalValidationMiddleware = (req, res, next) => {
  if (req.method === 'POST') {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation Error',
        details: errors.array(),
        statusCode: 400
      });
    }
  }
  next();
};

module.exports = { globalValidationMiddleware };
