import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  chatId?: mongoose.Types.ObjectId;
  groupName?: "main" | "random" | "help";
  sender: mongoose.Types.ObjectId;
  content: string;
}

const messageSchema = new Schema<IMessage>(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    groupName: { type: String, enum: ["main", "random", "help"] },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
