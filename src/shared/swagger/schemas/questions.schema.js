/**
 * @swagger
 * components:
 *   schemas:
 *     Option:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier for the option.
 *         text:
 *           type: string
 *           description: The text of the option.
 *         isCorrect:
 *           type: boolean
 *           description: Indicates if this option is a correct answer.
 *           default: false
 *       required:
 *         - text
 *     Question:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier for the question.
 *         question:
 *           type: string
 *           description: The question text.
 *         options:
 *           type: array
 *           description: Array of options for the question. Must include at least 2 items.
 *           items:
 *             $ref: '#/components/schemas/Option'
 *         isMultiple:
 *           type: boolean
 *           description: Flag to indicate if the question allows multiple answers.
 *           default: false
 *         correctOptionIds:
 *           type: array
 *           description: Auto-populated array of option IDs marked as correct.
 *           items:
 *             type: string
 *         chosenOptionIds:
 *           type: array
 *           description: Array of option IDs chosen by the user.
 *           items:
 *             type: string
 *         isFlagged:
 *           type: boolean
 *           description: Indicates if the question has been flagged.
 *           default: false
 *         category:
 *           type: string
 *           description: The category of the question.
 *         difficulty:
 *           type: string
 *           description: The difficulty level of the question.
 *           enum:
 *             - easy
 *             - medium
 *             - hard
 *         points:
 *           type: number
 *           description: The point value for the question.
 *           default: 1
 *         explanation:
 *           type: string
 *           description: Explanation for the correct answer.
 *           default: ""
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the question was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the question was last updated.
 *       required:
 *         - question
 *         - options
 *         - category
 *         - difficulty
 *       example:
 *         question: "What is Bootstrap?"
 *         options:
 *           - text: "A JavaScript framework for back-end development"
 *             isCorrect: false
 *           - text: "A CSS framework for designing responsive web pages"
 *             isCorrect: true
 *           - text: "A database management system"
 *             isCorrect: false
 *           - text: "A command-line interface tool"
 *             isCorrect: false
 *         isMultiple: false
 *         correctOptionIds: ["60d6c5f88e4e1234567890ab"]
 *         chosenOptionIds: []
 *         isFlagged: false
 *         category: "Front-end Development"
 *         difficulty: "easy"
 *         points: 1
 *         explanation: "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development."
 */