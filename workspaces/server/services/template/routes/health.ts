import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

const router = Router();

/**
 * @swagger
 * /api/template/health:
 *   get:
 *     summary: Check template service status
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
 *                   example: "Template service is running"
 */
router.get("/template/health", healthCheck);

export default router;
