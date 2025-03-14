/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier for the user
 *           example: "615c1bfae1f3a0b7b7c7a123"
 *         first_name:
 *           type: string
 *           description: User's first name (required)
 *           example: Mohamed
 *         last_name:
 *           type: string
 *           description: User's last name (required)
 *           example: Gamal
 *         email:
 *           type: string
 *           description: email address (required)
 *           example: mohamed.gamal@example.com
 *         password:
 *           type: string
 *         image:
 *           type: string
 *           description: URL to the user's profile image (optional)
 *           default: ""
 *           example: http://example.com/image.jpg
 *         role:
 *           type: string
 *           description: User's system access role (student or admin). Defaults to 'student'
 *           default: student
 *           example: student
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of user creation (auto-generated)
 *           example: "2023-10-05T14:48:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last user update (auto-generated)
 *           example: "2023-10-05T14:48:00.000Z"
 */