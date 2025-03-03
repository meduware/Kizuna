import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
  return res.json({ msg: "Template service is running" });
};
