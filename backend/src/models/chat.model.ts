import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  participants: mongoose.Types.ObjectId[]; // array of the two users in 1v1 chat
}

const chatSchema = new Schema<IChat>(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    ],
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
