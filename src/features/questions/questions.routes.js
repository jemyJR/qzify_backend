const express = require('express');
const QuestionsController = require('./questions.controller');
const { optionsRouter } = require('../options/options.routes'); 


const questionsRouter = express.Router({ mergeParams: true });

questionsRouter.get('/', QuestionsController.getQuestions);

questionsRouter.get('/:questionId', QuestionsController.getQuestion);

questionsRouter.post('/', QuestionsController.createQuestion);

questionsRouter.put('/:questionId', QuestionsController.updateQuestion);

questionsRouter.delete('/:questionId', QuestionsController.deleteQuestion);

questionsRouter.use('/:questionId/options', optionsRouter);


module.exports = { questionsRouter };