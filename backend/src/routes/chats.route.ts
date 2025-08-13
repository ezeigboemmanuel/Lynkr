import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    getGroupMessages,
  getOneToOneMessages,
  sendGroupMessage,
  sendOneToOneMessage,
} from "../controllers/chats.controller.js";

const chatsRouter = express.Router();

chatsRouter.post("/1v1/:userId", protectRoute, sendOneToOneMessage);
chatsRouter.get("/1v1/:userId", protectRoute, getOneToOneMessages);
chatsRouter.post("/groups/:groupName", protectRoute, sendGroupMessage);
chatsRouter.get("/groups/:groupName", protectRoute, getGroupMessages);

export default chatsRouter;
