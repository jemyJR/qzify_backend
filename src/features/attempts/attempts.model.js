const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const attemptSchema = new Schema({
    userId: { type: ObjectId, ref: 'User', required: true },
    questionIds: [{ type: ObjectId, ref: 'Question', required: true }],
    selectedAnswers: [{
        questionId: { type: ObjectId, ref: 'Question' },
        chosenOptionIds: [{ type: ObjectId, ref: 'Option' }]
    }],
    score: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

const Attempt = mongoose.model('Attempt', attemptSchema);
module.exports = Attempt;