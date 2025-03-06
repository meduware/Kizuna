import { Router } from "express";
import { login } from "../controllers/login";

const router = Router();

/**
 * @swagger
 * /api/user-management/login:
 *   get:
 *     summary: User login
 *     tags: [User management]
 *     description: Login a user using email and password passed in the request query.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's email address
 *         example: ""
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's password
 *         example: ""
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Login successful."
 *                 user:
 *                   type: object
 *                   properties:
 *                     sub:
 *                       type: string
 *                       example: "uuid"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     username:
 *                       type: string
 *                       example: "Serhat Dalgalıdere"
 *                     photo_url:
 *                       type: string
 *                       example: "https://example.com/path-to-photo.jpg"
 *                     email_verified:
 *                       type: boolean
 *                       example: true
 *                     phone_verified:
 *                       type: boolean
 *                       example: true
 *                 access_token:
 *                   type: string
 *                   example: "jwt_token"
 */
router.get("/user-management/login", login);

export default router;
