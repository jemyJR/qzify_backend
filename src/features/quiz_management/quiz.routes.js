const { Router } = require("express");
const quizController = require("./quiz.controller")
const quizRouter = new Router();

quizRouter.get("/", quizController.getAllQuizzes);
quizRouter.get("/:id", quizController.getQuizById);
quizRouter.post("/", quizController.addQuiz);
quizRouter.put("/:id", quizController.editQuiz);
quizRouter.delete("/:id", quizController.deleteQuiz);

quizRouter.get("/:quizId/questions", quizController.getQuizQuestions);
quizRouter.post("/:quizId/questions", quizController.addQuestion);
quizRouter.put("/:quizId/questions/:id", quizController.editQuestion);
quizRouter.delete("/:quizId/questions/:id", quizController.deleteQuestion);

module.exports = { quizRouter }
