import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

const router = Router();

/**
 * @swagger
 * /api/role-management/health:
 *   get:
 *     summary: Check role-manegement service status
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
router.get("/role-management/health", healthCheck);

export default router;
