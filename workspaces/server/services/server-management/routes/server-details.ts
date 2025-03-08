import { Router } from "express";
import { serverDetails } from "../controllers/server-details";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Server management
 *   description: Server management service endpoint
 */

/**
 * @swagger
 * /api/server-management/server-details:
 *   get:
 *     summary: Fetch server details
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
router.get("/server-management/server-details", serverDetails);

export default router;
