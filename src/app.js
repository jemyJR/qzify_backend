const express = require('express');
const { loadEnv } = require('./shared/config/loadEnv');
const { loggerMiddleware } = require('./shared/middleware/logger.middleware');
const { userRouter } = require('./features/users/users.routes');
const { authRouter } = require('./features/auth/auth.routes');

const app = express();

loadEnv();

app.use(express.json());

app.use(loggerMiddleware);

app.use('/users', userRouter);

app.use('/auth', authRouter);




module.exports = { app };
