import { Router } from "express";
import { removeRole } from "../controllers/remove-role";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Role management
 *   description: Role management service endpoint
 */

/**
 * @swagger
 * /api/role-management/remove-role:
 *   delete:
 *     summary: Remove an user role
 *     tags: [Role management]
 *     parameters:
 *       - name: user_id
 *         in: query
 *         description: The user id
 *         type: string
 *         example: ""
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Role deleted successfully"
 *       400:
 *         description: Invalid request or role not found
 */

router.delete("/role-management/remove-role", removeRole);

export default router;
