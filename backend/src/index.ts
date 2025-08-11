import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import { connectToDB } from "./lib/connectToDB.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// Middlewares
app.use(express.json()); // without this, destructuring from body will not work
app.use(cookieParser());

app.use("/api/auth", authRouter);
// app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
  console.log("Server started at port", PORT);
  connectToDB();
});
