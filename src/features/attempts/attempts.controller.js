const AttemptsService = require('./attempts.service');

exports.startQuiz = async function (req, res, next) {
    try {
        const userId = req.user.id;
        const { difficulties, categories, count } = req.query;
        const categoriesArray = categories ? categories.split(',') : [];
        const difficultiesArray = difficulties ? difficulties.split(',') : ['easy'];
        const numberOfQuestions = count ? parseInt(count) : 10;
        const { attemptId, questions } = await AttemptsService.startQuiz(userId, difficultiesArray, categoriesArray, numberOfQuestions);
        res.json({
            code: 200,
            attemptId,
            userId,
            questions,
        });
    } catch (err) {
        next(err);
    }
}

exports.submitQuiz = async function (req, res, next) {
    try {
        const attemptId = req.params.id;
        const answers = req.body;
        const { score, selectedAnswers } = await AttemptsService.submitQuiz(attemptId, answers);
        res.json({
            code: 200,
            score,
            selectedAnswers,
        });
    } catch (err) {
        next(err);
    }
}

exports.getAttemptById = async function (req, res, next) {
    try {
        const id = req.params.id;
        const attempt = await AttemptsService.getAttemptById(id);
        res.json({
            code: 200,
            attempt,
        });
    } catch (err) {
        next(err);
    }
}

exports.getAllAttemptsByUser = async function (req, res, next) {
    try {
        const userId = req.user.id;
        const attempts = await AttemptsService.getAllAttemptsByUser(userId);
        res.json({
            code: 200,
            count: attempts.length,
            attempts,
        });
    }
    catch (err) {
        next(err);
    }
}