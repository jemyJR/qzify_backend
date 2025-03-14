const QuestionService = require('./questions.service');

exports.getQuestions = async function(req, res, next) {
    try {
        const questions = await QuestionService.getQuestions();
        res.json({
            code: 200,
            count: questions.length,
            questions,
        });
    } catch (err) {
        next(err);
    }
};

exports.getQuestion = async function(req, res, next) {
    try {
        const id = req.params.id;
        const question = await QuestionService.getQuestionById(id);
        res.json({
            code: 200,
            question,
        });
    } catch (err) {
        next(err);
    }
};

exports.createQuestion = async function(req, res, next) {
    try {
        const questionData = req.body;
        const question = await QuestionService.createQuestion(questionData);
        res.json({
            code: 201,
            message: 'Question created successfully',
            question,
        });
    } catch (err) {
        next(err);
    }
};

exports.createBulkQuestions = async function(req, res, next) {
    try {
        const questions = req.body;
        const createdQuestions = await QuestionService.createBulkQuestions(questions);
        res.json({
            code: 201,
            message: 'Questions created successfully',
            count: createdQuestions.length,
            questions: createdQuestions,
        });
    } catch (err) {
        next(err);
    }
}

exports.updateQuestion = async function(req, res, next) {
    try {
        const id = req.params.id;
        const updatedQuestion = req.body;
        const question = await QuestionService.updateQuestion(id, updatedQuestion);
        res.json({
            code: 200,
            message: 'Question updated successfully',
            question,
        });
    } catch (err) {
        next(err);
    }
}

exports.deleteQuestion = async function(req, res, next) {
    try {
        const id = req.params.id;
        const message = await QuestionService.deleteQuestion(id);
        res.json({
            code: 200,
            message,
        });
    } catch (err) {
        next(err);
    }
};

exports.getQuestionsByCategory = async function(req, res, next) {
    try {
        const category = req.params.category;
        const questions = await QuestionService.getQuestionsByCategory(category);
        res.json({
            code: 200,
            count: questions.length,
            questions,
        });
    } catch (err) {
        next(err);
    }
}

exports.getAllCategories = async function(req, res, next) {
    try {
        const categories = await QuestionService.getAllCategories();
        res.json({
            code : 200,
            count: categories.length,
            categories,
        });
    } catch (err) {
        next(err);
    }
}

exports.getRandomQuiz = async function(req, res, next) {
    try {
        const { difficulties, categories, count } = req.query;
        const difficultiesArray = difficulties ? difficulties.split(',') : ['easy'];
        const categoriesArray = categories ? categories.split(',') : [];
        const numberOfQuestions = count ? parseInt(count) : 10;
        const questions = await QuestionService.getRandomQuiz({
            difficulties: difficultiesArray,
            categories: categoriesArray,
            count: numberOfQuestions,
        });
        res.json({
            code: 200,
            count: questions.length,
            questions,
        });
    } catch (err) {
        next(err);
    }

}
