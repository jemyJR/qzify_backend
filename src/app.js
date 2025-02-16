const express = require('express');
const { loadEnv } = require('./shared/config/loadEnv');
const { loggerMiddleware } = require('./shared/middleware/logger.middleware');
const { userRouter } = require('./users/users.routes');

const app = express();

loadEnv();

app.use(express.json());

app.use(loggerMiddleware);

app.use('/users', userRouter);




module.exports = { app };
