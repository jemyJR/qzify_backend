const { readData, writeData } = require('../quizzes/quizzes.repository');   

class OptionService {
    static getOptions(quizId, questionId) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const question = quiz.questions.find(question => question.id === questionId);
        if (!question) {
            throw new Error('Question not found');
        }
        return question.options;
    }

    static getOption(quizId, questionId, optionId) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const question = quiz.questions.find(question => question.id === questionId);
        if (!question) {
            throw new Error('Question not found');
        }
        const option = question.options.find(option => option.id === optionId);
        if (!option) {
            throw new Error('Option not found');
        }
        return option;
    }

    static createOption(quizId, questionId, newOption) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const question = quiz.questions.find(question => question.id === questionId);
        if (!question) {
            throw new Error('Question not found');
        }
        const exists = question.options.some(option => option.text === newOption.text);
        if (exists) {
            throw new Error('Option already exists');
        }
        const lastOption = question.options[question.options.length - 1];
        newOption.id = lastOption.id + 1;
        question.options.push(newOption);
        writeData(quizzes);
        return newOption;
    }

    static updateOption(quizId, questionId, optionId, updatedOption) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const question = quiz.questions.find(question => question.id === questionId);
        if (!question) {
            throw new Error('Question not found');
        }
        const index = question.options.findIndex(option => option.id === optionId);
        if (index === -1) {
            throw new Error('Option not found');
        }
        const exists = question.options.some(option => option.text === updatedOption.text);
        if (exists) {
            throw new Error('Option already exists');
        }
        updatedOption.id = optionId;
        question.options[index] = updatedOption;
        writeData(quizzes);
        return updatedOption;
    }

    static deleteOption(quizId, questionId, optionId) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        const question = quiz.questions.find(question => question.id === questionId);
        if (!question) {
            throw new Error('Question not found');
        }
        const index = question.options.findIndex(option => option.id === optionId);
        if (index === -1) {
            throw new Error('Option not found');
        }
        question.options.splice(index, 1);
        writeData(quizzes);
        return question.options
    }

}

module.exports = OptionService;