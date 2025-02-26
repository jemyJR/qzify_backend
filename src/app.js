const express = require('express');
const { loadEnv } = require('./shared/config/loadEnv');

const cors = require('cors');
const corsOptions = require('./shared/config/corsOrigins');

const cookieParser = require('cookie-parser');

const { loggerMiddleware } = require('./shared/middleware/logger.middleware');

const {globalErrorHandlerMiddleware} = require('./shared/middleware/globalErrorHandler.middleware');
const {globalValidationMiddleware} = require('./shared/middleware/globalValidation.middleware');

const { userRouter } = require('./features/users/users.routes');
const { authRouter } = require('./features/auth/auth.routes');
const { quizzesRouter } = require('./features/quizzes/quizzes.routes');
const { attemptsRouter } = require('./features/attempts/attempts.routes');

const app = express();

loadEnv();

// app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use(loggerMiddleware);

app.use(globalValidationMiddleware);

app.use('/users', userRouter);

app.use('/auth', authRouter);

app.use('/quizzes', quizzesRouter);

app.use('/attempts', attemptsRouter);

app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use(globalErrorHandlerMiddleware);

module.exports = { app };
