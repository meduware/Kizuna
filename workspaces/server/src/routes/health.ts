const express = require("express");
import { Request, Response } from "express";
const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Server Status
 *     description: Check server status
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "The server is running"
 */
router.get("/health", (req: Request, res: Response) => {
  return res.json({ msg: "The server is running" });
});

module.exports = router;
