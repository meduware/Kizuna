import { Router } from "express";
import { getUser } from "../controllers/get-user";

const router = Router();

/**
 * @swagger
 * /api/user-management/get-user:
 *   post:
 *     summary: Find user by ID
 *     tags:
 *       - User management
 *     description: Fetches a user's information using their unique ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The unique ID of the user
 *         required: true
 *         type: string
 *         example: ""
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User found successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     sub:
 *                       type: string
 *                       example: "uuid"
 *                     email:
 *                       type: string
 *                       example: "string@hotmail.com"
 *                     username:
 *                       type: string
 *                       example: "Kartal Derin official"
 *                     photo_url:
 *                       type: string
 *                       example: "https://example.com/photo.jpg"
 *                     email_verified:
 *                       type: boolean
 *                       example: true
 *                     phone_verified:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Bad request, possibly due to invalid ID
 *       500:
 *         description: Internal server error
 */
router.post("/user-management/get-user", getUser);

export default router;
