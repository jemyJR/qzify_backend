const Attempt = require('./attempts.model');
const QuestionService = require('../questions/questions.service');
const { ResourceNotFoundError, RuntimeError } = require('../../shared/utils/errorTypes');
const { generateAttemptTitle, generateQuizTime } = require('../../shared/utils/helpers');

exports.startQuiz = async function (userId, difficulties, categories, count) {

    const questions = await QuestionService.getRandomQuiz({ difficulties, categories, count });
    const title = generateAttemptTitle(categories);
    const time = generateQuizTime(questions.length);

    const questionSnapshots = questions.map(({ _id, createdAt, updatedAt, __v, ...question }) => ({
        originalQuestion: _id,
        ...question,
    }));
    const attempt = new Attempt({
        userId,
        title,
        questions: questionSnapshots,
        categories,
        difficulties,
        startTime: time.startTime,
        endTime: time.endTime,
        duration: time.totalMinutes,
        totalPossibleScore: questions.reduce((sum, question) => sum + question.points, 0)
    });

    await attempt.save();

    return sanitizedAttempt(attempt);

}

exports.continueAttempt = async function (userId, attemptId) {
    const attempt = await Attempt.findById(attemptId);
    if (!attempt) {
        throw new ResourceNotFoundError('Attempt', 'id', attemptId, 'Attempt not found');
    }
    if (attempt.userId.toString() !== userId) {
        throw new RuntimeError('Unauthorized', 'User is not authorized to access this attempt', 403);
    }
    await checkAttemptStatusThenSave(attempt);

    if (attempt.status === 'completed') {
        throw new RuntimeError('Attempt already completed', 'Cannot continue a completed attempt', 400);
    }

    return sanitizedAttempt(attempt);
}



exports.updateAttempt = async function (attemptId, updates) {
    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
        throw new ResourceNotFoundError('Attempt', 'id', attemptId, 'Attempt not found');
    }

    if (attempt.status === 'completed' || Date.now() > attempt.endTime) {
        throw new RuntimeError('Attempt already completed', 'Cannot update a completed attempt', 400);
    }
    updates.forEach(({ questionId, chosenOptionIds, isFlagged }) => {
        const question = attempt.questions.find(q => q._id.toString() === questionId);
        if (!question) {
            throw new ResourceNotFoundError('Question', 'id', questionId, 'Question not found');
        }

        if (chosenOptionIds) {
            const validOptions = question.options.map(option => option._id.toString());
            const isValid = chosenOptionIds.every(id => validOptions.includes(id));
            if (!isValid) {
                throw new RuntimeError('Invalid option', 'One or more chosen options are invalid', 400);
            }
            question.chosenOptionIds = chosenOptionIds;
        }
        if (typeof isFlagged === 'boolean') {
            question.isFlagged = isFlagged;
        }
    });
    await attempt.save();

    return sanitizedAttempt(attempt);
}

exports.submitQuiz = async function (attemptId, updates) {
    await this.updateAttempt(attemptId, updates);
    const attempt = await Attempt.findById(attemptId);
    const score = calculateAttemptScore(attempt);
    attempt.score = score;
    attempt.status = 'completed';
    await attempt.save();
    return attempt;
}


exports.getAttemptById = async function (id) {
    const attempt = await Attempt.findById(id);
    if (!attempt)
        throw new ResourceNotFoundError('Attempt', 'id', id, 'Attempt not found');
    
    await checkAttemptStatusThenSave(attempt);
    return attempt;
    
}

exports.getAllAttemptsByUser = async function (userId) {
    const attempts = await Attempt.find({ userId });
    
    for (const attempt of attempts) {
        await checkAttemptStatusThenSave(attempt);
    }
    
    return attempts;
}

// Helpers
function sanitizedAttempt(attempt) {
    const sanitizedAttempt = attempt.toObject();
    sanitizedAttempt.questions = sanitizedAttempt.questions.map(({
        originalQuestion,isMultiple, correctOptionIds, explanation, options, category, difficulty, ...question
    }) => ({
        ...question,
        options: options.map(({ isCorrect, ...option }) => option)
    }));

    return sanitizedAttempt;
}

function calculateAttemptScore(attempt) {
    return attempt.questions.reduce((sum, question) => {
        const correctOptionIds = question.correctOptionIds.map(id => id.toString());
        const chosenOptionIds = question.chosenOptionIds.map(id => id.toString());
        const isCorrect = chosenOptionIds.length === correctOptionIds.length &&
            chosenOptionIds.every(id => correctOptionIds.includes(id));
        return sum + (isCorrect ? question.points : 0);
    }, 0);
}

exports.submitExpiredAttempts = async function () {
    const now = new Date();
    const expiredAttempts = await Attempt.find({
        status: 'in-progress',
        endTime: { $lte: now }
    });

    for (const attempt of expiredAttempts) {
        const score = calculateAttemptScore(attempt);
        attempt.score = score;
        attempt.status = 'completed';
        await attempt.save();
    }
    return expiredAttempts;
};

async function checkAttemptStatusThenSave(attempt) {
    
    if (attempt.status === 'in-progress' && new Date() >= attempt.endTime) {
        const score = calculateAttemptScore(attempt);
        attempt.score = score;
        attempt.status = 'completed';
        await attempt.save();
    }
    
}   