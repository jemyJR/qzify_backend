const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const { questionSchema } = require('../questions/question.model');

const attemptSchema = new Schema({
    userId: { type: ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    questions: { type: [questionSchema], required: true },
    selectedAnswers: [{
        questionId: { type: ObjectId, ref: 'Question' },
        chosenOptionIds: [{ type: ObjectId, ref: 'Option' }]
    }],
    score: { type: Number, default: 0 },
    isFlagged: { type: Boolean, default: false }
}, { timestamps: true });

const Attempt = mongoose.model('Attempt', attemptSchema);
module.exports = Attempt;