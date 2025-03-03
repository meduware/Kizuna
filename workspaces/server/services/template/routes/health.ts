import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Template
 *   description: Template service endpoint
 */

/**
 * @swagger
 * /api/template/health:
 *   get:
 *     summary: Service status
 *     tags: [Template]
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
router.get("/template/health", healthCheck);

export default router;
