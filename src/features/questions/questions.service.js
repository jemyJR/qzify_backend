const { readData, writeData } = require('../quizzes/quizzes.repository');

class QuestionService {
    static getQuestions(quizId) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        return quiz.questions;
    }

    static getQuestion(quizId, questionId) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const question = quiz.questions.find(question => question.id === questionId);
        if (!question) {
            throw new Error('Question not found');
        }
        return question;
    }

    static createQuestion(quizId, newQuestion) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const exists = quiz.questions.some(question => question.question === newQuestion.question);
        if (exists) {
            throw new Error('Question already exists');
        }
        const lastQuestion = quiz.questions[quiz.questions.length - 1];
        newQuestion.id = lastQuestion.id + 1;
        quiz.questions.push(newQuestion);
        writeData(quizzes);
        return newQuestion;
    }

    static updateQuestion(quizId, questionId, updatedQuestion) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const index = quiz.questions.findIndex(question => question.id === questionId);
        if (index === -1) {
            throw new Error('Question not found');
        }
        const exists = quiz.questions.some(question => question.question === updatedQuestion.question);
        if (exists) {
            throw new Error('Question already exists');
        }
        updatedQuestion.id = questionId;
        quiz.questions[index] = updatedQuestion;
        writeData(quizzes);
        return updatedQuestion;
    }

    static deleteQuestion(quizId, questionId) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const index = quiz.questions.findIndex(question => question.id === questionId);
        if (index === -1) {
            throw new Error('Question not found');
        }
        quiz.questions.splice(index, 1);
        writeData(quizzes);
        return quiz.questions;
    }

}

module.exports = QuestionService;