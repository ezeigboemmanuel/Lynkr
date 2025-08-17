import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/user.model.js";

export async function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // check if token exists
    const token = req.cookies.token;

    if (!token) {
      req.user = null; // just set null, don’t throw
      return next();
    }

    // check if the token is valid
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorised - Invalid token" });
    }

    // if valid, get the user and send it to the request in the next function
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // we got a type error, to solve this, we will extend the express request type to include our user object in the types.d.ts file
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in protectRoute middleware: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error", error);
    }
  }
}
