const express = require('express');
const quizzesController = require('./quizzes.controller');
const { questionsRouter } = require('../questions/questions.routes');


const quizzesRouter = express.Router();

// All Quizzes titles
quizzesRouter.get('/titles', quizzesController.getQuizzesTitles);

// Quizzes  routes
quizzesRouter.get('/', quizzesController.getQuizzes);

quizzesRouter.get('/:id', quizzesController.getQuiz);

quizzesRouter.post('/', quizzesController.createQuiz);

quizzesRouter.put('/:id', quizzesController.updateQuiz);

quizzesRouter.delete('/:id', quizzesController.deleteQuiz);


quizzesRouter.use('/:quizId/questions', questionsRouter);

//TODO: Will be removed later
// // Questions routes
// quizzesRouter.get('/:quizId/questions', quizzesController.getQuestions);

// quizzesRouter.get('/:quizId/questions/:questionId', quizzesController.getQuestion);

// quizzesRouter.post('/:quizId/questions', quizzesController.createQuestion);

// quizzesRouter.put('/:quizId/questions/:questionId', quizzesController.updateQuestion);

// quizzesRouter.delete('/:quizId/questions/:questionId', quizzesController.deleteQuestion);

// // Questions options routes
// quizzesRouter.get('/:quizId/questions/:questionId/options', quizzesController.getOptions);

// quizzesRouter.get('/:quizId/questions/:questionId/options/:optionId', quizzesController.getOption);

// quizzesRouter.post('/:quizId/questions/:questionId/options', quizzesController.createOption);

// quizzesRouter.put('/:quizId/questions/:questionId/options/:optionId', quizzesController.updateOption);

// quizzesRouter.delete('/:quizId/questions/:questionId/options/:optionId', quizzesController.deleteOption);


module.exports = { quizzesRouter };