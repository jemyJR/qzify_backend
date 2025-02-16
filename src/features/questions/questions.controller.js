const QuestionService = require('./questions.service');
const sendErrorResponse = require('../../shared/utils/errorHandler');


class QuestionsController {
    static getQuestions(req, res) {
        try{
            const quizId = parseInt(req.params.quizId);
            const questions = QuestionService.getQuestions(quizId);
            res.json(questions);
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static getQuestion(req, res) {
        try {
            const quizId = parseInt(req.params.quizId);
            const questionId = parseInt(req.params.questionId);
            const question = QuestionService.getQuestion(quizId, questionId);
            res.json(question);
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static createQuestion(req, res) {
        try {
            const quizId = parseInt(req.params.quizId);
            const newQuestion = QuestionService.createQuestion(quizId, req.body);
            res.json({
                code: 201,
                message: 'Question created successfully',
                question: newQuestion
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found' || err.message === 'Question already exists') {
                sendErrorResponse(res, 404, err.message);
                return;
            }

            res.status(500).send('Internal Server Error');
        }
    }

    static updateQuestion(req, res) {
        try {
            const quizId = parseInt(req.params.quizId);
            const questionId = parseInt(req.params.questionId);
            const updatedQuestion = QuestionService.updateQuestion(quizId, questionId, req.body);
            res.json({
                code: 200,
                message: 'Question updated successfully',
                question: updatedQuestion
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found' || err.message === 'Question not found' || err.message === 'Question already exists') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static deleteQuestion(req, res) {
        try {
            const quizId = parseInt(req.params.quizId);
            const questionId = parseInt(req.params.questionId);
            const questions = QuestionService.deleteQuestion(quizId, questionId);
            res.json({
                code: 200,
                message: 'Question deleted successfully',
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found' || err.message === 'Question not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = QuestionsController;