import { Request, Response } from "express";
import { getServiceName } from "../services/handler";

export const healthCheck = (req: Request, res: Response) => {
  return res.json({ msg: `${getServiceName()} service is running` });
};
