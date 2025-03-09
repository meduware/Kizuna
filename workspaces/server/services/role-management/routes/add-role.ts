import { Router } from "express";
import { addRole } from "../controllers/add-role";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Role management
 *   description: Role management service endpoint
 */

/**
 * @swagger
 * /api/role-management/add-role:
 *   post:
 *     summary: Create a new role
 *     tags: [Role management]
 *     parameters:
 *       - name: role_id
 *         in: query
 *         description: The role id
 *         type: string
 *         example: ""
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

router.post("/role-management/add-role", addRole);

export default router;
