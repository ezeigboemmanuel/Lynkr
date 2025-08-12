import type { Request, Response } from "express";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    const query = search ? { username: { $regex: search, $options: "i" } } : {};

    const users = await User.find(query).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getUsers controller: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error in getUsers controller: ", error);
    }
  }
};

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

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

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

    // Verify if the profile belongs to that particular user
    if (profileId !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorised user" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      profileId,
      {
        username,
        profileImg,
        bio,
        location,
        github,
        website,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ updatedUser, message: "User updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in editUserProfile: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown Error in editUserProfile: ", error);
    }
  }
};
