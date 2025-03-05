import { Router } from "express";
import { login } from "../controllers/login";

const router = Router();

/**
 * @swagger
 * /api/user-management/login:
 *   post:
 *     summary: User login
 *     tags: [User management]
 *     description: Login a user using email and password
 *     parameters:
 *       - name: email
 *         in: query
 *         description: The user's email address
 *         required: true
 *         type: string
 *         example: ""
 *       - name: password
 *         in: query
 *         description: The user's password
 *         required: true
 *         type: string
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
 *       400:
 *         description: Bad request, possibly due to missing or invalid data
 *       401:
 *         description: Unauthorized, invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post("/user-management/login", login);

export default router;

