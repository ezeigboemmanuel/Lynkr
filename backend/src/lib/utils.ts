import type { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // milliseconds
    httpOnly: true, // prevents XSS attacks
    sameSite: "strict", // prevents CSRF attacks
    secure: false, // process.env.NODE_ENV !== "development" if we are in production
  });

  return token;
};
