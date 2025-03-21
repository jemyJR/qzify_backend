/**
 * @swagger
 * tags:
 *   name: Attempts
 *   description: Quiz attempt management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /start:
 *   post:
 *     summary: Start a new quiz attempt
 *     tags: [Attempts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: difficulties
 *         schema:
 *           type: string
 *       - in: query
 *         name: categories
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully started a quiz attempt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 attemptId:
 *                   type: string
 *                 attemptTitle:
 *                   type: string
 *                 questions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /{id}/submit:
 *   post:
 *     summary: Submit answers for a quiz attempt
 *     tags: [Attempts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully submitted the quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 score:
 *                   type: integer
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get details of a quiz attempt
 *     tags: [Attempts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the quiz attempt
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz attempt details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 attempt:
 *                     $ref: '#/components/schemas/Attempt'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get all quiz attempts of a user
 *     tags: [Attempts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of quiz attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 count:
 *                   type: integer
 *                 attempts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attempt'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
