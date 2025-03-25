const express = require('express');
const AttemptsConroller = require('./attempts.controller');
const { verifyJWT } = require('../../shared/middleware/verifyJWT.middleware');

const attemptsRouter = express.Router();

attemptsRouter.use(verifyJWT);

attemptsRouter.get('/', AttemptsConroller.getAllAttemptsByUser);
attemptsRouter.post('/start', AttemptsConroller.startQuiz);
attemptsRouter.get('/:id/continue', AttemptsConroller.continueAttempt);
attemptsRouter.patch('/:id', AttemptsConroller.updateAttempt);
attemptsRouter.post('/:id/submit', AttemptsConroller.submitQuiz);
attemptsRouter.get('/:id', AttemptsConroller.getAttemptById);

module.exports = { attemptsRouter };