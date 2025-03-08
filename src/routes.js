const { userRouter } = require('./features/users/users.routes');
const { authRouter } = require('./features/auth/auth.routes');

const configureRoutes = (app) => {

    app.use('/users', userRouter);
    app.use('/auth', authRouter);
};

module.exports = { configureRoutes };