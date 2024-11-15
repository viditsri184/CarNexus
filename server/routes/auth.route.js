const express = require("express");
const { authController } = require("../controllers/auth/auth.controller");
const router = express.Router();

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Create a new user
 *     description: Allows a user to register by providing an email, password, and username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Bad request. Validation errors or missing fields.
 */
router.post('/signup', authController.register);

router.post('/signin', authController.login);

module.exports = router;