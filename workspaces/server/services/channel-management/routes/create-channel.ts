import { Router } from "express";
import { createChannel } from "../controllers/create-channel";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Channel management
 *   description: Channel management service endpoint
 */

/**
 * @swagger
 * /api/channel-management/create-channel:
 *   post:
 *     summary: Create a new channel
 *     tags: [Channel management]
 *     parameters:
 *       - name: channel_name
 *         in: query
 *         description: The channel name
 *         type: string
 *         example: ""
 *       - name: channel_type
 *         in: query
 *         description: The channel type(text or voice)
 *         type: string
 *         example: ""
 *       - name: channel_description
 *         in: query
 *         description: The channel description
 *         type: string
 *         example: ""
 *       - name: channel_permissions
 *         in: query
 *         description: JSON string of channel permissions
 *         required: false
 *         schema:
 *           type: string
 *           example: '{"power_level": 0}'
 *           description: The channel permissions
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

router.post("/channel-management/create-channel", createChannel);

export default router;
