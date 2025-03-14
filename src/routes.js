const { userRouter } = require('./features/users/users.routes');
const { authRouter } = require('./features/auth/auth.routes');
const { questionsRouter } = require('./features/questions/questions.routes');
// const { quizzesRouter } = require('./features/quizzes/quizzes.routes');
// const { attemptsRouter } = require('./features/attempts/attempts.routes');

const configureRoutes = (app) => {
    
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
    app.use('/questions', questionsRouter);

    // app.use('/quizzes', quizzesRouter);
    // app.use('/attempts', attemptsRouter);
};

module.exports = { configureRoutes };