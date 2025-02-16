const { readData, writeData } = require('./quizzes.repository');

class QuizService {
    static getQuizzes() {
        const quizzes = readData();
        return quizzes;
    }

    static getQuiz(id) {
        const quizzes = readData();
        const quiz = quizzes.find(quiz => quiz.id === id);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        return quiz;
    }

    static createQuiz(newQuiz) {
        const quizzes = readData();

        const titleExists = quizzes.some(quiz => quiz.title === newQuiz.title);
        if (titleExists) {
            throw new Error('Title already exists');
        }

        const lastQuiz = quizzes[quizzes.length - 1];
        newQuiz.id = lastQuiz.id + 1;
        quizzes.push(newQuiz);
        writeData(quizzes);
        return newQuiz;
    }

    static updateQuiz(id, updatedQuiz) {
        const quizzes = readData();
        const index = quizzes.findIndex(quiz => quiz.id === id);
        if (index === -1) {
            throw new Error('Quiz not found');
        }
        updatedQuiz.id = id;
        quizzes[index] = updatedQuiz;
        writeData(quizzes);
        return updatedQuiz;
    }

    static deleteQuiz(id) {
        const quizzes = readData();
        const index = quizzes.findIndex(quiz => quiz.id === id);
        if (index === -1) {
            throw new Error('Quiz not found');
        }
        quizzes.splice(index, 1);
        writeData(quizzes);
        return quizzes;
    }
    
    static getQuizzesTitles() {
        const quizzes = readData();
        const titles = quizzes.map(quiz => quiz.title);
        return titles;
    }
}

module.exports = QuizService;