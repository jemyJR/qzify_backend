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
 * /attempts/start:
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
 *         description: Comma-separated difficulty levels (e.g., "easy,medium")
 *       - in: query
 *         name: categories
 *         required: true
 *         schema:
 *           type: string
 *         description: Comma-separated list of quiz categories
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *         description: Number of questions to include in the attempt
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
 *                 attempt:
 *                   $ref: '#/components/schemas/Attempt'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /attempts/{id}/continue:
 *   get:
 *     summary: Continue an in-progress quiz attempt
 *     tags: [Attempts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the quiz attempt to continue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the in-progress quiz attempt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 attempt:
 *                   $ref: '#/components/schemas/Attempt'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /attempts/{id}:
 *   put:
 *     summary: Update a quiz attempt (e.g., flag questions or save chosen answers)
 *     tags: [Attempts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the quiz attempt to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Array of update objects for questions in the attempt
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 questionId:
 *                   type: string
 *                 chosenOptionIds:
 *                   type: array
 *                   items:
 *                     type: string
 *                 isFlagged:
 *                   type: boolean
 *     responses:
 *       200:
 *         description: Successfully updated the quiz attempt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 attempt:
 *                   $ref: '#/components/schemas/Attempt'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /attempts/{id}/submit:
 *   post:
 *     summary: Submit answers for a quiz attempt and complete it
 *     tags: [Attempts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the quiz attempt to submit
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Array of update objects for questions in the attempt (similar to update)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 questionId:
 *                   type: string
 *                 chosenOptionIds:
 *                   type: array
 *                   items:
 *                     type: string
 *                 isFlagged:
 *                   type: boolean
 *     responses:
 *       200:
 *         description: Successfully submitted the quiz attempt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 attempt:
 *                   $ref: '#/components/schemas/Attempt'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /attempts/{id}:
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
 *                   $ref: '#/components/schemas/Attempt'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /attempts:
 *   get:
 *     summary: Get all quiz attempts of the authenticated user
 *     tags: [Attempts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of quiz attempts for the user
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
