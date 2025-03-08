import { Router } from "express";
import { updateServer } from "../controllers/update-server";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * tags:
 *   name: Server management
 *   description: Server management service endpoint
 */

/**
 * @swagger
 * /api/server-management/update-server:
 *   put:
 *     summary: Update server details
 *     tags: [Server management]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               server_name:
 *                 type: string
 *                 description: The server name
 *                 example: ""
 *               server_image:
 *                 type: string
 *                 format: binary
 *                 description: The server image
 *               login_methods:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Login methods for joining the server
 *                 example: ["email"]
 *               max_participants_per_vc:
 *                 type: integer
 *                 description: Maximum number of participants per voice chat
 *                 example: ""
 *               bitrate:
 *                 type: integer
 *                 description: Quality of the voice chat
 *                 example: ""
 *               stream_quality:
 *                 type: string
 *                 description: Quality of the stream (you cant use words so 720p is 720, 1080p is 1080, 4K is 4000 etc.)
 *                 example: ""
 *               stream_fps:
 *                 type: integer
 *                 description: Frame rate of the stream
 *                 example: ""
 *               file_upload_limit:
 *                 type: integer
 *                 description: Maximum file size allowed to be uploaded (in MB)
 *                 example: ""
 *     responses:
 *       200:
 *         description: Server information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Server information updated successfully."
 *                 server:
 *                   type: object
 *                   properties:
 *                     server_name:
 *                       type: string
 *                       example: "My Updated Server"
 *                     server_image:
 *                       type: string
 *                       example: "https://example.com/path-to-server-image.jpg"
 *                     technical_details:
 *                       type: object
 *                       properties:
 *                         bitrate:
 *                           type: integer
 *                           example: 128
 *                         stream_fps:
 *                           type: integer
 *                           example: 60
 *                         login_methods:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["email"]
 *                         stream_quality:
 *                           type: integer
 *                           example: 4000
 *                         max_participants_per_vc:
 *                           type: integer
 *                           example: 150
 *                         file_upload_limit:
 *                           type: integer
 *                           example: 1024
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid input)
 *       404:
 *         description: Server not found
 */
router.put(
  "/server-management/update-server",
  upload.single("server_image"),
  updateServer,
);

export default router;
