import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User managment
 *   description: User managment service endpoint
 */

/**
 * @swagger
 * /api/user-managment/health:
 *   get:
 *     summary: Service status
 *     tags: [User managment]
 *     description: Check service status
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
 *                   example: "Template service is running"
 */
router.get("/user-managment/health", healthCheck);

export default router;
