const Attempt = require('./attempts.model');
const QuestionService = require('../questions/questions.service');
const { ResourceNotFoundError } = require('../../shared/utils/errorTypes');

const startQuiz = async (userId, difficulties, categories, count) => {
    const questions = await QuestionService.getRandomQuiz({ difficulties, categories, count });
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const title = categories.length === 1
        ? difficulties.length === 1
            ? `${difficulties[0]} ${categories[0]} Quiz - ${date}`
            : `${categories[0]} Quiz - ${date}`
        : `General Quiz - ${date}`;
    const sanitizedQuestions = questions.map(({ correctOptionIds, options, isMultiple, explanation, ...question }) => ({
        ...question,
        options: options.map(({ isCorrect, ...option }) => option)
    }));
    const attempt = new Attempt({
        userId,
        questions,
        title
    });
    await attempt.save();
    return { attemptId: attempt._id, attemptTitle: title, questions: sanitizedQuestions };
}

const submitQuiz = async (attemptId, answers) => {
    const attempt = await Attempt.findById(attemptId);
    if (!attempt)
        throw new ResourceNotFoundError('Attempt', 'id', attemptId, 'Attempt not found');

    let score = 0;
    let selectedAnswers = [];

    for (const { questionId, chosenOptionIds } of answers) {
        const question = await attempt.questions.find(q => q._id.toString() === questionId);
        if (question) {
            const correctOptionIds = question.correctOptionIds.map(id => id.toString());
            const isCorrect = chosenOptionIds.length === correctOptionIds.length && chosenOptionIds.every(id => correctOptionIds.includes(id));
            if (isCorrect)
                score += question.points;
            selectedAnswers.push({ questionId, chosenOptionIds });
            attempt.selectedAnswers = selectedAnswers;
            attempt.score = score;
            await attempt.save();
            return { score };
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