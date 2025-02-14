const quizService = require("./quiz.service")
const getAllQuizzes = (req, res, next) => {
    try {
        const quizzes = quizService.getAllQuizzes();
        res.send(quizzes);
    } catch (e) {
        next(e);
    }
}
const getQuizById = (req, res, next) => {
    try {
        const quiz = quizService.getQuizById(req.params.id);
        res.send(quiz);
    } catch (e) {
        next(e);
    }
}

const addQuiz = (req, res, next) => {
    try {
        const newQuiz = quizService.addQuiz(req.body);
        res.send(newQuiz);
    } catch (e) {
        next(e);
    }
}
const editQuiz = (req, res, next) => {
    try {
        const updatedQuiz = quizService.addQuiz(req.params.id, req.body);
        res.send(updatedQuiz);
    } catch (e) {
        next(e);
    }
}
const deleteQuiz = (req, res, next) => {
    try {
        const quizDeleted = quizService.deleteQuiz(req.params.id);
        quizDeleted ? res.send("Quiz Has Been Deleted Successfully") : res.send("Couldn't Delete the Quiz")
    } catch (e) {
        next(e);
    }
}

const getQuizQuestions = (req, res, next) => {
    try {
        const questions = quizService.getQuizQuestions(req.params.id);
        res.send(questions);
    } catch (e) {
        next(e);
    }
}

const addQuestion = (req, res, next) => {
    try {
        const newQuestion = quizService.addQuestion(req.body, req.params.quizId);
        res.send(newQuestion);
    } catch (e) {
        next(e);
    }
}
const editQuestion = (req, res, next) => {
    try {
        const updatedQuestion = quizService.editQuestion(req.params.id, req.body);
        res.send(updatedQuestion);
    } catch (e) {
        next(e);
    }
}
const deleteQuestion = (req, res, next) => {
    try {
        const questionDeleted = quizService.deleteQuestion(req.params.id, req.params.quizId);
        questionDeleted ? res.send("Question Has Been Deleted Successfully") : res.send("Couldn't Delete the Question")

    } catch (e) {
        next(e);
    }
}

module.exports = {
    getAllQuizzes,
    getQuizById,
    addQuiz,
    editQuiz,
    deleteQuiz,
    getQuizQuestions,
    addQuestion,
    editQuestion,
    deleteQuestion
}