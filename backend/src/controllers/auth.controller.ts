import type { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export async function signup(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    // check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // if not, hash the password then create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token then save to db
      generateToken(newUser._id as string, res);

      await newUser.save();

      const { password, ...user } = newUser.toObject();
      return res
        .status(201)
        .json({ user, message: "User created successfully" });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in signup controller: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error in signup controller: ", error);
    }
  }
}

export function checkAuth(req: Request, res: Response) {
  // we already have the user in the middleware, we just need this function to return the user's info
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in checkAuth controller: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error in checkAuth controller: ", error);
    }
  }
}

export function logout(req: Request, res: Response) {
  try {
    res.cookie("token", "", { maxAge: 0 });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in logout controller: ", error.message);
      return res.status(500).json({ message: error.message });
    } else {
      console.log("Unknown error in logout controller: ", error);
    }
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // check if user is in our db
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If all checks pass, generate the token
    generateToken(existingUser._id as string, res);
    
    const { password: _password, ...user } = existingUser.toObject();
    return res.status(200).json({ user, message: "Logged in successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in login controller: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error in login controller: ", error);
    }
  }
}
