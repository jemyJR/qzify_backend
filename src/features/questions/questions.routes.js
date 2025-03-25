const express = require('express');
const QuestionsController = require('./questions.controller');
const { validate } = require('../../shared/utils/validate');
const { questionValidator } = require('./question.validator');
const { verifyJWT } = require('../../shared/middleware/verifyJWT.middleware');
const { requireAdmin } = require('../../shared/middleware/requireAdmin.middleware');

const questionsRouter = express.Router();

questionsRouter.use(verifyJWT);

questionsRouter.get('/category', QuestionsController.getAllCategories);

questionsRouter.use(requireAdmin);

questionsRouter.get('/category/:category', QuestionsController.getQuestionsByCategory);

questionsRouter.post('/bulk', QuestionsController.createBulkQuestions);

questionsRouter.get('/random', QuestionsController.getRandomQuiz);

questionsRouter.get('/', QuestionsController.getQuestions);

questionsRouter.get('/:id', QuestionsController.getQuestion);

questionsRouter.post('/', validate(questionValidator.createQuestion), QuestionsController.createQuestion);

questionsRouter.put('/:id', validate(questionValidator.createQuestion), QuestionsController.updateQuestion);

questionsRouter.delete('/:id', QuestionsController.deleteQuestion);

module.exports = { questionsRouter };