const { RuntimeError } = require('../utils/errorTypes');

const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return next(new RuntimeError('Forbidden', 'Access denied. Admin only', 403));
    }
    next();
};

module.exports = { requireAdmin };
