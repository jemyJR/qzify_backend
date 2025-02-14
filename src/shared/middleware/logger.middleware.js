function loggerMiddleware(req, res, next) {
    const start = Date.now();
  
    console.log('Request:', {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
      query: req.query,
      timestamp: new Date().toISOString()
    });
  
    const originalSend = res.send;
    let responseBody = '';
  
    res.send = function (body) {
      responseBody = body;
      return originalSend.apply(res, arguments);
    };
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log('Response:', {
        status: res.statusCode,
        duration: `${duration}ms`,
        headers: res.getHeaders(),
        body: responseBody,
        timestamp: new Date().toISOString()
      });
    });
  
    next();
  }
  
  module.exports = { loggerMiddleware };