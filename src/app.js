const express = require('express');
const { loadEnv } = require('./shared/config/loadEnv');
const cors = require('cors');
const corsOptions = require('./shared/config/corsOrigins');
const cookieParser = require('cookie-parser');

const { loggerMiddleware } = require('./shared/middleware/logger.middleware');
const { globalErrorHandlerMiddleware } = require('./shared/middleware/globalErrorHandler.middleware');
const { globalValidationMiddleware } = require('./shared/middleware/globalValidation.middleware');
const swaggerMiddleware = require('./shared/middleware/swagger.middleware');
const { rateLimiter } = require('./shared/middleware/rateLimiter.middleware');
const { securityMiddleware } = require('./shared/middleware/security.middleware');

const { configureRoutes } = require('./routes');
const { initCronJobs } = require('./shared/utils/cron');

const app = express();


loadEnv();


app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));


securityMiddleware(app);

app.use(loggerMiddleware);


swaggerMiddleware(app);


app.use(globalValidationMiddleware);

initCronJobs(); 

configureRoutes(app);


app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use(globalErrorHandlerMiddleware);

module.exports = { app };