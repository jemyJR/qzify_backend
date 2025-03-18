const Attempt = require('./attempts.model');
const QuestionService = require('../questions/questions.service');
const { ResourceNotFoundError, RuntimeError } = require('../../shared/utils/errorTypes');
const Question = require('../questions/question.model');

const startQuiz = async (userId, difficulties, categories, count) => {
    const questions = await QuestionService.getRandomQuiz({ difficulties, categories, count });
    const questionIds = questions.map(q => q._id);
    const sanitizedQuestions = questions.map(({ correctOptionIds, options, ...question }) => ({
        ...question,
        options: options.map(({ isCorrect, ...option }) => option)
    }));
    const attempt = new Attempt({
        userId,
        questionIds,
    });
    await attempt.save();
    return { attemptId: attempt._id, questions: sanitizedQuestions };
}

const submitQuiz = async (attemptId, answers) => {
    const attempt = await Attempt.findById(attemptId);
    if (!attempt)
        throw new ResourceNotFoundError('Attempt', 'id', attemptId, 'Attempt not found');
    if (attempt.isCompleted)
        throw new RuntimeError('Invalid operation', 'Attempt already submitted', 400);

    const questions = await Question.find({ _id: { $in: attempt.questionIds } });
    const questionMap = new Map(questions.map(q => [q._id.toString(), q]));

    let score = 0;
    let selectedAnswers = [];

    for (const { questionId, chosenOptionIds } of answers) {
        const question = questionMap.get(questionId);
        if (question) {
            const correctOptionIds = question.correctOptionIds.map(id => id.toString());
            const isCorrect = chosenOptionIds.length === correctOptionIds.length && chosenOptionIds.every(id => correctOptionIds.includes(id));
            if (isCorrect)
                score += question.points;
            selectedAnswers.push({ questionId, chosenOptionIds });
            attempt.selectedAnswers = selectedAnswers;
            attempt.score = score;
            attempt.isCompleted = true;
            await attempt.save();
            return { score, selectedAnswers };
        } else {
            throw new ResourceNotFoundError('Question', 'id', questionId, 'Question not found');
        }
    }
}

const getAttemptById = async (id) => {
    const attempt = await Attempt.findById(id);
    if (!attempt)
        throw new ResourceNotFoundError('Attempt', 'id', id, 'Attempt not found');
    return attempt;
}

const getAllAttemptsByUser = async (userId) => {
    const attempts = await Attempt.find({ userId });
    return attempts;
}

module.exports = {
    startQuiz,
    submitQuiz,
    getAttemptById,
    getAllAttemptsByUser
}