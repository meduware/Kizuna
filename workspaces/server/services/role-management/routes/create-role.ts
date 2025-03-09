import { Router } from "express";
import { createRole } from "../controllers/create-role";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Role management
 *   description: Role management service endpoint
 */

/**
 * @swagger
 * /api/role-management/create-role:
 *   post:
 *     summary: Create a new role
 *     tags: [Role management]
 *     parameters:
 *       - name: role_name
 *         in: query
 *         description: The role name
 *         type: string
 *         example: ""
 *       - name: role_color
 *         in: query
 *         description: The role color in hex format(e.g., #4287f5)
 *         type: string
 *         example: ""
 *       - name: permissions
 *         in: query
 *         description: JSON string of role  permissions
 *         required: false
 *         schema:
 *           type: string
 *           example: '{ "owner": true, "manage_users": true, "manage_server": true}'
 *           description: The channel permissions
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
 *                   example: "New role added successfully."
 *                   description: The role name
 *                 role:
 *                   type: object
 *                   properties:
 *                     role_name:
 *                       type: string
 *                       example: "Dalgalının Rolü"
 *                       description: The role name
 *                     role_color:
 *                       type: string
 *                       example: "#555555"
 *                       description: The role color in hex format(e.g., #4287f5)
 *                     permissions:
 *                       type: object
 *                       properties:
 *                         owner:
 *                           type: boolean
 *                           example: true
 *                           description: Whether the role is owner or not
 *                         manage_users:
 *                           type: boolean
 *                           example: true
 *                           description: Whether the role can manage users or not
 *                         manage_server:
 *                           type: boolean
 *                           example: true
 *                           description: Whether the role can manage server or not
 *       400:
 *         description: Invalid request or role not found
 */

router.post("/role-management/create-role", createRole);

export default router;
