import { Router } from "express";
import { updateUser, upload } from "../controllers/update-user";

const router = Router();

/**
 * @swagger
 * /api/user-management/update-user:
 *   put:
 *     summary: Update user information
 *     tags:
 *       - User management
 *     description: Update a user's information using their ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID
 *                 example: ""
 *               email:
 *                 type: string
 *                 description: New email (optional)
 *                 example: ""
 *               username:
 *                 type: string
 *                 description: New username (optional)
 *                 example: ""
 *               password:
 *                 type: string
 *                 description: New password (optional)
 *                 example: ""
 *               email_verified:
 *                 type: boolean
 *                 description: Confirm email (optional)
 *                 example: ""
 *               phone_verified:
 *                 type: boolean
 *                 description: Confirm phone (optional)
 *                 example: "" 
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: New profile photo (optional)
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User information updated successfully."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     email:
 *                       type: string
 *                       example: "new_email@example.com"
 *                     username:
 *                       type: string
 *                       example: "NewUsername"
 *                     photo_url:
 *                       type: string
 *                       example: "https://example.com/path-to-photo.jpg"
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

router.put("/user-management/update-user", upload, updateUser);

export default router;
