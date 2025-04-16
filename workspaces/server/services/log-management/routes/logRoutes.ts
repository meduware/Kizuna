import express from "express";
import { createLogEntry, fetchLogs } from "../controllers/logController";

const router = express.Router();

// Create a new log
router.post("/", createLogEntry);


router.get("/", fetchLogs);

export default router;
