import { Router } from "express";
import { deleteChannel } from "../controllers/delete-channel";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Channel management
 *   description: Channel management service endpoint
 */

/**
 * @swagger
 * /api/channel-management/delete-channel:
 *   delete:
 *     summary: delete a new channel
 *     tags: [Channel management]
 *     parameters:
 *       - name: channel_id
 *         in: query
 *         description: The channel id
 *         type: string
 *         example: ""
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   msg:
 *                     type: string
 *                     example: "Channel deleted successfully."
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid input)
 *       404:
 *         description: channel not found
 */

router.delete("/channel-management/delete-channel", deleteChannel);

export default router;
