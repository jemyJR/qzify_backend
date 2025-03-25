/**
 * @swagger
 * components:
 *   schemas:
 *     AttemptOption:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "Stores metadata for the document"
 *         isCorrect:
 *           type: boolean
 *           example: true
 * 
 *     AttemptQuestion:
 *       type: object
 *       required:
 *         - originalQuestion
 *       properties:
 *         originalQuestion:
 *           type: string
 *           description: Reference to the original Question ID
 *           example: "615c1bfae1f3a0b7b7c7a456"
 *         question:
 *           type: string
 *           example: "What is the purpose of the HTML <head> element?"
 *         options:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AttemptOption'
 *         correctOptionIds:
 *           type: array
 *           items:
 *             type: string
 *           example: ["615c1bfae1f3a0b7b7c7a789"]
 *         isMultiple:
 *           type: boolean
 *           example: false
 *         category:
 *           type: string
 *           example: "HTML Basics"
 *         difficulty:
 *           type: string
 *           example: "easy"
 *         points:
 *           type: number
 *           example: 10
 *         explanation:
 *           type: string
 *           example: "The <head> element contains meta-information about the document, including title, scripts, and stylesheets."
 *         chosenOptionIds:
 *           type: array
 *           items:
 *             type: string
 *           example: ["615c1bfae1f3a0b7b7c7a789"]
 *         isFlagged:
 *           type: boolean
 *           example: false
 * 
 *     Attempt:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier for the attempt
 *           example: "615c1bfae1f3a0b7b7c7a123"
 *         userId:
 *           type: string
 *           description: Reference to the user ID
 *           example: "623c1bfae1f3a0b7b7c7a127"
 *         title:
 *           type: string
 *           description: Title of the attempt
 *           example: "HTML Fundamentals Quiz - Sep 2023"
 *         questions:
 *           type: array
 *           description: Array of attempt questions
 *           items:
 *             $ref: '#/components/schemas/AttemptQuestion'
 *         categories:
 *           type: array
 *           description: Categories covered in the attempt
 *           items:
 *             type: string
 *           example: ["HTML Elements", "Semantic HTML"]
 *         difficulties:
 *           type: array
 *           description: Difficulty levels present in the attempt
 *           items:
 *             type: string
 *           example: ["easy", "medium"]
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the attempt started
 *           example: "2023-09-15T10:00:00.000Z"
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the attempt will automatically end
 *           example: "2023-09-15T11:00:00.000Z"
 *         duration:
 *           type: number
 *           description: Total duration of attempt in seconds
 *           example: 3600
 *         status:
 *           type: string
 *           enum: ['in-progress', 'completed']
 *           description: Current status of the attempt
 *           example: "in-progress"
 *         score:
 *           type: number
 *           description: Current score achieved
 *           example: 85
 *         totalPossibleScore:
 *           type: number
 *           description: Maximum possible score based on questions
 *           example: 100
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of attempt creation
 *           example: "2023-09-15T09:55:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 *           example: "2023-09-15T10:30:00.000Z"
 *         remainingTime:
 *           type: number
 *           readOnly: true
 *           description: Calculated remaining time in seconds
 *           example: 1799.5
 */