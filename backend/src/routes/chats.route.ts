import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getOneToOneMessages,
  sendOneToOneMessage,
} from "../controllers/chats.controller.js";

const chatsRouter = express.Router();

chatsRouter.post("/1v1/:userId", protectRoute, sendOneToOneMessage);
chatsRouter.get("/1v1/:userId", protectRoute, getOneToOneMessages);

export default chatsRouter;
