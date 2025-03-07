import { Request, Response } from "express";

export const isJoinable = (req: Request, res: Response) => {
  return res.status(200).json({ msg: `Server is joinable` });
};
