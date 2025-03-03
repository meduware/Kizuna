import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  const bearerToken = token.split(" ")[1];

  if (!bearerToken) {
    return res.status(403).json({ message: "Token is missing" });
  }

  jwt.verify(bearerToken, process.env.JWT_SECRET_KEY || "", (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Token is invalid" });
    }

    (req as any).user = user as JwtPayload;
    next();
  });
};

export const dontVerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  (req as any).user = null;
  next();
};
