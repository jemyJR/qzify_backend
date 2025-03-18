const express = require('express');
const AttemptsConroller = require('./attempts.controller');
const { verifyJWT } = require('../../shared/middleware/verifyJWT.middleware');

const attemptsRouter = express.Router();

attemptsRouter.use(verifyJWT);

attemptsRouter.post('/start', AttemptsConroller.startQuiz);
attemptsRouter.post('/:id/submit', AttemptsConroller.submitQuiz);
attemptsRouter.get('/:id', AttemptsConroller.getAttemptById);
attemptsRouter.get('/user/:id', AttemptsConroller.getAllAttemptsByUser);

module.exports = { attemptsRouter };