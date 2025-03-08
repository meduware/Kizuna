import { Router } from "express";
import { getChannels } from "../controllers/get-channels";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Channel management
 *   description: Channel management service endpoint
 */

/**
 * @swagger
 * /api/channel-management/get-channels:
 *   get:
 *     summary: Fetch chanels and channel details
 *     tags: [Channel management]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 channels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       channel_name:
 *                         type: string
 *                         example: "My Updated channel"
 *                       channel_type:
 *                         type: string
 *                         example: "text"
 *                       channel_description:
 *                         type: string
 *                         example: "My Updated channel description"
 *                       channel_permissions:
 *                         type: string
 *                         example: "power_level: 5"
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid input)
 *       404:
 *         description: channel not found
 */

router.get("/channel-management/get-channels", getChannels);

export default router;
