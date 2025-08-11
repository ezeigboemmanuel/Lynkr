import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected: ", conn.connection.host);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in connecting to MongoDB: ", error.message);
    } else {
      console.log("Unknown error in connecting to MongoDB: ", error);
    }
  }
};
