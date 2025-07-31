import { Request, Response } from "express";
import { createLog, getLogs } from "../services/logService";

// Create a new log entry
export const createLogEntry = async (req: Request, res: Response) => {
  try {
    const logData = req.body;
    const log = await createLog(logData);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch logs with pagination
export const fetchLogs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const logs = await getLogs(page, limit);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
