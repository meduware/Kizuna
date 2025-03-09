import { Router } from "express";
import { updateRoles } from "../controllers/update-roles";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Role management
 *   description: Role management service endpoint
 */

/**
 * @swagger
 * /api/role-management/update-roles:
 *   put:
 *     summary: Update role details
 *     tags:
 *        - Role management
 *     description: Update role details
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The role id
 *         required: true
 *         type: string
 *         example: ""
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
 *         description: Role information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Role information updated successfully."
 *                 role:
 *                   type: object
 *                   properties:
 *                     role_name:
 *                       type: string
 *                       example: "Dalgalının Rolü"
 *                     role_color:
 *                       type: string
 *                       example: "#555555"
 *                     permissions:
 *                       type: object
 *                       properties:
 *                         owner:
 *                           type: boolean
 *                           example: true
 *                         manage_users:
 *                           type: boolean
 *                           example: true
 *                         manage_server:
 *                           type: boolean
 *                           example: true
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid input)
 *       404:
 *         description: channel not found
 */
router.put("/role-management/update-roles", updateRoles);

export default router;
