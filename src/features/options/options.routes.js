const express = require('express');
const optionsController = require('./options.controller');

const optionsRouter = express.Router({ mergeParams: true });

optionsRouter.get('/', optionsController.getOptions);

optionsRouter.get('/:optionId', optionsController.getOption);

optionsRouter.post('/', optionsController.createOption);

optionsRouter.put('/:optionId', optionsController.updateOption);

optionsRouter.delete('/:optionId', optionsController.deleteOption);

module.exports = { optionsRouter };