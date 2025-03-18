const { userRouter } = require('./features/users/users.routes');
const { authRouter } = require('./features/auth/auth.routes');
const { questionsRouter } = require('./features/questions/questions.routes');
const { attemptsRouter } = require('./features/attempts/attempts.routes');

const configureRoutes = (app) => {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/questions', questionsRouter);
    app.use('/attempts', attemptsRouter);
};

module.exports = { configureRoutes };