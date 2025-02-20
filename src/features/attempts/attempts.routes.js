const express = require('express');
const AttemptsController = require('./attempts.controller');

const attemptsRouter = express.Router();

attemptsRouter.get('/', AttemptsController.getAttempts);

attemptsRouter.get('/:id', AttemptsController.getAttempt);

attemptsRouter.post('/', AttemptsController.createAttempt);

attemptsRouter.put('/:id', AttemptsController.updateAttempt);

attemptsRouter.delete('/:id', AttemptsController.deleteAttempt);


module.exports = { attemptsRouter };