import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Channel management
 *   description: Channel management service endpoint
 */

/**
 * @swagger
 * /api/channel-management/health:
 *   get:
 *     summary: Check channel-managment service status
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
 *                   example: "channel-management service is running"
 */
router.get("/channel-management/health", healthCheck);

export default router;
