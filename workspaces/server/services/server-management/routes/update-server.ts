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
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               server_name:
 *                 type: string
 *                 description: Server name
 *                 example: ""
 *               server_image:
 *                 type: string
 *                 format: binary
 *                 description: Server image file (optional)
 *               login_methods:
 *                 type: string
 *                 description: JSON string of login method settings (optional)
 *                 example: '{"passwordAuth": true, "oAuthSupport": false, "allowRegister": true, "anonymousLogin": false, "oAuthProviders": {"google": true, "github": false, "apple": false}}'
 *               file_sharing:
 *                 type: string
 *                 description: JSON string of file sharing settings (optional)
 *                 example: '{"maxFileSize": 250, "retentionPolicy": "30days", "allowedFileTypes": {"audio": true, "video": true, "images": true, "documents": true}, "userStorageQuota": 1024}'
 *               capacities:
 *                 type: string
 *                 description: JSON string of server capacities (optional)
 *                 example: '{"bitrate": 96, "streamFps": 30, "apiRateLimit": 60, "streamQuality": "720", "maxRoomCapacity": 10, "maxServerCapacity": 10, "maxConcurrentConnections": 100}'
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
 *                         login_methods:
 *                           type: object
 *                           properties:
 *                             passwordAuth:
 *                               type: boolean
 *                             oAuthSupport:
 *                               type: boolean
 *                             allowRegister:
 *                               type: boolean
 *                             anonymousLogin:
 *                               type: boolean
 *                             oAuthProviders:
 *                               type: object
 *                               properties:
 *                                 google:
 *                                   type: boolean
 *                                 github:
 *                                   type: boolean
 *                                 apple:
 *                                   type: boolean
 *                         file_sharing:
 *                           type: object
 *                           properties:
 *                             maxFileSize:
 *                               type: integer
 *                             retentionPolicy:
 *                               type: string
 *                             allowedFileTypes:
 *                               type: object
 *                               properties:
 *                                 audio:
 *                                   type: boolean
 *                                 video:
 *                                   type: boolean
 *                                 images:
 *                                   type: boolean
 *                                 documents:
 *                                   type: boolean
 *                             userStorageQuota:
 *                               type: integer
 *                         capacities:
 *                           type: object
 *                           properties:
 *                             bitrate:
 *                               type: integer
 *                             streamFps:
 *                               type: integer
 *                             apiRateLimit:
 *                               type: integer
 *                             streamQuality:
 *                               type: string
 *                             maxRoomCapacity:
 *                               type: integer
 *                             maxServerCapacity:
 *                               type: integer
 *                             maxConcurrentConnections:
 *                               type: integer
 *       400:
 *         description: Bad request (invalid input or parsing errors)
 *       404:
 *         description: Server not found
 */

router.put("/server-management/update-server", upload.single("server_image"), updateServer);

export default router;
