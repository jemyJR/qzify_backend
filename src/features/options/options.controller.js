const OptionsService = require('./options.service');
const sendErrorResponse = require('../../shared/utils/errorHandler');


class OptionsController {
    static getOptions(req, res) {
        try {
            const quizId = parseInt(req.params.quizId);
            const questionId = parseInt(req.params.questionId);
            const options = OptionsService.getOptions(quizId, questionId);
            res.json(options);
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found' || err.message === 'Question not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static getOption(req, res) {
        try {
            const quizId = parseInt(req.params.quizId);
            const questionId = parseInt(req.params.questionId);
            const optionId = parseInt(req.params.optionId);
            const option = OptionsService.getOption(quizId, questionId, optionId);
            res.json(option);
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found' || err.message === 'Question not found' || err.message === 'Option not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static createOption(req, res) {
        try {
            const quizId = parseInt(req.params.quizId);
            const questionId = parseInt(req.params.questionId);
            const newOption = OptionsService.createOption(quizId, questionId, req.body);
            res.json({
                code: 201,
                message: 'Option created successfully',
                option: newOption
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found' || err.message === 'Question not found' || err.message === 'Option already exists') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static updateOption(req, res) {
        try {
            const quizId = parseInt(req.params.quizId);
            const questionId = parseInt(req.params.questionId);
            const optionId = parseInt(req.params.optionId);
            const updatedOption = OptionsService.updateOption(quizId, questionId, optionId, req.body);
            res.json({
                code: 200,
                message: 'Option updated successfully',
                option: updatedOption
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found' || err.message === 'Question not found' || err.message === 'Option not found' || err.message === 'Option already exists') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static deleteOption(req, res) {
        try {
            const quizId = parseInt(req.params.quizId);
            const questionId = parseInt(req.params.questionId);
            const optionId = parseInt(req.params.optionId);
            const options = OptionsService.deleteOption(quizId, questionId, optionId);
            res.json({
                code: 200,
                message: 'Option deleted successfully',
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found' || err.message === 'Question not found' || err.message === 'Option not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = OptionsController;