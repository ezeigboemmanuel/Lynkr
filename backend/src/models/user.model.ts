import mongoose, { Document, Model, Schema } from "mongoose";

// 1. Define an interface representing a User document in MongoDB
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create the Mongoose schema corresponding to the document interface
const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// 3. Create the Model with the interface type
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
