import express from "express";
import { editUserProfile, getUserProfile } from "../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.get("/:profileId", getUserProfile)
profileRouter.put("/:profileId", editUserProfile)


export default profileRouter;
