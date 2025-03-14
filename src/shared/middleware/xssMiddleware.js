const xss = require('xss-clean');

const excludedEndpoints = [
  { path: '/questions', methods: ['PUT', 'POST'] },
];

const conditionalXssMiddleware = () => {

    const xssMiddleware = xss();

  return (req, res, next) => {
    const shouldExclude = excludedEndpoints.some(endpoint => {

      if (!endpoint.methods.includes(req.method)) {
        return false;
      }
      // Build a regex pattern for the endpoint path
      const pattern = new RegExp(`^${endpoint.path}(\\/|$)`);
      return pattern.test(req.originalUrl);
    });

    if (shouldExclude) {
      console.log(`Skipping xss-clean middleware for: ${req.originalUrl}`);
      return next();
    }
    return xssMiddleware(req, res, next);
  };
};

module.exports = { conditionalXssMiddleware };
