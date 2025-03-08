import { Router } from "express";
import { isJoinable } from "../controllers/is-joinable";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Server management
 *   description: Server management service endpoint
 */

/**
 * @swagger
 * /api/server-management/is-joinable:
 *   get:
 *     summary: Check server to be joinable
 *     tags: [Server management]
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
 *                   example: "user-management service is running"
 */
router.get("/server-management/is-joinable", isJoinable);

export default router;
