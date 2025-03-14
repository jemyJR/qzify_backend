const Question = require('./question.model');
const { ResourceNotFoundError, RuntimeError } = require('../../shared/utils/errorTypes');
const { shuffleArray } = require('../../shared/utils/helpers');

exports.getQuestions = async function () {
    const questions = await Question.find();
    return questions;
};

exports.getQuestionById = async function (id) {
    const question = await Question.findById(id)
    if (!question) {
        throw new ResourceNotFoundError('Question', 'id', id, 'Question not found');
    }
    return question;
};

exports.createQuestion = async function (newQuestion) {
    if (newQuestion.options.length < 2) {
        throw new RuntimeError('Invalid question', 'Question must have at least two options', 400);
    }

    const hasCorrectAnswer = newQuestion.options.some(option => option.isCorrect);
    if (!hasCorrectAnswer) {
        throw new RuntimeError('Invalid question', 'Question must have at least one correct option', 400);
    }

    const question = new Question(newQuestion);
    await question.save();
    return question;
};

exports.createBulkQuestions = async function (questions) {
    const createdQuestions = await Promise.all(
        questions.map(
            question => this.createQuestion(question)
        )
    );
    return createdQuestions;
}


exports.updateQuestion = async function (id, updatedQuestion) {
    if (updatedQuestion.options.length < 2) {
        throw new RuntimeError('Invalid question', 'Question must have at least two options', 400);
    }

    const hasCorrectAnswer = updatedQuestion.options.some(option => option.isCorrect);
    if (!hasCorrectAnswer) {
        throw new RuntimeError('Invalid question', 'Question must have at least one correct option', 400);
    }

    const question = await Question.findByIdAndUpdate(id, updatedQuestion, { new: true });
    if (!question) {
        throw new ResourceNotFoundError('Question', 'id', id, 'Question not found');
    }
    return question;
}

exports.deleteQuestion = async function (id) {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
        throw new ResourceNotFoundError('Question', 'id', id, 'Question not found');
    }
    return 'Question deleted successfully';
}


exports.getQuestionsByCategory = async function (category) {
    const questions = await Question.find({ category });
    if (questions.length === 0) {
        throw new ResourceNotFoundError('Question', 'category', category, 'No questions found');
    }
    return questions;
}
exports.getAllCategories = async function () {
    const categories = await Question.distinct('category');
    return categories;
}


// exports.getRandomQuiz= async function (categories, difficulties, numberOfQuestions) {
//     const questions = await Question.aggregate([
//         { $match: { category: { $in: categories } } },
//         { $match: { difficulty: { $in: difficulties } } },
//         { $sample: { size: numberOfQuestions } }
//     ]);
//     if (questions.length === 0) {
//         throw new ResourceNotFoundError('Question', 'category', categories, 'No questions found');
//     }
//     return questions;
// }



exports.getRandomQuiz = async function ({ difficulties , categories, count }) {
    const filter = {};

    if (categories && categories.length > 0) {
        filter.category = { $in: categories };
    } else {
        throw new RuntimeError('Invalid request', 'At least one category is required', 400);
    }

    if (difficulties && difficulties.length > 0) {
        filter.difficulty = { $in: difficulties };
    } else {
        throw new RuntimeError('Invalid request', 'At least one difficulty level is required', 400);
    }

    const totalAvailableQuestions = await Question.countDocuments(filter);
    if (totalAvailableQuestions < count) {
        throw new RuntimeError('Invalid request', 'Not enough questions available for the specified filters', 400);
    }

    let questions = [];

    const allCombos = [];
    for (const category of categories) {
        for (const difficulty of difficulties) {
            allCombos.push({ category, difficulty });
        }
    }

    const questionsPerCombo = Math.floor(count / allCombos.length);
    let remainingQuestions = count % allCombos.length;

    for (const combo of allCombos) {
        const comboFilter = { ...filter, ...combo };
        let numberOfQuestions = questionsPerCombo;
        if (remainingQuestions > 0) {
            numberOfQuestions++;
            remainingQuestions--;
        }
        const comboQuestions = await Question.aggregate([
            { $match: comboFilter },
            { $sample: { size: numberOfQuestions } }
        ]);
        questions.push(...comboQuestions);
    }

    if (questions.length < count) {
        const alreadyIncludedIds = questions.map(question => question._id);
        const extraQuestionsNeeded = count - questions.length;
        const extraQuestions = await Question.aggregate([
            { $match: { ...filter, _id: { $nin: alreadyIncludedIds } } },
            { $sample: { size: extraQuestionsNeeded } }
        ]);
        questions.push(...extraQuestions);
    }
    else if (questions.length > count) {
        questions = shuffleArray(questions).slice(0, count);
    }
    questions = shuffleArray(questions);
    return questions;
}
