import type { Request, Response } from "express";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;

    if (!profileId) {
      return res.status(400).json({ message: "Profile ID is required" });
    }

    // Validate ObjectId format first
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({ message: "Invalid profile ID" });
    }

    const user = await User.findById(profileId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getUserProfile controller: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error in getUserProfile controller: ", error);
    }
  }
};

export const editUserProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const { username, profileImg, bio, location, github, website } = req.body;

    if (!profileId) {
      return res.status(400).json({ message: "Profile ID is required" });
    }

    // Validate ObjectId format first
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({ message: "Invalid profile ID" });
    }

    const user = await User.findById(profileId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in editUserProfile: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown Error in editUserProfile: ", error);
    }
  }
};
