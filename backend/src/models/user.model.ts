import mongoose, { Document, Model, Schema } from "mongoose";

// 1. Define an interface representing a User document in MongoDB
interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  // Add this ones during edit profile
  profileImg: string;
  bio: string;
  location: string;
  github: string;
  website: string;
}

// 2. Create the Mongoose schema corresponding to the document interface
const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: String,
    bio: String,
    location: String,
    github: String,
    website: String,
  },
  { timestamps: true }
);

// 3. Create the Model with the interface type
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
