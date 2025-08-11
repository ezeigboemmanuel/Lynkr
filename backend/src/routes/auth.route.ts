import express from "express"
import { checkAuth, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.get("/check", protectRoute, checkAuth)
authRouter.post("/logout", logout)
authRouter.post("/login", login)

export default authRouter;