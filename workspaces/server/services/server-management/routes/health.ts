import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Server management
 *   description: Server management service endpoint
 */

/**
 * @swagger
 * /api/server-management/health:
 *   get:
 *     summary: Check server-management service status
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
router.get("/server-management/health", healthCheck);

export default router;
