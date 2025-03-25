const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const optionsSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  }
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [optionsSchema],
    required: true,
    validate: {
      validator: function(options) {
        return options.length >= 2;
      },
      message: 'Question must have at least 2 options',
    }
  },
  isMultiple: {
    type: Boolean,
    default: false,
  },
  correctOptionIds: {
    type: [{ 
        type: ObjectId,
        ref: 'Option',
    }],
    required: true,
    default: []
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  points: {
    type: Number,
    default: 1,
  },
  explanation: {
    type: String,
    default: '',
  },
}, { timestamps: true });

questionSchema.pre('save', function(next) {
  const correctIds = this.options
    .filter(option => option.isCorrect)
    .map(option => option._id);

  if (correctIds.length === 0) {
    return next(new Error('Question must have at least one correct option'));
  }

  this.isMultiple = correctIds.length > 1;
  this.correctOptionIds = correctIds;
  next();
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
