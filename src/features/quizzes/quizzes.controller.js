const QuizzesService = require('./quizzes.service');
const sendErrorResponse = require('../../shared/utils/errorHandler');


class QuizzesController { 
    static getQuizzes(req, res) {
        try{
            const quizzes = QuizzesService.getQuizzes();
            res.json(quizzes);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    static getQuiz(req, res) {
        try {
            const id = parseInt(req.params.id);
            const quiz = QuizzesService.getQuiz(id);
            res.json(quiz);
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static createQuiz(req, res) {
        try {
            const newQuiz = QuizzesService.createQuiz(req.body);
            res.json({
                code: 201,
                message: 'Quiz created successfully',
                quiz: newQuiz
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Title already exists') {
                sendErrorResponse(res, 400, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static updateQuiz(req, res) {
        try {
            const id = parseInt(req.params.id);
            const updatedQuiz = QuizzesService.updateQuiz(id, req.body);
            res.json({
                code: 200,
                message: 'Quiz updated successfully',
                quiz: updatedQuiz
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }

    static deleteQuiz(req, res) {
        try {
            const id = parseInt(req.params.id);
            const quizzes = QuizzesService.deleteQuiz(id);
            res.json({
                code: 200,
                message: 'Quiz deleted successfully',
            });
        } catch (err) {
            console.error(err);
            if (err.message === 'Quiz not found') {
                sendErrorResponse(res, 404, err.message);
                return;
            }
            res.status(500).send('Internal Server Error');
        }
    }
    
    static getQuizzesTitles(req, res) {
        try {
            const titles = QuizzesService.getQuizzesTitles();
            res.json(titles);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = QuizzesController;