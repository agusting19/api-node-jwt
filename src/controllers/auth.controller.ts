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
    process.env.SECRET_TOKEN || "tokentest"
  );
  res.header("auth-token", token).json(savedUser);
};

export const singin = async (req: Request, res: Response) => {
  // Validate email
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json("Wrong email or password");
  // Validate password
  const correctPassword: boolean = await user.validatePassword(
    req.body.password
  );

  if (!correctPassword) return res.status(400).json("Invalid password");

  // Create a token
  const token = jwt.sign(
    { _id: user._id },
    process.env.SECRET_TOKEN || "tokentest",
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  res.header("auth-token", token).json(user);
};

export const profile = (req: Request, res: Response) => {
  res.send("profile");
};
