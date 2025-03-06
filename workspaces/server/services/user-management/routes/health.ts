import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User management
 *   description: User management service endpoint
 */

/**
 * @swagger
 * /api/user-management/health:
 *   get:
 *     summary: Check user-managment service status
 *     tags: [Service status]
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
router.get("/user-management/health", healthCheck);

export default router;
