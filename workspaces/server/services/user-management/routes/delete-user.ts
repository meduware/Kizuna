import { Router } from "express";
import { deleteUser } from "../controllers/delete-user";

const router = Router();

/**
 * @swagger
 * /api/user-management/delete-user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User management]
 *     description: Deletes a user by their unique user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to be deleted.
 *         example: ""
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User deleted successfully."
 *       400:
 *         description: Invalid or missing user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/user-management/delete-user/:userId", deleteUser);

export default router;

