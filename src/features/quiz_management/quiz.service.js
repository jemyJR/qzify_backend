const { v4: generatedId } = require("uuid");
const fs = require("fs");
const path = require("path");
const rootPath = __dirname;
const quizFilePath = path.join(rootPath, "quiz.data.json");
const questionsFilePath = path.join(rootPath, "questions.data.json");

const readQuizzesFromFile = () => {
    try {
        const data = fs.readFileSync(quizFilePath, "utf8");
        return JSON.parse(data);
    } catch (e) {
        throw new Error("Error: Reading Quiz Data__", e.message);
    }
}
const writeQuizzesToFile = (quizData) => {
    try {
        const data = JSON.stringify(quizData);
        fs.writeFileSync(quizFilePath, data);
    } catch (e) {
        throw new Error("Error: writing Quiz Data__", e.message);
    }
}
const readQuestionsFromFile = () => {
    try {
        const data = fs.readFileSync(questionsFilePath, "utf8");
        return JSON.parse(data);
    } catch (e) {
        throw new Error("Error: Reading Questions Data__", e.message);
    }
}
const writeQuestionsToFile = (qs) => {
    try {
        const data = JSON.stringify(qs);
        fs.writeFileSync(questionsFilePath, data);
    } catch (e) {
        throw new Error("Error: writing questions Data__", e.message);
    }
}
const mapQuizQs = (quiz) => {
    const questions = readQuestionsFromFile();
    const myQuiz = {
        ...quiz,
        questions: quiz.questions.map(qid => questions.find(q => q.id === qid)),
    }
    return myQuiz;
}
const getAllQuizzes = () => {
    try {
        const quizzes = readQuizzesFromFile();
        return quizzes.map(mapQuizQs);
    } catch (e) {
        throw { status: 404, message: "Quizzes Not Found" }
    }
}
const getQuizById = (id) => {
    const quizzes = readQuizzesFromFile();
    const quiz = quizzes.find((q) => q.id === id);
    if (!quiz)
        throw { status: 404, message: "Quiz Not Found" }
    return mapQuizQs(quiz);
}
const addQuiz = (quiz) => {
    const quizzes = readQuizzesFromFile();
    const newQuiz = {
        id: generatedId(),
        ...quiz
    }
    quizzes.push(newQuiz);
    writeQuizzesToFile(quizzes);
    return newQuiz;
}
const getQuizIndex = (id) => {
    const quizzes = readQuizzesFromFile();
    const quizIndex = quizzes.findIndex((q) => q.id === id);
    if (quizIndex === -1)
        throw { status: 404, message: "Quiz Not Found" }
    return quizIndex
}
const getQuestionIndex = (id) => {
    const questions = readQuestionsFromFile();
    const qIndex = questions.findIndex((q) => q.id === id);
    if (qIndex === -1)
        throw { status: 404, message: "Quiz Not Found" }
    return qIndex
}
const editQuiz = (id, quizEditRequest) => {
    const quizzes = readQuizzesFromFile();
    const quizIndex = getQuizIndex(id);
    quizzes[quizIndex] = { ...quizzes[quizIndex], ...quizEditRequest }
    writeQuizzesToFile(quizzes);
    return quizzes[quizIndex];
}
const deleteQuiz = (id) => {
    const quizzes = readQuizzesFromFile();
    const quizIndex = getQuizIndex(id);
    if (quizIndex === -1) return false;
    userInfo.splice(quizIndex, 1);
    writeQuizzesToFile(quizzes);
    return true;
}

const getQuizQuestions = (quiz) => {
    try {
        return (mapQuizQs(quiz).questions)
    } catch (e) {
        throw new Error("Error: Getting Quiz Questions__", e.message)
    }

}
const addQuestion = (question, quizId) => {
    const questions = readQuestionsFromFile();
    const quizzes = readQuizzesFromFile();
    const quizIndex = getQuizIndex(quizId);
    const newQuestion = {
        id: generatedId(),
        ...question
    }
    questions.push(newQuestion);
    quizzes[quizIndex].questions.push(newQuestion.id);
    writeQuestionsToFile(questions);
    writeQuizzesToFile(quizzes);
    return newQuestion;
}
const editQuestion = (id, questionEditRequest) => {
    const questions = readQuestionsFromFile();
    const questionIndex = getQuestionIndex(id);
    questions[questionIndex] = { ...questions[questionIndex], ...questionEditRequest }
    writeQuestionsToFile(questions);
    return questions[questionIndex];
}
const deleteQuestion = (questionId, quizId) => {
    const quizzes = readQuizzesFromFile();
    const quizIndex = getQuizIndex(quizId);
    const questions = quizzes[quizIndex].questions;
    const questionIndex = questions.findIndex((q) => q.id === questionId);
    if (questionIndex === -1) return false;
    questions.splice(questionIndex, 1);
    writeQuizzesToFile();
    return true;
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