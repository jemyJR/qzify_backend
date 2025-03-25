const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const attemptOptionSchema = new Schema({
    _id: ObjectId,
    text: String,
    isCorrect: Boolean
}, { _id: false , id: false});

const attemptQuestionSchema = new mongoose.Schema({
    originalQuestion: {
        type: ObjectId,
        ref: 'Question',
        required: true
    },

    question: String,
    options: [attemptOptionSchema],
    correctOptionIds: [ObjectId],
    isMultiple: Boolean,
    category: String,
    difficulty: String,
    points: Number,
    explanation: String,

    chosenOptionIds: [ObjectId],
    isFlagged: {
        type: Boolean,
        default: false
    }
});

const attemptSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    questions: [attemptQuestionSchema],
    categories: [String],
    difficulties: [String],
    startTime: Date,
    endTime: Date,
    duration: Number,
    status: {
        type: String,
        enum: ['in-progress', 'completed'],
        default: 'in-progress'
    },
    score: {
        type: Number,
        default: 0
    },
    totalPossibleScore: {
        type: Number,
        default: 0
    }
}, { 
    timestamps: true,
    toObject: { virtuals: true },
    id: false
 });

attemptSchema.virtual('remainingTime').get(function () {
    const now = new Date();
    const endTime = this.endTime || now;
    return Math.max((endTime - now) / 1000, 0);
});

const Attempt = mongoose.model('Attempt', attemptSchema);

module.exports = Attempt;


