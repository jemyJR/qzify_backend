const { check } = require('express-validator');

const questionValidator = {
  createQuestion: [
    check('question')
      .trim()
      .notEmpty().withMessage('Question text is required')
      .isString().withMessage('Question must be a string'),
    
    check('options')
      .isArray({ min: 2 }).withMessage('At least two options are required')
      .custom((options) => options.every(opt => typeof opt.text === 'string'))
      .withMessage('All options must have text')
      .custom((options) => options.some(opt => opt.isCorrect))
      .withMessage('At least one correct option is required'),
    
    check('options.*.text')
      .trim()
      .notEmpty().withMessage('Option text cannot be empty'),
    
    check('options.*.isCorrect')
      .isBoolean().withMessage('isCorrect must be a boolean'),
    
    check('category')
      .trim()
      .notEmpty().withMessage('Category is required')
      .isString().withMessage('Category must be a string'),
    
    check('difficulty')
      .isIn(['easy', 'medium', 'hard'])
      .withMessage('Invalid difficulty level'),
    
    check('isMultiple')
      .optional()
      .isBoolean().withMessage('isMultiple must be a boolean'),
    
    check('points')
      .optional()
      .isInt({ min: 1 }).withMessage('Points must be positive integer'),
    
    check('explanation')
      .optional()
      .isString().withMessage('Explanation must be a string')
  ],
};

module.exports = { questionValidator };