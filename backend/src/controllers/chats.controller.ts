import type { Request, Response } from "express";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const sendOneToOneMessage = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const otherUserId = req.params.userId;
    const myId = req.user._id;

    // Validate ObjectId format first
    if (!mongoose.Types.ObjectId.isValid(otherUserId as string)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(otherUserId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1. Find or create chat between these two users
    let chat = await Chat.findOne({
      participants: { $all: [myId, otherUserId] },
    });

    if (!chat) {
      chat = await Chat.create({ participants: [myId, otherUserId] });
    }

    // 2. Create the message
    const message = await Message.create({
      chatId: chat._id,
      sender: myId,
      content,
    });

    return res.status(201).json(message);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in sendOneToOneMessage controller: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error in sendOneToOneMessage controller: ", error);
    }
  }
};

export const getOneToOneMessages = async (req: Request, res: Response) => {
  try {
    const otherUserId = req.params.userId;
    const myId = req.user._id;

    // Validate ObjectId format first
    if (!mongoose.Types.ObjectId.isValid(otherUserId as string)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(otherUserId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chat = await Chat.findOne({
      participants: { $all: [myId, otherUserId] },
    });

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    const messages = await Message.find({ chatId: chat._id })
      .populate("sender", "username email")
      .sort({ createdAt: 1 });

    return res.json(messages);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getOneToOneMessages controller: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error in getOneToOneMessages controller: ", error);
    }
  }
};

export const sendGroupMessage = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const { groupName } = req.params;
    const myId = req.user._id;

    if (!groupName) {
      return res.status(400).json({ message: "Invalid group name" });
    }

    // Check if it's one of your predefined groups
    const allowedGroups = ["main", "random", "help"];
    if (!allowedGroups.includes(groupName)) {
      return res.status(400).json({ message: "Invalid group name" });
    }

    const message = await Message.create({
      groupName,
      sender: myId,
      content,
    });

    return res.status(201).json(message);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in sendGroupMessage controller: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error in sendGroupMessage controller: ", error);
    }
  }
};

export const getGroupMessages = async (req: Request, res: Response) => {
  try {
    const { groupName } = req.params;

    if (!groupName) {
      return res.status(400).json({ message: "Invalid group name" });
    }

    const allowedGroups = ["main", "random", "help"];
    if (!allowedGroups.includes(groupName)) {
      return res.status(400).json({ message: "Invalid group name" });
    }

    const messages = await Message.find({ groupName })
      .populate("sender", "username email")
      .sort({ createdAt: 1 });

    return res.json(messages);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getGroupMessage controller: ", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    } else {
      console.log("Unknown error in getGroupMessage controller: ", error);
    }
  }
};
