import express from "express";
import { editUserProfile, getUserProfile, getUsers } from "../controllers/users.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const usersRouter = express.Router();

usersRouter.get("/", protectRoute, getUsers);
usersRouter.get("/:profileId", protectRoute, getUserProfile)
usersRouter.put("/:profileId", protectRoute, editUserProfile)

export default usersRouter;
