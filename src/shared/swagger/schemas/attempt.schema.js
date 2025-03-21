/**
 * @swagger
 * components:
 *   schemas:
 *     Attempt:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - questions
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier for the attempt
 *           example: "615c1bfae1f3a0b7b7c7a123"
 *         userId:
 *           type: string
 *           description: Auto-generated unique identifier for the user (required)
 *           example: "623c1bfae1f3a0b7b7c7a127"
 *         title:
 *           type: string
 *           description: Attempt's title (required)
 *           example: "General Quiz - Mar 21, 2025"
 *         questions:
 *           type: array
 *           description: Array of questions (required)
 *           items:
 *             $ref: '#/components/schemas/Question'
 *         selectedAnswers:
 *           type: array
 *           description: Array of selected answers
 *           items:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *                 description: ID of the question
 *                 example: "615c1bfae1f3a0b7b7c7a456"
 *               chosenOptionIds:
 *                 type: array
 *                 description: List of selected option IDs for the question
 *                 items:
 *                   type: string
 *                   example: "615c1bfae1f3a0b7b7c7a789"
 *         score:
 *           type: number
 *           description: Score achieved in the attempt
 *           example: 85
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of attempt creation (auto-generated)
 *           example: "2023-10-05T14:48:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last attempt update (auto-generated)
 *           example: "2023-10-05T14:48:00.000Z"
 */
