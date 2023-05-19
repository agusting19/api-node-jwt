import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const registerValidator = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerValidator.validate(req.body);

  if (error) return res.status(400).json({ error: error.message });

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginValidator.validate(req.body);

  if (error) return res.status(400).json({ error: error.message });

  next();
};
