import { Router } from "express";
import { deleteRole } from "../controllers/delete-role";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Role management
 *   description: Role management service endpoint
 */

/**
 * @swagger
 * /api/role-management/delete-role:
 *   delete:
 *     summary: Delete a role
 *     tags: [Role management]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Role ID to delete
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

router.delete("/role-management/delete-role", deleteRole);

export default router;
