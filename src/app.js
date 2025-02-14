const express = require("express");
const { loadEnv } = require("./shared/configs/loadEnv");
const { loggerMiddleware, responseLogger } = require("./shared/middlewares/logger.middleware");
const { errorHandler, routeNotFound } = require("./shared/middlewares/errorHandler.middleware")
const { userRouter } = require("./features/auth/user.routes");
const { quizRouter } = require("./features/quiz_management/quiz.routes")

loadEnv()
const app = express();
app.use(express.json());
app.use(loggerMiddleware);
app.use(responseLogger);

app.use("/users", userRouter);
app.use("/quizzes", quizRouter);

app.use(routeNotFound);
app.use(errorHandler);

module.exports = { app }