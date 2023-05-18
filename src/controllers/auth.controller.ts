import { Request, Response } from "express";
import { UserInterface } from "types/User.types";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const singup = async (req: Request, res: Response) => {
  // Saving a new User
  const user: UserInterface = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save();

  // Create a token
  const token: string = jwt.sign(
    { _id: savedUser._id },
    process.env.TOKEN_SECRET || "tokentest"
  );
  res.header("auth-token", token).json(savedUser);
};
export const singin = (req: Request, res: Response) => {
  res.send("singin");
};
export const profile = (req: Request, res: Response) => {
  res.send("profile");
};
