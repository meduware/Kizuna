import { Router } from "express";
import { getRoles } from "../controllers/get-roles";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Role management
 *   description: Role management service endpoint
 */

/**
 * @swagger
 * /api/role-management/get-roles:
 *   get:
 *     summary: Fetch all roles and their details
 *     tags: [Role management]
 *     responses:
 *       200:
 *         description: A list of roles with their details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       role_name:
 *                         type: string
 *                         example: "Developer"
 *                       permissions:
 *                         type: object
 *                         properties:
 *                           owner:
 *                             type: boolean
 *                             example: true
 *                           manage_users:
 *                             type: boolean
 *                             example: true
 *                           manage_server:
 *                             type: boolean
 *                             example: true
 *                       role_color:
 *                         type: string
 *                         example: "#428722"
 *       400:
 *         description: Bad request (e.g., missing required fields or invalid input)
 *       404:
 *         description: Roles not found
 */

router.get("/role-management/get-roles", getRoles);

export default router;
