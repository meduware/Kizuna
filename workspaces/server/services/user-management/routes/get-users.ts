import { Router } from "express";
import { getUsers } from "../controllers/get-users";

const router = Router();

/**
 * @swagger
 * /api/user-management/get-users:
 *   get:
 *     summary: Get all users with pagination
 *     tags: [User management]
 *     description: Retrieve a paginated list of registered users. If no pagination parameters are provided, all users will be returned.
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number (default is 1).
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of users per page (if you want not limit, set it to 0).
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Users fetched successfully"
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sub:
 *                         type: string
 *                         example: "uuid"
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       username:
 *                         type: string
 *                         example: "Serhat Dalgalıdere"
 *                       photo_url:
 *                         type: string
 *                         example: "https://example.com/path-to-photo.jpg"
 *                       email_verified:
 *                         type: boolean
 *                         example: true
 *                       phone_verified:
 *                         type: boolean
 *                         example: true
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 100
 */
router.get("/user-management/get-users", getUsers);

export default router;
