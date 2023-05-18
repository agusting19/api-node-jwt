import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  _id: string;
  iat: number;
  exp: number;
}

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).json("Access denied");

  const payload = jwt.verify(
    token,
    process.env.SECRET_TOKEN || "tokentest"
  ) as Payload;
  req.userId = payload._id;

  next();
};
