import { Request, Response } from "express";
import { UserInterface } from "types/User.types";
import User from "../models/User";
import jwt from "jsonwebtoken";

const AUTH_TOKEN_HEADER = "auth-token";

const generateToken = (userId: string) => {
  return jwt.sign({ _id: userId }, process.env.SECRET_TOKEN || "tokentest", {
    expiresIn: process.env.TOKEN_EXPIRATION || "1d",
  });
};

export const signup = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const user: UserInterface = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();

    const token: string = generateToken(savedUser._id);
    res.header(AUTH_TOKEN_HEADER, token).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const singin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json("Invalid credentials");

    const correctPassword: boolean = await user.validatePassword(
      req.body.password
    );

    if (!correctPassword) return res.status(401).json("Invalid password");

    const token: string = generateToken(user._id);
    res.header(AUTH_TOKEN_HEADER, token).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId, { password: 0 }).exec();

    if (!user) return res.status(404).json("No user found");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
